import { Provider, User, UserCredentials } from '@supabase/gotrue-js'
import { useRouter } from 'next/router'
import * as React from 'react'
import { supabase } from './supabase'

interface Profile extends User {
  avatar_url?: string
  username?: string
}
interface UserContextProps {
  user?: Profile
  loading: boolean
  error?: any
  login: (provider: Provider | UserCredentials) => Promise<void>
  logout: () => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (password: string) => Promise<void>
  updateProfile: (profile: Partial<Profile>) => Promise<void>
}

interface ProviderProps {
  children: React.ReactNode
}

const Context = React.createContext<UserContextProps>({} as UserContextProps)

const UserProvider = ({ children }: ProviderProps) => {
  const router = useRouter()
  const [user, setUser] = React.useState<Profile>()
  const [error, setError] = React.useState<any>()
  const [loading, setLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (error) setError(null)
  }, [router.pathname])

  React.useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user()
      if (sessionUser) {
        setLoading(true)
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', sessionUser.id)
            .single()

          if (error) {
            throw error
          }
          setUser({
            ...sessionUser,
            ...profile,
          })
        } catch (error) {
          setError(error)
        } finally {
          setLoading(false)
        }
      }
    }
    getUserProfile()
    supabase.auth.onAuthStateChange(() => {
      getUserProfile()
    })
  }, [])

  React.useEffect(() => {
    fetch('/api/auth/set', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        event: user ? 'SIGNED_IN' : 'SIGNED_OUT',
        session: supabase.auth.session(),
      }),
    })
  }, [user])

  const login = async (provider: Provider | UserCredentials) => {
    setLoading(true)
    try {
      if (typeof provider === 'string') {
        const { user, error } = await supabase.auth.signIn(
          {
            provider: provider as Provider,
          },
          {
            redirectTo: process.env.NEXT_PUBLIC_VERCEL_URL,
          }
        )
        if (error) {
          throw error
        }

        if (user) {
          setUser(user)
          router.push('/')
        }
      } else {
        const { user, error } = await supabase.auth.signIn(
          { ...provider },
          {
            redirectTo: process.env.NEXT_PUBLIC_VERCEL_URL,
          }
        )

        if (error) {
          throw error
        }
        if (user) {
          setUser(user)
          router.push('/')
        }
      }
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }
  const logout = async () => {
    await supabase.auth.signOut()
    await fetch('/api/auth/remove', {
      method: 'GET',
    })
    setUser(undefined)
    router.push('/')
  }

  const signup = async (email: string, password: string) => {
    setLoading(true)
    try {
      const { user, error } = await supabase.auth.signUp({ email, password })

      if (error) {
        throw error
      }

      if (user) {
        setUser(user)
        router.push('/email-verification')
      }
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const forgotPassword = async (email: string) => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.api.resetPasswordForEmail(email)

      if (error) {
        throw error
      }
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }
  const resetPassword = async (password: string) => {
    const session = supabase.auth.session()
    setLoading(true)
    try {
      const { error } = await supabase.auth.api.updateUser(
        String(session?.access_token),
        {
          password,
        }
      )

      if (error) {
        throw error
      }
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (profile: Partial<Profile>) => {
    const session = supabase.auth.session()
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', session?.user?.id)
      if (error) {
        throw error
      }
    } catch (error) {
      setError(error)
    }
  }

  // Make the provider update only when it should.
  // We only want to force re-renders if the user,
  // loading or error states change.
  //
  // Whenever the `value` passed into a provider changes,
  // the whole tree under the provider re-renders, and
  // that can be very costly! Even in this case, where
  // you only get re-renders when logging in and out
  // we want to keep things very performant.
  const memoedValue = React.useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      signup,
      logout,
      forgotPassword,
      resetPassword,
      updateProfile,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, loading, error]
  )

  return <Context.Provider value={memoedValue}>{children}</Context.Provider>
}

export const useUser = () => React.useContext(Context)
export default UserProvider

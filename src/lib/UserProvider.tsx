import { User } from '@supabase/gotrue-js'
import { useRouter } from 'next/router'
import * as React from 'react'
import { supabase } from './supabase'

const Context = React.createContext<Partial<UserContextProps>>({})

interface UserContextProps {
  user: User | undefined
  login: () => void
  logout: () => void
  signup: (email: string, password: string) => void
}

interface ProviderProps {
  children: React.ReactNode
}

const UserProvider = ({ children }: ProviderProps) => {
  const router = useRouter()
  const [user, setUser] = React.useState<User | undefined>(
    supabase.auth.user() || undefined
  )

  React.useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user()

      if (sessionUser) {
        const { data: profile } = await supabase
          .from('profile')
          .select('*')
          .eq('id', sessionUser.id)
          .single()

        setUser({
          ...sessionUser,
          ...profile,
        })
      }
    }
    getUserProfile()
    supabase.auth.onAuthStateChange(() => {
      getUserProfile
    })
  }, [])

  const login = async () => {
    await supabase.auth.signIn({ provider: 'twitter' })
    router.push('/')
  }
  const logout = async () => {
    await supabase.auth.signOut()
    setUser(undefined)
    router.push('/')
  }

  const signup = async (email: string, password: string) => {
    const { user } = await supabase.auth.signUp({ email, password })
    router.push('/')
  }
  return (
    <Context.Provider value={{ user, login, logout, signup }}>
      {children}
    </Context.Provider>
  )
}

export const useUser = () => React.useContext(Context)
export default UserProvider

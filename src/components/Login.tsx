import Link from 'next/link'
import * as React from 'react'
import { supabase } from '~/lib/supabase'
import { useUser } from '~/lib/UserProvider'

export default function Login() {
  const { login } = useUser()
  const [email, setEmail] = React.useState('')
  const [pass, setPass] = React.useState('')

  const handleLogin = async (email: string) => {
    try {
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error: any) {
      alert(error.error_description || error.message)
    }
  }

  return (
    <div className="container mx-auto grid min-h-screen place-content-center">
      <div>
        <h2>
          Dont have an Account?{' '}
          <Link href="/signup">Click Here to Sign Up</Link>
        </h2>
        <form className="flex flex-col gap-4 rounded-sm bg-slate-200 px-10 py-8 shadow">
          <input
            type="text"
            placeholder="Enter your email..."
            className="w-64 rounded bg-slate-50 px-2 py-2 font-medium text-gray-700 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter a pasword..."
            className="w-64 rounded bg-slate-50 px-2 py-2 font-medium text-gray-700 outline-none"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <button
            onClick={() => handleLogin}
            className="rounded-sm bg-orange-400 px-4 py-2 text-white duration-100 hover:bg-orange-500"
          >
            Login
          </button>
        </form>
      </div>
      <p className="mt-4 text-center">or</p>
      <button
        onClick={login}
        className="mt-4 w-full rounded-lg border-blue-300 bg-blue-400 p-2 pl-5 pr-5 text-lg text-gray-100 focus:border-4"
      >
        <span>Login With twitter</span>
      </button>
    </div>
  )
}

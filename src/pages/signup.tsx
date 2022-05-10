import * as React from 'react'
import { NextPage } from 'next/types'
import { useUser } from '~/lib/UserProvider'

const Signup: NextPage = () => {
  const { signup } = useUser()
  const [email, setEmail] = React.useState('')
  const [pass, setPass] = React.useState('')

  // Still need to be implimented
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8">
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
          // onClick={() => signup(email, pass)}
          className="rounded-sm bg-orange-400 px-4 py-2 text-white duration-100 hover:bg-orange-500"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Signup

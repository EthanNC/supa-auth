import Link from 'next/link'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { supabase } from '~/lib/supabase'
import { useUser } from '~/lib/UserProvider'
import Button from './Button'
import Input from './Input'

export default function Profile() {
  const { user, logout } = useUser()
  const [error, setError] = React.useState<any>(null)

  type ProfileInputs = {
    username: string
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInputs>()

  const onSubmit: SubmitHandler<ProfileInputs> = async (data) => {
    try {
      const user = supabase.auth.user()
      const updates = {
        id: user?.id,
        username: data.username,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) {
        throw error
      }
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div className="container mx-auto grid min-h-screen place-content-center">
      <p>
        Oh hi there{' '}
        <span className="font-bold">{user?.username || user?.email}</span>
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <span className="round rounded bg-red-500 p-2 text-sm text-white">
            {error.message}
          </span>
        )}
        <Input
          type="username"
          placeholder="Enter a username"
          {...register('username', {
            required: true,
            pattern: /^[a-zA-Z0-9_-]*$/,
            minLength: 3,
          })}
        />
        {errors.username && (
          <span className="round rounded bg-red-500 py-1 px-2 text-sm text-white">
            {usernameErrorMessageForType(errors.username.type)}
          </span>
        )}
        <Button type="submit">
          <span>Update profile</span>
        </Button>
      </form>
      <p className="mt-4 text-center">or</p>
      <Link href="/reset-password-form" passHref>
        <Button className="mt-4 rounded-lg border-blue-300 bg-blue-500 p-2 pl-5 pr-5 text-lg text-gray-100 focus:border-4">
          Change Password
        </Button>
      </Link>
      <p className="mt-4 text-center">or</p>
      <Button
        className="mt-4 rounded-lg border-blue-300 bg-blue-500 p-2 pl-5 pr-5 text-lg text-gray-100 focus:border-4"
        onClick={logout}
      >
        Logout
      </Button>
    </div>
  )
}

export const usernameErrorMessageForType = (type: string) => {
  switch (type) {
    case 'required':
      return 'username is required'
    case 'minLength':
      return 'username must be 3 characters or more'
    default:
      return 'Please enter a valid username!'
  }
}

import Link from 'next/link'
import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useUser } from '~/lib/UserProvider'
import Button from './Button'
import Input from './Input'

export default function Login() {
  const { login, error, loading } = useUser()

  type LoginInputs = {
    email: string
    password: string
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>()

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    login(data)
  }

  return (
    <div className="container mx-auto grid min-h-screen place-content-center">
      <div>
        <div className="text-center">
          Do not have an Account?{' '}
          <Link href="/signup">
            <span className=" cursor-pointer underline hover:text-blue-400">
              Sign Up
            </span>
          </Link>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 rounded-sm  px-10 py-8"
        >
          {error && (
            <span className="round rounded bg-red-500 p-2 text-sm text-white">
              {error.message}
            </span>
          )}
          <Input
            type="email"
            placeholder="Enter your email..."
            {...register('email', { required: true })}
          />
          {errors.email && (
            <span className="round rounded bg-red-500 py-1 px-2 text-sm text-white">
              {emailErrorMessageForType(errors.email.type)}
            </span>
          )}
          <Input
            type="password"
            placeholder="Enter a password..."
            {...register('password', {
              required: true,
              minLength: 4,
              maxLength: 24,
            })}
          />
          {errors.password && (
            <span className="round rounded bg-red-500 py-1 px-2 text-sm text-white">
              {passwordErrorMessageForType(errors.password.type)}
            </span>
          )}
          <Button type="submit" className=" bg-orange-500">
            Login
          </Button>
        </form>
      </div>
      <h2 className="text-center">
        Forget Your Password?{' '}
        <Link href="/forgot-password-form" passHref>
          <span className=" cursor-pointer underline hover:text-blue-400">
            Reset Password
          </span>
        </Link>
      </h2>
      <p className="mt-4 text-center">or</p>
      <button
        disabled={loading}
        onClick={() => login('twitter')}
        className="mt-4 w-full rounded-lg border-blue-300 bg-blue-400 p-2 pl-5 pr-5 text-lg text-gray-100 focus:border-4"
      >
        <span>Login With Twitter</span>
      </button>
    </div>
  )
}

export const passwordErrorMessageForType = (type: string) => {
  switch (type) {
    case 'required':
      return 'Password is required'
    case 'minLength':
      return 'Password must be at least 4 characters long'
    case 'maxLength':
      return 'Password must be shorter than 24 characters long'
    default:
      return 'Please enter a valid password!'
  }
}

export const emailErrorMessageForType = (type: string) => {
  switch (type) {
    case 'required':
      return 'Email is required'
    default:
      return 'Please enter a valid email!'
  }
}

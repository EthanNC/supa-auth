import * as React from 'react'
import { NextPage } from 'next/types'
import { useUser } from '~/lib/UserProvider'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '~/components/Input'
import Button from '~/components/Button'

const Signup: NextPage = () => {
  const { signup, login, error, loading } = useUser()

  type SingUpInputs = {
    email: string
    password: string
    confirmPassword: string
  }

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SingUpInputs>()

  const onSubmit: SubmitHandler<SingUpInputs> = (data) => {
    signup(data.email, data.password)
  }

  return (
    <div className="container mx-auto grid min-h-screen place-content-center">
      <div>
        <h2 className="text-center">
          Already have an Account?{' '}
          <Link href="/">
            <span className=" cursor-pointer underline hover:text-blue-400">
              Login
            </span>
          </Link>
        </h2>

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

          <Input
            type="password"
            placeholder="Confirm password..."
            {...register('confirmPassword', {
              required: true,
              validate: (value) => value === getValues('password'),
            })}
          />
          {errors.confirmPassword && (
            <span className=" text-red-600">
              {passwordErrorMessageForType(errors.confirmPassword.type)}
            </span>
          )}

          <Button disabled={loading} type="submit" className="bg-orange-500">
            Sign Up
          </Button>
        </form>
      </div>
      <p className="mt-4 text-center">or</p>
      <Button
        disabled={loading}
        onClick={() => login('twitter')}
        className="mt-4 w-full rounded-lg border-blue-300 bg-blue-400 p-2 pl-5 pr-5 text-lg text-gray-100 focus:border-4"
      >
        <span>Login With twitter</span>
      </Button>
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
    case 'validate':
      return 'Passwords do not match'
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

export default Signup

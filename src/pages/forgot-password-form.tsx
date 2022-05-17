import { ArrowLeftIcon } from '@heroicons/react/outline'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useUser } from '~/lib/UserProvider'
import Input from '~/components/Input'
import Button from '~/components/Button'
import * as React from 'react'
type ForgotPasswordInput = {
  email: string
}

const ForgotPassword: NextPage = () => {
  const [showForm, setShowForm] = React.useState(true)
  const [submitted, setSubmitted] = React.useState(false)
  const { forgotPassword, error, loading } = useUser()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>()

  React.useEffect(() => {
    if (!error && loading) setShowForm(false)
  }, [submitted, error, loading])

  const onSubmit: SubmitHandler<ForgotPasswordInput> = async (data) => {
    await forgotPassword(data.email)
    setSubmitted(true)
  }

  const returnToLogin = () => {
    router.push('/')
  }

  const resetPasswordFormView = (
    <div className="m-28 ml-auto mr-auto flex flex-col items-center justify-center">
      <h1 className="mb-11 w-max text-3xl font-bold lg:text-4xl">
        Forgot Password?
      </h1>
      <p className="text-center text-sm sm:text-xl lg:text-2xl">
        Please enter your registered email address.
      </p>
      <p className="mb-11 text-center text-sm sm:text-xl lg:text-2xl">
        We’ll send instructions to help reset your password.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-6 flex flex-col content-center items-center sm:w-9/12 lg:w-full"
      >
        {error && (
          <span className="round rounded bg-red-500 p-2 text-sm text-white">
            {error.message}
          </span>
        )}
        <div className="mb-3 w-full">
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            className="email mt-2 h-14 w-full rounded-xl border-gray-300"
            {...register('email', { required: true })}
          />
          {errors.email && (
            <span>{emailErrorMessageForType(errors.email.type)}</span>
          )}
        </div>
        <div className="flex w-full flex-col items-end">
          <Button
            disabled={loading}
            type="submit"
            className="bg-primary hover:bg-secondary mt-5 h-14 w-full cursor-pointer rounded-xl p-2 text-xl text-gray-50 transition duration-500 ease-in-out lg:text-2xl"
          >
            Send Reset Instructions
          </Button>
        </div>
      </form>
    </div>
  )

  const emailSentView = (
    <div className="m-28 ml-auto mr-auto flex flex-col items-center justify-center">
      <h1 className="mb-11 w-max text-3xl font-bold lg:text-4xl">
        Successfully Sent!
      </h1>
      <p className="text-center text-sm sm:text-xl lg:text-2xl">
        Please check your email for instructions on resetting your password.
      </p>
    </div>
  )

  return (
    <>
      <div className="m-7 flex h-screen flex-col">
        <div
          onClick={returnToLogin}
          className="ml-8 mt-24 flex cursor-pointer justify-items-center md:ml-20 lg:ml-44"
        >
          <ArrowLeftIcon className="h-8 w-8 " />
          <span className="ml-8 text-lg font-semibold md:ml-16 ">
            Back to Login
          </span>
        </div>
        {showForm ? resetPasswordFormView : emailSentView}
      </div>
    </>
  )
}

export default ForgotPassword

export const emailErrorMessageForType = (type: string) => {
  switch (type) {
    case 'required':
      return 'Email is required'
    default:
      return 'Error Sending Email'
  }
}

import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import Button from '~/components/Button'
import Input from '~/components/Input'
import { useUser } from '~/lib/UserProvider'

type ResetPasswordInputs = {
  newPassword: string
  confirmNewPassword: string
}

const ResetPasswordForm: NextPage = () => {
  const router = useRouter()

  const { resetPassword } = useUser()

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>()

  const onSubmit: SubmitHandler<ResetPasswordInputs> = async (data) => {
    resetPassword(data.newPassword)
    router.push('/')
  }

  return (
    <div className="m-7 flex h-screen flex-col">
      <div className="m-28 ml-auto mr-auto flex w-11/12 flex-col items-center justify-center md:w-1/2 lg:w-1/3">
        <h1 className="mb-11 w-max text-3xl font-bold lg:text-4xl">
          Reset Password
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-6 flex w-full flex-col content-center items-center"
        >
          <div className="mb-3 w-full">
            <label htmlFor="password">New Password</label>
            <Input
              type="password"
              {...register('newPassword', {
                required: true,
                minLength: 4,
                maxLength: 24,
                validate: (value) => value === getValues('confirmNewPassword'),
              })}
            />
            {errors.newPassword && (
              <span className=" text-red-600">
                {passwordErrorMessageForType(errors.newPassword.type)}
              </span>
            )}
          </div>
          <div className="mb-3 w-full">
            <label htmlFor="password">Confirm New Password</label>
            <Input
              type="password"
              {...register('confirmNewPassword', {
                required: true,
                validate: (value) => value === getValues('newPassword'),
              })}
            />
            {errors.confirmNewPassword && (
              <span className=" text-red-600">
                {passwordErrorMessageForType(errors.confirmNewPassword.type)}
              </span>
            )}
          </div>

          <Button type="submit">Update Password</Button>
        </form>
      </div>
    </div>
  )
}

export default ResetPasswordForm

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

import { UserIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { supabase } from '~/lib/supabase'
import { useUser } from '~/lib/UserProvider'
import Button from './Button'
import Input from './Input'

export default function Profile() {
  const { user, logout, updateProfile } = useUser()
  const [error, setError] = React.useState<any>(null)
  const [uploading, setUploading] = React.useState<boolean>(false)
  const [avatarUrl, setAvatarUrl] = React.useState<string | null | undefined>(
    user?.avatar_url
  )

  type ProfileInputs = {
    username: string
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInputs>()

  async function downloadImage(path: string) {
    try {
      const { publicURL, error } = await supabase.storage
        .from('avatars')
        .getPublicUrl(path)
      if (error) {
        throw error
      }
      return publicURL
    } catch (error) {
      setError(error)
    }
  }

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const url = await downloadImage(filePath)
      setAvatarUrl(url)
      await updateProfile({
        avatar_url: url as string,
        updated_at: new Date().toString(),
      })
    } catch (error) {
      setError(error)
    } finally {
      setUploading(false)
    }
  }

  const onSubmit: SubmitHandler<ProfileInputs> = async (data) => {
    const user = supabase.auth.user()
    const updates = {
      id: user?.id,
      username: data.username,
      updated_at: new Date().toString(),
    }
    updateProfile(updates)
  }

  return (
    <div className="container mx-auto grid min-h-screen place-content-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* //#region  //*=========== guide =========== */}
        <div className=" flex items-center justify-evenly">
          {!avatarUrl && <UserIcon className="h-24 rounded bg-gray-200" />}
          {user?.avatar_url && (
            <Image
              width={150}
              height={150}
              src={avatarUrl as string}
              alt="avatar"
            />
          )}

          <label
            className="mt-4 w-fit cursor-pointer rounded-lg border-gray-300 bg-blue-500 p-2 pl-5 pr-5 text-lg text-gray-100 focus:border-4"
            htmlFor="single"
          >
            {uploading ? 'Uploading ...' : 'Edit Avatar'}
          </label>
          <input
            className="absolute hidden"
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </div>

        {/* //#endregion  //*======== guide =========== */}
        <p>
          Oh hi there{' '}
          <span className="font-bold">{user?.username || user?.email}</span>
        </p>
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

import { ArrowLeftIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import * as React from 'react'

export default function emailVerificationPage() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()
  return (
    <main>
      <section className="layout">
        <div className="m-7 flex h-screen flex-col">
          <div
            onClick={() => router.push('/')}
            className="ml-8 mt-24 flex cursor-pointer justify-items-center md:ml-20 lg:ml-44"
          >
            <ArrowLeftIcon className="h-8 w-8 " />
            <span className="ml-8 text-lg font-semibold md:ml-16 ">
              Back to Login
            </span>
          </div>
          <h1 className=" mb-11 w-max text-center text-3xl font-bold lg:text-4xl">
            Please check your email to verify your signup
          </h1>
        </div>
      </section>
    </main>
  )
}

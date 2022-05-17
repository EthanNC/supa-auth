import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import * as React from 'react'
import Login from '~/components/Login'
import Profile from '~/components/Profile'
import { useUser } from '~/lib/UserProvider'

// import Layout from '@/components/layout/Layout';
// import Seo from '@/components/Seo';

export default function IndexPage() {
  const { user, loading } = useUser()
  return (
    <div>
      <main>
        <section className="">
          {!loading && (
            <div className="layout min-h-screen py-20">
              {!user ? <Login /> : <Profile />}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

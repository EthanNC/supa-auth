import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import * as React from 'react'
import Login from '~/components/Login'
import Profile from '~/components/Profile'
import { supabase } from '~/lib/supabase'
import { useUser } from '~/lib/UserProvider'

// import Layout from '@/components/layout/Layout';
// import Seo from '@/components/Seo';

export default function IndexPage() {
  const { user } = useUser()
  console.log(user)
  return (
    <div>
      {/* <Seo templateTitle='Index' /> */}

      <main>
        <section className="">
          <div className="layout min-h-screen py-20">
            {!user ? <Login /> : <Profile />}
          </div>
        </section>
      </main>
    </div>
  )
}

// export const getStaticProps = async () => {
//   const { data } = await supabase.from('post').select('*')

//   return {
//     props: {
//       posts: data,
//     },
//   }
// }

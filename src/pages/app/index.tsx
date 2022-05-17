import { GetStaticPropsContext } from 'next'
import * as React from 'react'
import { supabase } from '~/lib/supabase'

export default function IndexPage() {
  return (
    <main>
      <section className="">
        <div className="layout min-h-screen py-20"> Test</div>
      </section>
    </main>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {},
  }
}

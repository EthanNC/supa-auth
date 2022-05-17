import { NextPage } from 'next'
import { GetServerSidePropsContext } from 'next'
import { supabase } from '~/lib/supabase'

const Hidden: NextPage = (props) => {
  return <h1>Do not tell anybody about this page,</h1>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  //this check is not necessary because of middleware
  const { user } = await supabase.auth.api.getUserByCookie(context.req)
  if (!user) {
    return {
      redirect: {
        permant: false,
        destination: '/',
      },
    }
  }
  return {
    props: {},
  }
}

export default Hidden

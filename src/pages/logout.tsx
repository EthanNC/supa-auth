import * as React from 'react'
import { useUser } from '~/lib/UserProvider'

export default function LogoutPage() {
  const { logout } = useUser()
  //   @ts-ignore
  React.useEffect(logout, [])
  return <div>Logging Out</div>
}

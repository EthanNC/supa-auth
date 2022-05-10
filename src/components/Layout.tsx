import clsx from 'clsx'
import * as React from 'react'

type LayoutProps = {
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<'div'>

export default function Layout({ className, ...rest }: LayoutProps) {
  return <div className={clsx('', className)} {...rest}></div>
}

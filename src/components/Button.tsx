import clsx from 'clsx'
import * as React from 'react'

type ButtonProps = {
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<'button'>

// eslint-disable-next-line react/display-name
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'mt-4 w-full rounded-lg border-gray-300 bg-blue-500 p-2 pl-5 pr-5 text-lg text-gray-100 focus:border-4',
          className
        )}
        {...rest}
      >
        {children}
      </button>
    )
  }
)

export default Button

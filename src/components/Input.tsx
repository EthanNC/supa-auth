import clsx from 'clsx'
import * as React from 'react'

type InputProps = {} & React.ComponentPropsWithoutRef<'input'>

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          'my-4 w-full rounded-xl border-2 border-gray-300 p-4',
          className
        )}
        {...rest}
      />
    )
  }
)

export default Input

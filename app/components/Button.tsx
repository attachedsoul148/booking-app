'use client'

import React, { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  outlined?: boolean
  orange?: boolean
  text: string
  icon?: React.ReactElement
  onClick: () => void
  low?: boolean
  md?: boolean
}

const Button = ({ outlined, orange, text, icon, onClick, low, md, ...btn }: Props) => {
  return (
    <button
      {...btn}
      className={`${orange && 'orangeBtn'} ${outlined && 'outlinedBtn'} ${low && 'py-1 text-sm'} ${
        md && 'py-2 text-sm'
      }`}
      onClick={onClick}>
      {icon}
      <p>{text}</p>
    </button>
  )
}

export default Button

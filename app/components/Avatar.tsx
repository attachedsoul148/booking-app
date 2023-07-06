import Image from 'next/image'
import React from 'react'

type Props = {
  image: string | null | undefined
}

const Avatar = ({ image }: Props) => {
  return (
    <Image
      src={image ? image : '/placeholder.jpg'}
      width={30}
      height={30}
      alt="avatar"
      className="rounded-full cursor-pointer hidden lg:inline-block"
    />
  )
}

export default Avatar

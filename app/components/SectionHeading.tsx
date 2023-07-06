import React from 'react'

type Props = {
  title: string
  desc: string
}

const SectionHeading = ({ title, desc }: Props) => {
  return (
    <div className="flex flex-col space-y-2 px-3 sm:px-10 pt-5">
      <h1 className="font-bold text-2xl">{title}</h1>
      <h1 className="text-neutral-500">{desc}</h1>
    </div>
  )
}

export default SectionHeading

import React from 'react'

type Props = {
  main: string
  secondary: string
}

const Heading = ({ main, secondary }: Props) => {
  return (
    <div className="p-5">
      <h3 className="font-bold text-xl">{main}</h3>
      <p className="text-neutral-400 text-sm">{secondary}</p>
    </div>
  )
}

export default Heading

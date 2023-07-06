'use client'

import React from 'react'
import { PuffLoader } from 'react-spinners'

type Props = {}

const loading = (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center h-[60vh]">
      <PuffLoader size={100} color="#fd5c61" />
    </div>
  )
}

export default loading

'use client'

import React from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import { BiImageAdd } from '@react-icons/all-files/bi/BiImageAdd'
import Image from 'next/image'

type Props = {
  onChange: (value: string) => void
  value: string
}

const UploadImageInput = ({ onChange, value }: Props) => {
  return (
    <CldUploadWidget
      onUpload={(result: any) => onChange(result.info.secure_url)}
      uploadPreset="iuittwyj"
      options={{
        maxFiles: 1,
      }}>
      {({ open }) => {
        return (
          <div
            onClick={(e) => {
              open?.()
            }}
            className="relative min-h-[400px] border-dashed border-2 border-neutral-400 
            opacity-70 cursor-pointer group hover:opacity-100 flex-col transition-all duration-200 flex 
            items-center justify-center gap-2">
            <BiImageAdd size={52} className="text-neutral-500" />
            <h3 className="font-bold text-neutral-500 text-lg">Click to upload</h3>
            {value && (
              <div className="absolute inset-0 h-full w-full z-10">
                <Image src={value} fill alt="rentImage" className="object-cover p-2" />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}

export default UploadImageInput

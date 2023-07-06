'use client'

import React, { InputHTMLAttributes } from 'react'
import { UseFormRegister, FieldErrors, UseFormSetFocus } from 'react-hook-form/dist/types'
import { BiDollar } from '@react-icons/all-files/bi/BiDollar'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
  register: UseFormRegister<any>
  fieldName: string
  errors: FieldErrors<any>
  required: boolean
  setFocus: UseFormSetFocus<any>
  forCurrency?: boolean
}

const Input = ({
  placeholder,
  register,
  fieldName,
  errors,
  required,
  setFocus,
  forCurrency,
  ...input
}: Props) => {
  return (
    <div
      onClick={() => setFocus(fieldName)}
      className={`relative pt-7 pb-4 px-4 border rounded-md cursor-text ${
        errors[fieldName] ? 'border-rose-500' : 'border-neutral-400'
      }`}>
      <input
        {...input}
        {...register(fieldName, { required })}
        className={`peer w-full placeholder:text-neutral-400 outline-none text-md
      transition-all duration-200 ${forCurrency && 'pl-7'}`}
        placeholder={' '}
      />
      <p
        className={`absolute transform text-neutral-400 -translate-y-3 top-5 font-medium peer-focus:-translate-y-4
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75 ${forCurrency && 'left-11'}
        transition-all duration-200 origin-[0] ${
          errors[fieldName] ? 'text-rose-500' : 'text-zinc-400'
        }`}>
        {placeholder}
      </p>

      {forCurrency && (
        <BiDollar
          size={26}
          className={`absolute top-4 left-1 ${
            errors[fieldName] ? 'text-rose-500' : 'text-neutral-400'
          }`}
        />
      )}
    </div>
  )
}

export default Input

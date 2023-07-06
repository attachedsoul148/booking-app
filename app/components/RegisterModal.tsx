'use client'

import React, { useState } from 'react'
import Modal from './Modal'
import { useLoginModal, useRegisterModal } from '../zustand/useModals'
import Button from './Button'
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle'
import { AiFillGithub } from '@react-icons/all-files/ai/AiFillGithub'
import Input from './Input'
import { useForm } from 'react-hook-form'
import { UseFormRegister, FieldErrors, UseFormSetFocus } from 'react-hook-form/dist/types'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import Heading from './Heading'

type Props = {}
export interface RegisterFormValues {
  name: string
  email: string
  password: string
}

interface BodyProps {
  onSubmit: () => void
  register: UseFormRegister<any>
  errors: FieldErrors<any>
  setFocus: UseFormSetFocus<any>
}

const Body: React.FC<BodyProps> = ({ onSubmit, register, errors, setFocus }) => {
  return (
    <form autoComplete="false" className="flex flex-col" onSubmit={onSubmit}>
      <Heading main="Welcome to Airbnb" secondary="Create an account" />

      <div className="px-5 flex flex-col space-y-3">
        <Input
          placeholder={'Name'}
          type="text"
          autoComplete="false"
          register={register}
          fieldName="name"
          errors={errors}
          required={false}
          setFocus={setFocus}
        />
        <Input
          placeholder={'Email'}
          type="text"
          autoComplete="false"
          register={register}
          fieldName="email"
          errors={errors}
          required
          setFocus={setFocus}
        />
        <Input
          placeholder={'Password'}
          type="password"
          autoComplete="new-password"
          register={register}
          fieldName="password"
          errors={errors}
          required
          setFocus={setFocus}
        />
      </div>
    </form>
  )
}

const RegisterModal = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    reset,
  } = useForm<RegisterFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    setIsLoading(true)
    const toastId = toast.loading('Loading...')

    try {
      await axios.post('/api/register', values)
      toast.success('Successfully signed up!', {
        id: toastId,
      })
    } catch (error: any) {
      toast.error('Seems like this account already exist or credentials are incorrect.', {
        id: toastId,
      })
    } finally {
      setIsLoading(false)
      reset()
      loginModal.onOpen()
    }
  })

  const Footer = () => {
    return (
      <div className="flex flex-col pb-2 space-y-3">
        <div className="flex flex-col space-y-2 pb-2 pt-5 px-5">
          <Button
            outlined
            onClick={() => {
              reset()
              signIn('google')
            }}
            text="Continue with Google"
            icon={<FcGoogle className="w-6 h-6 self-start absolute left-5" />}
          />
          <Button
            outlined
            onClick={() => {
              reset()
              signIn('github')
            }}
            text="Continue with Github"
            icon={<AiFillGithub className="w-6 h-6 self-start absolute left-5" />}
          />
        </div>

        <hr />

        <p className="w-full text-center py-3 text-neutral-400 text-sm">
          Already have an account?{' '}
          <span
            className="hover:underline cursor-pointer"
            onClick={() => {
              loginModal.onOpen()
              reset()
              registerModal.onClose()
            }}>
            Log in
          </span>
        </p>
      </div>
    )
  }

  return (
    <Modal
      disabled={isLoading}
      title="Register"
      mainButtonText="Continue"
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={<Body register={register} onSubmit={onSubmit} setFocus={setFocus} errors={errors} />}
      footer={<Footer />}
      needAnimation
    />
  )
}

export default RegisterModal

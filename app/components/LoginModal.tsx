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
import { signIn } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { SavedUser } from '@/typed'
import Heading from './Heading'

type Props = {}
export interface LoginFormValues {
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
    <form autoComplete="false" className="flex flex-col " onSubmit={onSubmit}>
      <Heading main="Welcome to Airbnb" secondary="Login into your accountt" />

      <div className="px-5 flex flex-col space-y-3">
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

const LoginModal = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const loginModal = useLoginModal()
  const router = useRouter()
  const registerModal = useRegisterModal()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    reset,
  } = useForm<LoginFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    setIsLoading(true)
    const toastId = toast.loading('Loading...')

    const res = await signIn('credentials', {
      ...values,
      redirect: false,
    })

    if (res?.ok && !res?.error) {
      toast.success('Successfully logged in!', {
        id: toastId,
      })
      router.refresh()
    }

    if (res?.error) {
      if (res?.error !== 'OAuthAccountNotLinked') {
        toast.error('Invalid credentials or service(try Google or Github or check credentials)', {
          id: toastId,
        })
        router.refresh()
      } else {
        toast.success('Successfully logged in!')
        router.refresh()
      }
    }

    reset()
    setIsLoading(false)
  })

  const Footer = () => {
    return (
      <div className="flex flex-col space-y-3 pb-2">
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
          Do not have an account?{' '}
          <span
            className="hover:underline cursor-pointer"
            onClick={() => {
              loginModal.onClose()
              reset()
              registerModal.onOpen()
            }}>
            Sign up
          </span>
        </p>
      </div>
    )
  }

  return (
    <Modal
      disabled={isLoading}
      title="Login"
      mainButtonText="Login"
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={<Body register={register} onSubmit={onSubmit} setFocus={setFocus} errors={errors} />}
      footer={<Footer />}
      needAnimation
    />
  )
}

export default LoginModal

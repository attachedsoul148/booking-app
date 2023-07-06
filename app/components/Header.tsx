'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { AiOutlineMenu } from '@react-icons/all-files/ai/AiOutlineMenu'
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch'
import { useLoginModal, useRegisterModal, useRentModal, useSearchModal } from '../zustand/useModals'
import { signOut } from 'next-auth/react'
import { SavedUser } from '@/typed'
import Categories from './Categories'
import Avatar from './Avatar'

type Props = {
  currentUser: SavedUser | null | undefined
}
type ModalOptionProps = {
  title: string
  onClick: () => void
  lowest?: boolean
  highest?: boolean
}

const ModalOption: React.FC<ModalOptionProps> = ({ title, onClick, lowest, highest }) => {
  return (
    <div
      className={`min-w-[200px] p-4 bg-white hover:bg-gray-100 cursor-pointer transition-colors ${
        lowest && 'rounded-b-xl'
      } ${highest && 'rounded-t-xl'}`}
      onClick={onClick}>
      <p className="text-sm font-bold">{title}</p>
    </div>
  )
}

const Header = ({ currentUser }: Props) => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()
  const searchModal = useSearchModal()

  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  return (
    <header className="flex flex-col">
      <div className="border-b shadow-sm flex items-center justify-between py-5 lg:px-10 px-5 space-x-10 relative">
        <div>
          <Image
            src="/logo.png"
            width={100}
            height={31.25}
            alt="logo"
            className="cursor-pointer"
            onClick={() => router.push('/')}
          />
        </div>

        <div
          className="sm:border flex px-4 py-2 rounded-full items-center space-x-4 flex-1 lg:flex-none cursor-pointer"
          onClick={() => searchModal.onOpen()}>
          <p className="font-bold flex-1 lg:flex-none hidden sm:inline">Anywhere</p>

          <div className="border-x px-4 hidden lg:block">
            <p className="font-bold">Any Week</p>
          </div>

          <div className="flex space-x-2 items-center">
            <p className="font-bold hidden lg:inline text-gray-500">Add Guests</p>
            <AiOutlineSearch className="w-9 h-9 cursor-pointer bg-[#fd5c61] text-white rounded-full p-2 hidden sm:inline" />
          </div>
        </div>

        <div className="flex items-center space-x-10">
          <p
            className="font-bold cursor-pointer hidden lg:inline py-2 px-4 hover:bg-neutral-100 rounded-full 
          transition-all duration-150"
            onClick={() => {
              if (!currentUser) {
                loginModal.onOpen()
              } else {
                rentModal.onOpen()
              }
            }}>
            Airbnb your home
          </p>

          <div
            className="p-2 lg:border flex cursor-pointer items-center rounded-full sm:space-x-2 space-x-4 hover:shadow-sm transition-all duration-150"
            onClick={() => setIsOpen((prev) => !prev)}>
            <AiOutlineMenu className="w-5 h-5 " />
            <AiOutlineSearch className="w-9 h-9 bg-[#fd5c61] text-white rounded-full p-2 inline sm:hidden" />

            <Avatar image={currentUser?.image} />
          </div>
        </div>

        {isOpen && (
          <div
            className="absolute rounded-xl border bg-white lg:right-10 right-5 top-20 shadow-md 
      flex flex-col z-[100]">
            {currentUser ? (
              <>
                <ModalOption
                  title={currentUser.name!}
                  highest
                  onClick={() => {
                    setIsOpen(false)
                  }}
                />
                <hr />
                <ModalOption
                  title="My trips"
                  onClick={() => {
                    setIsOpen(false)
                    router.push('/trips')
                  }}
                />
                <ModalOption
                  title="My favorites"
                  onClick={() => {
                    setIsOpen(false)
                    router.push('/favorites')
                  }}
                />
                <ModalOption
                  title="My reservations"
                  onClick={() => {
                    setIsOpen(false)
                    router.push('/reservations')
                  }}
                />
                <ModalOption
                  title="My listings"
                  onClick={() => {
                    setIsOpen(false)
                    router.push('/mylistings')
                  }}
                />
                <ModalOption
                  title="Airbnb my home"
                  onClick={() => {
                    setIsOpen(false)
                    rentModal.onOpen()
                  }}
                />
                <hr />
                <ModalOption
                  title="Logout"
                  lowest
                  onClick={() => {
                    setIsOpen(false)
                    signOut()
                    router.refresh()
                  }}
                />
              </>
            ) : (
              <>
                <ModalOption
                  title="Login"
                  highest
                  onClick={() => {
                    setIsOpen(false)
                    loginModal.onOpen()
                  }}
                />
                <ModalOption
                  title="Sign up"
                  lowest
                  onClick={() => {
                    setIsOpen(false)
                    registerModal.onOpen()
                  }}
                />
              </>
            )}
          </div>
        )}
      </div>

      <Categories />
    </header>
  )
}

export default Header

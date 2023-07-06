'use client'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { Toaster } from 'react-hot-toast'

type Props = {
  children: React.ReactNode
  session?: Session
}

const Providers = ({ session, children }: Props) => {
  return (
    // <SessionProvider session={session}>
    <>
      <Toaster />
      {children}
    </>
    // </SessionProvider>
  )
}

export default Providers

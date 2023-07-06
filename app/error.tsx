'use client'

import React, { useEffect } from 'react'
import EmptyState from './components/EmptyState'

type Props = {}

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return <EmptyState headText="Oops..." secondaryText="Something went wrong!" />
}

export default error

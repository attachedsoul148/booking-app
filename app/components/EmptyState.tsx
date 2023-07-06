'use client'

import React from 'react'
import Button from './Button'

type Props = {
  headText: string
  secondaryText: string
  action?: () => void
  actionLabel?: string
}

const EmptyState = ({ headText, secondaryText, action, actionLabel }: Props) => {
  return (
    <div className="h-[50vh] flex flex-col justify-center items-center space-y-3">
      <h3 className="text-2xl text-neutral-800 font-bold">{headText}</h3>
      <p className="text-neutral-400">{secondaryText}</p>

      {action && actionLabel && (
        <div>
          <Button onClick={() => action()} text={actionLabel} outlined />
        </div>
      )}
    </div>
  )
}

export default EmptyState

'use client'

import React, { useEffect } from 'react'
import Button from './Button'
import { ImCross } from '@react-icons/all-files/im/ImCross'
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion'

type Props = {
  title: string
  secondAction?: string | null
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  secondActionSubmit?: () => void
  body: React.ReactElement
  footer?: React.ReactElement
  disabled: boolean
  mainButtonText: string
  needAnimation: boolean
}

const Modal = ({
  title,
  secondAction,
  body,
  footer,
  onClose,
  onSubmit,
  secondActionSubmit,
  isOpen,
  disabled,
  mainButtonText,
  needAnimation,
}: Props) => {
  const controls = useAnimationControls()

  const handleClose = () => {
    controls.start({
      opacity: 0,
      x: 300,
      transition: {
        duration: 0.4,
      },
    })

    setTimeout(() => {
      onClose()
    }, 400)
  }

  useEffect(() => {
    if (isOpen) {
      controls.start({
        opacity: 100,
        x: 0,
        transition: {
          duration: 0.4,
        },
      })
    }
  }, [isOpen])

  const onAnimatedOnSubmit = async () => {
    await onSubmit()
    handleClose()
  }
  return (
    <>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <div className="fixed top-0 right-0 left-0 bottom-0 bg-neutral-800/70 z-50 flex items-center justify-center">
            <motion.div
              initial={{
                opacity: 0,
                x: -300,
              }}
              animate={controls}
              className="flex flex-col w-full sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 h-full sm:h-auto bg-white border rounded-md relative"
              onClick={(e) => e.stopPropagation()}>
              <div className="p-5 flex items-center">
                <ImCross
                  className="w-4 h-4 cursor-pointer absolute top-6 left-5"
                  onClick={handleClose}
                />

                <p className="font-bold text-center flex-1">{title}</p>
              </div>

              <hr />

              {body}

              <div className="p-5 flex space-x-4">
                {secondActionSubmit && secondAction && (
                  <Button
                    type="button"
                    text={secondAction}
                    outlined
                    onClick={secondActionSubmit}
                    disabled={disabled}
                  />
                )}
                <Button
                  text={mainButtonText}
                  orange
                  onClick={needAnimation ? onAnimatedOnSubmit : onSubmit}
                  disabled={disabled}
                />
              </div>

              {footer && <hr />}

              {footer}
            </motion.div>
          </div>
        ) : (
          <></>
        )}
      </AnimatePresence>
    </>
  )
}

export default Modal

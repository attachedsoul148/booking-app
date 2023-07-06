'use client'

import React, { useMemo, useState } from 'react'
import { useSearchModal } from '../zustand/useModals'
import Modal from './Modal'
import Heading from './Heading'
import Counter from './Counter'
import { Range } from 'react-date-range'
import dynamic from 'next/dynamic'
import SelectCountryInput from './SelectCountryInput'
import { CountryType } from '@/typed'
import Calendar from './Calendar'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { formatISO } from 'date-fns'

type Props = {}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
}

enum Steps {
  COUNTS = 0,
  LOCATION = 1,
  PERIOD = 2,
}

let Body = () => {
  return <></>
}

const SearchModal = (props: Props) => {
  const params = useSearchParams()
  const searchModal = useSearchModal()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(Steps.COUNTS)
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [location, setLocation] = useState<CountryType | null>()
  const [range, setRange] = useState<Range>(initialDateRange)

  const onGoForward = () => {
    setStep((prev) => prev + 1)
  }
  const onGoBack = () => {
    setStep((prev) => prev - 1)
  }

  const onSubmit = async () => {
    if (step !== Steps.PERIOD) {
      onGoForward()
    } else {
      if (step === Steps.PERIOD) {
        const parsed = qs.parse(params.toString())

        const newQuery = {
          ...parsed,
          guestCount: String(guestCount),
          roomCount: String(roomCount),
          bathroomCount: String(bathroomCount),
          location: location?.label!,
          startDate: formatISO(range.startDate!),
          endDate: formatISO(range.endDate!),
        }

        const url = qs.stringifyUrl(
          {
            url: '/',
            query: newQuery,
          },
          { skipNull: true },
        )

        router.push(url)
        setStep(Steps.COUNTS)
        setGuestCount(1)
        setRoomCount(1)
        setBathroomCount(1)
        setLocation(null)
        setRange(initialDateRange)
      }
    }
  }

  const decrementGuestCount = () => {
    if (guestCount > 1) {
      setGuestCount((prev) => prev - 1)
    } else {
      return
    }
  }

  const incrementGuestCount = () => {
    setGuestCount((prev) => prev + 1)
  }

  const decrementRoomCount = () => {
    if (roomCount > 1) {
      setRoomCount((prev) => prev - 1)
    } else {
      return
    }
  }

  const incrementRoomCount = () => {
    setRoomCount((prev) => prev + 1)
  }

  const decrementBathroomCount = () => {
    if (bathroomCount > 1) {
      setBathroomCount((prev) => prev - 1)
    } else {
      return
    }
  }

  const incrementBathroomCount = () => {
    setBathroomCount((prev) => prev + 1)
  }

  if (step === Steps.COUNTS) {
    Body = () => {
      return (
        <div>
          <Heading main="Place parameters" secondary="What your place needs to allow?" />

          <Counter
            roomCount={roomCount}
            incrementGuestCount={incrementGuestCount}
            bathroomCount={bathroomCount}
            decrementGuestCount={decrementGuestCount}
            decrementRoomCount={decrementRoomCount}
            incrementRoomCount={incrementRoomCount}
            guestCount={guestCount}
            decrementBathroomCount={decrementBathroomCount}
            incrementBathroomCount={incrementBathroomCount}
          />
        </div>
      )
    }
  }

  const Map = useMemo(
    () =>
      dynamic(() => import('../components/Map'), {
        ssr: false,
      }),
    [location],
  )

  if (step === Steps.LOCATION) {
    Body = () => {
      return (
        <div>
          <Heading main="Location" secondary="Where is your place?" />

          <SelectCountryInput value={location || null} onChange={(value) => setLocation(value)} />

          <div className="p-5">
            <Map center={location?.latlng} />
          </div>
        </div>
      )
    }
  }

  if (step === Steps.PERIOD) {
    Body = () => {
      return (
        <div>
          <Heading main="Vacation period" secondary="When do you want to chill?" />

          <div className="flex px-5 -mt-5">
            <Calendar onChange={(value) => setRange(value.selection)} value={range} />
          </div>
        </div>
      )
    }
  }
  return (
    <Modal
      disabled={isLoading}
      title="Filter"
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      body={<Body />}
      needAnimation={step === Steps.PERIOD}
      mainButtonText={step !== Steps.PERIOD ? 'Next' : 'Search'}
      secondAction={step !== Steps.COUNTS ? 'Back' : null}
      secondActionSubmit={onGoBack}
    />
  )
}

export default SearchModal

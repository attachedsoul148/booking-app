'use client'

import React, { useState, useMemo } from 'react'
import Modal from './Modal'
import { useRentModal } from '../zustand/useModals'
import { FieldErrors, UseFormRegister, UseFormSetFocus, useForm } from 'react-hook-form'
import Heading from './Heading'
import { categories } from './Categories'
import PickCategoryBox from './PickCategoryBox'
import SelectCountryInput from './SelectCountryInput'
import { CountryType } from '@/typed'
import dynamic from 'next/dynamic'
import UploadImageInput from './UploadImageInput'
import Input from './Input'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Counter from './Counter'

type NameType =
  | 'category'
  | 'location'
  | 'guestCount'
  | 'roomCount'
  | 'bathroomCount'
  | 'imageSrc'
  | 'price'
  | 'title'
  | 'description'

export interface RentFormValues {
  category: string
  location: CountryType | null
  guestCount: number
  roomCount: number
  bathroomCount: number
  imageSrc: string
  price: number
  title: string
  description: string
}

enum FormSteps {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

let Body = () => {
  return <></>
}

interface LastBodiesProps {
  register: UseFormRegister<RentFormValues>
  errors: FieldErrors<RentFormValues>
  setFocus: UseFormSetFocus<RentFormValues>
}

const DescBody: React.FC<LastBodiesProps> = ({ register, errors, setFocus }) => {
  return (
    <div>
      <Heading main="How could you describe your place?" secondary="Short and sweet works best!" />

      <div className="px-5 flex flex-col space-y-5">
        <Input
          placeholder={'Title'}
          type="text"
          autoComplete="false"
          register={register}
          fieldName="title"
          errors={errors}
          required
          setFocus={setFocus}
        />

        <hr />

        <Input
          placeholder={'Description'}
          type="text"
          autoComplete="false"
          register={register}
          fieldName="description"
          errors={errors}
          required
          setFocus={setFocus}
        />
      </div>
    </div>
  )
}

const PriceBody: React.FC<LastBodiesProps> = ({ register, errors, setFocus }) => {
  return (
    <div>
      <Heading main="Now, set your price" secondary="How much do you charge per night?" />

      <div className="px-5">
        <Input
          placeholder={'Price'}
          type="text"
          autoComplete="false"
          register={register}
          fieldName="price"
          errors={errors}
          required
          setFocus={setFocus}
          forCurrency
        />
      </div>
    </div>
  )
}

const RentModal = () => {
  const [stepNumber, setStepNumber] = useState(FormSteps.CATEGORY)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const rentModal = useRentModal()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<RentFormValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 0,
      title: '',
      description: '',
    },
  })

  const dirtySetValue = (name: NameType, value: any) => {
    setValue(name, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    })
  }

  const category = watch('category')
  const location = watch('location')
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount')
  const bathroomCount = watch('bathroomCount')
  const imageSrc = watch('imageSrc')
  const price = watch('price')

  if (stepNumber === FormSteps.CATEGORY) {
    Body = () => {
      return (
        <div>
          <Heading main="Which of these best describes your place?" secondary="Pick a category" />

          <div className="grid md:grid-cols-2 grid-cols-1 gap-3 px-5 max-h-[55vh] overflow-y-auto">
            {categories.map((cat) => (
              <PickCategoryBox
                key={cat.label}
                category={cat}
                onClick={(value: string) => {
                  dirtySetValue('category', value)
                }}
                selected={category === cat.label}
              />
            ))}
          </div>
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

  if (stepNumber === FormSteps.LOCATION) {
    Body = () => {
      return (
        <div>
          <Heading main="Where is your place located?" secondary="Help guests find you!" />

          <SelectCountryInput
            value={location}
            onChange={(newValue: CountryType) => {
              dirtySetValue('location', newValue)
            }}
          />

          <div className="p-5">
            <Map center={location?.latlng} />
          </div>
        </div>
      )
    }
  }

  const decrementGuestCount = () => {
    if (guestCount > 1) {
      dirtySetValue('guestCount', guestCount - 1)
    } else {
      return
    }
  }

  const incrementGuestCount = () => {
    dirtySetValue('guestCount', guestCount + 1)
  }

  const decrementRoomCount = () => {
    if (roomCount > 1) {
      dirtySetValue('roomCount', roomCount - 1)
    } else {
      return
    }
  }

  const incrementRoomCount = () => {
    dirtySetValue('roomCount', roomCount + 1)
  }

  const decrementBathroomCount = () => {
    if (bathroomCount > 1) {
      dirtySetValue('bathroomCount', bathroomCount - 1)
    } else {
      return
    }
  }

  const incrementBathroomCount = () => {
    dirtySetValue('bathroomCount', bathroomCount + 1)
  }

  if (stepNumber === FormSteps.INFO) {
    Body = () => {
      return (
        <div>
          <Heading
            main="Share some basics about your place"
            secondary="What amenities do you have?"
          />

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

  if (stepNumber === FormSteps.IMAGES) {
    Body = () => {
      return (
        <div>
          <Heading
            main="Add a photo of your place"
            secondary="Show guests what your place looks like!"
          />

          <div className="p-5 pt-0">
            <UploadImageInput
              value={imageSrc}
              onChange={(value: string) => {
                dirtySetValue('imageSrc', value)
              }}
            />
          </div>
        </div>
      )
    }
  }

  const onGoForward = () => {
    setStepNumber(stepNumber + 1)
  }
  const onGoBack = () => {
    setStepNumber(stepNumber - 1)
  }
  const onSubmit = async (values: RentFormValues) => {
    if (stepNumber !== FormSteps.PRICE) {
      onGoForward()
    } else {
      if (
        !values.bathroomCount ||
        !values.category ||
        !values.description ||
        !values.guestCount ||
        !values.imageSrc ||
        !values.location ||
        !values.price ||
        !values.roomCount ||
        !values.title
      ) {
        toast('Fill all the fields', {
          icon: '⚠️',
        })
      } else {
        const toastId = toast.loading('Loading...')
        setIsLoading(true)
        try {
          await axios.post('/api/listing', values)

          toast.success('Listing is successfully created', {
            id: toastId,
          })
        } catch (error) {
          toast.error('Something went wrong', {
            id: toastId,
          })
        } finally {
          setIsLoading(false)
          router.refresh()
          setStepNumber(0)
          reset()
        }
      }
    }
  }

  return (
    <Modal
      title="Airbnb your home"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      secondActionSubmit={onGoBack}
      body={
        stepNumber === FormSteps.DESCRIPTION ? (
          <DescBody register={register} errors={errors} setFocus={setFocus} />
        ) : stepNumber === FormSteps.PRICE ? (
          <PriceBody register={register} errors={errors} setFocus={setFocus} />
        ) : (
          <Body />
        )
      }
      mainButtonText={stepNumber !== FormSteps.PRICE ? 'Next' : 'Finish'}
      secondAction={stepNumber !== FormSteps.CATEGORY ? 'Back' : null}
      disabled={isLoading}
      needAnimation={
        stepNumber === FormSteps.PRICE &&
        !!price &&
        !!category &&
        !!imageSrc &&
        !!location &&
        !!guestCount &&
        !!roomCount &&
        !!bathroomCount
      }
    />
  )
}

export default RentModal

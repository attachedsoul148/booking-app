'use client'

import { SavedListing, SavedReservation, SavedUser } from '@/typed'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import SectionHeading from './SectionHeading'
import { categories } from './Categories'
import { useCountries } from '../hooks/useCountries'
import Avatar from './Avatar'
import dynamic from 'next/dynamic'
import FavoriteIndecator from './FavoriteIndecator'
import Calendar from './Calendar'
import Button from './Button'
import { Range } from 'react-date-range'
import { differenceInDays, eachDayOfInterval } from 'date-fns'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

type Props = {
  listing: SavedListing & {
    user: SavedUser
    reservations: SavedReservation[]
  }
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
}

const ListingData = ({ listing }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [range, setRange] = useState<Range>(initialDateRange)
  const [disabledDates, setDisableDates] = useState<Date[]>([])
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const router = useRouter()
  const { getOne } = useCountries()

  const location = getOne(listing.locationValue)
  const category = categories.find((cat) => cat.label === listing.category)

  const Map = useMemo(
    () =>
      dynamic(() => import('../components/Map'), {
        ssr: false,
      }),
    [location],
  )

  const addReservation = async () => {
    if (range.startDate && range.endDate && totalPrice !== 0) {
      setIsLoading(true)
      const toastId = toast.loading('Loading...')

      try {
        await axios.post(`/api/reservation`, {
          startDate: range.startDate,
          endDate: range.endDate,
          totalPrice,
          userId: listing.userId,
          listingId: listing.id,
        })

        toast.success('Reserved', {
          id: toastId,
        })
        router.refresh()
      } catch (error) {
        toast.error('Something went wrong', {
          id: toastId,
        })
      } finally {
        setRange(initialDateRange)
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    if (range.startDate && range.endDate) {
      const daysCount = differenceInDays(range.endDate, range.startDate)

      setTotalPrice(daysCount * listing.price)
    }
  }, [range])

  useEffect(() => {
    listing.reservations.forEach((reservation) => {
      const dates = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      })

      setDisableDates((prev) => [...prev, ...dates])
    })
  }, [listing.reservations])

  return (
    <div className="pb-10 max-w-[7xl] flex mx-auto flex-col">
      <SectionHeading title={listing.title} desc={`${location?.region}, ${location?.label}`} />

      <div className="px-3 sm:px-10">
        <div className="md:w-full sm:w-[600px] w-[300px] md:h-[65vh] sm:h-[500px] h-[300px]  relative rounded-xl my-5 px-10">
          <Image src={listing.imageSrc} alt="listingPic" fill className="object-cover rounded-xl" />
          <FavoriteIndecator currentUser={listing.user} listingId={listing.id} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-10 px-3 sm:px-10">
        <div className="flex flex-col flex-1">
          <div className="flex items-center space-x-10 w-full">
            <div className="flex flex-col xl:flex-row xl:items-center xl:space-x-10 w-full">
              <div className="flex flex-col space-y-2 my-5">
                <div className="flex space-x-3 items-center">
                  <h3 className="text-neutral-800 font-bold truncate whitespace-nowrap">
                    Hosted by {listing.user.name}
                  </h3>

                  <Avatar image={listing.user.image} />
                </div>

                <div className="flex space-x-3">
                  <p className="text-neutral-400 text-sm truncate whitespace-nowrap">
                    {listing.guestCount} guests
                  </p>
                  <p className="text-neutral-400 text-sm truncate whitespace-nowrap">
                    {listing.roomCount} rooms
                  </p>
                  <p className="text-neutral-400 text-sm truncate whitespace-nowrap">
                    {listing.bathroomCount} bathrooms
                  </p>
                </div>
              </div>
              <hr />

              <div className="flex space-x-4 items-center my-8">
                {category && (
                  <>
                    <category.icon size={38} className="text-neutral-500" />

                    <div className="flex flex-col space-y-1">
                      <h3 className="font-bold text-neutral-800">{category.label}</h3>

                      <p className="text-neutral-400 text-sm">
                        This place is in the {category.label}!
                      </p>
                    </div>
                  </>
                )}
              </div>
              <hr />

              <div className="my-8">
                <p className="text-neutral-500">{listing.description}</p>
              </div>
              <hr />
            </div>
          </div>

          <div className="my-5">
            <Map center={location?.latlng} />
          </div>
        </div>

        <div className="text-xl flex flex-col border border-neutral-200 rounded-lg h-fit w-full md:w-fit justify-center">
          <h3 className="p-3 inline-flex items-center space-x-3 text-neutral-800 font-bold">
            $ {listing.price}
            <span className="text-neutral-400 text-sm font-normal ml-2">night</span>
          </h3>

          <hr />

          <div className="flex items-center justify-center">
            <Calendar
              onChange={(value) => setRange(value.selection)}
              value={range}
              disabledDates={disabledDates}
            />
          </div>

          <hr />

          <div className="px-3 pt-3">
            <Button orange text="Reserve" onClick={addReservation} md disabled={isLoading} />
            <div className="flex items-center py-3">
              <p className="font-bold text-sm text-neutral-800 flex-1">Total</p>

              <p className="font-bold text-sm text-neutral-800">$ {totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingData

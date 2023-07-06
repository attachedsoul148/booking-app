'use client'

import { SavedListing, SavedReservation, SavedUser } from '@/typed'
import React, { useState } from 'react'
import ListingBox from './ListingBox'
import { format } from 'date-fns'
import SectionHeading from './SectionHeading'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Reservation = SavedReservation & {
  listing: SavedListing
}
type Props = {
  reservations: Reservation[]
  currentUser: SavedUser | null
}

const ReservationsList = ({ reservations, currentUser }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const deleteReservation = async () => {
    setIsLoading(true)
    const toastId = toast.loading('Loading...')

    try {
      await axios.delete(`/api/reservation`)

      toast.success('Canceled', {
        id: toastId,
      })
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong', {
        id: toastId,
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="flex flex-col">
      <SectionHeading title="Reservations" desc="Bookings on your places" />

      <div
        className="p-10 gap-10 pt-5 place-items-center sm:place-items-start grid grid-cols-1 sm:grid-cols-2 
    md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map((reservation) => (
          <ListingBox
            key={reservation.id}
            listing={reservation.listing}
            currentUser={currentUser}
            period={`${format(new Date(reservation.startDate), 'LLL dd/yyyy')} - ${format(
              new Date(reservation.endDate),
              'LLL dd/yyyy',
            )}`}
            fullPrice={reservation.totalPrice}
            disabled={isLoading}
            action={deleteReservation}
            actionLabel="Cancel guest reservation"
          />
        ))}
      </div>
    </div>
  )
}

export default ReservationsList

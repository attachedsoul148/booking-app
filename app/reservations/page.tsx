import React from 'react'
import { getAuthorReservations } from '../libs/getAuthorReservations'
import { SavedUser } from '@/typed'
import { getCurrentUser } from '../libs/getCurrentUser'
import EmptyState from '../components/EmptyState'
import ReservationsList from '../components/ReservationsList'

type Props = {}

const Reservations = async (props: Props) => {
  const reservations = await getAuthorReservations()
  const currentUser: SavedUser | null = await getCurrentUser()

  if (reservations.length === 0) {
    return (
      <EmptyState
        headText="No reservations now"
        secondaryText="Wait till someone book your place"
      />
    )
  }
  return (
    <div>
      <ReservationsList reservations={reservations} currentUser={currentUser} />
    </div>
  )
}

export default Reservations

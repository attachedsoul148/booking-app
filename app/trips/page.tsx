import React from 'react'
import { getReservations } from '../libs/getReservations'
import TripsList from '../components/TripsList'
import { getCurrentUser } from '../libs/getCurrentUser'
import { SavedUser } from '@/typed'
import EmptyState from '../components/EmptyState'

type Props = {}

const Trips = async (props: Props) => {
  const reservations = await getReservations()
  const currentUser: SavedUser | null = await getCurrentUser()

  if (reservations.length === 0) {
    return (
      <EmptyState headText="No reservations now" secondaryText="Book something to see it here" />
    )
  }
  return (
    <div>
      <TripsList reservations={reservations} currentUser={currentUser} />
    </div>
  )
}

export default Trips

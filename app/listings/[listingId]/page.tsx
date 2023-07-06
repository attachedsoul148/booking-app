import EmptyState from '@/app/components/EmptyState'
import ListingData from '@/app/components/ListingData'
import { getListingById } from '@/app/libs/getListingById'
import { SavedListing, SavedReservation, SavedUser } from '@/typed'
import React from 'react'

type Props = {
  params: {
    listingId: string
  }
}

type ListingType = SavedListing & {
  user: SavedUser
  reservations: SavedReservation[]
}

const ListingDetails = async ({ params }: Props) => {
  const listing: ListingType | null = await getListingById(params.listingId)

  if (!listing) {
    return <EmptyState headText="Oops" secondaryText="Cannot find this listing details" />
  }
  return (
    <div className="flex flex-col">
      <ListingData listing={listing} />
    </div>
  )
}

export default ListingDetails

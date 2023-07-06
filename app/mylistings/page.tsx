import React from 'react'
import SectionHeading from '../components/SectionHeading'
import { getCurrentUser } from '../libs/getCurrentUser'
import { getListingsByUserId } from '../libs/getListingsByUserId'
import MyListingsList from '../components/MyListingsList'
import EmptyState from '../components/EmptyState'
type Props = {}

const MyListings = async (props: Props) => {
  const currentUser = await getCurrentUser()
  const listings = await getListingsByUserId()

  if (listings.length === 0) {
    return <EmptyState headText="No listings now" secondaryText="Add something to see it here" />
  }
  return (
    <div className="flex flex-col">
      <SectionHeading title="Your places" desc="Places you added yourself" />

      <MyListingsList listings={listings} currentUser={currentUser} />
    </div>
  )
}

export default MyListings

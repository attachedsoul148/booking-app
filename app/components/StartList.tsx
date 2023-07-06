'use client'

import React from 'react'
import ListingBox from './ListingBox'
import { SavedListing, SavedUser } from '@/typed'
import EmptyState from './EmptyState'
import SectionHeading from './SectionHeading'

type Props = {
  currentUser: SavedUser | null
  listings: SavedListing[]
}

const StartList = ({ currentUser, listings }: Props) => {
  if (listings.length === 0) {
    return (
      <EmptyState headText="No listings now" secondaryText="Seems like now 0 places available" />
    )
  }
  return (
    <div className="flex flex-col">
      <SectionHeading title="Places" desc="All places around the world" />
      <div className="grid gap-10 p-10 pt-5 place-items-center sm:place-items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => (
          <ListingBox key={listing.id} listing={listing} currentUser={currentUser} />
        ))}
      </div>
    </div>
  )
}

export default StartList

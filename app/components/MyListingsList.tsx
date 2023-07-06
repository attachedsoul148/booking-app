'use client'

import { SavedListing, SavedUser } from '@/typed'
import React, { useState } from 'react'
import ListingBox from './ListingBox'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import axios from 'axios'

type Props = {
  listings: SavedListing[]
  currentUser: SavedUser | null
}

const MyListingsList = ({ listings, currentUser }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const deleteListing = async (listingId: string) => {
    setIsLoading(true)
    const toastId = toast.loading('Loading...')

    try {
      await axios.delete(`/api/listing/${listingId}`)

      toast.success('Deleted', {
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
    <div
      className="p-10 pt-5 place-items-center sm:place-items-start gap-10 grid grid-cols-1 
    sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {listings.map((listing) => (
        <ListingBox
          key={listing.id}
          listing={listing}
          currentUser={currentUser}
          actionLabel={'Delete'}
          action={() => {
            deleteListing(listing.id)
          }}
          disabled={isLoading}
        />
      ))}
    </div>
  )
}

export default MyListingsList

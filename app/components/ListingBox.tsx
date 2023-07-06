'use client'

import { SavedListing, SavedUser } from '@/typed'
import Image from 'next/image'
import React from 'react'
import { useCountries } from '../hooks/useCountries'
import Button from './Button'
import FavoriteIndecator from './FavoriteIndecator'
import { useRouter } from 'next/navigation'

type Props = {
  listing: SavedListing
  action?: () => void
  actionLabel?: string
  currentUser: SavedUser | null
  disabled?: boolean
  period?: string
  fullPrice?: number
}

const ListingBox = ({
  listing,
  period,
  currentUser,
  action,
  actionLabel,
  fullPrice,
  disabled = false,
}: Props) => {
  const { getOne } = useCountries()
  const router = useRouter()

  const location = getOne(listing.locationValue)
  return (
    <div className="flex flex-col space-y-2 self-start">
      <div
        onClick={() => router.push(`/listings/${listing.id}`)}
        className="md:w-[220px] md:h-[220px] w-[260px] h-[260px] relative overflow-hidden rounded-xl cursor-pointer">
        <Image
          src={listing.imageSrc}
          alt="listingImage"
          fill
          className="object-cover hover:scale-110 transition-all duration-200"
        />

        {currentUser && <FavoriteIndecator currentUser={currentUser} listingId={listing.id} />}
      </div>

      <h3 className="font-bold text-neutral-800 max-w-60 md:max-w-[220px] max-w-[260px] truncate">
        {location?.region}, {location?.label}
      </h3>

      {period ? (
        <p className="text-sm text-neutral-400">{period}</p>
      ) : (
        <p className="text-sm text-neutral-400">{listing.category}</p>
      )}

      <p className="text-sm text-neutral-800">
        <span className="font-bold">$ {fullPrice ? fullPrice : listing.price} </span>
        {fullPrice ? 'totally' : 'night'}
      </p>

      {action && actionLabel && (
        <div className="md:w-[220px] w-[260px]">
          <Button onClick={action} text={actionLabel} orange low disabled={disabled} />
        </div>
      )}
    </div>
  )
}

export default ListingBox

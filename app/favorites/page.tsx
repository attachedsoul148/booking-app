import React from 'react'
import { getFavorites } from '../libs/getFavorites'
import { SavedListing } from '@/typed'
import { getCurrentUser } from '../libs/getCurrentUser'
import ListingBox from '../components/ListingBox'
import EmptyState from '../components/EmptyState'
import SectionHeading from '../components/SectionHeading'

type Props = {}

const Favorites = async (props: Props) => {
  const currentUser = await getCurrentUser()
  const favs: SavedListing[] = await getFavorites()

  if (favs.length === 0) {
    return <EmptyState headText="No favorites now" secondaryText="Like something to see it here" />
  }
  return (
    <div className="flex flex-col">
      <SectionHeading title="Favorites" desc="Places you liked" />

      <div
        className="p-10 gap-10 pt-5 place-items-center sm:place-items-start grid grid-cols-1 sm:grid-cols-2 
        md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {favs.map((fav) => (
          <ListingBox key={fav.id} listing={fav} currentUser={currentUser} />
        ))}
      </div>
    </div>
  )
}

export default Favorites

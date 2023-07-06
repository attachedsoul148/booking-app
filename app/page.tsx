import { SavedUser } from '@/typed'
import { getCurrentUser } from './libs/getCurrentUser'
import StartList from './components/StartList'
import { GetListingParams, getListings } from './libs/getListings'

export default async function Home({ searchParams }: { searchParams: GetListingParams }) {
  const currentUser: SavedUser | null = await getCurrentUser()
  const listings = await getListings(searchParams)

  return (
    <main>
      <StartList currentUser={currentUser} listings={listings} />
    </main>
  )
}

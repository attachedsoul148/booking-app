'use client'

import React, { useState } from 'react'
import { AiFillHeart } from '@react-icons/all-files/ai/AiFillHeart'
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart'
import { SavedUser } from '@/typed'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

type Props = {
  currentUser: SavedUser
  listingId: string
}

const FavoriteIndecator = ({ currentUser, listingId }: Props) => {
  const [isFav, setIsFav] = useState([...(currentUser.favoriteIds || [])].includes(listingId))
  const router = useRouter()

  const toggleFavorite = async () => {
    if (isFav) {
      const id = toast.loading('Loading...')

      try {
        await axios.delete(`/api/favorites/${listingId}`)

        setIsFav(false)
        toast.success('Unliked', {
          id: id,
        })
        router.refresh()
      } catch (error) {
        toast.error('Oops, something went wrong', {
          id: id,
        })
      }
    } else {
      const id = toast.loading('Loading...')

      try {
        await axios.post(`/api/favorites/${listingId}`)

        setIsFav(true)
        toast.success('Liked', {
          id: id,
        })
        router.refresh()
      } catch (error) {
        toast.error('Oops, something went wrong', {
          id: id,
        })
      }
    }
  }

  return (
    <div className="absolute top-3 right-3 cursor-pointer" onClick={(e) => e.stopPropagation()}>
      {isFav ? (
        <div className="relative" onClick={toggleFavorite}>
          <AiFillHeart size={24} className="absolute p-[2px] text-[#fd5c61]" />
          <AiOutlineHeart size={24} className="text-white" />
        </div>
      ) : (
        <AiOutlineHeart size={24} className="text-white" onClick={toggleFavorite} />
      )}
    </div>
  )
}

export default FavoriteIndecator

import React from 'react'
import { AiOutlineMinus } from '@react-icons/all-files/ai/AiOutlineMinus'
import { AiOutlinePlus } from '@react-icons/all-files/ai/AiOutlinePlus'

type Props = {
  guestCount: number
  roomCount: number
  bathroomCount: number
  decrementGuestCount: () => void
  incrementGuestCount: () => void
  decrementRoomCount: () => void
  incrementRoomCount: () => void
  decrementBathroomCount: () => void
  incrementBathroomCount: () => void
}

const Counter = ({
  guestCount,
  roomCount,
  bathroomCount,
  decrementGuestCount,
  incrementGuestCount,
  decrementRoomCount,
  incrementRoomCount,
  decrementBathroomCount,
  incrementBathroomCount,
}: Props) => {
  return (
    <div className="py-5">
      <div className="flex justify-between px-5">
        <div className="flex flex-col">
          <h4 className="font-bold">Guests</h4>
          <p className="text-neutral-400 text-sm border0">How many guests do you allow?</p>
        </div>

        <div className="flex text-neutral-400 items-center space-x-2">
          <AiOutlineMinus
            size={30}
            className="cursor-pointer border p-[2px] rounded-full"
            onClick={decrementGuestCount}
          />
          <p className="text-lg font-bold text-neutral-800">{guestCount}</p>
          <AiOutlinePlus
            size={30}
            className="cursor-pointer border p-[2px] rounded-full"
            onClick={incrementGuestCount}
          />
        </div>
      </div>
      <hr className="mx-5 my-4" />

      <div className="flex justify-between px-5">
        <div className="flex flex-col">
          <h4 className="font-bold">Rooms</h4>
          <p className="text-neutral-400 text-sm border0">How many rooms do you allow?</p>
        </div>

        <div className="flex text-neutral-400 items-center space-x-2">
          <AiOutlineMinus
            size={30}
            className="cursor-pointer border p-[2px] rounded-full"
            onClick={decrementRoomCount}
          />
          <p className="text-lg font-bold text-neutral-800">{roomCount}</p>
          <AiOutlinePlus
            size={30}
            className="cursor-pointer border p-[2px] rounded-full"
            onClick={incrementRoomCount}
          />
        </div>
      </div>
      <hr className="mx-5 my-4" />

      <div className="flex justify-between px-5">
        <div className="flex flex-col">
          <h4 className="font-bold">Bathrooms</h4>
          <p className="text-neutral-400 text-sm border0">How many bathrooms do you allow?</p>
        </div>

        <div className="flex text-neutral-400 items-center space-x-2">
          <AiOutlineMinus
            size={30}
            className="cursor-pointer border p-[2px] rounded-full"
            onClick={decrementBathroomCount}
          />
          <p className="text-lg font-bold text-neutral-800">{bathroomCount}</p>
          <AiOutlinePlus
            size={30}
            className="cursor-pointer border p-[2px] rounded-full"
            onClick={incrementBathroomCount}
          />
        </div>
      </div>
    </div>
  )
}

export default Counter

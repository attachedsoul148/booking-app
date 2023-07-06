'use client'

import React from 'react'
import { FaUmbrellaBeach } from '@react-icons/all-files/fa/FaUmbrellaBeach'
import { FaMountain } from '@react-icons/all-files/fa/FaMountain'
import { FaSwimmingPool } from '@react-icons/all-files/fa/FaSwimmingPool'
import { GiBarn } from '@react-icons/all-files/gi/GiBarn'
import { GiBoatFishing } from '@react-icons/all-files/gi/GiBoatFishing'
import { GiCactus } from '@react-icons/all-files/gi/GiCactus'
import { GiCastle } from '@react-icons/all-files/gi/GiCastle'
import { GiCaveEntrance } from '@react-icons/all-files/gi/GiCaveEntrance'
import { GiForestCamp } from '@react-icons/all-files/gi/GiForestCamp'
import { GiIsland } from '@react-icons/all-files/gi/GiIsland'
import { GiWindmill } from '@react-icons/all-files/gi/GiWindmill'
import { GiHomeGarage } from '@react-icons/all-files/gi/GiHomeGarage'
import { FaSkiing } from '@react-icons/all-files/fa/FaSkiing'
import { FaSnowman } from '@react-icons/all-files/fa/FaSnowman'
import { RiVipDiamondLine } from '@react-icons/all-files/ri/RiVipDiamondLine'
import Category from './Category'
import { useSearchParams } from 'next/navigation'

export const categories = [
  {
    label: 'Beach',
    icon: FaUmbrellaBeach,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property is has windmills!',
  },
  {
    label: 'Modern',
    icon: GiHomeGarage,
    description: 'This property is modern!',
  },
  {
    label: 'Countryside',
    icon: FaMountain,
    description: 'This property is in the countryside!',
  },
  {
    label: 'Pools',
    icon: FaSwimmingPool,
    description: 'This is property has a beautiful pool!',
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on an island!',
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is near a lake!',
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing activies!',
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'This property is an ancient castle!',
  },
  {
    label: 'Caves',
    icon: GiCaveEntrance,
    description: 'This property is in a spooky cave!',
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property offers camping activities!',
  },
  {
    label: 'Arctic',
    icon: FaSnowman,
    description: 'This property is in arctic environment!',
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This property is in the desert!',
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'This property is in a barn!',
  },
  {
    label: 'Lux',
    icon: RiVipDiamondLine,
    description: 'This property is brand new and luxurious!',
  },
]

type Props = {}

const Categories = (props: Props) => {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')

  return (
    <div className="lg:px-10 px-5 flex items-center justify-between border-b py-5 overflow-x-auto w-screen gap-5">
      {categories.map((category) => (
        <Category
          category={category}
          key={category.label}
          selected={categoryParam === category.label}
        />
      ))}
    </div>
  )
}

export default Categories

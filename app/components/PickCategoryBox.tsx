import { CategoryType } from '@/typed'
import React from 'react'

type Props = {
  category: CategoryType
  onClick: (value: string) => void
  selected: boolean
}

const PickCategoryBox = ({ category, onClick, selected }: Props) => {
  return (
    <div
      onClick={() => onClick(category.label)}
      className={`flex flex-col space-y-2 border-2 p-3 rounded-md ${
        selected ? 'border-neutral-800' : 'border-neutral-300'
      } cursor-pointer hover:border-neutral-800 transition-all duration-200`}>
      <category.icon size={26} />
      <p className="font-bold text-sm">{category.label}</p>
    </div>
  )
}

export default PickCategoryBox

'use client'

import { CategoryType } from '@/typed'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import qs from 'query-string'

type Props = {
  category: CategoryType
  selected: boolean
}

const Category = ({ category, selected }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSelect = () => {
    const parsed = qs.parse(searchParams.toString())

    if (searchParams.get('category') === category.label) {
      delete parsed.category
    } else {
      parsed.category = category.label
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: parsed,
      },
      {
        skipNull: true,
      },
    )

    router.push(url)
  }
  return (
    <div
      onClick={handleSelect}
      className={`${
        selected ? 'text-neutral-800 border-b-2 border-neutral-800' : 'text-neutral-500 border-none'
      }
      flex flex-col items-center cursor-pointer hover:text-neutral-800 space-y-2 py-2`}>
      <category.icon size={26} />
      <p className="font-bold text-sm">{category.label}</p>
    </div>
  )
}

export default Category

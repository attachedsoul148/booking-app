'use client'

import React from 'react'
import { useCountries } from '../hooks/useCountries'
import Select from 'react-select'
import { CountryType } from '@/typed'

type Props = {
  value: CountryType | null
  onChange: (newValue: CountryType) => void
}

const SelectCountryInput = ({ value, onChange }: Props) => {
  const { getAll } = useCountries()

  return (
    <div className="px-5">
      <Select
        placeholder="Anywhere"
        isClearable
        value={value}
        onChange={(value) => onChange(value as CountryType)}
        options={getAll()}
        formatOptionLabel={(option: CountryType) => (
          <div className="flex flex-row items-center gap-3 cursor-pointer">
            <div>{option.flag}</div>
            <div>
              {option.label},<span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: '#262626', // color of selected option bg
            primary25: '#ffe4e6', // color of hovered option bg
          },
        })}
      />
    </div>
  )
}

export default SelectCountryInput

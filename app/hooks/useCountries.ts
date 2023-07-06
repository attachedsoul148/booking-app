import countries from 'world-countries';

const formattedCountries = countries.map((country) => ({
    value: country.cca2, // abreviation
    label: country.name.common, // full name
    flag: country.flag, // flag
    latlng: country.latlng, // latitude longtitude
    region: country.region, // continent
}))

export const useCountries = () => {
    const getAll = () => formattedCountries

    const getOne = (value: string) => {
        return formattedCountries.find((country) => country.label === value)
    }

    return { getAll, getOne }
}
import { Listing, Reservation, User } from "@prisma/client";

export type SavedUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
    createdAt: string
    updatedAt: string
    emailVerified: string | null
}

export type CategoryType = {
    label: string
    icon: IconType
    description: string
}

export type CountryType = {
    value: string
    label: string
    flag: string
    latlng: number[]
    region: string
}

export type SavedListing = Omit<Listing, "createdAt"> & {
    createdAt: string
}

export type SavedReservation = Omit<Reservation, "createdAt" | 'startDate' | 'endDate'> & {
    createdAt: string,
    startDate: string,
    endDate: string
}
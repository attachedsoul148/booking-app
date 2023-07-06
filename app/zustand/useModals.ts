import { create } from 'zustand'

export const useRegisterModal = create<{
    isOpen: boolean
    onClose: () => void
    onOpen: () => void
}>((set) => ({
    isOpen: false,
    onClose: () => set(() => ({ isOpen: false })),
    onOpen: () => set(() => ({ isOpen: true }))
}))

export const useLoginModal = create<{
    isOpen: boolean
    onClose: () => void
    onOpen: () => void
}>((set) => ({
    isOpen: false,
    onClose: () => set(() => ({ isOpen: false })),
    onOpen: () => set(() => ({ isOpen: true }))
}))

export const useRentModal = create<{
    isOpen: boolean
    onClose: () => void
    onOpen: () => void
}>((set) => ({
    isOpen: false,
    onClose: () => set(() => ({ isOpen: false })),
    onOpen: () => set(() => ({ isOpen: true }))
}))

export const useSearchModal = create<{
    isOpen: boolean
    onClose: () => void
    onOpen: () => void
}>((set) => ({
    isOpen: false,
    onClose: () => set(() => ({ isOpen: false })),
    onOpen: () => set(() => ({ isOpen: true }))
}))
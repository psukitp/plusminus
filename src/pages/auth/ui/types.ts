import { Key } from "react"

export type AuthFormData = {
    login: string
    password: string
}

export type AuthResponseData = {
    id: Key | null
    name: string
    secondName: string
    login: string
    phone: string
    email: string
}
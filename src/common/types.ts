import { Key } from "react"

export type ServiceResponse<T> = {
    data: T
    success: boolean
    message: string
}

export type Category = {
    id: Key
    name: string
    color: string
}
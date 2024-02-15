import React from "react"

export type SiderButtonProps = {
    text: string
    active: boolean
    icon?: React.ReactElement

    onClick: () => void
}
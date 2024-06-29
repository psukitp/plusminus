import { DefaultTheme } from "styled-components"


interface Colors {
    backgroundComponent: {
        default: string
        active: string
    }
    boxShadow: string
    textColor: {
        default: string
        active: string
    }
}

export interface Theme extends DefaultTheme {
    colors: Colors
}

export interface StyledComponentProps {
    theme: Theme
}

export const themeLight: Theme = {
    colors: {
        backgroundComponent: {
            active: "#fb7a01",
            default: "linear-gradient(180deg, #ecedf3 0%, #f1f2f7 100%)"
        },
        boxShadow: "6px 6px 10px 0 rgba(0, 0, 0, 0.25), -6px -6px 10px 0 rgba(255, 255, 255, 0.5)",
        textColor: {
            default: "#000000",
            active: "#ffffff"
        }
    }
}
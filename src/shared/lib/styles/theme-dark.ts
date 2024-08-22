import { common } from "./common";
import { Theme } from "./theme-light";

export const themeDark: Theme = {
    common: { ...common },
    colors: {
        backgroundComponent: {
            active: "#fb7a01",
            default: "#1a1a1a"
        },
        boxShadow: "6px 6px 10px 0 rgba(255, 255, 255, 0.1), -6px -6px 10px 0 rgba(0, 0, 0, 0.5)",
        textColor: {
            default: "#ffffff",
            active: "#ffffff"
        },
        mobile: {
            containerBackground: 'TODO'
        }
    }
}
import { Loader } from "@shared/ui"
import { ReactNode, Suspense } from "react"


export const LazyComponent = ({ component }: { component: ReactNode }) => {
    return <Suspense fallback={<Loader />}>
        {component}
    </Suspense>
}
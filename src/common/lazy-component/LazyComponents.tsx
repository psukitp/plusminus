import { Loader } from "@components/common/loaders"
import { ReactNode, Suspense } from "react"


export const LazyComponent = ({ component }: { component: ReactNode }) => {
    return <Suspense fallback={<Loader />}>
        {component}
    </Suspense>
}
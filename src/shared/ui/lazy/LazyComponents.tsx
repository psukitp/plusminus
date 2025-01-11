import { ReactNode, Suspense } from 'react'
import { Loader } from '../components'

export const LazyComponent = ({ component }: { component: ReactNode }) => {
  return <Suspense fallback={<Loader align="start" />}>{component}</Suspense>
}

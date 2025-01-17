import { MutableRefObject, useMemo, useEffect, useState } from 'react'

interface Dimensions {
  width: number
  height: number
}

export function useResize(ref: MutableRefObject<any>): Dimensions {
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)

  const observer = useMemo(() => {
    return new ResizeObserver((entries) => {
      setWidth(entries[0].target.scrollWidth)
      setHeight(entries[0].target.scrollHeight)
    })
  }, [])

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current)
    }
  }, [observer, ref])

  return { width, height }
}

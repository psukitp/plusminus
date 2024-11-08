import React, { RefCallback, useCallback, useRef, useState } from 'react'

interface ISize {
  width: number
  height: number
}

interface IUseResizeOptions<TElement extends HTMLElement> {
  ref?: React.Ref<TElement>
  box?: ResizeObserverBoxOptions
}

export const useResizeCallback = <TElement extends HTMLElement>(
  options?: IUseResizeOptions<TElement>,
): [React.RefCallback<TElement>, ISize] => {
  const { ref: elementRef, box = 'content-box' } = options ?? {}

  const observerRef = useRef<ResizeObserver | undefined>(undefined)
  const [size, setSize] = useState<ISize>({ width: 0, height: 0 })

  const ref = useCallback<RefCallback<TElement>>(
    (element) => {
      if (element != null) {
        observerRef.current = new ResizeObserver((entries) => {
          const entry = entries[0]
          if (entry != undefined) {
            const { width, height } = entry.contentRect
            setSize((prev) =>
              !Number.isNaN(width) &&
              !Number.isNaN(height) &&
              (prev.width != width || prev.height != height)
                ? { width, height }
                : prev,
            )
          }
        })
        observerRef.current.observe(element, { box })

        if (typeof elementRef == 'function') elementRef(element)
        else if (elementRef != undefined)
          (elementRef as React.MutableRefObject<TElement | null>).current =
            element
      } else {
        observerRef.current!.disconnect()
        observerRef.current = undefined

        if (typeof elementRef == 'function') elementRef(null)
        else if (elementRef != undefined)
          (elementRef as React.MutableRefObject<TElement | null>).current = null
      }
    },
    [elementRef, box],
  )

  return [ref, size]
}

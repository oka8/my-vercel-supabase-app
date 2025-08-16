import { ReactNode, useState, useEffect, useRef } from 'react'

interface MouseState {
  x: number
  y: number
  elementX: number
  elementY: number
  isInside: boolean
}

interface MouseProviderProps {
  children: (state: MouseState) => ReactNode
  resetOnLeave?: boolean
}

export function MouseProvider({ 
  children, 
  resetOnLeave = false 
}: MouseProviderProps) {
  const [mouse, setMouse] = useState<MouseState>({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
    isInside: false
  })

  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = elementRef.current?.getBoundingClientRect()
      
      setMouse({
        x: e.clientX,
        y: e.clientY,
        elementX: rect ? e.clientX - rect.left : 0,
        elementY: rect ? e.clientY - rect.top : 0,
        isInside: true
      })
    }

    const handleMouseLeave = () => {
      setMouse(prev => ({
        ...prev,
        isInside: false,
        ...(resetOnLeave && {
          x: 0,
          y: 0,
          elementX: 0,
          elementY: 0
        })
      }))
    }

    const element = elementRef.current
    if (element) {
      element.addEventListener('mousemove', handleMouseMove)
      element.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        element.removeEventListener('mousemove', handleMouseMove)
        element.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [resetOnLeave])

  return (
    <div ref={elementRef} style={{ height: '100%', width: '100%' }}>
      {children(mouse)}
    </div>
  )
}
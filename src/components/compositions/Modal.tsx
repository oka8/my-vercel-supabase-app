import { memo, ReactNode, useEffect } from 'react'
import { X } from 'lucide-react'
import type { BaseComponentProps } from '@/types/components'

interface ModalProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlayClick?: boolean
  showCloseButton?: boolean
}

interface ModalHeaderProps extends BaseComponentProps {
  onClose?: () => void
  showCloseButton?: boolean
}

interface ModalContentProps extends BaseComponentProps {}

interface ModalFooterProps extends BaseComponentProps {
  align?: 'left' | 'center' | 'right' | 'between'
}

const ModalRoot = memo(function Modal({
  children,
  className = '',
  isOpen,
  onClose,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4'
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={handleOverlayClick}
    >
      <div 
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full ${sizeClasses[size]} ${className}`}
        role="dialog"
        aria-modal="true"
      >
        {children}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  )
})

const ModalHeader = memo(function ModalHeader({
  children,
  className = ''
}: ModalHeaderProps) {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  )
})

const ModalContent = memo(function ModalContent({
  children,
  className = ''
}: ModalContentProps) {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  )
})

const ModalFooter = memo(function ModalFooter({
  children,
  className = '',
  align = 'right'
}: ModalFooterProps) {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between'
  }

  return (
    <div className={`px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center ${alignClasses[align]} ${className}`}>
      {children}
    </div>
  )
})

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Content: ModalContent,
  Footer: ModalFooter
})
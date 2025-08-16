import { memo, ReactNode } from 'react'
import type { BaseComponentProps } from '@/types/components'

interface LayoutProps extends BaseComponentProps {
  variant?: 'default' | 'centered' | 'sidebar'
}

interface LayoutHeaderProps extends BaseComponentProps {
  sticky?: boolean
}

interface LayoutSidebarProps extends BaseComponentProps {
  position?: 'left' | 'right'
  width?: string
  collapsible?: boolean
  collapsed?: boolean
}

interface LayoutMainProps extends BaseComponentProps {}

interface LayoutFooterProps extends BaseComponentProps {
  sticky?: boolean
}

const LayoutRoot = memo(function Layout({
  children,
  className = '',
  variant = 'default'
}: LayoutProps) {
  const variantClasses = {
    default: 'min-h-screen',
    centered: 'min-h-screen flex items-center justify-center',
    sidebar: 'min-h-screen flex'
  }

  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  )
})

const LayoutHeader = memo(function LayoutHeader({
  children,
  className = '',
  sticky = false
}: LayoutHeaderProps) {
  const stickyClasses = sticky ? 'sticky top-0 z-40' : ''

  return (
    <header className={`bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 ${stickyClasses} ${className}`}>
      {children}
    </header>
  )
})

const LayoutSidebar = memo(function LayoutSidebar({
  children,
  className = '',
  position = 'left',
  width = '16rem',
  collapsible = false,
  collapsed = false
}: LayoutSidebarProps) {
  const positionClasses = position === 'left' ? 'order-first' : 'order-last'
  const widthStyle = collapsed ? { width: '4rem' } : { width }

  return (
    <aside 
      className={`bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        position === 'left' ? 'border-r' : 'border-l'
      } ${positionClasses} ${className}`}
      style={widthStyle}
    >
      <div className="h-full overflow-y-auto">
        {children}
      </div>
    </aside>
  )
})

const LayoutMain = memo(function LayoutMain({
  children,
  className = ''
}: LayoutMainProps) {
  return (
    <main className={`flex-1 overflow-auto ${className}`}>
      {children}
    </main>
  )
})

const LayoutFooter = memo(function LayoutFooter({
  children,
  className = '',
  sticky = false
}: LayoutFooterProps) {
  const stickyClasses = sticky ? 'sticky bottom-0 z-40' : ''

  return (
    <footer className={`bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 ${stickyClasses} ${className}`}>
      {children}
    </footer>
  )
})

export const Layout = Object.assign(LayoutRoot, {
  Header: LayoutHeader,
  Sidebar: LayoutSidebar,
  Main: LayoutMain,
  Footer: LayoutFooter
})
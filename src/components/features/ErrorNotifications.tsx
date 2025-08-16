import { ErrorNotificationsContainer } from '@/components/containers/ErrorNotificationsContainer'
import type { ErrorNotificationsProps } from '@/types/components'

export function ErrorNotifications(props: ErrorNotificationsProps) {
  return <ErrorNotificationsContainer {...props} />
}
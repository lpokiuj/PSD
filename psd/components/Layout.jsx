import HeaderTabs from "./AppHeader"
import { Container } from '@mantine/core'

export default function Layout({ children }) {
  return (
    <div>
      <HeaderTabs user={{ image: '/assets/Profile.svg', username: 'Martinus Andika N' }} />
      <Container>
        {children}
      </Container>
    </div>
  )
}
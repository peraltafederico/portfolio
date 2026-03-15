import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { RootLayout } from './layouts/RootLayout'
import { Home } from './pages/Home'
import { Contact } from './pages/Contact'

const rootRoute = createRootRoute({
  component: RootLayout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: Contact,
})

const routeTree = rootRoute.addChildren([indexRoute, contactRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

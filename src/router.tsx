import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Skeleton from '@/components/skeleton'

const Home = lazy(() => import('./pages/home'))
const Record = lazy(() => import('./pages/record'))

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Skeleton loading active rows={4} />}>
        <Home />
      </Suspense>
    )
  },
  {
    path: '/record',
    element: (
      <Suspense fallback={<Skeleton loading active rows={4} />}>
        <Record />
      </Suspense>
    )
  },
], {
  basename: '/the-oil'
})

export default function Router() {
  return <RouterProvider router={router} />
}

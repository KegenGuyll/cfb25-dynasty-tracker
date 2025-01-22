import { Button } from '@heroui/react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const ImportDynastyFile = dynamic(
  () => import('@/components/Dynasty/ImportDynastyFile'),
  {
    ssr: false,
  }
)

const AvailableDynasties = dynamic(
  () => import('@/components/Dynasty/AvailableDynasties'),
  {
    ssr: false,
  }
)

const DynastyDashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col space-y-12 w-full">
      <div className="w-full space-y-2">
        <h1 className="text-4xl font-semibold">
          College Football 25 Dynasty Tracker
        </h1>
        <p className="font-light">
          Welcome to the CFB25.
          <br />
          This is where you can view all of your dynasties.
        </p>
        <Button
          as={Link}
          href="/dynasty/create"
          className="w-full"
          color="primary"
        >
          New Dynasty
        </Button>
        <ImportDynastyFile />
      </div>
      <AvailableDynasties />
    </div>
  )
}

export default DynastyDashboardPage

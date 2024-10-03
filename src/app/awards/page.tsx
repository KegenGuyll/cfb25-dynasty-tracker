'use client'

import { awardsCreateUrl } from '@/constants/urls'
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'

const AwardsPage = () => {
  const router = useRouter()

  return (
    <div>
      <h1>Awards</h1>
      <Button onClick={() => router.push(awardsCreateUrl)}>
        Add Award Winner
      </Button>
    </div>
  )
}

export default AwardsPage

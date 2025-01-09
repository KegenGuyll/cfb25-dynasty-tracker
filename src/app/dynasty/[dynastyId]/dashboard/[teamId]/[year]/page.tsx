import { useRouter } from 'next/router'

const TeamYearPage = () => {
  const router = useRouter()

  const dynastyId = router.query.dynastyId as string
  const teamId = router.query.teamId as string
  const year = router.query.year as string

  return (
    <div>
      <h1>
        Team Year Page {dynastyId}:{teamId}-{year}
      </h1>
    </div>
  )
}

export default TeamYearPage

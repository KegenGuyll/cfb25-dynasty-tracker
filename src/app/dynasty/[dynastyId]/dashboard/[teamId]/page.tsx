import { useRouter } from 'next/router'

const TeamPage = () => {
  const router = useRouter()

  const dynastyId = router.query.dynastyId as string
  const teamId = router.query.teamId as string

  return (
    <div>
      <h1>
        Team Page {dynastyId}:{teamId}
      </h1>
    </div>
  )
}

export default TeamPage

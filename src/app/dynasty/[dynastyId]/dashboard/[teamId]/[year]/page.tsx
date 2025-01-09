'use client'

import DraftResults from '@/components/DashboardSections/DraftResults'
import GameSummary from '@/components/DashboardSections/GameSummary'
import RecruitingSection from '@/components/DashboardSections/Recruiting'
import TeamOverview from '@/components/DashboardSections/TeamOverview'
import TeamSchedule from '@/components/DashboardSections/TeamSchedule'
import { db } from '@/db/db.model'
import { useLiveQuery } from 'dexie-react-hooks'

type TeamYearPageProps = {
  params: {
    dynastyId: string
    teamId: string
    year: string
  }
}

const TeamYearPage: React.FC<TeamYearPageProps> = ({
  params,
}: TeamYearPageProps) => {
  const { dynastyId, teamId, year } = params

  const team = useLiveQuery(() => db.teams.get(Number(teamId)))

  return (
    <div className="flex flex-col gap-12">
      <TeamOverview dynastyId={dynastyId} teamId={teamId} year={year} />
      <RecruitingSection />
      <DraftResults />
      <TeamSchedule teamId={+teamId} year={+year} />
      <GameSummary teamId={+teamId} year={+year} />
    </div>
  )
}

export default TeamYearPage

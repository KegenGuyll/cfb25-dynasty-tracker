import DraftResults from '@/components/DashboardSections/DraftResults'
import GameSummary from '@/components/DashboardSections/GameSummary'
import RecruitingSection from '@/components/DashboardSections/Recruiting'
import TeamOverview from '@/components/DashboardSections/TeamOverview'
import TeamSchedule from '@/components/DashboardSections/TeamSchedule'

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

  return (
    <div className="flex flex-col gap-12 w-full">
      <TeamOverview dynastyId={dynastyId} teamId={teamId} year={year} />
      <RecruitingSection dynastyId={dynastyId} teamId={teamId} year={year} />
      <DraftResults />
      <TeamSchedule teamId={+teamId} year={+year} dynastyId={dynastyId} />
      <GameSummary teamId={+teamId} year={+year} />
    </div>
  )
}

export default TeamYearPage

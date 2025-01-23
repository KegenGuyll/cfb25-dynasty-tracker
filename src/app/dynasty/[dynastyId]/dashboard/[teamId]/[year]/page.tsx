import DraftResults from '@/components/DashboardSections/DraftResults'
import GameSummary from '@/components/DashboardSections/GameSummary'
import RecruitingSection from '@/components/DashboardSections/Recruiting'
import TeamOverview from '@/components/DashboardSections/TeamOverview'
import TeamSchedule from '@/components/DashboardSections/TeamSchedule'
import { Divider } from '@heroui/react'

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
    <div className="w-full">
      <div className="grid grid-flow-col grid-cols-7 gap-4 w-full">
        <div className="border p-4 hidden lg:block lg:col-span-1"></div>
        <div className="flex flex-col gap-12 w-full col-span-5 lg:col-span-4">
          <h1 className="text-3xl font-bold">Team Year Page</h1>
          <div className="flex flex-col gap-8">
            <div>
              <h2 id="season" className="text-2xl font-bold">
                Season
              </h2>
              <Divider />
            </div>
            <RecruitingSection
              dynastyId={dynastyId}
              teamId={teamId}
              year={year}
            />
          </div>
          <DraftResults />
          <TeamSchedule teamId={+teamId} year={+year} dynastyId={dynastyId} />
          <GameSummary teamId={+teamId} year={+year} />
        </div>
        <div className="md:col-span-2">
          <TeamOverview dynastyId={dynastyId} teamId={teamId} year={year} />
        </div>
      </div>
    </div>
  )
}

export default TeamYearPage

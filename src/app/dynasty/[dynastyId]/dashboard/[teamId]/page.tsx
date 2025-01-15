'use client'

import GenericDataTable, {
  TableColumn,
} from '@/components/tables/GenericDataTable'
import { RecruitingClass } from '@/db/types/recruiting'
import { TeamInfo } from '@/db/types/teamInfo'
import getAllTeamSeason from '@/queries/dynasty/getAllTeamSeason'
import { Button, Divider, Spinner } from '@nextui-org/react'
import { useLiveQuery } from 'dexie-react-hooks'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

type TeamPageProps = {
  params: {
    dynastyId: string
    teamId: string
  }
}

type TeamPageSectionProps = {
  title: string
  children: React.ReactNode
}

const TeamPageSection: React.FC<TeamPageSectionProps> = ({
  title,
  children,
}: TeamPageSectionProps) => {
  return (
    <section>
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex flex-col gap-6 py-6">{children}</div>
      <Divider />
    </section>
  )
}

const recruitingClassColumns = (
  dynastyId: string,
  teamId: string
): TableColumn<RecruitingClass>[] => [
  {
    key: 'year',
    title: 'Year',
    render: (dataRow) => (
      <Link href={`/dynasty/${dynastyId}/dashboard/${teamId}/${dataRow.year}`}>
        {dataRow.year}
      </Link>
    ),
  },
  { key: 'classRank', title: 'National Rank' },
  { key: 'conferenceClassRank', title: 'Conference Rank' },
  { key: 'overview.total', title: 'Total' },
  {
    key: 'overview.5star',
    title: '5 Star',
    render: (dataRow) => dataRow.overview['5star'] || 0,
  },
  {
    key: 'overview.4star',
    title: '4 Star',
    render: (dataRow) => dataRow.overview['4star'] || 0,
  },
  {
    key: 'overview.3star',
    title: '3 Star',
    render: (dataRow) => dataRow.overview['3star'] || 0,
  },
  {
    key: 'overview.2star',
    title: '2 Star',
    render: (dataRow) => dataRow.overview['2star'] || 0,
  },
  {
    key: 'overview.1star',
    title: '1 Star',
    render: (dataRow) => dataRow.overview['1star'] || 0,
  },
  { key: 'overview.pts', title: 'Points' },
]

const teamInfoColumns = (
  dynastyId: string,
  teamId: string
): TableColumn<TeamInfo>[] => [
  {
    title: 'Year',
    key: 'year',
    render: (dataRow) => (
      <Link href={`/dynasty/${dynastyId}/dashboard/${teamId}/${dataRow.year}`}>
        {dataRow.year}
      </Link>
    ),
  },
  { key: 'teamOverall', title: 'Overall' },
  { key: 'teamOffense', title: 'Offense' },
  { key: 'teamDefense', title: 'Defense' },
  { key: 'teamWins', title: 'Wins' },
  { key: 'teamLosses', title: 'Losses' },
  { key: 'positionInConference', title: 'Conf Rank' },
  { key: 'conferenceWins', title: 'Conf Wins' },
  { key: 'conferenceLosses', title: 'Conf Losses' },
]

const TeamPage: React.FC<TeamPageProps> = ({ params }: TeamPageProps) => {
  const router = useRouter()

  const { dynastyId, teamId } = params
  const teamSeasons = useLiveQuery(() =>
    getAllTeamSeason(Number(dynastyId), Number(teamId))
  )

  console.log(teamSeasons)

  const recruitingClasses = useMemo(() => {
    if (!teamSeasons) return []

    const classes: RecruitingClass[] = []

    teamSeasons?.forEach((teamSeason) => {
      if (teamSeason.recruitingClass) {
        classes.push(teamSeason.recruitingClass)
      }
    })

    return classes
  }, [teamSeasons])

  const teamInfo = useMemo(() => {
    if (!teamSeasons) return []

    const info: TeamInfo[] = []

    teamSeasons?.forEach((teamSeason) => {
      if (teamSeason.teamInfo) {
        info.push(teamSeason.teamInfo)
      }
    })

    return info
  }, [teamSeasons])

  return (
    <div className=" flex flex-col gap-12 w-full">
      <div className="w-full flex flex-row-reverse space-y-2">
        <Button
          onPress={() =>
            router.push(
              `/dynasty/${dynastyId}/dashboard/${teamId}/createSeason`
            )
          }
          className="w-1/5"
          color="primary"
        >
          Add New Season
        </Button>
      </div>
      {!teamSeasons && <Spinner />}
      <TeamPageSection title="Season Summary">
        <GenericDataTable<TeamInfo>
          data={teamInfo}
          columns={teamInfoColumns(dynastyId, teamId)}
        />
      </TeamPageSection>
      <TeamPageSection title="Recruiting">
        <GenericDataTable<RecruitingClass>
          data={recruitingClasses}
          columns={recruitingClassColumns(dynastyId, teamId)}
        />
      </TeamPageSection>
      <TeamPageSection title="Championships">
        <h3 className="text-lg font-semibold">National Championships</h3>
        <h3 className="text-lg font-semibold">Conference Championships</h3>
      </TeamPageSection>
      <TeamPageSection title="Awards and Honors">
        Awards and Honors
      </TeamPageSection>
      <TeamPageSection title="Bowl Games">Empty</TeamPageSection>
      <TeamPageSection title="Championships">Awards and Honors</TeamPageSection>
      <TeamPageSection title="Hall of Fame">Awards and Honors</TeamPageSection>
    </div>
  )
}

export default TeamPage

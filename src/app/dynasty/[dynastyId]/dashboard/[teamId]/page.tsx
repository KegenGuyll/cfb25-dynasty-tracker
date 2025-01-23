'use client'

import GenericDataTable, {
  TableColumn,
} from '@/components/tables/GenericDataTable'
import { db } from '@/db/db.model'
import { Game } from '@/db/types'
import { RecruitingClass } from '@/db/types/recruiting'
import { TeamInfo } from '@/db/types/teamInfo'
import getAllTeamSeason from '@/queries/dynasty/getAllTeamSeason'
import getTeamBowlGames, { BowlGame } from '@/queries/teamInfo/getTeamBowlGames'
import getTeamConfChampionships, {
  ConfChampionshipGame,
} from '@/queries/teamInfo/getTeamConfChampoinships'
import getTeamNationalChampionships, {
  NationalChampionships,
  NationalChampionshipsGames,
} from '@/queries/teamInfo/getTeamNationalChampionships'
import {
  determineGameResultWithScore,
  determineOpp,
  determineOpponent,
} from '@/utils/teamSchedule'
import { Button, Divider, SortDescriptor, Spinner } from '@heroui/react'
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
    allowSort: true,
    key: 'year',
    title: 'Year',
    render: (dataRow) => (
      <Link href={`/dynasty/${dynastyId}/dashboard/${teamId}/${dataRow.year}`}>
        {dataRow.year}
      </Link>
    ),
  },
  { allowSort: true, key: 'classRank', title: 'National Rank' },
  { allowSort: true, key: 'conferenceClassRank', title: 'Conference Rank' },
  { allowSort: true, key: 'overview.total', title: 'Total' },
  {
    allowSort: true,
    key: 'overview.5star',
    title: '5 Star',
    render: (dataRow) => dataRow.overview['5star'] || 0,
  },
  {
    allowSort: true,
    key: 'overview.4star',
    title: '4 Star',
    render: (dataRow) => dataRow.overview['4star'] || 0,
  },
  {
    allowSort: true,
    key: 'overview.3star',
    title: '3 Star',
    render: (dataRow) => dataRow.overview['3star'] || 0,
  },
  {
    allowSort: true,
    key: 'overview.2star',
    title: '2 Star',
    render: (dataRow) => dataRow.overview['2star'] || 0,
  },
  {
    allowSort: true,
    key: 'overview.1star',
    title: '1 Star',
    render: (dataRow) => dataRow.overview['1star'] || 0,
  },
  { allowSort: true, key: 'overview.pts', title: 'Points' },
]

const teamInfoColumns = (
  dynastyId: string,
  teamId: string
): TableColumn<TeamInfo>[] => [
  {
    allowSort: true,
    title: 'Year',
    key: 'year',
    render: (dataRow) => (
      <Link href={`/dynasty/${dynastyId}/dashboard/${teamId}/${dataRow.year}`}>
        {dataRow.year}
      </Link>
    ),
  },
  { allowSort: true, key: 'teamOverall', title: 'Overall' },
  { allowSort: true, key: 'teamOffense', title: 'Offense' },
  { allowSort: true, key: 'teamDefense', title: 'Defense' },
  { allowSort: true, key: 'teamWins', title: 'Wins' },
  { allowSort: true, key: 'teamLosses', title: 'Losses' },
  { allowSort: true, key: 'positionInConference', title: 'Conf Rank' },
  { allowSort: true, key: 'conferenceWins', title: 'Conf Wins' },
  { allowSort: true, key: 'conferenceLosses', title: 'Conf Losses' },
]

const nationalChampionshipsColumns = (
  dynastyId: string,
  teamId: string
): TableColumn<NationalChampionshipsGames>[] => [
  {
    title: 'Year',
    key: 'year',
    allowSort: true,
    render: (dataRow) => (
      <Link href={`/dynasty/${dynastyId}/dashboard/${teamId}/${dataRow.year}`}>
        {dataRow.year}
      </Link>
    ),
  },
  {
    allowSort: true,
    title: 'Coach',
    key: 'teamInfo.headCoach',
  },
  {
    allowSort: true,
    title: 'Off Playbook',
    key: 'teamInfo.offPlaybook',
  },
  {
    allowSort: true,
    title: 'Def Playbook',
    key: 'teamInfo.defPlaybook',
  },
  {
    allowSort: true,
    title: 'Record',
    key: 'record',
    render: (dataRow) =>
      `${dataRow.teamInfo?.teamWins}-${dataRow.teamInfo?.teamLosses}`,
  },
  {
    allowSort: false,
    title: 'Opponent',
    key: 'opponent',
    render: (dataRow) => dataRow[determineOpponent(dataRow)]?.school,
  },
  {
    allowSort: true,
    title: 'Result',
    key: 'result',
    render: (dataRow) => determineGameResultWithScore(dataRow),
  },
]

const confChampionshipsColumns = (
  dynastyId: string,
  teamId: string
): TableColumn<ConfChampionshipGame>[] => [
  {
    allowSort: true,
    title: 'Year',
    key: 'year',
    render: (dataRow) => (
      <Link href={`/dynasty/${dynastyId}/dashboard/${teamId}/${dataRow.year}`}>
        {dataRow.year}
      </Link>
    ),
  },
  {
    allowSort: true,
    title: 'Conf',
    key: 'teamInfo.conference',
  },
  {
    allowSort: true,
    title: 'Coach',
    key: 'teamInfo.headCoach',
  },
  {
    allowSort: true,
    title: 'Off Playbook',
    key: 'teamInfo.offPlaybook',
  },
  {
    allowSort: true,
    title: 'Def Playbook',
    key: 'teamInfo.defPlaybook',
  },
  {
    allowSort: true,
    title: 'Conf Record',
    key: 'record',
    render: (dataRow) =>
      `${dataRow.teamInfo?.conferenceWins}-${dataRow.teamInfo?.conferenceLosses}`,
  },
  {
    allowSort: false,
    title: 'Opponent',
    key: 'opponent',
    render: (dataRow) => dataRow[determineOpponent(dataRow)]?.school,
  },
  {
    allowSort: true,
    title: 'Result',
    key: 'result',
    render: (dataRow) => determineGameResultWithScore(dataRow),
  },
]

const bowlGameColumns = (
  dynastyId: string,
  teamId: string
): TableColumn<BowlGame>[] => [
  {
    title: 'Year',
    key: 'year',
    allowSort: true,
    render: (dataRow) => (
      <Link href={`/dynasty/${dynastyId}/dashboard/${teamId}/${dataRow.year}`}>
        {dataRow.year}
      </Link>
    ),
  },
  {
    allowSort: true,
    title: 'Bowl',
    key: 'customGameName',
  },
  {
    allowSort: true,
    title: 'Record',
    key: 'record',
    render: (dataRow) =>
      `${dataRow.teamInfo?.teamWins}-${dataRow.teamInfo?.teamLosses}`,
  },
  {
    allowSort: false,
    title: 'Opponent',
    key: 'opponent',
    render: (dataRow) => dataRow[determineOpponent(dataRow)]?.school,
  },
  {
    allowSort: true,
    title: 'Result',
    key: 'result',
    render: (dataRow) => determineGameResultWithScore(dataRow),
  },
]

const yearDefaultSortDescriptor: SortDescriptor = {
  column: 'year',
  direction: 'descending',
}

const TeamPage: React.FC<TeamPageProps> = ({ params }: TeamPageProps) => {
  const router = useRouter()

  const { dynastyId, teamId } = params
  const teamSeasons = useLiveQuery(() =>
    getAllTeamSeason(Number(dynastyId), Number(teamId))
  )
  const nationalChampionships = useLiveQuery(() =>
    getTeamNationalChampionships(dynastyId, teamId)
  )
  const conferenceChampionships = useLiveQuery(() =>
    getTeamConfChampionships(dynastyId, teamId)
  )
  const bowlGames = useLiveQuery(() => getTeamBowlGames(dynastyId, teamId))
  const team = useLiveQuery(() => db.teams.get(Number(teamId)))

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
    <div className="grid grid-cols-6 gap-4">
      <div className="flex flex-col gap-12 w-full col-span-4">
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
            keySelector={(dataRow) => dataRow?.id?.toString() || ''}
            defaultSortDescriptor={yearDefaultSortDescriptor}
          />
        </TeamPageSection>
        <TeamPageSection title="Recruiting">
          <GenericDataTable<RecruitingClass>
            data={recruitingClasses}
            columns={recruitingClassColumns(dynastyId, teamId)}
            keySelector={(dataRow) => dataRow?.id?.toString() || ''}
            defaultSortDescriptor={yearDefaultSortDescriptor}
          />
        </TeamPageSection>
        <TeamPageSection title="Championships">
          <h3 className="text-lg font-semibold">National Championships</h3>
          <GenericDataTable<Game & { year: number }>
            columns={nationalChampionshipsColumns(dynastyId, teamId)}
            data={[
              ...(nationalChampionships?.wins || []),
              ...(nationalChampionships?.losses || []),
            ]}
            defaultSortDescriptor={yearDefaultSortDescriptor}
            keySelector={(_, i) => i}
          />
          <h3 className="text-lg font-semibold">Conference Championships</h3>
          <GenericDataTable<ConfChampionshipGame>
            columns={confChampionshipsColumns(dynastyId, teamId)}
            data={[
              ...(conferenceChampionships?.wins || []),
              ...(conferenceChampionships?.losses || []),
            ]}
            defaultSortDescriptor={yearDefaultSortDescriptor}
            keySelector={(_, i) => i}
          />
        </TeamPageSection>
        <TeamPageSection title="Awards and Honors">
          Awards and Honors
        </TeamPageSection>
        <TeamPageSection title="Bowl Games">
          <GenericDataTable<BowlGame>
            columns={bowlGameColumns(dynastyId, teamId)}
            data={[
              ...(bowlGames?.wins || []),
              ...(bowlGames?.losses || []),
            ].map((game) => ({
              ...game,
              sortKey: `${determineOpponent(game)}.school`,
            }))}
            defaultSortDescriptor={yearDefaultSortDescriptor}
            keySelector={(_, i) => i}
          />
        </TeamPageSection>
        <TeamPageSection title="Championships">
          Awards and Honors
        </TeamPageSection>
        <TeamPageSection title="Hall of Fame">
          Awards and Honors
        </TeamPageSection>
      </div>
      <div className="col-span-2 p-4 flex flex-col gap-12">
        <div>
          <h1 className="text-xl font-bold text-center">
            {team?.school} {team?.nickname}
          </h1>
        </div>
        <ul className="flex flex-col divide-y">
          <li className="flex flex-col gap-2">
            <div>
              <h2 className="text-lg font-semibold">National Championships</h2>
              <span>
                {nationalChampionships?.totalAppearances} appearances in{' '}
                {teamSeasons?.length} seasons
              </span>
            </div>
            <ul className="flex flex-col gap-2 pl-4 list-disc">
              {nationalChampionships?.wins.map((game) => (
                <li key={game.year}>
                  <Link
                    href={`/dynasty/${dynastyId}/dashboard/${teamId}/${game.year}#${game.week}`}
                  >
                    {determineGameResultWithScore(game)} VS{' '}
                    {game[determineOpponent(game)]?.school} ({game.year})
                  </Link>
                </li>
              ))}
              {nationalChampionships?.losses.map((game) => (
                <li key={game.year}>
                  <Link
                    href={`/dynasty/${dynastyId}/dashboard/${teamId}/${game.year}#${game.week}`}
                  >
                    {determineGameResultWithScore(game)} VS{' '}
                    {game[determineOpponent(game)]?.school} ({game.year})
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default TeamPage

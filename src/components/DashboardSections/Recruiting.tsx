'use client'

import SectionWrapper from './SectionWrapper'
import { useRouter } from 'next/navigation'
import getRecruitingData from '@/queries/recruiting/getRecruitingData'
import { useLiveQuery } from 'dexie-react-hooks'
import rs from '@/utils/summaryGenerators/recruitingSummary'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import GenericDataTable, {
  TableColumn as TableColumnType,
} from '../tables/GenericDataTable'
import { Player } from '@/db/types/player'
import { Overview } from '@/db/types/recruiting'

type RecruitingSectionProps = {
  dynastyId: string
  teamId: string
  year: string
}

const recruitsColumns = (dynastyId: string): TableColumnType<Player>[] => [
  {
    title: 'Name',
    key: 'information.firstName',
    render: (rowData) => (
      <Link href={`/dynasty/${dynastyId}/player/${rowData.id}`}>
        {rowData.information.firstName + ' ' + rowData.information.lastName}
      </Link>
    ),
    allowSort: true,
  },
  {
    title: 'Ovr',
    key: 'recruit.overall',
    allowSort: true,
  },
  {
    title: 'Pos.',
    key: 'recruit.position',
    allowSort: true,
  },
  {
    title: "Nat'l Rank",
    key: 'recruit.nationalRank',
    allowSort: true,
  },
  {
    title: 'Star',
    key: 'recruit.stars',
    allowSort: true,
    render: (rowData) => '⭐'.repeat(Number(rowData.recruit?.stars)),
  },
  {
    title: 'Dev Trait',
    allowSort: true,
    key: 'recruit.devTrait',
  },
  {
    title: 'Gem',
    allowSort: true,
    key: 'recruit.gem',
  },
]

const transfersColumns = (dynastyId: string): TableColumnType<Player>[] => [
  ...recruitsColumns(dynastyId),
  {
    title: 'From',
    key: 'recruit.transfers.0.teamData.school',
    render: (rowData) => rowData.recruit?.transfers?.[0]?.teamData?.school,
  },
]

const overviewColumns: TableColumnType<Overview>[] = [
  {
    title: 'Total',
    key: 'total',
  },
  {
    title: '5-Star',
    key: '5star',
  },
  {
    title: '4-Star',
    key: '4star',
  },
  {
    title: '3-Star',
    key: '3star',
  },
  {
    title: '2-Star',
    key: '2star',
  },
  {
    title: '1-Star',
    key: '1star',
  },
  {
    title: 'PTS',
    key: 'pts',
  },
]

const RecruitingSection: React.FC<RecruitingSectionProps> = ({
  dynastyId,
  teamId,
  year,
}: RecruitingSectionProps) => {
  const router = useRouter()
  const recruitingData = useLiveQuery(() =>
    getRecruitingData(dynastyId, teamId, year)
  )
  const [recruitingSummary, setRecruitingSummary] = useState<{
    headline: string
    summary: string
  } | null>({ headline: '', summary: '' })

  const handleRecruitingSummary = useCallback(async () => {
    const summary = await rs(dynastyId, teamId, year)
    setRecruitingSummary(summary)
  }, [dynastyId, teamId, year])

  useEffect(() => {
    handleRecruitingSummary()
  }, [handleRecruitingSummary])

  return (
    <SectionWrapper
      title="Recruiting"
      summary={recruitingSummary?.summary || ''}
      handleEdit={() =>
        router.push(
          `/dynasty/${dynastyId}/dashboard/${teamId}/${year}/recruiting`
        )
      }
    >
      <div className="flex flex-col gap-4">
        <h4>Overview</h4>
        <GenericDataTable<Overview>
          columns={overviewColumns}
          data={[
            recruitingData?.overview || {
              total: 0,
              '5star': 0,
              '4star': 0,
              '3star': 0,
              '2star': 0,
              '1star': 0,
              pts: 0,
            },
          ]}
          keySelector={(item) => item.total}
        />
      </div>
      {recruitingData?.recruits && (
        <div className="flex flex-col gap-4">
          <h4>Recruits</h4>
          <GenericDataTable<Player>
            columns={recruitsColumns(dynastyId)}
            data={recruitingData.players}
            keySelector={(item) => item.id || 0}
          />
        </div>
      )}
      {recruitingData?.transfers && (
        <div className="flex flex-col gap-4">
          <h4>Transfers</h4>
          <GenericDataTable<Player>
            columns={transfersColumns(dynastyId)}
            data={recruitingData.transfersPlayers}
            keySelector={(item) => item.id || 0}
          />
        </div>
      )}
    </SectionWrapper>
  )
}

export default RecruitingSection

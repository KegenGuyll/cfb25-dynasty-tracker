'use client'

import { RecruitingClass } from '@/db/types/recruiting'
import Link from 'next/link'
import GenericDataTable, { TableColumn } from '../tables/GenericDataTable'
import { useLiveQuery } from 'dexie-react-hooks'
import getAllRecruitingClasses from '@/queries/recruiting/getAllRecruitingClasses'

type RecruitingClassProps = {
  dynastyId: string
  teamId: string
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
      <Link
        href={`/dynasty/${dynastyId}/dashboard/${teamId}/${dataRow.year}#recruiting-overview`}
      >
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

const RecruitingClassesTable: React.FC<RecruitingClassProps> = ({
  dynastyId,
  teamId,
}: RecruitingClassProps) => {
  const recruitingClasses = useLiveQuery(() =>
    getAllRecruitingClasses(dynastyId, teamId)
  )

  if (!recruitingClasses) return null

  return (
    <GenericDataTable<RecruitingClass>
      data={recruitingClasses}
      columns={recruitingClassColumns(dynastyId, teamId)}
      keySelector={(dataRow) => dataRow?.id?.toString() || ''}
      defaultSortDescriptor={{
        column: 'year',
        direction: 'descending',
      }}
    />
  )
}

export default RecruitingClassesTable

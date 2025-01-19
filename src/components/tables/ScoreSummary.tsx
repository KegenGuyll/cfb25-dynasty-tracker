import { ScoreSummary, Team } from '@/db/types'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'

type ScoreSummaryProps = {
  scoreSummary: ScoreSummary
  homeTeam: Team
  awayTeam: Team
  overtime?: boolean
}

const ScoreSummaryTable: React.FC<ScoreSummaryProps> = ({
  scoreSummary,
  homeTeam,
  awayTeam,
  overtime = false,
}: ScoreSummaryProps) => {
  const tableColumns = [
    { key: 'team', title: 'Team' },
    { key: 'q1', title: 'Q1' },
    { key: 'q2', title: 'Q2' },
    { key: 'q3', title: 'Q3' },
    { key: 'q4', title: 'Q4' },
    ...(overtime ? [{ key: 'ot', title: 'OT' }] : []),
    { key: 'final', title: 'Final' },
  ]

  const tableData = [
    {
      team: homeTeam.school,
      q1: scoreSummary['1'].home,
      q2: scoreSummary['2'].home,
      q3: scoreSummary['3'].home,
      q4: scoreSummary['4'].home,
      ...(overtime && scoreSummary.ot ? { ot: scoreSummary.ot.home } : {}),
      final: scoreSummary.final.home,
    },
    {
      team: awayTeam.school,
      q1: scoreSummary['1'].away,
      q2: scoreSummary['2'].away,
      q3: scoreSummary['3'].away,
      q4: scoreSummary['4'].away,
      ...(overtime && scoreSummary.ot ? { ot: scoreSummary.ot.away } : {}),
      final: scoreSummary.final.away,
    },
  ]

  return (
    <Table>
      <TableHeader columns={tableColumns}>
        {(column) => <TableColumn key={column.key}>{column.title}</TableColumn>}
      </TableHeader>
      <TableBody>
        {tableData.map((row, i) => (
          <TableRow key={i}>
            {tableColumns.map((column) => (
              <TableCell key={column.key}>{(row as any)[column.key]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ScoreSummaryTable

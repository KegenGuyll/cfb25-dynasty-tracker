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
}

const ScoreSummaryTable: React.FC<ScoreSummaryProps> = ({
  scoreSummary,
  homeTeam,
  awayTeam,
}: ScoreSummaryProps) => {
  return (
    <Table>
      <TableHeader>
        <TableColumn>Team</TableColumn>
        <TableColumn>Q1</TableColumn>
        <TableColumn>Q2</TableColumn>
        <TableColumn>Q3</TableColumn>
        <TableColumn>Q4</TableColumn>
        <TableColumn>Final</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{homeTeam.school}</TableCell>
          <TableCell>{scoreSummary['1'].home}</TableCell>
          <TableCell>{scoreSummary['2'].home}</TableCell>
          <TableCell>{scoreSummary['3'].home}</TableCell>
          <TableCell>{scoreSummary['4'].home}</TableCell>
          <TableCell>{scoreSummary.final.home}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{awayTeam.school}</TableCell>
          <TableCell>{scoreSummary['1'].away}</TableCell>
          <TableCell>{scoreSummary['2'].away}</TableCell>
          <TableCell>{scoreSummary['3'].away}</TableCell>
          <TableCell>{scoreSummary['4'].away}</TableCell>
          <TableCell>{scoreSummary.final.away}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default ScoreSummaryTable

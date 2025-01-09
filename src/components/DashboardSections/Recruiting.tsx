'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import SectionWrapper from './SectionWrapper'

const RecruitingSection = () => {
  return (
    <SectionWrapper
      title="Recruiting"
      summary="The Razorbacks have signed 17 recruits for the 2034 season. The class is headlined by 5-star QB John Doe and 4-star WR Jane Doe."
    >
      <div className="flex flex-col gap-4">
        <h3 className="text-lg">Overview</h3>
        <Table aria-label="recruiting summary table">
          <TableHeader>
            <TableColumn>Total</TableColumn>
            <TableColumn>5-STAR</TableColumn>
            <TableColumn>4-STAR</TableColumn>
            <TableColumn>3-STAR</TableColumn>
            <TableColumn>2-STAR</TableColumn>
            <TableColumn>1-STAR</TableColumn>
            <TableColumn>PTS</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>17</TableCell>
              <TableCell>2</TableCell>
              <TableCell>5</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>230.55</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg">Recruits</h3>
        <Table aria-label="recruiting summary table">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Pos.</TableColumn>
            <TableColumn>Star</TableColumn>
            <TableColumn>Dev Trait</TableColumn>
            <TableColumn>Gem</TableColumn>
            <TableColumn>Nat&apos;l Rank</TableColumn>
            <TableColumn>Ovr</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>John Doe</TableCell>
              <TableCell>QB</TableCell>
              <TableCell>5</TableCell>
              <TableCell>Normal</TableCell>
              <TableCell>Yes</TableCell>
              <TableCell>1</TableCell>
              <TableCell>94</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg">Transfers</h3>
        <Table aria-label="recruiting summary table">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Pos.</TableColumn>
            <TableColumn>Star</TableColumn>
            <TableColumn>Dev Trait</TableColumn>
            <TableColumn>Gem</TableColumn>
            <TableColumn>Nat&apos;l Rank</TableColumn>
            <TableColumn>Ovr</TableColumn>
            <TableColumn>Yr</TableColumn>
            <TableColumn>From</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>John Doe</TableCell>
              <TableCell>QB</TableCell>
              <TableCell>5</TableCell>
              <TableCell>Normal</TableCell>
              <TableCell>Yes</TableCell>
              <TableCell>1</TableCell>
              <TableCell>94</TableCell>
              <TableCell>SR</TableCell>
              <TableCell>Alabama</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </SectionWrapper>
  )
}

export default RecruitingSection

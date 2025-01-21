'use client'

import {
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react"

import SectionWrapper from './SectionWrapper'

const DraftResults = () => {
  return (
    <SectionWrapper
      title="Draft"
      summary="The Razorbacks have 5 players selected in the 2034 NFL Draft."
    >
      <div className="flex flex-col gap-4">
        <h3 className="text-lg">Results</h3>
        <Table aria-label="draft summary table">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Pos.</TableColumn>
            <TableColumn>Ovr</TableColumn>
            <TableColumn>Result</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>John Doe</TableCell>
              <TableCell>QB</TableCell>
              <TableCell>94</TableCell>
              <TableCell>1st Round</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </SectionWrapper>
  )
}

export default DraftResults

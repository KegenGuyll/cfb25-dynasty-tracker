'use client'

import { awardsCreateUrl } from '@/constants/urls'
import { db } from '@/db/db.model'
import getAwardsWithTeam from '@/db/functions/getAwardsWithTeam'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Button,
} from '@nextui-org/react'
import { useLiveQuery } from 'dexie-react-hooks'
import { useRouter } from 'next/navigation'

const AwardsPage = () => {
  const router = useRouter()
  const savedAwards = useLiveQuery(() => getAwardsWithTeam())
  const availableAwards = useLiveQuery(() => db.availableAwards.toArray())

  return (
    <div>
      <h1>Awards</h1>
      <Button onClick={() => router.push(awardsCreateUrl)}>
        Add Award Winner
      </Button>
      <div className="flex flex-col gap-4 mt-4">
        {availableAwards?.map((award) => (
          <div key={award.awardId}>
            <h2>{award.name}</h2>
            <Table>
              <TableHeader>
                <TableColumn>Team</TableColumn>
                <TableColumn>Name</TableColumn>
                <TableColumn>Year</TableColumn>
              </TableHeader>
              <TableBody>
                {savedAwards
                  ?.filter((a) => a.awardId === award.awardId)
                  .map((award) => (
                    <TableRow key={award.id}>
                      <TableCell>{award.team?.school}</TableCell>
                      <TableCell>
                        {award.playerFirstName} {award.playerLastName}
                      </TableCell>
                      <TableCell>{award.year}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AwardsPage

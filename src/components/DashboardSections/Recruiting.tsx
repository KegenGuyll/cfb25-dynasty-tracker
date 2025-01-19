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
import { useRouter } from 'next/navigation'
import getRecruitingData from '@/queries/recruiting/getRecruitingData'
import { useLiveQuery } from 'dexie-react-hooks'
import rs from '@/utils/summaryGenerators/recruitingSummary'
import { useEffect, useState } from 'react'
import Link from 'next/link'

type RecruitingSectionProps = {
  dynastyId: string
  teamId: string
  year: string
}

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

  const handleRecruitingSummary = async () => {
    const summary = await rs(dynastyId, teamId, year)
    setRecruitingSummary(summary)
  }

  useEffect(() => {
    handleRecruitingSummary()
  }, [])

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
              <TableCell>{recruitingData?.overview.total}</TableCell>
              <TableCell>{recruitingData?.overview['5star']}</TableCell>
              <TableCell>{recruitingData?.overview['4star']}</TableCell>
              <TableCell>{recruitingData?.overview['3star']}</TableCell>
              <TableCell>{recruitingData?.overview['2star']}</TableCell>
              <TableCell>{recruitingData?.overview['1star']}</TableCell>
              <TableCell>{recruitingData?.overview.pts}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {recruitingData?.recruits && (
        <div className="flex flex-col gap-4">
          <h4>Recruits</h4>
          <Table aria-label="recruiting summary table">
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Ovr</TableColumn>
              <TableColumn>Pos.</TableColumn>
              <TableColumn>Nat&apos;l Rank</TableColumn>
              <TableColumn>Star</TableColumn>
              <TableColumn>Dev Trait</TableColumn>
              <TableColumn>Gem</TableColumn>
            </TableHeader>
            <TableBody>
              {recruitingData?.players.map((player) => (
                <TableRow
                  key={
                    player.information.firstName + player.information.lastName
                  }
                >
                  <TableCell>
                    <Link href={`/dynasty/${dynastyId}/player/${player.id}`}>
                      {player.information.firstName +
                        ' ' +
                        player.information.lastName}
                    </Link>
                  </TableCell>
                  <TableCell>{player.recruit?.overall}</TableCell>
                  <TableCell>{player.recruit?.position}</TableCell>
                  <TableCell>{player.recruit?.nationalRank}</TableCell>
                  <TableCell>
                    {Array.from(
                      { length: player.recruit?.stars || 0 },
                      () => '⭐'
                    ).join('')}
                  </TableCell>
                  <TableCell>{player.recruit?.devTrait}</TableCell>
                  <TableCell>{player.recruit?.gem}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {recruitingData?.transfers && (
        <div className="flex flex-col gap-4">
          <h4>Transfers</h4>
          <Table aria-label="recruiting summary table">
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Ovr</TableColumn>
              <TableColumn>Pos.</TableColumn>
              <TableColumn>Nat&apos;l Rank</TableColumn>
              <TableColumn>Star</TableColumn>
              <TableColumn>Dev Trait</TableColumn>
              <TableColumn>From</TableColumn>
            </TableHeader>
            <TableBody>
              {recruitingData?.transfersPlayers.map((transfer) => (
                <TableRow
                  key={
                    transfer.information.firstName +
                    transfer.information.lastName
                  }
                >
                  <TableCell>
                    <Link href={`/dynasty/${dynastyId}/player/${transfer.id}`}>
                      {transfer.information.firstName +
                        ' ' +
                        transfer.information.lastName}
                    </Link>
                  </TableCell>
                  <TableCell>{transfer.recruit?.overall}</TableCell>
                  <TableCell>{transfer.information.position}</TableCell>
                  <TableCell>{transfer.recruit?.nationalRank}</TableCell>
                  <TableCell>
                    {Array.from(
                      { length: transfer.recruit?.stars || 0 },
                      () => '⭐'
                    ).join('')}
                  </TableCell>
                  <TableCell>{transfer.recruit?.devTrait}</TableCell>
                  <TableCell>
                    {transfer.recruit?.transfers?.[0]?.teamData?.school}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </SectionWrapper>
  )
}

export default RecruitingSection

import BowlGameTable from '@/components/Dynasty/BowlGameTable'
import ConferenceChampTable from '@/components/Dynasty/ConferenceChampTable'
import DynastySidePanel from '@/components/Dynasty/DynastySidePanel'
import NationalChampTable from '@/components/Dynasty/NationalChampTable'
import RecruitingClassesTable from '@/components/Dynasty/RecruitingClassesTable'
import TeamInfoTable from '@/components/Dynasty/TeamInfoTable'
import { Button, Divider } from '@heroui/react'
import Link from 'next/link'

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

const TeamPage: React.FC<TeamPageProps> = ({ params }: TeamPageProps) => {
  const { dynastyId, teamId } = params

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="flex flex-col gap-12 w-full col-span-4">
        <div className="w-full flex flex-row-reverse space-y-2">
          <Button
            as={Link}
            href={`/dynasty/${dynastyId}/dashboard/${teamId}/createSeason`}
            className="w-1/5"
            color="primary"
          >
            Add New Season
          </Button>
        </div>
        <TeamPageSection title="Season Summary">
          <TeamInfoTable dynastyId={dynastyId} teamId={teamId} />
        </TeamPageSection>
        <TeamPageSection title="Recruiting">
          <RecruitingClassesTable dynastyId={dynastyId} teamId={teamId} />
        </TeamPageSection>
        <TeamPageSection title="Championships">
          <h3 className="text-lg font-semibold">National Championships</h3>
          <NationalChampTable dynastyId={dynastyId} teamId={teamId} />
          <h3 className="text-lg font-semibold">Conference Championships</h3>
          <ConferenceChampTable dynastyId={dynastyId} teamId={teamId} />
        </TeamPageSection>
        <TeamPageSection title="Awards and Honors">
          Awards and Honors
        </TeamPageSection>
        <TeamPageSection title="Bowl Games">
          <BowlGameTable dynastyId={dynastyId} teamId={teamId} />
        </TeamPageSection>
        <TeamPageSection title="Hall of Fame">
          Awards and Honors
        </TeamPageSection>
      </div>
      <DynastySidePanel dynastyId={dynastyId} teamId={teamId} />
    </div>
  )
}

export default TeamPage

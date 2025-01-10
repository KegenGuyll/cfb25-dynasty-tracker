'use client'

import getTeamInfo from '@/queries/teamInfo/getTeamInfo'
import { useLiveQuery } from 'dexie-react-hooks'
import SectionWrapper from './SectionWrapper'
import EditModal from '../Modal/EditModal'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '@nextui-org/react'
import { db } from '@/db/db.model'

type TeamOverviewProps = {
  dynastyId: string
  teamId: string
  year: string
}

export const teamOverviewSchema = yup.object({
  conference: yup.string().optional(),
  teamOverall: yup.string().optional(),
  teamOffense: yup.string().optional(),
  teamDefense: yup.string().optional(),
  positionInConference: yup.string().optional(),
  teamWins: yup.string().optional(),
  teamLosses: yup.string().optional(),
  conferenceWins: yup.string().optional(),
  conferenceLosses: yup.string().optional(),
})

type TeamOverviewFormData = yup.InferType<typeof teamOverviewSchema>

const TeamOverview: React.FC<TeamOverviewProps> = ({
  dynastyId,
  teamId,
  year,
}: TeamOverviewProps) => {
  const [edit, setEdit] = useState(false)
  const teamInfo = useLiveQuery(() =>
    getTeamInfo(Number(dynastyId), Number(teamId), Number(year))
  )

  const { control, handleSubmit, setValue } = useForm<TeamOverviewFormData>({
    resolver: yupResolver(teamOverviewSchema),
  })

  useEffect(() => {
    if (!teamInfo) return

    setValue('conference', teamInfo.conference)
    setValue('teamOverall', teamInfo.teamOverall.toString())
    setValue('teamOffense', teamInfo.teamOffense.toString())
    setValue('teamDefense', teamInfo.teamDefense.toString())
    setValue('positionInConference', teamInfo.positionInConference.toString())
    setValue('teamWins', teamInfo.teamWins.toString())
    setValue('teamLosses', teamInfo.teamLosses.toString())
    setValue('conferenceWins', String(teamInfo.conferenceWins))
    setValue('conferenceLosses', String(teamInfo.conferenceLosses))
  }, [setValue, teamInfo])

  const handleSave = async (data: TeamOverviewFormData) => {
    if (!teamInfo) {
      await db.teamInfo.add({
        dynastyId: Number(dynastyId),
        teamId: Number(teamId),
        year: Number(year),
        conference: data.conference || '',
        teamOverall: Number(data.teamOverall),
        teamOffense: Number(data.teamOffense),
        teamDefense: Number(data.teamDefense),
        positionInConference: Number(data.positionInConference),
        teamWins: Number(data.teamWins),
        teamLosses: Number(data.teamLosses),
        conferenceWins: Number(data.conferenceWins),
        conferenceLosses: Number(data.conferenceLosses),
      })
    } else {
      await db.teamInfo.update(teamInfo.id, {
        conference: data.conference,
        teamOverall: Number(data.teamOverall),
        teamOffense: Number(data.teamOffense),
        teamDefense: Number(data.teamDefense),
        positionInConference: Number(data.positionInConference),
        teamWins: Number(data.teamWins),
        teamLosses: Number(data.teamLosses),
        conferenceWins: Number(data.conferenceWins),
        conferenceLosses: Number(data.conferenceLosses),
      })
    }
    setEdit(false)
  }

  return (
    <>
      <SectionWrapper
        title={`${teamInfo?.data?.school} ${teamInfo?.data?.nickname} ${year}`}
        summary=""
        editable={true}
        handleEdit={() => setEdit(true)}
      >
        <div>
          <div className="flex gap-1">
            <span>Record:</span>
            <span>
              {teamInfo?.teamWins}-{teamInfo?.teamLosses}
            </span>
            <span>
              ({teamInfo?.conferenceWins}-{teamInfo?.conferenceLosses})
            </span>
            <span>|</span>
            <span>
              {teamInfo?.positionInConference} in {teamInfo?.conference}
            </span>
          </div>
          <div className="flex gap-1">
            <span>Ovr:</span>
            <span>{teamInfo?.teamOverall} TEAM</span>
            <span>|</span>
            <span>{teamInfo?.teamOffense} OFF</span>
            <span>|</span>
            <span>{teamInfo?.teamDefense} DEF</span>
          </div>
        </div>
      </SectionWrapper>
      <EditModal
        handleClose={() => setEdit(false)}
        isOpen={edit}
        title="Team Overview"
        formId="team-overview-form"
      >
        <form
          id="team-overview-form"
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleSave)}
        >
          <div className="flex flex-col gap-2">
            <span>Team Overall</span>
            <Controller
              control={control}
              name="teamOverall"
              render={({ field }) => (
                <Input label="Team Ovr" {...field} placeholder="Overall" />
              )}
            />
            <Controller
              control={control}
              name="teamOffense"
              render={({ field }) => (
                <Input label="Offense Ovr" {...field} placeholder="Offense" />
              )}
            />
            <Controller
              control={control}
              name="teamDefense"
              render={({ field }) => (
                <Input label="Defense Ovr" {...field} placeholder="Defense" />
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span>Team Record</span>
            <Controller
              control={control}
              name="teamWins"
              render={({ field }) => (
                <Input label="Wins" {...field} placeholder="Wins" />
              )}
            />
            <Controller
              control={control}
              name="teamLosses"
              render={({ field }) => (
                <Input label="Losses" {...field} placeholder="Losses" />
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span>Conference</span>
            <Controller
              control={control}
              name="conference"
              render={({ field }) => (
                <Input {...field} label="Conf Name" placeholder="Conference" />
              )}
            />
            <Controller
              control={control}
              name="positionInConference"
              render={({ field }) => (
                <Input
                  {...field}
                  label="Conf Rank"
                  placeholder="Position in Conference"
                />
              )}
            />
            <Controller
              control={control}
              name="conferenceWins"
              render={({ field }) => (
                <Input
                  label="Conf Wins"
                  {...field}
                  placeholder="Conference Wins"
                />
              )}
            />
            <Controller
              control={control}
              name="conferenceLosses"
              render={({ field }) => (
                <Input
                  label="Conf Losses"
                  {...field}
                  placeholder="Conference Losses"
                />
              )}
            />
          </div>
        </form>
      </EditModal>
    </>
  )
}

export default TeamOverview

import { Controller, useForm } from 'react-hook-form'
import EditModal from '../Modal/EditModal'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '@nextui-org/react'
import { db } from '@/db/db.model'
import { TeamInfo } from '@/db/types/teamInfo'
import { useEffect } from 'react'

type EditTeamOverviewProps = {
  teamInfo: TeamInfo
  isOpen: boolean
  handleClose: () => void
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
  headCoach: yup.string().optional(),
  offensiveCoordinator: yup.string().optional(),
  defensiveCoordinator: yup.string().optional(),
  offPlaybook: yup.string().optional(),
  defPlaybook: yup.string().optional(),
  coachesPollRanking: yup.string().optional(),
  apPollRanking: yup.string().optional(),
  programPrestige: yup.string().optional(),
})

type TeamOverviewFormData = yup.InferType<typeof teamOverviewSchema>

const EditTeamOverview: React.FC<EditTeamOverviewProps> = ({
  isOpen,
  handleClose,
  teamInfo,
  dynastyId,
  teamId,
  year,
}: EditTeamOverviewProps) => {
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
    setValue('headCoach', teamInfo.headCoach)
    setValue('offensiveCoordinator', teamInfo.offensiveCoordinator)
    setValue('defensiveCoordinator', teamInfo.defensiveCoordinator)
    setValue('offPlaybook', teamInfo.offPlaybook)
    setValue('defPlaybook', teamInfo.defPlaybook)
    setValue(
      'coachesPollRanking',
      teamInfo.coachesPollRanking?.toString() || ''
    )
    setValue('apPollRanking', teamInfo.apPollRanking?.toString() || '')
    setValue('programPrestige', teamInfo.programPrestige?.toString() || '')
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
        headCoach: data.headCoach || '',
        offensiveCoordinator: data.offensiveCoordinator || '',
        defensiveCoordinator: data.defensiveCoordinator || '',
        offPlaybook: data.offPlaybook || '',
        defPlaybook: data.defPlaybook || '',
        coachesPollRanking: Number(data.coachesPollRanking) || undefined,
        apPollRanking: Number(data.apPollRanking) || undefined,
        programPrestige: Number(data.programPrestige) || undefined,
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
        headCoach: data.headCoach,
        offensiveCoordinator: data.offensiveCoordinator,
        defensiveCoordinator: data.defensiveCoordinator,
        offPlaybook: data.offPlaybook,
        defPlaybook: data.defPlaybook,
        coachesPollRanking: Number(data.coachesPollRanking) || undefined,
        apPollRanking: Number(data.apPollRanking) || undefined,
        programPrestige: Number(data.programPrestige) || undefined,
      })
    }
    handleClose()
  }

  return (
    <EditModal
      handleClose={handleClose}
      isOpen={isOpen}
      title="Team Overview"
      formId="team-overview-form"
      size="xl"
    >
      <form
        id="team-overview-form"
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleSave)}
      >
        <div className="flex flex-col gap-2">
          <span>Team Overall</span>
          <div className="flex gap-2">
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
            <span>Program Prestige</span>
            <Controller
              control={control}
              name="programPrestige"
              render={({ field }) => (
                <Input {...field} label="Program Prestige (1-5)" />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span>Coaching Staff</span>
          <div className="flex gap-2">
            <Controller
              control={control}
              name="headCoach"
              render={({ field }) => <Input label="Head Coach" {...field} />}
            />
            <Controller
              control={control}
              name="offensiveCoordinator"
              render={({ field }) => (
                <Input label="Offensive Coordinator" {...field} />
              )}
            />
            <Controller
              control={control}
              name="defensiveCoordinator"
              render={({ field }) => (
                <Input label="Defensive Coordinator" {...field} />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span>Playbooks</span>
          <div className="flex gap-2">
            <Controller
              control={control}
              name="offPlaybook"
              render={({ field }) => (
                <Input label="Offensive Playbook" {...field} />
              )}
            />
            <Controller
              control={control}
              name="defPlaybook"
              render={({ field }) => (
                <Input label="Defensive Playbook" {...field} />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span>Rankings</span>
          <div className="flex gap-2">
            <Controller
              control={control}
              name="coachesPollRanking"
              render={({ field }) => (
                <Input
                  label="Coaches Poll"
                  {...field}
                  placeholder="Coaches Poll Ranking"
                />
              )}
            />
            <Controller
              control={control}
              name="apPollRanking"
              render={({ field }) => (
                <Input
                  label="AP Poll"
                  {...field}
                  placeholder="AP Poll Ranking"
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span>Team Record</span>
          <div className="flex gap-2">
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
          <div className="flex gap-2">
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
        </div>
      </form>
    </EditModal>
  )
}

export default EditTeamOverview

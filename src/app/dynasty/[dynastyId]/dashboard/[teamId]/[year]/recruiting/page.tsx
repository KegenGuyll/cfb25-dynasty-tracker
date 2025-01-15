'use client'

import {
  Player,
  playerDevTraitOptions,
  playerPositionOptions,
} from '@/db/types/player'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Checkbox, Input, Select, SelectItem } from '@nextui-org/react'
import { useEffect } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useLiveQuery } from 'dexie-react-hooks'
import getRecruitingData from '@/queries/recruiting/getRecruitingData'
import getTeamSelectOptions from '@/db/functions/getTeamSelectOptions'
import SearchableSelect from '@/components/SearchableSelect'
import { db } from '@/db/db.model'
import { useRouter } from 'next/navigation'

export const recruitingSchema = yup.object({
  classRank: yup.string().optional(),
  conferenceClassRank: yup.string().optional(),
  overview: yup.object({
    total: yup.string().optional(),
    '5star': yup.string().optional(),
    '4star': yup.string().optional(),
    '3star': yup.string().optional(),
    '2star': yup.string().optional(),
    '1star': yup.string().optional(),
    pts: yup.string().optional(),
  }),
  recruits: yup.array().of(
    yup.object({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      position: yup.string().required(),
      overall: yup.string().optional(),
      devTrait: yup.string().optional(),
      gem: yup.string().required(),
      stars: yup.string().optional(),
      nationalRank: yup.string().optional(),
      playerId: yup.string().nullable(),
    })
  ),
  transfers: yup.array().of(
    yup.object({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      position: yup.string().required(),
      overall: yup.string().optional(),
      devTrait: yup.string().optional(),
      gem: yup.string().nullable(),
      nationalRank: yup.string().optional(),
      class: yup.string().required(),
      stars: yup.string().optional(),
      from: yup.string().required(),
      redshirt: yup.boolean().optional(),
      playerId: yup.string().nullable(),
    })
  ),
})

type RecruitingFormData = yup.InferType<typeof recruitingSchema>

type RecruitingPageProps = {
  params: {
    dynastyId: string
    teamId: string
    year: string
  }
}

const RecruitingPage: React.FC<RecruitingPageProps> = ({
  params,
}: RecruitingPageProps) => {
  const router = useRouter()
  const exitingRecruitingData = useLiveQuery(() =>
    getRecruitingData(params.dynastyId, params.teamId, params.year)
  )
  const teamOptions = useLiveQuery(() => getTeamSelectOptions())

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RecruitingFormData>({
    resolver: yupResolver(recruitingSchema),
  })

  const {
    fields: recruits,
    append: appendRecruit,
    remove: removeRecruit,
  } = useFieldArray({
    control,
    name: 'recruits',
  })
  const {
    fields: transfers,
    append: appendTransfer,
    remove: removeTransfer,
  } = useFieldArray({
    control,
    name: 'transfers',
  })

  const addEmptyRecruit = () => {
    appendRecruit({
      firstName: '',
      lastName: '',
      position: '',
      overall: '',
      devTrait: '',
      gem: '',
      nationalRank: '',
    })
  }

  const addEmptyTransfer = () => {
    appendTransfer({
      firstName: '',
      lastName: '',
      position: '',
      overall: '',
      devTrait: '',
      gem: '',
      nationalRank: '',
      class: '',
      from: '',
      redshirt: false,
    })
  }

  useEffect(() => {
    if (!exitingRecruitingData) return

    setValue('classRank', String(exitingRecruitingData.classRank))
    setValue(
      'conferenceClassRank',
      String(exitingRecruitingData.conferenceClassRank)
    )
    setValue('overview.total', String(exitingRecruitingData.overview.total))
    setValue('overview.5star', String(exitingRecruitingData.overview['5star']))
    setValue('overview.4star', String(exitingRecruitingData.overview['4star']))
    setValue('overview.3star', String(exitingRecruitingData.overview['3star']))
    setValue('overview.2star', String(exitingRecruitingData.overview['2star']))
    setValue('overview.1star', String(exitingRecruitingData.overview['1star']))
    setValue('overview.pts', String(exitingRecruitingData.overview.pts))

    exitingRecruitingData.players.forEach((player) => {
      appendRecruit({
        firstName: player.information.firstName,
        lastName: player.information.lastName,
        position: player.information.position,
        overall: String(player.recruit.overall),
        devTrait: player.development.devTrait,
        gem: player.recruit.gem,
        stars: String(player.recruit.stars),
        nationalRank: String(player.recruit.nationalRank),
        playerId: String(player.id),
      })
    })

    exitingRecruitingData.transfersPlayers.forEach((player) => {
      appendTransfer({
        firstName: player.information.firstName,
        lastName: player.information.lastName,
        position: player.recruit.position,
        overall: String(player.recruit.overall),
        devTrait: player.recruit.devTrait,
        stars: String(player.recruit.stars),
        nationalRank: String(player.recruit.nationalRank),
        class: player.recruit.transfers
          ? player.recruit.transfers[0].class
          : '',
        from: player.recruit.transfers
          ? String(player.recruit.transfers[0].teamId)
          : '',
      })
    })
  }, [exitingRecruitingData])

  const handleSave = async (data: RecruitingFormData) => {
    if (!data.recruits || !data.transfers) return

    // check if players exist in the player db
    // if they do, update them

    // add all recruits to the player db
    // add all transfers to the player db

    if (exitingRecruitingData) {
      const filterExistingRecruits = data.recruits.filter((recruit) =>
        Number(recruit.playerId)
      )
      const filterExistingTransfers = data.transfers.filter((transfer) =>
        Number(transfer.playerId)
      )
      const filterNewRecruits = data.recruits.filter(
        (recruit) => !recruit.playerId
      )
      const filterNewTransfers = data.transfers.filter(
        (transfer) => !transfer.playerId
      )

      // we know these players exist because they have an id
      db.players.bulkUpdate(
        filterExistingRecruits.map((recruit) => ({
          key: Number(recruit.playerId),
          changes: {
            information: {
              firstName: recruit.firstName,
              lastName: recruit.lastName,
              position: recruit.position,
              tendency: '',
            },
            recruit: {
              gem: recruit.gem,
              stars: Number(recruit.stars),
              overall: Number(recruit.overall),
              devTrait: recruit.devTrait || '',
              position: recruit.position,
              year: Number(params.year),
              classId: exitingRecruitingData.id || null,
              nationalRank: Number(recruit.nationalRank),
            },
          },
        }))
      )

      // we know these players exist because they have an id
      db.players.bulkUpdate(
        filterExistingTransfers.map((transfer) => ({
          key: Number(transfer.playerId),
          changes: {
            'information.firstName': transfer.firstName,
            'information.lastName': transfer.lastName,
            'information.position': transfer.position,
            'recruit.stars': Number(transfer.stars),
            'recruit.overall': Number(transfer.overall),
            'recruit.devTrait': transfer.devTrait || '',
            'recruit.position': transfer.position,
            'recruit.year': Number(params.year),
            'recruit.classId': exitingRecruitingData.id || null,
            'recruit.nationalRank': Number(transfer.nationalRank),
            'recruit.transfers': [
              {
                redshirt: transfer.redshirt || false,
                class: transfer.class as any,
                teamId: Number(transfer.from),
                classId: exitingRecruitingData.id || null,
              },
            ],
          },
        }))
      )

      // add new recruits to the player db
      const newRecruits: Player[] = filterNewRecruits.map((recruit) => ({
        dynastyId: Number(params.dynastyId),
        teamId: Number(params.teamId),
        information: {
          position: recruit.position,
          firstName: recruit.firstName,
          lastName: recruit.lastName,
          nickname: undefined,
          height: undefined, // inches
          weight: undefined, // lbs
          hometown: {
            city: '',
            state: '',
          },
          tendency: '',
          hasRedshirt: false,
        },
        recruit: {
          gem: recruit.gem,
          stars: Number(recruit.stars),
          overall: Number(recruit.overall),
          nationalRank: Number(recruit.nationalRank),
          position: recruit.position,
          devTrait: recruit.devTrait || '',
          year: Number(params.year),
          classId: exitingRecruitingData.id || null,
        },
        development: {
          devTrait: recruit.devTrait,
          mentalTraits: undefined,
          physicalTraits: undefined,
        },
        awards: [],
        stats: {},
        historicalOverall: [
          {
            year: Number(params.year),
            overall: Number(recruit.overall),
          },
        ],
        mediaAttachments: [],
      }))

      const newTransfers: Player[] = filterNewTransfers.map((transfer) => ({
        dynastyId: Number(params.dynastyId),
        teamId: Number(params.teamId),
        information: {
          position: transfer.position,
          firstName: transfer.firstName,
          lastName: transfer.lastName,
          nickname: undefined,
          height: undefined, // inches
          weight: undefined, // lbs
          hometown: {
            city: '',
            state: '',
          },
          tendency: '',
          hasRedshirt: false,
        },
        recruit: {
          gem: 'None',
          stars: Number(transfer.stars),
          overall: Number(transfer.overall),
          nationalRank: Number(transfer.nationalRank),
          position: transfer.position,
          devTrait: transfer.devTrait || '',
          year: Number(params.year),
          classId: exitingRecruitingData.id || null,
          transfers: [
            {
              redshirt: transfer.redshirt || false,
              class: transfer.class as any,
              teamId: Number(transfer.from),
              classId: exitingRecruitingData.id || null,
            },
          ],
        },
        development: {
          devTrait: transfer.devTrait,
          mentalTraits: undefined,
          physicalTraits: undefined,
        },
        awards: [],
        stats: {},
        historicalOverall: [
          {
            year: Number(params.year),
            overall: Number(transfer.overall),
          },
        ],
        mediaAttachments: [],
      }))

      const newPlayerIds = (await db.players.bulkAdd(newRecruits, undefined, {
        allKeys: true,
      })) as number[] | undefined

      const newPlayerTRIds = (await db.players.bulkAdd(
        newTransfers,
        undefined,
        {
          allKeys: true,
        }
      )) as number[] | undefined

      const playerIds = [
        ...filterExistingRecruits.map((recruit) => Number(recruit.playerId)),
        ...(newPlayerIds || []),
      ]

      const playerTransIds = [
        ...filterExistingTransfers.map((transfer) => Number(transfer.playerId)),
        ...(newPlayerTRIds || []),
      ]

      // update class with recruits
      await db.recruitingClass.update(exitingRecruitingData.id, {
        recruits: playerIds,
      })

      // update class with transfers
      await db.recruitingClass.update(exitingRecruitingData.id, {
        transfers: playerTransIds,
      })
    } else {
      // add new recruits to the player db
      const newRecruits: Player[] = data.recruits.map((recruit) => ({
        dynastyId: Number(params.dynastyId),
        teamId: Number(params.teamId),
        information: {
          position: recruit.position,
          firstName: recruit.firstName,
          lastName: recruit.lastName,
          nickname: undefined,
          height: undefined, // inches
          weight: undefined, // lbs
          hometown: {
            city: '',
            state: '',
          },
          tendency: '',
          hasRedshirt: false,
        },
        recruit: {
          gem: recruit.gem,
          stars: Number(recruit.stars),
          overall: Number(recruit.overall),
          nationalRank: Number(recruit.nationalRank),
          position: recruit.position,
          devTrait: recruit.devTrait || '',
          year: Number(params.year),
          classId: null, // update after class is created
        },
        development: {
          devTrait: recruit.devTrait,
          mentalTraits: undefined,
          physicalTraits: undefined,
        },
        awards: [],
        stats: {},
        historicalOverall: [
          {
            year: Number(params.year),
            overall: Number(recruit.overall),
          },
        ],
        mediaAttachments: [],
      }))

      const newTransfers: Player[] = data.transfers.map((transfer) => ({
        dynastyId: Number(params.dynastyId),
        teamId: Number(params.teamId),
        information: {
          position: transfer.position,
          firstName: transfer.firstName,
          lastName: transfer.lastName,
          nickname: undefined,
          height: undefined, // inches
          weight: undefined, // lbs
          hometown: {
            city: '',
            state: '',
          },
          tendency: '',
          hasRedshirt: false,
        },
        recruit: {
          gem: 'none',
          stars: Number(transfer.stars),
          overall: Number(transfer.overall),
          nationalRank: Number(transfer.nationalRank),
          position: transfer.position,
          devTrait: transfer.devTrait || '',
          year: Number(params.year),
          classId: null, // update after class is created
          transfers: [
            {
              redshirt: transfer.redshirt || false,
              class: transfer.class as any,
              teamId: Number(transfer.from),
              classId: null, // update after class is created
            },
          ],
        },
        development: {
          devTrait: transfer.devTrait,
          mentalTraits: undefined,
          physicalTraits: undefined,
        },
        awards: [],
        stats: {},
        historicalOverall: [
          {
            year: Number(params.year),
            overall: Number(transfer.overall),
          },
        ],
        mediaAttachments: [],
      }))

      const newPlayerIds = (await db.players.bulkAdd(newRecruits, undefined, {
        allKeys: true,
      })) as number[] | undefined

      const newPlayerTRIds = (await db.players.bulkAdd(
        newTransfers,
        undefined,
        {
          allKeys: true,
        }
      )) as number[] | undefined

      // create new recruiting class
      const classId = await db.recruitingClass.add({
        dynastyId: Number(params.dynastyId),
        teamId: Number(params.teamId),
        year: Number(params.year),
        overview: {
          total: Number(data.overview.total),
          '5star': Number(data.overview['5star']),
          '4star': Number(data.overview['4star']),
          '3star': Number(data.overview['3star']),
          '2star': Number(data.overview['2star']),
          '1star': Number(data.overview['1star']),
          pts: Number(data.overview.pts),
        },
        recruits: newPlayerIds || [],
        transfers: newPlayerTRIds || [],
        classRank: Number(data.classRank),
        conferenceClassRank: Number(data.conferenceClassRank),
        notableLostRecruits: [],
        players: [],
        transfersPlayers: [],
      })

      if (classId && newPlayerIds) {
        // update players with classId
        await db.players.bulkUpdate(
          newPlayerIds.map((id) => ({
            key: id,
            changes: {
              'recruit.classId': classId,
            },
          }))
        )
      }

      if (classId && newPlayerTRIds) {
        // update players with classId
        await db.players.bulkUpdate(
          newPlayerTRIds.map((id) => ({
            key: id,
            changes: {
              'recruit.transfers.0': classId,
            },
          }))
        )
      }
    }

    router.push(
      `/dynasty/${params.dynastyId}/dashboard/${params.teamId}/${params.year}`
    )
  }

  return (
    <form
      onSubmit={handleSubmit(handleSave)}
      className="bg-content1 p-4 rounded flex flex-col gap-4 divide-y"
    >
      <section className="flex flex-col gap-2">
        <h2 className="text-xl">Class Ranking</h2>
        <div className="grid grid-cols-2 gap-4">
          <Controller
            control={control}
            name="classRank"
            render={({ field }) => <Input label="Class Rank" {...field} />}
          />
          <Controller
            control={control}
            name="conferenceClassRank"
            render={({ field }) => (
              <Input label="Conference Class Rank" {...field} />
            )}
          />
        </div>
      </section>
      <section className="flex flex-col gap-2 pt-4">
        <h2 className="text-xl">Overview</h2>
        <div className="grid grid-cols-7 gap-4">
          <Controller
            control={control}
            name="overview.total"
            render={({ field }) => <Input label="Total" {...field} />}
          />
          <Controller
            control={control}
            name="overview.5star"
            render={({ field }) => <Input label="5 Star" {...field} />}
          />
          <Controller
            control={control}
            name="overview.4star"
            render={({ field }) => <Input label="4 Star" {...field} />}
          />
          <Controller
            control={control}
            name="overview.3star"
            render={({ field }) => <Input label="3 Star" {...field} />}
          />
          <Controller
            control={control}
            name="overview.2star"
            render={({ field }) => <Input label="2 Star" {...field} />}
          />
          <Controller
            control={control}
            name="overview.1star"
            render={({ field }) => <Input label="1 Star" {...field} />}
          />
          <Controller
            control={control}
            name="overview.pts"
            render={({ field }) => <Input label="Pts" {...field} />}
          />
        </div>
      </section>
      <section className="pt-4 flex flex-col gap-2">
        <div className="flex items-center">
          <h2 className="text-xl flex-grow">Recruits</h2>
          <button onClick={addEmptyRecruit}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {recruits.map((recruit, index) => (
            <div className="grid grid-cols-9 gap-4" key={recruit.id}>
              <button onClick={() => removeRecruit(index)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <Controller
                control={control}
                name={`recruits.${index}.firstName`}
                render={({ field }) => <Input label="First Name" {...field} />}
              />
              <Controller
                control={control}
                name={`recruits.${index}.lastName`}
                render={({ field }) => <Input label="Last Name" {...field} />}
              />
              <Controller
                control={control}
                name={`recruits.${index}.position`}
                render={({ field: { value, onChange } }) => (
                  <Select
                    label="Pos."
                    value={value}
                    defaultSelectedKeys={[value || '']}
                    onChange={onChange}
                  >
                    {playerPositionOptions.map((position) => (
                      <SelectItem key={position.key}>
                        {position.label}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
              <Controller
                control={control}
                name={`recruits.${index}.stars`}
                render={({ field }) => <Input label="Stars" {...field} />}
              />
              <Controller
                control={control}
                name={`recruits.${index}.devTrait`}
                render={({ field: { value, onChange } }) => (
                  <Select
                    label="Dev Trait"
                    value={value}
                    defaultSelectedKeys={[value || '']}
                    onChange={onChange}
                  >
                    {playerDevTraitOptions.map((trait) => (
                      <SelectItem key={trait.key}>{trait.label}</SelectItem>
                    ))}
                  </Select>
                )}
              />

              <Controller
                control={control}
                name={`recruits.${index}.gem`}
                render={({ field: { value, onChange } }) => (
                  <Select
                    label="Gem"
                    value={String(value)}
                    onChange={onChange}
                    defaultSelectedKeys={[String(value) || '']}
                  >
                    <SelectItem key={'gem'} value="Gem">
                      Gem
                    </SelectItem>
                    <SelectItem key={'none'} value="None">
                      None
                    </SelectItem>
                    <SelectItem key={'bust'} value="Bust">
                      Bust
                    </SelectItem>
                  </Select>
                )}
              />

              <Controller
                control={control}
                name={`recruits.${index}.nationalRank`}
                render={({ field }) => <Input label="Nat'l Rank" {...field} />}
              />
              <Controller
                control={control}
                name={`recruits.${index}.overall`}
                render={({ field }) => <Input label="Ovr" {...field} />}
              />
            </div>
          ))}
          <Button onPress={addEmptyRecruit}>Add New Recruit</Button>
        </div>
      </section>
      <section className="pt-4 flex flex-col gap-2">
        <div className="flex items-center">
          <h2 className="text-xl flex-grow">Transfers</h2>
          <button onClick={addEmptyTransfer}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {transfers.map((transfer, index) => (
            <div className="grid grid-cols-13 gap-4" key={transfer.id}>
              <button onClick={() => removeTransfer(index)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <Controller
                control={control}
                name={`transfers.${index}.firstName`}
                render={({ field }) => <Input label="First Name" {...field} />}
              />
              <Controller
                control={control}
                name={`transfers.${index}.lastName`}
                render={({ field }) => <Input label="Last Name" {...field} />}
              />
              <Controller
                control={control}
                name={`transfers.${index}.position`}
                render={({ field: { value, onChange } }) => (
                  <Select
                    defaultSelectedKeys={[value || '']}
                    label="Pos."
                    value={value}
                    onChange={onChange}
                  >
                    {playerPositionOptions.map((position) => (
                      <SelectItem key={position.key}>
                        {position.label}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
              <Controller
                control={control}
                name={`transfers.${index}.stars`}
                render={({ field }) => <Input label="Stars" {...field} />}
              />
              <Controller
                control={control}
                name={`transfers.${index}.devTrait`}
                render={({ field: { value, onChange } }) => (
                  <Select
                    defaultSelectedKeys={[value || '']}
                    label="Dev Trait"
                    value={value}
                    onChange={onChange}
                  >
                    {playerDevTraitOptions.map((trait) => (
                      <SelectItem key={trait.key}>{trait.label}</SelectItem>
                    ))}
                  </Select>
                )}
              />
              <Controller
                control={control}
                name={`transfers.${index}.nationalRank`}
                render={({ field }) => <Input label="Nat'l Rank" {...field} />}
              />
              <Controller
                control={control}
                name={`transfers.${index}.class`}
                render={({ field: { value, onChange } }) => (
                  <Select
                    label="Class"
                    value={String(value)}
                    onChange={onChange}
                    defaultSelectedKeys={[String(value) || '']}
                  >
                    <SelectItem key={'FR'} value="FR">
                      FR
                    </SelectItem>
                    <SelectItem key={'SO'} value="SO">
                      SO
                    </SelectItem>
                    <SelectItem key={'JR'} value="JR">
                      JR
                    </SelectItem>
                    <SelectItem key={'SR'} value="SR">
                      SR
                    </SelectItem>
                  </Select>
                )}
              />
              <Controller
                control={control}
                name={`transfers.${index}.redshirt`}
                render={({ field }) => (
                  <label>
                    Redshirt
                    <Checkbox
                      defaultChecked={field.value || false}
                      checked={field.value || false}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </label>
                )}
              />
              <div className="col-span-2">
                <Controller
                  control={control}
                  name={`transfers.${index}.from`}
                  render={({ field: { value, onChange } }) => (
                    <SearchableSelect
                      placeholder="From"
                      value={teamOptions?.find(
                        (option) => option.value === value
                      )}
                      onChange={onChange}
                      options={teamOptions || []}
                      label={'From'}
                    />
                  )}
                />
              </div>
              <Controller
                control={control}
                name={`transfers.${index}.overall`}
                render={({ field }) => <Input label="Ovr" {...field} />}
              />
            </div>
          ))}
          <Button onPress={addEmptyTransfer}>Add New Transfer</Button>
        </div>
      </section>
      <div className="pt-4 w-full">
        <Button className="w-full" color="primary" type="submit">
          Save
        </Button>
      </div>
    </form>
  )
}

export default RecruitingPage

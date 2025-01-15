'use client'

import EditPlayerMedia from '@/components/Player/EditPlayerMedia'
import EditStatistics from '@/components/Player/EditStatistics'
import PlayerCard from '@/components/Player/PlayerCard'
import {
  defenseStatsColumns,
  passingStatsColumns,
  receivingStatsColumns,
  rushingStatsColumns,
} from '@/components/tables/columns/playerStatsColumns'
import GenericDataTable, {
  TableColumn,
} from '@/components/tables/GenericDataTable'
import GenericInputTable from '@/components/tables/GenericInputTable'
import {
  DefenseStats,
  historicalOverall,
  PassingStats,
  ReceivingStats,
  RushingStats,
} from '@/db/types/player'
import getMediaById from '@/queries/media/getMediaById'
import getPlayerById from '@/queries/players/getPlayerById'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider } from '@nextui-org/react'
import { useLiveQuery } from 'dexie-react-hooks'
import Image from 'next/image'
import { useState } from 'react'

type PlayerPageProps = {
  params: {
    dynastyId: string
    playerId: string
  }
}

type PlayerPageSectionProps = {
  title: string
  children: React.ReactNode
  onEdit?: () => void
}

const HistoricalOvrColumns: TableColumn<historicalOverall>[] = [
  {
    title: 'Year',
    key: 'year',
  },
  {
    title: 'Ovr',
    key: 'overall',
  },
]

const PlayerPageSection: React.FC<PlayerPageSectionProps> = ({
  title,
  children,
  onEdit,
}: PlayerPageSectionProps) => {
  const [hover, setHover] = useState(false)

  return (
    <section>
      <button
        onClick={onEdit}
        className="w-full text-left"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <h2 className="text-lg w-full items-center font-semibold flex gap-2">
          {title}
          {hover && (
            <span>
              <FontAwesomeIcon icon={faPen} />
            </span>
          )}
        </h2>
      </button>
      <Divider />
      <div className="pt-8">{children}</div>
    </section>
  )
}

const PlayerPage: React.FC<PlayerPageProps> = ({ params }: PlayerPageProps) => {
  const { dynastyId, playerId } = params
  const [editStatistics, setEditStatistics] = useState(false)
  const [editMedia, setEditMedia] = useState(false)

  const player = useLiveQuery(() => getPlayerById(dynastyId, playerId))
  const playerMedia = useLiveQuery(
    () => getMediaById(player?.mediaAttachments || []),
    [player]
  )

  if (!player) return null

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">
          {player?.information.firstName} {player?.information.lastName}
        </h1>
        <div className="grid grid-cols-8 grid-flow-row-dense gap-4">
          <div className="w-full flex-grow col-span-6 p-6 flex flex-col gap-32">
            <PlayerPageSection
              onEdit={() => setEditStatistics(true)}
              title="College Statistics"
            >
              {player.stats.passing && player.stats.passing.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-semibold">Passing</h3>
                  <GenericDataTable<PassingStats>
                    columns={passingStatsColumns}
                    data={player.stats.passing}
                  />
                </div>
              )}
              {player.stats.rushing && player.stats.rushing.length > 0 && (
                <div className="flex flex-col gap-4 pt-8">
                  <h3 className="text-lg font-semibold">Rushing</h3>
                  <GenericDataTable<RushingStats>
                    columns={rushingStatsColumns}
                    data={player.stats.rushing}
                  />
                </div>
              )}
              {player.stats.receiving && player.stats.receiving.length > 0 && (
                <div className="flex flex-col gap-4 pt-8">
                  <h3 className="text-lg font-semibold">Receiving</h3>
                  <GenericDataTable<ReceivingStats>
                    columns={receivingStatsColumns}
                    data={player.stats.receiving}
                  />
                </div>
              )}
              {player.stats.defense && player.stats.defense.length > 0 && (
                <div className="flex flex-col gap-4 pt-8">
                  <h3 className="text-lg font-semibold">Defense</h3>
                  <GenericDataTable<DefenseStats>
                    columns={defenseStatsColumns}
                    data={player.stats.defense}
                  />
                </div>
              )}
            </PlayerPageSection>
            <PlayerPageSection onEdit={() => setEditMedia(true)} title="Media">
              <div className="flex flex-wrap gap-4">
                {playerMedia?.map((media) => {
                  if (media.dataType.includes('image')) {
                    return (
                      <Image
                        width={200}
                        height={200}
                        key={media.id}
                        src={media.dataUrl}
                        alt="Alt Image"
                      />
                    )
                  }

                  if (media.dataType.includes('video')) {
                    return <video key={media.id} src={media.dataUrl} controls />
                  }

                  return null
                })}
              </div>
            </PlayerPageSection>
            <PlayerPageSection title="Historical Overall">
              <GenericDataTable<historicalOverall>
                columns={HistoricalOvrColumns}
                data={player.historicalOverall}
              />
            </PlayerPageSection>
            <PlayerPageSection title="Notes">test</PlayerPageSection>
          </div>
          <div className="col-span-2">
            <PlayerCard player={player} />
          </div>
        </div>
      </div>
      <EditStatistics
        player={player}
        isOpen={editStatistics}
        handleClose={() => setEditStatistics(false)}
      />
      <EditPlayerMedia
        player={player}
        isOpen={editMedia}
        handleClose={() => setEditMedia(false)}
      />
    </>
  )
}

export default PlayerPage

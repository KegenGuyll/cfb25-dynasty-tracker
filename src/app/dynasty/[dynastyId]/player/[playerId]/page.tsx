'use client'

import PlayerCard from '@/components/Player/PlayerCard'
import getPlayerById from '@/queries/players/getPlayerById'
import { Divider } from '@nextui-org/react'
import { useLiveQuery } from 'dexie-react-hooks'

type PlayerPageProps = {
  params: {
    dynastyId: string
    playerId: string
  }
}

const PlayerPage: React.FC<PlayerPageProps> = ({ params }: PlayerPageProps) => {
  const { dynastyId, playerId } = params

  const player = useLiveQuery(() => getPlayerById(dynastyId, playerId))

  console.log(player)

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">
        {player?.information.firstName} {player?.information.lastName}
      </h1>
      <div className="grid grid-cols-8 grid-flow-row-dense gap-4">
        <div className="w-full flex-grow col-span-6 p-6 flex flex-col gap-32">
          <section>
            <div>
              <h2 className="text-xl font-semibold">College Statistics</h2>
              <Divider />
            </div>
          </section>
          <section>
            <div>
              <h2 className="text-xl font-semibold">Historical Overall</h2>
              <Divider />
            </div>
          </section>
          <section>
            <div>
              <h2 className="text-xl font-semibold">Notes</h2>
              <Divider />
            </div>
          </section>
        </div>
        <div className="col-span-2">
          <PlayerCard player={player} />
        </div>
      </div>
    </div>
  )
}

export default PlayerPage

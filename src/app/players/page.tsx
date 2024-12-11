import { Button } from '@nextui-org/react'
import { NextPage } from 'next'

const PlayerPage: NextPage = () => {
  return (
    <div>
      <h1>Players</h1>
      <Button as="a" href="/players/create">
        Create Player
      </Button>
    </div>
  )
}

export default PlayerPage

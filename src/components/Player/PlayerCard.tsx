import { Player } from '@/db/types/player'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider } from '@nextui-org/react'
import { useState } from 'react'
import EditGeneralInformation from './EditGeneralInformation'
import EditPlayerAbilities from './EditPlayerAbilities'
import EditPersonalInformation from './EditPersonalInfromation'
import convertInchesToFeet from '@/utils/convertInchesToFeet'

type PlayerCardProps = {
  player: Player | null | undefined
}

type PlayerSectionProps = {
  title: string
  children: React.ReactNode
  onEdit?: () => void
}

const PlayerSection: React.FC<PlayerSectionProps> = ({
  title,
  children,
  onEdit,
}: PlayerSectionProps) => {
  const [hover, setHover] = useState(false)

  return (
    <section className="flex flex-col gap-4">
      {onEdit ? (
        <button
          onClick={onEdit}
          className="w-full"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <h2 className="text-center w-full items-center justify-center font-semibold border rounded flex gap-2 pl-4">
            {title}
            {hover ? (
              <span>
                <FontAwesomeIcon icon={faPen} />
              </span>
            ) : (
              <span className="h-4 w-4" />
            )}
          </h2>
        </button>
      ) : (
        <h2 className="text-center w-full items-center justify-center font-semibold border rounded flex gap-2 pl-4">
          {title}
        </h2>
      )}
      {children}
    </section>
  )
}

const PlayerCard = ({ player }: PlayerCardProps) => {
  const [editGeneralInformation, setEditGeneralInformation] = useState(false)
  const [editAbilities, setEditAbilities] = useState(false)
  const [editPersonalInformation, setEditPersonalInformation] = useState(false)
  const playerName = `${player?.information.firstName} ${player?.information.lastName}`

  if (!player) return null

  return (
    <>
      <div className="flex flex-col gap-4 w-full border rounded p-6">
        <caption className="text-center text-lg w-full font-semibold">
          {playerName}
        </caption>
        <PlayerSection
          onEdit={() => setEditGeneralInformation(true)}
          title={`No. ${player.information.number}`}
        >
          <ul>
            <li>Position: {player.information.position}</li>
            <li>Dev Trait: {player.development.devTrait}</li>
          </ul>
        </PlayerSection>
        <PlayerSection onEdit={() => setEditAbilities(true)} title="Abilities">
          <div>
            <h3>Tendency: {player.information.tendency}</h3>
            <h3>Mental -</h3>
            <ul className="pl-4">
              {player.development.mentalTraits?.map((trait) => (
                <li key={trait.trait}>
                  {trait.trait} ({trait.tier})
                </li>
              ))}
              {player.development.mentalTraits?.length === 0 && (
                <li>No mental traits</li>
              )}
            </ul>
          </div>
          <div>
            <h3>Physical -</h3>
            <ul className="pl-4">
              {player.development.physicalTraits?.map((trait) => (
                <li key={trait.trait}>
                  {trait.trait} ({trait.tier})
                </li>
              ))}
              {player.development.physicalTraits?.length === 0 && (
                <li>No physical traits</li>
              )}
            </ul>
          </div>
        </PlayerSection>
        <Divider />
        <PlayerSection
          onEdit={() => setEditPersonalInformation(true)}
          title="Personal Information"
        >
          <ul>
            <li>
              Hometown: {player.information.hometown?.city},{' '}
              {player.information.hometown?.state}
            </li>
            <li>
              Height:{' '}
              {convertInchesToFeet(player.information.height || '').feet}'
              {convertInchesToFeet(player.information.height || '').inches}
            </li>
            <li>Weight: {player.information.weight} lbs</li>
          </ul>
        </PlayerSection>
        <Divider />
        <PlayerSection title="Career Information">
          <ul>
            <li>College: {player.currentTeamData?.school} (years-played)</li>
            <li>NFL Draft: year / round : number</li>
          </ul>
        </PlayerSection>
        <Divider />
        <PlayerSection title="Career Highlights and Awards">
          <ul>
            {player.awards.map((award) => (
              <li key={award.awardId}>
                {award.awardName} ({award.year})
              </li>
            ))}
          </ul>
        </PlayerSection>
        <Divider />
        <PlayerSection title="Career Statistics">
          <ul>
            <li>Will be determined by position</li>
          </ul>
        </PlayerSection>
      </div>
      <EditGeneralInformation
        isOpen={editGeneralInformation}
        handleClose={() => setEditGeneralInformation(false)}
        player={player}
      />
      <EditPlayerAbilities
        isOpen={editAbilities}
        handleClose={() => setEditAbilities(false)}
        player={player}
      />
      <EditPersonalInformation
        isOpen={editPersonalInformation}
        handleClose={() => setEditPersonalInformation(false)}
        player={player}
      />
    </>
  )
}

export default PlayerCard

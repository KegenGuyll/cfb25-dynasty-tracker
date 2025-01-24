'use client'

import { Player } from '@/db/types/player'
import searchPlayers from '@/queries/players/searchPlayer'
import { faPerson, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button,
  Divider,
  Input,
  Listbox,
  ListboxItem,
  ListboxSection,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@heroui/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import Fuse, { FuseResult } from 'fuse.js'
import Link from 'next/link'

type SearchCategoryProps = {
  title: string
  term?: string
  onClose?: () => void
}

const SearchCategory: React.FC<SearchCategoryProps> = ({
  title,
  term,
  onClose,
}: SearchCategoryProps) => {
  const [playerList, setPlayerList] = useState<Player[]>([])
  const [searchResults, setSearchResults] = useState<FuseResult<Player>[]>([])

  useEffect(() => {
    const fuse = new Fuse(playerList, {
      keys: ['information.firstName', 'information.lastName'],
      isCaseSensitive: false,
      threshold: 0.4,
    })

    const results = fuse.search(term || '')
    setSearchResults(results)
  }, [term, playerList])

  const handleAddPlayers = useCallback(async () => {
    const allPlayers = await searchPlayers()

    setPlayerList(allPlayers)
  }, [])

  useEffect(() => {
    handleAddPlayers()
  }, [])

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-light uppercase tracking-widest">
        {title} {playerList.length}
      </h2>
      <div className="flex flex-col gap-4">
        <Listbox
          isVirtualized
          virtualization={{
            itemHeight: 52,
            maxListboxHeight: 200,
          }}
        >
          <ListboxSection className="px-2">
            {searchResults.map(({ item: player }) => (
              <ListboxItem
                as={Link}
                href={`/dynasty/${player.dynastyId}/player/${player.id}`}
                onPress={onClose}
                key={player.id}
                className="gap-8"
                startContent={<FontAwesomeIcon size="lg" icon={faPerson} />}
                description={
                  <span className="font-light text-sm">
                    {player.information.position} {'/'}{' '}
                    {player.information.tendency}
                  </span>
                }
              >
                {player.information.firstName} {player.information.lastName}
              </ListboxItem>
            ))}
          </ListboxSection>
        </Listbox>
      </div>
    </div>
  )
}

const SearchModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!isOpen) return

    searchInputRef.current?.focus()
  }, [isOpen])

  return (
    <>
      <Button
        onPress={onOpen}
        className="px-8"
        startContent={<FontAwesomeIcon icon={faSearch} />}
        variant="ghost"
        radius="full"
        fullWidth
      >
        Search
      </Button>
      <Modal
        size="xl"
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <Input
                  ref={searchInputRef}
                  value={searchTerm}
                  size="lg"
                  startContent={<FontAwesomeIcon icon={faSearch} />}
                  variant="bordered"
                  placeholder="Search Dynasties"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </ModalHeader>
              <ModalBody>
                <Divider />
                <SearchCategory
                  onClose={onClose}
                  term={searchTerm}
                  title="Players"
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default SearchModal

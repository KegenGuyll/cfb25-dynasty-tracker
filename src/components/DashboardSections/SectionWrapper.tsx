'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

type SectionWrapperProps = {
  title: string
  summary: string
  children: React.ReactNode
  editable?: boolean
  handleEdit?: () => void
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  title,
  summary,
  handleEdit,
  editable = true,
}: SectionWrapperProps) => {
  const [hovered, setHovered] = useState(false)

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col">
        {editable ? (
          <button
            onClick={handleEdit}
            onMouseOver={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="text-left flex gap-2 items-center"
          >
            <h2 className="text-xl font-bold">{title}</h2>
            {hovered && <FontAwesomeIcon icon={faPen} />}
          </button>
        ) : (
          <h2 className="text-xl font-bold">{title}</h2>
        )}
        <span>{summary}</span>
      </div>
      <div className="flex flex-col gap-8">{children}</div>
    </section>
  )
}

export default SectionWrapper

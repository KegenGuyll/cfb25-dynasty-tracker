'use client'

import { db } from '@/db/db.model'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

export const dynastySchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
})

type DynastyFormData = yup.InferType<typeof dynastySchema>

const CreateDynastyPage: React.FC = () => {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DynastyFormData>({
    resolver: yupResolver(dynastySchema),
  })

  const handleCreateDynasty = async (data: DynastyFormData) => {
    await db.dynasties.add({
      name: data.name,
      description: data.description,
      availableTeams: [],
    })

    router.push('/dynasty')
  }

  return (
    <div>
      <form
        className="flex flex-col gap-4 bg-content1 p-4 rounded"
        onSubmit={handleSubmit(handleCreateDynasty)}
      >
        <Controller
          control={control}
          name="name"
          render={({ field }) => <Input {...field} placeholder="Name" />}
        />
        <Controller
          control={control}
          name="description"
          render={({ field }) => <Input {...field} placeholder="Description" />}
        />
        <Button type="submit">Create Dynasty</Button>
      </form>
    </div>
  )
}

export default CreateDynastyPage

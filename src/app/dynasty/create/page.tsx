'use client'

import { db } from '@/db/db.model'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Form, Input, Textarea } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

export const dynastySchema = yup.object({
  name: yup.string().required('A Dynasty name is required'),
  description: yup.string().optional(),
})

type DynastyFormData = yup.InferType<typeof dynastySchema>

const CreateDynastyPage: React.FC = () => {
  const router = useRouter()

  const { control, handleSubmit } = useForm<DynastyFormData>({
    resolver: yupResolver(dynastySchema),
  })

  const handleCreateDynasty = async (data: DynastyFormData) => {
    await db.dynasties.add({
      name: data.name,
      description: data.description || '',
      availableTeams: [],
    })

    router.push('/dynasty')
  }

  return (
    <div className="flex flex-col gap-12 w-full max-w-[600px] h-[400px] bg-content1 p-4 rounded">
      <div className="space-y-2 pt-6">
        <h1 className="text-4xl font-semibold">Create Dynasty</h1>
        <p className="font-light text-small">
          Create a new dynasty to start tracking your progress.
        </p>
      </div>
      <Form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleCreateDynasty)}
      >
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              validationBehavior="aria"
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
              placeholder="Name"
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              validationBehavior="aria"
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
              rows={6}
              placeholder="Description"
            />
          )}
        />
        <Button color="primary" type="submit">
          Get Started
        </Button>
      </Form>
    </div>
  )
}

export default CreateDynastyPage

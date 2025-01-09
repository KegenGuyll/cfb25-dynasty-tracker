import { db } from '@/db/db.model'
import { useLiveQuery } from 'dexie-react-hooks'

const useGetAllDynasties = () => {
  const dynasties = useLiveQuery(() => db.dynasties.toArray())

  return dynasties
}

export default useGetAllDynasties

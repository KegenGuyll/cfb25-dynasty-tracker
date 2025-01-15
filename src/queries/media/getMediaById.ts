import { db } from "@/db/db.model"

type FormattedMedia = {
  id: number
  dataUrl: string
  dataType: string
}

function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

const getMediaById = async (id: number[]) => {
  const results = await db.media.bulkGet(id)

  const formattedResults: FormattedMedia[] = []

  for (let i = 0; i < results.length; i++) {
    const media = results[i]
    if (!media) continue

    const result = await blobToDataURL(media.data)
    formattedResults.push({
      dataUrl: result,
      id: media.id as number,
      dataType: media.data.type
    })
  }

  return formattedResults
}

export default getMediaById
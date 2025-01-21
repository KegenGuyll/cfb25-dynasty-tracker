import { db } from "@/db/db.model"

const deleteDynasty = async (dynastyId: number) => {
  // clear all dbs that are related to this dynasty

  await Promise.all([
    db.draftResults.where('dynastyId').equals(dynastyId).delete(),
    db.teamStats.where('dynastyId').equals(dynastyId).delete(),
    db.teamSchedule.where('dynastyId').equals(dynastyId).delete(),
    db.recruitingClass.where('dynastyId').equals(dynastyId).delete(),
    db.players.where('dynastyId').equals(dynastyId).delete(),
    db.awards.where('dynastyId').equals(dynastyId).delete(),
    db.teamInfo.where('dynastyId').equals(dynastyId).delete(),
    db.allAmerican.where('dynastyId').equals(dynastyId).delete(),
  ])

  await db.dynasties.where('id').equals(dynastyId).delete()
}

export default deleteDynasty
import { db } from "@/db/db.model";

const getAllRecruitingClasses = async (dynastyId: string, teamId: string) => {
  const recruitingClasses = await db.recruitingClass.where({ dynastyId: Number(dynastyId), teamId: Number(teamId) }).toArray();

  if (!recruitingClasses) return []

  return recruitingClasses
}

export default getAllRecruitingClasses
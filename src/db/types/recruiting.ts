interface RecruitingClass {
  id?: number
  teamId: number;
  year: number;
  pts: number;
  classRank: number;
  conferenceClassRank: number;
  '1Stars': number;
  '2Stars': number;
  '3Stars': number;
  '4Stars': number;
  '5Stars': number;
  commits: Recruit[];
  notableLostRecruits: Recruit[];
  dynastyId: number;
}

type Recruit = {
  firstName: string;
  lastName: string;
  nickname?: string;
  position: string
  stars: number
  devTrait: string
  overall?: number
  transfer: boolean
  gem: boolean
}


export type {
  RecruitingClass
}
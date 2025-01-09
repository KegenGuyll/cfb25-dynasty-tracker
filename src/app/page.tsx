'use client'

import DraftResults from '@/components/DashboardSections/DraftResults'
import GameSummary from '@/components/DashboardSections/GameSummary'
import RecruitingSection from '@/components/DashboardSections/Recruiting'
import TeamSchedule from '@/components/DashboardSections/TeamSchedule'

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <section>
        <h1 className="text-2xl font-bold">2034 Arkansas Razorbacks</h1>
        <div>
          <div className="flex gap-1">
            <span>Record:</span>
            <span>11-1</span>
            <span>|</span>
            <span>3rd in SEC</span>
          </div>
          <div className="flex gap-1">
            <span>Ovr:</span>
            <span>94 TEAM</span>
            <span>|</span>
            <span>92 OFF</span>
            <span>|</span>
            <span>94 DEF</span>
          </div>
        </div>
      </section>
      <RecruitingSection />
      <DraftResults />
      <TeamSchedule teamId={131} year={2032} />
      <GameSummary teamId={131} year={2032} />
    </div>
  )
}

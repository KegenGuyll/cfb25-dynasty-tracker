
const teamScheduleDashboardUrl = '/team-schedule';
const teamScheduleCreateUrl = '/team-schedule/create';
const teamScheduleUpdateUrl = (id: number) => `/team-schedule/update/${id}`;

const awardsDashboardUrl = '/awards';
const awardsCreateUrl = '/awards/create';
const awardsUpdateUrl = (id: number) => `/awards/update/${id}`;

const playerDashboardUrl = '/players';
const playerCreateUrl = '/players/create';

export {
  teamScheduleDashboardUrl,
  teamScheduleCreateUrl,
  teamScheduleUpdateUrl,
  awardsDashboardUrl,
  awardsCreateUrl,
  awardsUpdateUrl,
  playerDashboardUrl,
  playerCreateUrl,
}
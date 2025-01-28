const weekName = (week: number): string => {
  if (week <= 14 || week === 16) return `Week ${week}`

  if (week === 15) return 'Conf Champ'

  if (week === 17) return 'Bowl 1'

  if (week === 18) return 'Bowl 2'

  if (week === 19) return 'Bowl 3'

  return "Nat'l Champ"
}


export default weekName
const convertInchesToFeet = (inches: number | string) => {
  const castInches = Number(inches)

  const feet = Math.floor(castInches / 12)
  const remainingInches = castInches % 12
  return { feet, inches: remainingInches }
}


export default convertInchesToFeet
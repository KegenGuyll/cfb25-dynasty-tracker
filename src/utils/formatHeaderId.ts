const formatHeaderId = (header: string): string => {
  return header.toLowerCase().replaceAll(' ', '-')
}

export default formatHeaderId
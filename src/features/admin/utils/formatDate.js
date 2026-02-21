export const formatDate = (timestamp, lang = 'ko') => {
  const date = new Date(timestamp)
  if (lang === 'ko') {
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const ampm = hours >= 12 ? '오후' : '오전'
    const hour12 = hours % 12 || 12
    return `${month}월 ${day}일 ${ampm} ${hour12}:${minutes}`
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export const formatDateShort = (timestamp, lang = 'ko') => {
  const date = new Date(timestamp)
  if (lang === 'ko') {
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${month}월 ${day}일`
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

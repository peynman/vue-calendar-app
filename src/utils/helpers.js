export function addToDate (d, h, m = 'h') {
  var copiedDate = new Date()
  if (h !== 0) {
    copiedDate.setTime(d.getTime() + (h * 60 * 1000 * (m === 'h' ? 60 : m === 'd' ? 60 * 24 : 1)))
  }
  return copiedDate
}

export function makeRandomId (len = 6) {
  const chars = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
  const rnd = []
  for (let i = 0; i < len; i++) {
    rnd.push(chars[Math.floor(Math.random() * chars.length) + 1])
  }
  return rnd.join('')
}

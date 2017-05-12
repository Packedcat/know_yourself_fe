import moment from 'moment'

export default function timeFilter(timestamp, format) {
  let result
  const t = parseInt(timestamp, 10)
  if (!t) {
    result = '-'
  } else if (format) {
    result = moment(t).format(format)
  } else {
    result = moment(t).format('YYYY-MM-DD HH:mm:ss')
  }
  return result
}

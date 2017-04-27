'use strict'

export const toDecimal = (pointNmea, direction) => {
  let d = 1
  if (direction &&
    (direction.toUpperCase() === 'S' || direction.toUpperCase() === 'W')) {
    d = -1
  }
  if (!pointNmea) { return null }
  let dd = Math.floor(pointNmea / 100)
  let mm = (pointNmea - (dd * 100)) / 60
  return d * (dd + mm)
}

export const objectToArray = (object) => {
  let stateArray = []
  for (const prop in object) {
    stateArray.push(object[prop])
  }

  return stateArray
}
import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'decks_storage:key'

export async function getDecks() {
  try{
    return await AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((results) => JSON.parse(results))
  } catch (error) {
    console.log(error)
  }
  
}

export const getDeck = ({deckId}) => {
  try {
    return deck = AsyncStorage.getItem(DECKS_STORAGE_KEY)
      // using .then to get the requested deckId
  } catch (error) {
    console.log(error)
  }
  
}
export async function saveDeckTitle(key, newDeck){
  let decks = ''
  
  try {
    await AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((results) => {
        decks = JSON.parse(results)
      })
  } catch (error) {
    console.log(error)
  }

  // decks.length > 0 ? add newDeck to db : setItem newDeck as only object in decks array 
  if (decks !== null) {
    try {
      return await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({[key]: newDeck}))
    } catch (error) {
      console.log(error)
    }
  } else {
    try {
      return await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({[key]: newDeck}))
        .then((results) => console.log(JSON.parse(results)))
    } catch(error) {
      console.log(error)
    }
  }
}

export const addCardToDeck = (card) => {

}
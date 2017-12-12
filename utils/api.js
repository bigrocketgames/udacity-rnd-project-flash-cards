import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'decks_storage'

export const getDecks = () => {
  try{
   return AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((results) => {
        const decks = JSON.parse(results)
      })
  } catch (error) {
    console.log(error)
  }
  
}

export const getDeck = ({deckId}) => {
  try {
    return deck = AsyncStorage.getItem(DECKS_STORAGE_KEY[deckId])
  } catch (error) {
    console.log(error)
  }
  
}

export const saveDeckTitle = (newDeck) => {
  let decks = ''
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      decks = JSON.parse(results)
    })

  console.log(decks.length)
  // if decks.length > 0 ? add newDeck : setItem as array with newDeck
}

export const addCardToDeck = (card) => {

}
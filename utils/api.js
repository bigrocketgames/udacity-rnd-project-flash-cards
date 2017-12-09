import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'decks_storage:key'

export const getDecks = () => {
  try{
    const decks = AsyncStorage.getItem(DECKS_STORAGE_KEY)
    return decks
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

export const saveDeckTitle = (title) => {

}

export const addCardToDeck = (card) => {

}
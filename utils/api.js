import { AsyncStorage } from 'react-native'

import { objectToArray } from './helpers'

const DECKS_STORAGE_KEY = 'decks_storage:key'

export async function getDecks() {
  try{
    return await AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((results) => JSON.parse(results))
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
        .then((results) => JSON.parse(results))
    } catch(error) {
      console.log(error)
    }
  }
}

export async function addCardToDeck(key, updatedQuestions) {
  try {
    // merge the updated questions into the existing db
    return await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({[key]: updatedQuestions}))
  } catch (error) {
    console.log(error)
  }
}

export async function deleteDeck(key) {
  try {
    return await AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((results) => {
        const data = JSON.parse(results)
        data[key] = undefined
        delete data[key]
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
      })
  } catch (error) {
    console.log(error)
  }
}
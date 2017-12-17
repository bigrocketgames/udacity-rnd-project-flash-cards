export const GET_DECKS_SUCCESS = 'GET_DECKS_SUCCESS'
export const ADD_DECK_SUCCESS = 'ADD_DECK_SUCCESS'

export const getDecksSuccess = (decks) => {
  return {
    type: GET_DECKS_SUCCESS,
    decks
  }
}

export const addDeckSuccess = (deck) => {
  console.log(deck)
  return {
    type: ADD_DECK_SUCCESS,
    deck
  }
}
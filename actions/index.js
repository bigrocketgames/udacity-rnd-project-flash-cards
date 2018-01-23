export const GET_DECKS_SUCCESS = 'GET_DECKS_SUCCESS'
export const ADD_DECK_SUCCESS = 'ADD_DECK_SUCCESS'
export const ADD_QUESTION_SUCCESS = 'ADD_QUESTION_SUCCESS'
export const DELETE_DECK_SUCCESS = 'DELETE_DECK_SUCCESS'
export const DELETE_QUESTION_SUCCESS = 'DELETE_QUESTION_SUCCESS'

export const getDecksSuccess = (decks) => {
  return {
    type: GET_DECKS_SUCCESS,
    decks
  }
}

export const addDeckSuccess = (deck) => {
  return {
    type: ADD_DECK_SUCCESS,
    deck
  }
}

export const deleteDeckSuccess = (deckId) => {
  return {
    type: DELETE_DECK_SUCCESS,
    deckId
  }
}

export const addQuestionSuccess = (deckId, newQuestion) => {
  return {
    type: ADD_QUESTION_SUCCESS,
    deckId,
    newQuestion
  }
}

export const deleteQuestionSuccess = (deckId, questionIndex) => {
  return {
    type: DELETE_QUESTION_SUCCESS,
    deckId,
    questionIndex
  }
}
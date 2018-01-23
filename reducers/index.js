import { GET_DECKS_SUCCESS, ADD_DECK_SUCCESS, ADD_QUESTION_SUCCESS, DELETE_DECK_SUCCESS, DELETE_QUESTION_SUCCESS } from '../actions'

export default decks = (state = [], action) => {
  switch (action.type) {
    case GET_DECKS_SUCCESS:
      return action.decks;

    case ADD_DECK_SUCCESS:
      return [
        ...state,
        action.deck
      ]

    case ADD_QUESTION_SUCCESS:
      const index = state.findIndex(deck => deck.title === action.deckId)
      const deck = state.find(deck => deck.title === action.deckId)
      const updatedDeck = {...deck, questions: [...deck.questions, action.newQuestion]}

      return [
        ...state.slice(0, index),
        updatedDeck,
        ...state.slice(index + 1)
      ];

    case DELETE_DECK_SUCCESS:
      const deckIndex = state.findIndex(deck => deck.title == action.deckId)

      return [
        ...state.slice(0, deckIndex),
        ...state.slice(deckIndex + 1)
      ];

    case DELETE_QUESTION_SUCCESS:
      const dIndex = state.findIndex(deck => deck.title === action.deckId)
      const deckToUpdate = state.find(deck => deck.title === action.deckId)
      const updatedDecks = {...deckToUpdate, questions: [
        ...deckToUpdate.questions.slice(0, action.questionIndex),
        ...deckToUpdate.questions.slice(action.questionIndex + 1)
      ]}
      
      return [
        ...state.slice(0, dIndex),
        updatedDecks,
        ...state.slice(dIndex + 1)
      ];

    default:
      return state;
  }
}
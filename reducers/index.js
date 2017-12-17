import { GET_DECKS_SUCCESS, ADD_DECK_SUCCESS } from '../actions'

export default decks = (state = [], action) => {
  switch (action.type) {
    case GET_DECKS_SUCCESS:
      return action.decks;

    case ADD_DECK_SUCCESS:
      debugger
      return [
        ...state,
        action.deck
      ]

    default:
      return state;
  }
}
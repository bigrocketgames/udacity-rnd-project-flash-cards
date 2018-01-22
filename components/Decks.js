import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import DeckHomeCard from './DeckHomeCard'
import { objectToArray } from '../utils/helpers'
import { getDecks } from '../utils/api'
import { getDecksSuccess, deleteDeckSuccess } from '../actions'

class Decks extends Component {

  componentDidMount() {
    getDecks()
      .then((decks) => {
        if (decks !== null) {
          this.props.getDecksSuccess(objectToArray(decks))
        }
      })
  }

  deleteDeck = (deck) => {
    console.log("this is the deck passed back to this function", deck)
    // update redux
      this.props.deleteDeckSuccess(deck.title)

    // update db

    // const updatedQuestions = {questions: [...deck.questions, newQuestion]}
    // addCardToDeck(deck.title, updatedQuestions)
    // .then(() => {
    //   this.setState(()=> ({question: '', answer: ''}))
    //   this.props.navigation.goBack()
    // })
  }

  render() {
    const { decks } = this.props

    return (
      <View>
        <Text style={{fontSize: 40, marginTop: 10, alignSelf: 'center'}}>Choose a Deck</Text>
        { decks.length > 0 ?
          <FlatList 
            style={styles.list}
            data={decks}
            renderItem={(deck) => <TouchableOpacity onPress={() => this.props.navigation.navigate(
              'DeckDetail',
              { deckId: deck.item.title }
            )}>
              <DeckHomeCard deck={deck.item} deleteDeck={this.deleteDeck.bind(this)} />
            </TouchableOpacity>}
            keyExtractor={(deck) => deck.title}
          /> 
          : 
          <Text>Please add your first deck of cards to begin.</Text>}
      </View> 
    )
  }
}

const mapStateToProps = (decks) => ({ decks })

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getDecksSuccess: getDecksSuccess,
    deleteDeckSuccess: deleteDeckSuccess
  }, dispatch);
}

const styles = StyleSheet.create({
  list: {
    padding: 15,
    marginBottom: 65,
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Decks)
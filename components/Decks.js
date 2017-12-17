import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import DeckHomeCard from './DeckHomeCard'
import { objectToArray } from '../utils/helpers'
import { getDecks } from '../utils/api'
import { getDecksSuccess } from '../actions'

class Decks extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    getDecks()
      .then((decks) => {
        if (decks !== null) {
          dispatch(getDecksSuccess(objectToArray(decks)))
        }
      })
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
              <DeckHomeCard deck={deck.item} />
            </TouchableOpacity>}
            keyExtractor={(deck) => deck.title}
          /> 
          : 
          <Text>Please add your first deck of cards to begin.</Text>}
      </View> 
    )
  }
}

const mapStateToProps = (decks) => {
  return {
    decks
  }
}

const styles = StyleSheet.create({
  list: {
    padding: 15,
    marginBottom: 65,
  }
})

export default connect(mapStateToProps)(Decks)
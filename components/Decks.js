import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'

import DeckHomeCard from './DeckHomeCard'
import { objectToArray } from '../utils/helpers'
import { getDecks } from '../utils/api'

class Decks extends Component {
  state = {
    decks: []
  }

  componentDidMount() {
    getDecks()
      .then((decks) => {
        if (decks !== null) {
          const newArr = objectToArray(decks)
          this.setState(() => ({
            decks: newArr
          }))
        }
      })
  }

  render() {
    const { decks } = this.state

    return (
      <View>
        <Text style={{fontSize: 40, marginTop: 10, alignSelf: 'center'}}>Choose a Deck</Text>
        { decks.length > 0 ?
          <FlatList 
            style={styles.list}
            data={decks}
            renderItem={(deck) => <TouchableOpacity onPress={() => this.props.navigation.navigate(
              'DeckDetail',
              { deck: deck }
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

const styles = StyleSheet.create({
  list: {
    padding: 15,
    padding: 15
  }
})

export default Decks
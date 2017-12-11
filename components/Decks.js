import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'

import DeckHomeCard from './DeckHomeCard'
import { getDecks } from '../utils/api'

class Decks extends Component {
  state = {
    decks: [
      {
        title: 'javascript',
        questions: [
          {
            question: 'is javascript fun',
            answer: 'yes'
          },
          {
            question: 'is it easy',
            answer: 'no'
          }
        ]
      },
      {
        title: 'react',
        questions: [
          {
            question: 'is react fun',
            answer: 'yes'
          },
          {
            question: 'is it easy',
            answer: 'no'
          }
        ]
      }
    ]
  }

  // componentDidMount() {
  //   getDecks()
  //     .then((decks) => {this.setState(() => ({ decks }))})
  // }

  render() {
    const { decks } = this.state

    return (
      <View>
        <Text style={{fontSize: 40, marginTop: 10, alignSelf: 'center'}}>Choose a Deck</Text>
        { decks ? 
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
          'Please add your first deck of cards to begin.'}
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
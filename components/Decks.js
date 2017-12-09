import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

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

    console.log(decks)

    return (
      <View>
        <Text style={{fontSize: 40, marginTop: 10, alignSelf: 'center'}}>Choose a Deck</Text>
        { decks ? decks.map((deck) => <DeckHomeCard key={deck.title} deck={deck} />) : 'I am rendering the decks component, but there are no decks to render.'}
      </View> 
    )
  }
}

export default Decks
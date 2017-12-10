import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class DeckDetail extends Component {
  render () {
    console.log(this.props)
    return (
      <View>
        <Text>
        This will be the deck detail where you can view each card to study.

        It should have next and previous buttons to switch between cards.
          
        Click a button to take the quiz.
        
        Add a button to link to adding a question.</Text>
      </View>
    )
  }
}

export default DeckDetail
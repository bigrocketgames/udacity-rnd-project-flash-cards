import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class DeckQuiz extends Component {
  render() {
    return(
      <View>
        <Text>
          Have quiz questions show in order as passed to state.

          Multiple choice, true/false, or fill in the blank?

          button for submitting answer.

          Keep track of score and display it at the top-right of the screen.

          After final question, show a results screen.
        </Text>
      </View>
    )
  }
}

export default DeckQuiz
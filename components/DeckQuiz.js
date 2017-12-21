import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

class DeckQuiz extends Component {
  state = {
    questionNumber: 1,
    correct: 0,
    showAnswer: false
  }

  handleCorrect = () => {
    console.log(this.state)
  }

  handleIncorrect = () => {
    console.log(this.state)
  }

  render() {
    const { questionNumber, correct, showAnswer } = this.state
    const { deck } = this.props.navigation.state.params

    if (showAnswer) {
      return(
        <View>
          <Text>
            {deck.questions[questionNumber - 1].answer}
          </Text>
          <TouchableOpacity onPress={() => this.handleCorrect()}><Text>CORRECT</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleIncorrect()}><Text>INCORRECT</Text></TouchableOpacity>
        </View>
      )
    } else {
      return(
        <View>
          <Text>
            {deck.questions[questionNumber - 1].question}
          </Text>
          <TouchableOpacity onPress={() => this.handleCorrect()}><Text>CORRECT</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleIncorrect()}><Text>INCORRECT</Text></TouchableOpacity>
        </View>
      )
    }
    
  }
}

export default DeckQuiz
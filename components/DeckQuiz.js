import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

class DeckQuiz extends Component {
  state = {
    questionNumber: 1,
    correct: 0,
    showAnswer: false, 
    showResults: false
  }

  handleCorrect = () => {
    if (this.state.questionNumber < this.props.navigation.state.params.deck.questions.length) {
      const questionNumber = this.state.questionNumber + 1
      const correct = this.state.correct + 1
  
      this.setState(() => ({
        questionNumber,
        correct
      }))
    } else {
      const correct = this.state.correct + 1

      this.setState(() => ({
        correct, 
        showResults: true
      }))
    }
  }

  handleIncorrect = () => {
    if (this.state.questionNumber < this.props.navigation.state.params.deck.questions.length) {
      const questionNumber = this.state.questionNumber + 1
  
      this.setState(() => ({
        questionNumber
      }))
    } else {

      this.setState(() => ({
        showResults: true
      }))
    }
  }

  render() {
    const { questionNumber, correct, showAnswer, showResults } = this.state
    const { deck } = this.props.navigation.state.params

    if (showResults) {
      return (
        <View>
          <Text>
            These will be the results. {Math.round((correct/questionNumber)*100)}%
          </Text>
        </View>
      )
    } else {
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
}

export default DeckQuiz
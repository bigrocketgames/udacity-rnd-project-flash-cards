import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native'

import { setLocalNotification, clearLocalNotification } from '../utils/helpers'

class DeckQuiz extends Component {
  state = {
    questionNumber: 1,
    correct: 0,
    totalQuestions: this.props.navigation.state.params.deck.questions.length,
    questionOpacity: new Animated.Value(1),
    answerOpacity: new Animated.Value(0),
    viewRotateY: new Animated.Value(0),
    textRotateY: new Animated.Value(0),
    showingAnswer: false,
    showResults: false
  }

  handleCorrect = () => {
    if (this.state.questionNumber < this.props.navigation.state.params.deck.questions.length) {
      const questionNumber = this.state.questionNumber + 1
      const correct = this.state.correct + 1
  
      this.setState(() => ({
        questionNumber,
        correct,
        questionOpacity: new Animated.Value(1),
        answerOpacity: new Animated.Value(0),
        viewRotateY: new Animated.Value(0),
        textRotateY: new Animated.Value(0),
        showingAnswer: false
      }))
    } else {
      // Clear local notification
      clearLocalNotification()
        .then(setLocalNotification)

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
        questionNumber,
        questionOpacity: new Animated.Value(1),
        answerOpacity: new Animated.Value(0),
        viewRotateY: new Animated.Value(0),
        textRotateY: new Animated.Value(0),
        showingAnswer: false
      }))
    } else {
      // Clear local notification
      clearLocalNotification()
        .then(setLocalNotification)

      this.setState(() => ({
        showResults: true
      }))
    }
  }

  onShowAnswer = () => {
    const { questionOpacity, answerOpacity, viewRotateY, textRotateY } = this.state
    
    Animated.parallel([
      Animated.timing(viewRotateY, { toValue: 1, duration: 1000}),
      Animated.timing(textRotateY, { toValue: 1, duration: 1000})
    ]).start()
    
    Animated.sequence([
      Animated.timing(questionOpacity, { toValue: 0, duration: 500}),
      Animated.timing(answerOpacity, {toValue: 1, duration: 500})
    ]).start()

    setTimeout(() => {this.setState({showingAnswer: true})}, 500)
  }

  onShowQuestion = () => {
    const { questionOpacity, answerOpacity, viewRotateY, textRotateY } = this.state

    Animated.parallel([
      Animated.timing(viewRotateY, { toValue: 0, duration: 1000}),
      Animated.timing(textRotateY, { toValue: 0, duration: 1000})
    ]).start()
    
    Animated.sequence([
      Animated.timing(questionOpacity, { toValue: 1, duration: 500}),
      Animated.timing(answerOpacity, {toValue: 0, duration: 500})
    ]).start()

    setTimeout(() => {this.setState({showingAnswer: false})}, 500)

  }

  restartQuiz = () => {
    console.log(this.state)
    this.setState(() => ({
      questionNumber: 1,
      correct: 0,
      totalQuestions: this.props.navigation.state.params.deck.questions.length,
      questionOpacity: new Animated.Value(1),
      answerOpacity: new Animated.Value(0),
      viewRotateY: new Animated.Value(0),
      textRotateY: new Animated.Value(0),
      showingAnswer: false,
      showResults: false
    }))
  }

  render() {
    const { questionNumber, correct, totalQuestions, showResults, questionOpacity, answerOpacity, showingAnswer } = this.state
    const { deck } = this.props.navigation.state.params

    const viewRotateY = this.state.viewRotateY.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    })
    const textRotateY = this.state.textRotateY.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    })

    if (showResults) {
      return (
        <View style={styles.quizResultsHeader} >
          <Text style={styles.quizResults}>
            Congratulations!
          </Text>
          <Text style={styles.quizResults} >
            You got a score of {Math.round((correct/questionNumber)*100)}%
          </Text>
          <View style={styles.btnContainer} >
            <TouchableOpacity style={[ styles.correctBtn]} onPress={() => this.restartQuiz()}>
              <Text style={styles.btnText}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[ styles.incorrectBtn]} onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.btnText}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return(
        <View>
          <Text style={styles.quizHeader}>
            {this.props.navigation.state.params.deck.title} Quiz
          </Text>
          <Text style={styles.quizHeader}>
            Question {questionNumber} of {totalQuestions}
          </Text>
          { showingAnswer ?
            <View>
              <Animated.View style={[ styles.deckContainer, {transform: [{rotateY: viewRotateY}]}]}>
                <Animated.View style={{transform: [{rotateY: textRotateY}]}}>
                  <Animated.Text style={[styles.qaTitle, {opacity: answerOpacity}]}>
                  Answer:
                  </Animated.Text>
                  <Animated.Text style={[styles.qaText, {opacity: answerOpacity}]}>
                    {deck.questions[questionNumber - 1].answer}
                  </Animated.Text>
                </Animated.View>
              </Animated.View>
              
              <TouchableOpacity onPress={() => this.onShowQuestion()}>
                <Text style={styles.showQA}>
                  Show the question
                </Text>
              </TouchableOpacity> 
            </View>
          :
          <View>
              <Animated.View style={[ styles.deckContainer, {transform: [{rotateY: viewRotateY}]}]}>
                <Animated.View style={{transform: [{rotateY: textRotateY}]}}>
                  <Animated.Text style={[styles.qaTitle, {opacity: questionOpacity}]}>
                    Question:
                  </Animated.Text>
                  <Animated.Text style={[styles.qaText, {opacity: questionOpacity}]}>
                    {deck.questions[questionNumber - 1].question}
                  </Animated.Text>
                </Animated.View>
              </Animated.View>
              
              <TouchableOpacity onPress={() => this.onShowAnswer()}>
                <Text style={styles.showQA}>
                  Show the answer
                </Text>
              </TouchableOpacity> 
            </View>
          }

          <View style={styles.btnContainer} >
            <TouchableOpacity style={[ styles.correctBtn]} onPress={() => this.handleCorrect()}>
              <Text style={styles.btnText}>CORRECT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[ styles.incorrectBtn]} onPress={() => this.handleIncorrect()}>
              <Text style={styles.btnText}>INCORRECT</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  deckContainer: {
    padding: 20,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    borderRadius: 10,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  quizHeader: {
    alignSelf: 'center',
    fontSize: 30,
  },
  quizResultsHeader: {
    justifyContent: 'center',
    margin: 10
  },
  quizResults: {
    fontSize: 30,
    alignSelf: 'center'
  },
  qaTitle: {
    flexDirection: 'row',
    alignSelf: 'center',
    fontSize: 40,
    fontWeight: 'bold'
  },
  qaText: {
    flexDirection: 'row',
    alignSelf: 'center',
    fontSize: 25
  },
  showQA: {
    alignSelf: 'center',
    margin: 10,
    fontSize: 20
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  correctBtn: {
    flex: 1,
    backgroundColor: 'green',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    marginLeft: 5
  },
  incorrectBtn: {
    flex: 1,
    backgroundColor: 'red',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  btnText: {
    fontSize: 25,
    margin: 10,
    alignSelf: 'center',
    color: 'white'
  }
})

export default DeckQuiz
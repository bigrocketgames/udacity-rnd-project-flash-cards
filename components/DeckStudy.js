import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { deleteQuestionSuccess } from '../actions/index'
import { setLocalNotification, clearLocalNotification } from '../utils/helpers'
import { red } from '../utils/colors'
import { deleteQuestionFromDeck } from '../utils/api'

class DeckStudy extends Component {
  state = {
    questionNumber: 1,
    totalQuestions: this.props.navigation.state.params.deck.questions.length,
    questionOpacity: new Animated.Value(1),
    answerOpacity: new Animated.Value(0),
    viewRotateY: new Animated.Value(0),
    textRotateY: new Animated.Value(0),
    showingAnswer: false,
    showResults: false
  }

  componentWillUnmount() {
    this.state.questionOpacity.removeAllListeners()
    this.state.answerOpacity.removeAllListeners()
    this.state.viewRotateY.removeAllListeners()
    this.state.textRotateY.removeAllListeners()
  }

  deleteQuestion = (deck, questionNum) => {
    // Update redux
    this.props.deleteQuestionSuccess(deck.title, questionNum-1)

    // Update the question set and update the db with new question set
    const updatedQuestions = {questions: [
      ...deck.questions.slice(0, questionNum - 1),
      ...deck.questions.slice(questionNum)
    ]}
    deleteQuestionFromDeck(deck.title, updatedQuestions)

    // Either advance to the next question if deleting the first question or go back to the previous question upon deletion.
    if (questionNum === 1) {
      const questionNumber = this.state.questionNumber + 1
      this.setState(() => ({
        questionNumber
      }))
    } else {
      const questionNumber = this.state.questionNumber - 1
      this.setState(() => ({
        questionNumber
      }))
    }
  } 

  nextQuestion = () => {
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

  prevQuestion = () => {
    const questionNumber = this.state.questionNumber - 1

    this.setState(() => ({
      questionNumber,
      questionOpacity: new Animated.Value(1),
      answerOpacity: new Animated.Value(0),
      viewRotateY: new Animated.Value(0),
      textRotateY: new Animated.Value(0),
      showingAnswer: false
    }))
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

  restartStudy = () => {
    this.setState(() => ({
      questionNumber: 1,
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
    const { questionNumber, totalQuestions, showResults, questionOpacity, answerOpacity, showingAnswer } = this.state
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
            You completed a great study session!
          </Text>
          <View style={styles.btnContainer} >
            <TouchableOpacity style={[ styles.prevBtn]} onPress={() => this.restartStudy()}>
              <Text style={styles.btnText}>Study Again</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[ styles.nextBtn]} onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.btnText}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return(
        <View>
          <Text style={styles.quizHeader}>
            {this.props.navigation.state.params.deck.title} Study Session
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
            {questionNumber !== 1 && <TouchableOpacity style={[ styles.prevBtn]} onPress={() => this.prevQuestion()}>
              <Text style={styles.btnText}>Previous Question</Text>
            </TouchableOpacity> }
            <TouchableOpacity style={[ styles.nextBtn]} onPress={() => this.nextQuestion()}>
              <Text style={styles.btnText}>{ questionNumber < totalQuestions ? 'Next Question' : 'Show Results' }</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.deleteBtnContainer} >
            <TouchableOpacity style={[ styles.deleteBtn ]} onPress={() => this.deleteQuestion(deck, questionNumber)}>
              <Text style={styles.btnText}>Delete Question</Text>
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
    shadowColor: 'rgba(0,0,255,0.5)',
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
    alignSelf: 'center',
    textAlign: 'center'
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
    marginTop: 10,
    flexDirection: 'row',
  },
  nextBtn: {
    flex: 0.48,
    backgroundColor: 'green',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  prevBtn: {
    flex: 0.48,
    backgroundColor: 'green',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  deleteBtnContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 65
  },
  deleteBtn: {
    flex: 0.5,
    backgroundColor: red,
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  btnText: {
    fontSize: 20,
    margin: 10,
    alignSelf: 'center',
    color: 'white'
  }
})

export default connect(null, {deleteQuestionSuccess})(DeckStudy)
import React, { Component } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'

import { red } from '../utils/colors'
import { addQuestionSuccess } from '../actions'
import { addCardToDeck } from '../utils/api'

class AddQuestion extends Component {
  state = {
    question: '',
    answer: ''
  }

  changeQuestionText = (question) => {
    this.setState(() => ({
      question
    }))
  }

  changeAnswerText = (answer) => {
    this.setState(() => ({
      answer
    }))
  }

  handleSubmit = (deck, question, answer) => {
    const { dispatch } = this.props

    // Verify that the question ends with at least 1 question mark.  If not, add it.
    if (question[question.length - 1] !== '?') {
      question += '?'
    }

    const newQuestion = {question, answer}

    // update redux
    dispatch(addQuestionSuccess(deck.title, newQuestion))

    // update db
    const updatedQuestions = {questions: [...deck.questions, newQuestion]}
    addCardToDeck(deck.title, updatedQuestions)
    .then(() => {
      this.setState(()=> ({question: '', answer: ''}))
      this.props.navigation.navigate(
        'Home'
      )
    })


  }

  render() {
    const { question, answer } = this.state
    const { deck } = this.props.navigation.state.params
    console.log(deck)

    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title} >
          Add a new question and answer to the {deck.title} deck.
        </Text>
        <Text>Enter the question:</Text>
        <TextInput multiline={true} autoGrow={true} onChangeText={this.changeQuestionText} value={question} style={styles.inputBox}></TextInput>
        <Text>Enter the answer:</Text>
        <TextInput multiline={true} autoGrow={true} onChangeText={this.changeAnswerText} value={answer} style={styles.inputBox}></TextInput>
        <TouchableHighlight style={styles.submitbtn} onPress={() => this.handleSubmit(deck, question, answer)}>
          <Text style={{color: '#fff'}}>Submit</Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25
  },
  inputBox: {
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderColor: '#757575',
    borderRadius: 10
  },
  submitbtn: {
    backgroundColor: red,
    borderRadius: 7,
    padding: 10,
    height: 45,
    marginTop: 15,
    marginRight: 40,
    marginLeft: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default connect()(AddQuestion)
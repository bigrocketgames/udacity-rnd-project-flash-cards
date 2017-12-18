import React, { Component } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native'

class AddQuestion extends Component {
  state = {
    question: '',
    answer: ''
  }

  render() {
    const { question, answer } = this.state
    console.log(this.props)

    return (
      <View>
        <Text>
          Add a new question and answer to the {this.props.navigation.state.params.deckId} deck.
        </Text>
        <KeyboardAvoidingView>
          <TextInput multiline={true} value={question}></TextInput>
          <TextInput multiline={true} value={answer}></TextInput>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

export default AddQuestion
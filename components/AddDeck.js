import React, { Component } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableHighlight } from 'react-native'

import { saveDeckTitle } from '../utils/api'

class AddDeck extends Component {
  state = {
    deckTitle: ''
  }

  handleChange = (deckTitle) => {
    this.setState(() => ({
      deckTitle
    }))
  }

  handleSubmit = (deckTitle) => {
    const newDeck = { title: deckTitle, questions: []}
    saveDeckTitle(deckTitle, newDeck)
  }

  render() {
    const { deckTitle } = this.state

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.title}>Create A New Deck</Text>
        <View>
          <Text>Deck Name:</Text>
          <TextInput style={styles.inputBox} value={deckTitle} onChangeText={this.handleChange} />
        </View>
        <TouchableHighlight onPress={() => this.handleSubmit(deckTitle)}>
          <Text>Submit</Text>
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
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: '#757575',
    borderRadius: 10
  }
})

export default AddDeck
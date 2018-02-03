import React, { Component } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'

import { saveDeckTitle } from '../utils/api'
import { addDeckSuccess } from '../actions'
import { red } from '../utils/colors'

class AddDeck extends Component {
  state = {
    deckTitle: '',
    error: ''
  }

  handleChange = (deckTitle) => {
    this.setState(() => ({
      deckTitle
    }))
  }

  handleSubmit = (deckTitle) => {
    const newDeck = { title: deckTitle, questions: []}
    deckTitle = deckTitle.trim()
    
    if (deckTitle === '') {
      this.setState(() => ({
        error: "A new title is required to create a new deck."
      }))
      return
    } else {
      if (this.state.error !== '') {
        this.setState(() => ({
          error: ''
        }))
      }
    }

    // update redux
    this.props.addDeckSuccess(newDeck)

    // update db
    saveDeckTitle(deckTitle, newDeck)
      .then(() => {
        this.setState(()=> ({deckTitle: ''}))
        this.props.navigation.navigate(
          'DeckDetail',
          { deckId: deckTitle }
        )
      })
  }

  render() {
    const { deckTitle, error } = this.state
    let errorText = null

    if (error.length > 0) {
      errorText = <Text style={styles.errorText}>{error}</Text>
    }

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.title}>Create A New Deck</Text>
        {errorText}
        <View>
          <Text style={{alignSelf: 'center'}}>Input A New Deck Name:</Text>
          <TextInput style={styles.inputBox} value={deckTitle} onChangeText={this.handleChange} />
        </View>
        <TouchableHighlight style={styles.submitbtn} onPress={() => this.handleSubmit(deckTitle)}>
          <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>Submit</Text>
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
  },
  errorText: {
    color: 'red',
    fontSize: 15
  }
})

export default connect(null, {addDeckSuccess})(AddDeck)
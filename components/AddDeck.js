import React, { Component } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'

import { saveDeckTitle } from '../utils/api'
import { addDeckSuccess } from '../actions'
import { red } from '../utils/colors'

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
    const { dispatch } = this.props
    const newDeck = { title: deckTitle, questions: []}

    // update redux
    dispatch(addDeckSuccess(newDeck))

    // update db
    saveDeckTitle(deckTitle, newDeck)
      .then(() => {
        this.setState(()=> ({deckTitle: ''}))
        this.props.navigation.navigate(
          'Home'
        )
      })
  }

  render() {
    const { deckTitle } = this.state

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.title}>Create A New Deck</Text>
        <View>
          <Text style={{alignSelf: 'center'}}>Input A New Deck Name:</Text>
          <TextInput style={styles.inputBox} value={deckTitle} onChangeText={this.handleChange} />
        </View>
        <TouchableHighlight style={styles.submitbtn} onPress={() => this.handleSubmit(deckTitle)}>
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
  }
})

export default connect()(AddDeck)
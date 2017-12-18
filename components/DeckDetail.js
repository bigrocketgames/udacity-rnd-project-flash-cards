import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { red } from '../utils/colors'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.deckId
    }
  }

  render () {
    const { deck } = this.props

    return (
      <View style={styles.deckContainer}>
        <View style={{alignItems: 'center', margin: 10, padding: 20}}>
          <Text style={styles.deckTitle}>{deck.title}</Text>
          <Text style={styles.deckCardCount}>{deck.questions.length > 0 ? deck.questions.length : 0} questions </Text>
          <TouchableOpacity style={styles.submitbtn} onPress={() => this.props.navigation.navigate(
                'AddQuestion',
                { deckId: deck.title }
              )}>
          <Text>Add A Card</Text>
          </TouchableOpacity>
          {deck.questions.length > 0 ? <TouchableOpacity style={styles.submitbtn} onPress={() => this.props.navigation.navigate(
                'DeckQuiz',
                { deckId: deck.title }
              )}><Text>Start Quiz</Text></TouchableOpacity> : null}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deckContainer: {
    padding: 20,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
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
  deckTitle: {
    flexDirection: 'row',
    fontSize: 30,
    margin: 5
  },
  deckCardCount: {
    flexDirection: 'row',
    fontSize: 20,
    padding: 10
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

const mapStateToProps = (state, {navigation}) => {
  const { deckId } = navigation.state.params
  
  return {
    deck: state.filter((decks) => decks.title === deckId)[0]
  }
}

export default connect(mapStateToProps)(DeckDetail)
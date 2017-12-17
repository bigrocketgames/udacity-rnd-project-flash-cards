import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.deckId
    }
  }

  render () {
    const { deck } = this.props

    return (
      <View>
        <Text>{deck.title}</Text>
        <Text>{deck.questions.length > 0 ? deck.questions.length : 0} questions </Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate(
              'AddQuestion',
              { deckId: deck.title }
            )}>
        <Text>Add A Card</Text>
        </TouchableOpacity>
        {deck.questions.length > 0 ? <TouchableOpacity onPress={() => this.props.navigation.navigate(
              'DeckQuiz',
              { deckId: deck.title }
            )}><Text>Start Quiz</Text></TouchableOpacity> : null}
      </View>
    )
  }
}

const mapStateToProps = (state, {navigation}) => {
  const { deckId } = navigation.state.params
  
  return {
    deck: state.filter((decks) => decks.title === deckId)[0]
  }
}

export default connect(mapStateToProps)(DeckDetail)
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'

import { red, white } from '../utils/colors'

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
        </View>
            {deck.questions.length > 0 ? 
              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.submitbtn} onPress={() => this.props.navigation.navigate(
                  'AddQuestion',
                  { deck: deck }
                )}>
                  <Text style={{color: white}}>Add A Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitbtn} onPress={() => this.props.navigation.navigate(
                    'DeckQuiz',
                    { deck: deck }
                )}>
                  <Text style={{color: white}}>Start Quiz</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.submitbtn} onPress={() => this.props.navigation.navigate(
                  'DeckStudy',
                  { deck: deck }
                )}>
                  <Text style={{color: white}}>Study Up</Text>
                </TouchableOpacity>
              </View>
            : 
              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.submitbtn} onPress={() => this.props.navigation.navigate(
                  'AddQuestion',
                  { deck: deck }
                )}>
                  <Text style={{color: white}}>Add A Card</Text>
                </TouchableOpacity>
              </View>
            }
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
    ...Platform.select({
      ios: {
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,255,0.5)',
        shadowOffset: {
          width: 0,
          height: 3
        }
      },
      android: {
        // elevation: 5,
        borderWidth: 5,
        borderStyle: 'solid',
        borderColor: 'rgba(0, 0, 255, 0.2)',

      },
    })
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
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 35
  },
  submitbtn: {
    flex: 0.31,
    backgroundColor: red,
    borderRadius: 7,
    padding: 10,
    height: 40,
    marginRight: 'auto',
    marginLeft: 'auto',
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
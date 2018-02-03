import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Platform } from 'react-native'
import { red, white } from '../utils/colors'

const DeckHomeCard = (props) => {
  return(
    <View style={styles.deckContainer}>
      <View style={{alignItems: 'center', margin: 10}}>
        <Text style={{fontSize: 30}}>{props.deck.title}</Text>
        <Text style={{fontSize: 18}}>{props.deck.questions.length > 0 ? props.deck.questions.length : 0} questions</Text>
        <TouchableHighlight style={styles.deleteButton} onPress={() => props.deleteDeck(props.deck)}>
          <Text style={{color: white, fontWeight: 'bold', fontSize: 18}}>
            Delete Deck
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  )
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
    margin: 12,
    padding: 10
  },
  deckCardCount: {
    flexDirection: 'row',
    margin: 12,
    padding: 10
  },
  deleteButton: {
    height: 30,
    marginTop: 30,
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: red,
  }
})


export default DeckHomeCard
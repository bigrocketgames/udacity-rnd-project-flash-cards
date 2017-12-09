import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const DeckHomeCard = ({deck}) => {
  return(
    <View style={styles.deckContainer}>
      <TouchableOpacity style={{alignItems: 'center', margin: 10, padding: 20}}>
        <Text style={{fontSize: 30}}>{deck.title}</Text>
        <Text style={{fontSize: 18}}>{deck.questions.length} questions</Text>
      </TouchableOpacity>
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
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: {
      width: 0,
      height: 3
    }
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
  }
})


export default DeckHomeCard
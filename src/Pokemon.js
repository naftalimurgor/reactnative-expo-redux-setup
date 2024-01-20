import { Text, View, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { decrement, increment, incrementAmount } from './state/slices'
import { useGetPokemonByNameQuery } from './services/api'
const Pokemon = () => {
  // hook to access the state
  // hook to dispatch actions to update state, gives us a dispatch that takes the action as an argument
  const dispatch = useDispatch()
  const [text, setText] = useState(0)
  const { data, isLoading, error } = useGetPokemonByNameQuery('bulbasaur')
  // const [name, setName] = useState('')
  useEffect(() => {
    setTimeout(() => {
      console.log(error, data, isLoading)
    }, 2000);
  })
  return (
    <View style={styles.counterContainer}>
      <View style={styles.counterValue}>

        {error ? (
          <><Text>Oh no, there was an error</Text></>
        ) : isLoading ? (
          <><Text>Loading...</Text></>
        ) : data ? (
          <>
            <Text>{data.species.name}</Text>
            {/* <img src={data.sprites.front_shiny} alt={data.species.name} /> */}
            <Image source={{ uri: `${data.sprites.front_shiny}` }} />
          </>) : null
        }
      </View>
    </View>
  )
}

export default Pokemon

const styles = StyleSheet.create({
  counterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  counterValue: {
    // y-(vertical) axis
    justifyContent: 'center',
    // x(cross)-axis
    alignItems: 'center'
  },
  counterText: {
    fontSize: 18,
    fontWeight: '600'
  },
  input: {
    height: 50,
    width: 200,
    paddingStart: 10,
    borderColor: '#000',
    borderWidth: 2
  },
  button: {
    borderRadius: 25,
    width: 100,
    height: 50,
    backgroundColor: '#000',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'

  },
  buttonLabel: {
    color: '#fff'
  }
})
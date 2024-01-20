import { Text, View, StyleSheet, Button, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementAmount } from './state/slices'

const Counter = () => {
  // hook to access the state
  const count = useSelector((state) => state.counter.value)
  // hook to dispatch actions to update state, gives us a dispatch that takes the action as an argument
  const dispatch = useDispatch()
  const [text, setText] = useState(0)

  return (
    <View style={styles.counterContainer}>
      <View style={styles.counterValue}>
        <Text style={styles.counterText}>{count}</Text>
        <TextInput
          style={styles.input}
          defaultValue={""}
          onChangeText={(text) => setText(Number(text))}
        />
        <Pressable style={styles.button} onPress={() => {
          text > 0 ? dispatch(incrementAmount(text)) : dispatch(increment())
        }}>
          <Text style={styles.buttonLabel}>{text > 0 ? `Add ${text}` : 'Increment +'}</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => dispatch(decrement())}>
          <Text style={styles.buttonLabel}>Decrement -</Text>
        </Pressable>

      </View>
    </View>
  )
}

export default Counter

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
    width: 150,
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
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // uses immer under the hood to mutate the state in immutabe fashion
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementAmount: (state, action) => {
      state.value += action.payload
    }
  }

})

// action creators are generated for each case of the reducer function:
export const { increment, decrement, incrementAmount } = counterSlice.actions
// our reducer:
export default counterSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { client } from "../../fakeAPI/client";
import { useDispatch } from "react-redux";

// 1. posts initial state
const initialState = {
  posts: [],
  status: 'idle', // loading state
  error: null
}

// 2. posts slice, sets up everything
const postSlice = createSlice({
  name: 'posts',
  initialState,
  // all reducers go here:
  reducers: {
    // note the struture/syntax
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload)
      }
    },
    prepare: {
      reducer(state, action) {
        // logic omitted
      }
    },
    reactionAdded: {
      reducer(state, action) {
        // extract postId and reaction from the payload
        const { postId, reaction } = action.payload
        // find the existing post in the state
        const existingPost = state.posts.find(post => post.postId === postId)
        if (existingPost) {
          existingPost.reactions[reaction]++
        }
      }
    },
    postUpdated: {
      reducer(state, action) {
        const { id: postId, title, content } = action.payload
        const existingPost = state.posts.find(post => post.postId === postId)
        // my guess this uses immer to perform immutable updates to the state
        if (existingPost) {
          existingPost.title = title
          existingPost.content = content
        }
      }
    }
  }

})

export const fetchPosts = createAsyncThunk('posts/fetchposts', async () => {
  // we use a mocked client to mimick an HTTP response with GET, POST verbs
  const response = await client.get('/fakeApi/posts')
  return response.data
})

// Note:
// createAsyncThunk API generates thunks that automatically dispatch those "start/success/failure" actions for you.
// and that's so cool!

// How to dispatch a thunk function:
// thunk function can call: getState and dispatch anytime
// and must return an asynct function which becomes our thunk
// example:

export function fetchToDoById(id) {
  // note: dispatch and getstate functions
  // this is our thunk function for fetchTodoById
  return async function fetchToDoByIdThunk(dispatch, getState) {
    const response = await client.get(`/fakeApi/todo/${id}`)
    dispatch(todosLoaded(response.data))
  }
}

// Arrow functions:
// export const fetchTodoById = todoId => async dispatch => {
//   const response = await client.get(`/fakeApi/todo/${todoId}`)
//   dispatch(todosLoaded(response.todos))
// }

// calling the thunk function inside a component
function TodoComponent({todoId}) {
  const dispatch = useDispatch()
  const onFectchTodClick = () => {
    // calls our fetchToDoByIdThunk()
    dispatch(fetchToDoById(id))
  }
}

export const { postAdded, postUpdated, reactionAdded } = postSlice

export default postSlice.postReducer

// state is a parameter that will come from the useSelector hook and shall be passed to useselector with state in scope
export const selectAllPosts = state => state.posts
export const selectPostsById = (state, postId) => state.posts.find(post => post.id === postId)
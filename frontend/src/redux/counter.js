import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.push(...action.payload)
      console.log("POSTS ADDED - " + JSON.stringify(...state))
    },
    addPost: (state, action) => {
      state.push(action.payload)
    },
    deletePost: (state,action) => {
      console.log([...state])
      state.filter((w) => w.id !== action.payload)
      console.log(JSON.stringify(...state))
    }
  },
})

// Action creators are generated for each case reducer function
export const { addPost, setPosts, deletePost } = counterSlice.actions

export default counterSlice.reducer
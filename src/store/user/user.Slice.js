import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    error: null,
    isLoading : false
  },
  reducers: {
   
    checkUserSession: (state) => {
    },
    resetCurrentUser : (state) => {
      state.currentUser = null
    },
    startSignUp: (state, action) => {
    },
    signupFailed : (state, action) => {
      state.error = action.payload
    },
    StartSignInWithEmailAndPassword : (state, action) => {
      state.isLoading = true 
    },
    StartSignInwithGoogle : (state) => {
      state.isLoading = true
    },
    SignInSuccess : (state, action) => {
      state.error = null
      state.currentUser = action.payload
      state.isLoading = false
    },
    SignInFailed : (state, action) =>{
      state.error = action.payload
      state.isLoading = false
    },
    signoutStart : (state) => {
    },
    signoutSuccess : (state) => {
      state.currentUser = null
    },
    signoutFailed : (state, action) => {
      state.error = action.payload
    },
    
  }
})

export const { checkUserSession, resetCurrentUser, StartSignInWithEmailAndPassword, StartSignInwithGoogle, SignInSuccess, SignInFailed, signoutStart, signoutSuccess, signoutFailed, startSignUp, signupSuccess, signupFailed  } = userSlice.actions

export default userSlice.reducer
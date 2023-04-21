import { createSlice } from '@reduxjs/toolkit'

export interface NavModalState {
    open: boolean
}

const initialState: NavModalState = {
    open: false,
}

export const navModalSlice = createSlice({
    name: 'navModal',
    initialState,
    reducers: {
        open: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.open = true
        },
        close: (state) => {
            state.open = false
        },
    },
})

// Action creators are generated for each case reducer function
export const { open, close } = navModalSlice.actions

export default navModalSlice.reducer
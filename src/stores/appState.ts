import { configureStore } from '@reduxjs/toolkit'
import navModalReducer from "./postItemSlice";

export const store = configureStore({
    reducer: {
        navModal: navModalReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
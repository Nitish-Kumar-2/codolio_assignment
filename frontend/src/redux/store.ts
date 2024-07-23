import { configureStore } from '@reduxjs/toolkit'
import getAllTransaction from './slice/getAllTransaction'
import addTransaction from './slice/addTransaction'
import getIncome from './slice/getIncome'
import updateTransaction from './slice/updateTransaction'
import getTotal from './slice/getTotal'
export const store = configureStore({
  reducer: {
    trasaction:addTransaction,
    data:getAllTransaction,
    income:getIncome,
    update:updateTransaction,
    total:getTotal
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
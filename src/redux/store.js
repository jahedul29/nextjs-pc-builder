import { configureStore } from '@reduxjs/toolkit'
import { api } from './api/apiSlice'
import pcBuildSlice from './features/pc-build/pcBuildSlice'

export const store = configureStore({
    reducer: {
        pcBuild: pcBuildSlice,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})
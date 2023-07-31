import { configureStore } from '@reduxjs/toolkit'
import pcBuildSlice from './features/pc-build/pcBuildSlice'

export const store = configureStore({
    reducer: {
        pcBuild: pcBuildSlice,
    },
})
import { configureStore } from "@reduxjs/toolkit";
import { campersSlice } from "./campers/slice";
import { favouritesSlice, FavouritesState } from "./favourites/slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "favourites",
  storage,
};

const persistedFavouritesReducer = persistReducer<FavouritesState>(
  persistConfig,
  favouritesSlice,
);
export const store = configureStore({
  reducer: {
    campers: campersSlice,
    favourites: persistedFavouritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

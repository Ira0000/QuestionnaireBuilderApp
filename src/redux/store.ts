import { configureStore } from "@reduxjs/toolkit";
import { questionnairesSlice } from "./questionnaires/slice";
import { favouritesSlice, FavouritesState } from "./responses/slice";
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
  key: "responses",
  storage,
};

const persistedResponsesReducer = persistReducer<FavouritesState>(
  persistConfig,
  favouritesSlice,
);
export const store = configureStore({
  reducer: {
    questionnaires: questionnairesSlice,
    responses: persistedResponsesReducer,
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

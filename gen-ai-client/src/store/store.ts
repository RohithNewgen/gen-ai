import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
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
import type { PersistPartial } from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import CryptoJS from "crypto-js";

import workflowSlice from "./reducers/workflow/workflowSlice";
import userSlice from "./reducers/user/userSlice";

const rootReducer = combineSlices(workflowSlice, userSlice);
export type RootState = ReturnType<typeof rootReducer>;

export type RootStateWithPersist = RootState & PersistPartial;

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["workflow", "sidebar", "common"],
    whitelist: [],
    transforms: [
        {
            in: (state: RootState) => encryptState(state),
            out: (state: string) => decryptState(state),
        },
    ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const encryptState = (state: RootState) => {
    return CryptoJS.AES.encrypt(
        JSON.stringify(state),
        import.meta.env.REACT_APP_CRYPTO_JS_SECRET
    ).toString();
};

const decryptState = (encryptedState: string) => {
    return JSON.parse(
        CryptoJS.AES.decrypt(
            encryptedState,
            import.meta.env.REACT_APP_CRYPTO_JS_SECRET
        ).toString(CryptoJS.enc.Utf8)
    );
};

export const makeStore = (preloadedState?: RootStateWithPersist) => {
    const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                },
            }).concat(logger),
        preloadedState,
    });
    setupListeners(store.dispatch);
    return store;
};

export const store = makeStore();

export const persistor = persistStore(store);

export type Persistor = typeof persistor;

export type AppStore = typeof store;

export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>;

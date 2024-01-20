## Expo Redux simple setup example

### 1. Installing redux

```sh
yarn add react-redux
yarn add redux-thunk
yarn add redux-persist
yarn add @react-native-async-storage/async-storage
```

### 2. Adding Redux to your project.
Note: Root layout may vary with `expo-router`
1. Add `Provider`from redux, `PersistGate` from `redux-persist` to your root layout.

```javascript
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
```
Wrap Root Layout with both Components as Parent components

```javascript
export default function App() {
  return (
    <Provider>
        <PersistGate>
            <View style={styles.container}>
                <Navigator />
            </View>
        </PersistGate>
    </Provider>
  );
}
```

## Step2: Creating the `store`
Next we create two files, `store.js`, `reducer.js`

## Step3: Creating our first action
We create our first action inside `src/action/user.js`
- We create the action as a constant

```javascript
// src/actions/user.js
export const UPDATE_USERNAME = 'UPDATE_USERNAME'
```

- Next we create our action factory as follows:
```javascript
// src/actions/user.js
export const updateUsername = (username) => ({ type: UPDATE_USERNAME, username });
```

## Step4: Our first reducer
In `reducer.js`, we add our first ever reducer:
```javascript
// src/reducers/reducer.js
import {combineReducers} from 'redux'
import { UPDATE_USERNAME } from "../actions/user";

const user = (user={}, action) => {
  switch(action.type){
    case UPDATE_USERNAME:
      return {username: action.username}
    default:
      return user;
  }
}
export default combineReducers({user})
```

Finally export reducer like this:
```javascript
export default combineReducers({user})

```

## Step5: Let's now configure our `store`
Now that we have:
1. `UPDATE_USER` action and factory function
2. ```user``` reducer function all set up, lets configure the store!

### 2. Configuring the store:

```javascript
// src/state/store.js
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk`

import reducers from './reducers'
import {PersistStore, persistReducer} from 'redux-persist'
import autoMergerLevel2 from 'redux-persist/lib/stateReconciler/autoMergerLevel2'
import AsyncStore from `@react-native-async-storage/async-storage`

const persistConfig = {
  key: 'root',
  storage: AsyncStore,
  stateReconciler: autoMergerLevel2
}

```

## Step 6: Connect application with the store
import store and the persistor from insider of our `App.js` file:
```javascript
import {store, persistor} from './src/state/store.js'

```
Then pass them as props:

```javascript
export default function App() {
  return (
    <Provider>
    <PersistGate persistor={persistor} loading={null}>
    <View style={styles.container}>
        <Navigator />
      </View>
    </PersistGate>
   </Provider>
  )
}
```
## Part 2: Accessing and changing the state:
we get the username value using the `useSelector` hook then display on the screen

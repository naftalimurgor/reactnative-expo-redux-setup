import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import Counter from './src/Counter';
import { store } from './src/state/store';
export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Counter/>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

registerRootComponent(App)
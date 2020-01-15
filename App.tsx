import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Circle } from './src/components';

export default function App() {
  return (
    <View style={styles.container}>
      <Circle
        icons={[
          { name: 'pencil' },
          { name: 'globe' },
          { name: 'home' },
          { name: 'rocket' },
          { name: 'car' },
          { name: 'bluetooth' },
        ]}
      />
    </View>
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

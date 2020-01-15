import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Circle } from './src/components';

export default function App() {
  return (
    <View style={styles.container}>
      <Circle
        contentContainerStyle={{
          position: 'absolute',
          bottom: -190,
        }}
        icons={[
          {
            name: 'pencil',
            color: '#9BFF00'
          },
          {
            name: 'globe',
            color: '#009BFF'
          },
          {
            name: 'home',
            color: '#FF009B'
          },
          {
            name: 'bluetooth',
            color: '#9B00FF'
          },
          {
            name: 'car',
            color: '#00FF9B'
          },
          {
            name: 'rocket',
            color: '#FF9B00'
          },
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

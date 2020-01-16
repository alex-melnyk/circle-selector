import React, { useCallback, useMemo } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Circle } from './src/components';

const icons = [
  {
    name: 'globe',
    color: '#009BFF'
  },
  {
    name: 'pencil',
    color: '#9BFF00'
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
];

export default function App() {
  const animatedBgValue = useMemo(() => new Animated.Value(0), []);

  const interpolateConfig = useMemo(() => ({
    inputRange: icons.map((val, idx) => idx),
    outputRange: icons.map((val) => val.color)
  }), []);

  const handleAction = useCallback((index) => {
    Animated.spring(animatedBgValue, {
      delay: 8,
      toValue: index
    }).start();
  }, [animatedBgValue, icons]);

  const actualBg = animatedBgValue.interpolate(interpolateConfig);

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: actualBg }
      ]}
    >
      <Circle
        contentContainerStyle={{
          position: 'absolute',
          bottom: -190,
        }}
        icons={icons}
        onAction={handleAction}
      />
    </Animated.View>
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

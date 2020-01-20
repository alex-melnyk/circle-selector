import React, { useCallback, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Card, Circle } from './src/components';

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
    name: 'rocket',
    color: '#FF9B00'
  },
  {
    name: 'bluetooth',
    color: '#9B00FF'
  },
  {
    name: 'car',
    color: '#00FF9B'
  },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAction = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const cardsList = useMemo(() => {
    const currentIcon = icons[currentIndex];

    return [...new Array(5)].map((val, idx) => (
      <Card
        key={`card_${idx}`}
        icon={currentIcon.name}
        color={currentIcon.color}
      />
    ));
  }, [currentIndex]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 10,
          paddingBottom: 150
        }}
      >
        {cardsList}
      </ScrollView>
      <Circle
        contentContainerStyle={{
          alignSelf: 'center',
          position: 'absolute',
          bottom: -190,
        }}
        items={icons}
        onAction={handleAction}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

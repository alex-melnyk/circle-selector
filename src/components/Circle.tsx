import React, { useState } from 'react';
import { Animated, View } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State
} from 'react-native-gesture-handler';

type Props = {
  size: number;
};

export const Circle: React.FC<Props> = ({ size = 250 }) => {
  const [rotation, setRotation] = useState(0);
  const angleValue = new Animated.Value(0);

  const handleGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    angleValue.setValue(rotation + event.nativeEvent.translationX);
    // console.log(event.nativeEvent.translationX);
  };

  const handleHandlerStateChange = (event: PanGestureHandlerStateChangeEvent) => {
    switch (event.nativeEvent.state) {
      case State.END:
        const endingValue = rotation + event.nativeEvent.translationX;

        setRotation(endingValue);
        angleValue.setValue(endingValue);
        break;
    }
  };

  const angle = angleValue.interpolate({
    inputRange: [0, 720],
    outputRange: ['0deg', '720deg']
  });

  return (
    <>
      <PanGestureHandler
        onGestureEvent={handleGestureEvent}
        onHandlerStateChange={handleHandlerStateChange}
      >
        <View>
          <Animated.View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: '#9BFF00',
              transform: [
                { rotateZ: angle }
              ]
            }}
          >
            <View
              style={{
                width: 100,
                height: 100,
                backgroundColor: '#FF9B00'
              }}
            >
              <View
                style={{
                  width: 25,
                  height: 25,
                  backgroundColor: '#FF009B'
                }}
              />
            </View>
          </Animated.View>
        </View>
      </PanGestureHandler>
    </>
  );
};

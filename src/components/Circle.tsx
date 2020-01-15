import React, { useCallback, useMemo, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State
} from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

type Icon = {
  name: string;
};

type Props = {
  size?: number;
  iconSize?: number;
  icons: Icon[];
};

export const Circle: React.FC<Props> = ({
  size = 150,
  iconSize = 20,
  icons
}) => {
  const [rotation, setRotation] = useState(0);
  const [angleValue, setAngleValue] = useState(0);
  const animatedAngle = useMemo(() => new Animated.Value(0), []);

  const radius = useMemo(() => size / 2, [size]);
  const iconOffset = useMemo(() => radius - iconSize / 2, [radius, iconSize]);
  const iconsDegree = useMemo(() => 360 / icons.length, [icons]);

  const handleGestureEvent = useCallback((event: PanGestureHandlerGestureEvent) => {
    const angle = rotation + event.nativeEvent.translationX;

    setAngleValue(angle);
    animatedAngle.setValue(angle);
  }, [angleValue, rotation]);

  const handleHandlerStateChange = useCallback((event: PanGestureHandlerStateChangeEvent) => {
    switch (event.nativeEvent.state) {
      case State.END:
        const angle = rotation + event.nativeEvent.translationX;

        // const diff = endingValue % iconsDegree;
        // const setting = endingValue + (iconsDegree - diff);

        const comb = angle > 360 ? angle - 360 : angle < 0 ? 360 + angle : angle;

        setRotation(comb);
        setAngleValue(comb);
        animatedAngle.setValue(comb);

        break;
    }
  }, [angleValue, rotation]);

  const iconsList = useMemo(() => icons.map((icon, idx) => {
    const angle = idx * iconsDegree - 90 + angleValue;
    const x = iconOffset * Math.cos(Math.PI * 2 * angle / 360) + iconOffset;
    const y = iconOffset * Math.sin(Math.PI * 2 * angle / 360) + iconOffset;

    return (
      <View
        key={`icon_${idx}`}
        style={{
          position: 'absolute',
          left: x - 2,
          top: y - 2,
          width: iconSize + 4,
          height: iconSize + 4,
          justifyContent: 'center',
          alignItems: 'center'
          // backgroundColor: 'yellow'
        }}
      >
        <FontAwesome
          name={icon.name}
          size={iconSize}
          color="black"
        />
      </View>
    );
  }), [icons, iconOffset, angleValue]);

  return (
    <>
      <PanGestureHandler
        onGestureEvent={handleGestureEvent}
        onHandlerStateChange={handleHandlerStateChange}
      >
        <View>
          <Animated.View
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              // overflow: 'hidden'
            }}
          >
            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}
            >
              {iconsList}
            </View>
          </Animated.View>
        </View>
      </PanGestureHandler>
    </>
  );
};

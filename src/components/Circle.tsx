import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Animated, StyleProp, View, ViewStyle } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State
} from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

type Icon = {
  name: string;
  color: string;
};

type Props = {
  size?: number;
  iconSize?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  icons: Icon[];
  onAction: (index: number) => void;
};

export const Circle: React.FC<Props> = ({
  size = 320,
  iconSize = 32,
  contentContainerStyle,
  icons,
  onAction
}) => {
  const [rotation, setRotation] = useState(0);
  const [angleValue, setAngleValue] = useState(0);
  const [changeState, setChangeState] = useState(State.UNDETERMINED);

  const animatedAngle = useMemo(() => new Animated.Value(0), []);

  const radius = useMemo(() => size / 2, [size]);
  const iconOffset = useMemo(() => radius - iconSize, [radius, iconSize]);
  const iconsDegree = useMemo(() => 360 / icons.length, [icons]);

  useEffect(() => {
    animatedAngle.addListener(({ value }) => {
      setAngleValue(value);
    });

    return () => animatedAngle.removeAllListeners();
  }, [animatedAngle, changeState]);

  const handleGestureEvent = useCallback((event: PanGestureHandlerGestureEvent) => {
    const angle = rotation + event.nativeEvent.translationX;

    const combined = angle > 360
      ? angle - 360
      : angle < 0
        ? 360 + angle
        : angle;

    animatedAngle.setValue(combined);
  }, [animatedAngle, rotation]);

  const handleHandlerStateChange = useCallback((event: PanGestureHandlerStateChangeEvent) => {
    setChangeState(event.nativeEvent.state);

    switch (event.nativeEvent.state) {
      case State.END: {
        const angle = rotation + event.nativeEvent.translationX;

        const combined = angle > 360
          ? angle - 360
          : angle < 0
            ? 360 + angle
            : angle;

        animatedAngle.setValue(combined);

        const animateAngle = combined % iconsDegree - iconsDegree / 2 > 0
          ? combined - (combined % iconsDegree - iconsDegree)
          : combined - (combined % iconsDegree);

        Animated.spring(animatedAngle, {
          delay: 8,
          bounciness: 10,
          toValue: animateAngle
        }).start(() => setRotation(animateAngle));

        const index = Math.floor(animateAngle / 360 * icons.length);
        onAction(index >= icons.length ? 0 : index);
        break;
      }
    }
  }, [animatedAngle, rotation, iconsDegree]);

  const iconsList = useMemo(() => icons.map((icon, idx) => {
    const angle = idx * iconsDegree - 90 + angleValue;
    const x = iconOffset * Math.cos(Math.PI * 2 * angle / 360) + (radius - iconSize / 2);
    const y = iconOffset * Math.sin(Math.PI * 2 * angle / 360) + (radius - iconSize / 2);

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

  const background = animatedAngle.interpolate({
    inputRange: [...[...new Array(icons.length)].map((val, idx) => 360 / icons.length * idx), 360],
    outputRange: [...icons.map((val, idx) => icons[idx].color), icons[0].color]
  });

  return (
    <>
      <PanGestureHandler
        onGestureEvent={handleGestureEvent}
        onHandlerStateChange={handleHandlerStateChange}
      >
        <View style={contentContainerStyle}>
          <Animated.View
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              overflow: 'hidden',
              backgroundColor: background
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

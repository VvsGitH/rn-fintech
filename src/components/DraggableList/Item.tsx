import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useAnimatedReaction,
  withSpring,
  withTiming,
  useSharedValue,
  runOnJS,
  SharedValue,
  Easing,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { COL, SIZE } from "./constants";
import { Positions } from "./types";
import { useScrollContext } from "../ScrollView";

interface ItemProps {
  children: ReactNode;
  positions: SharedValue<Positions>;
  id: string;
  onDragEnd: (diffs: Positions) => void;
}

export default function Item({ children, positions, id, onDragEnd }: ItemProps) {
  const { scrollY, maxScrollY, scrollTo } = useScrollContext();
  const isGestureActive = useSharedValue(false);

  const position = getPosition(positions.value[id]);
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      isGestureActive.value = true;
    })
    .onChange((e) => {
      translateX.value += e.changeX;
      translateY.value += e.changeY;
      // 1. We calculate where the tile should be
      const newOrder = getOrder(translateX.value, translateY.value, Object.keys(positions.value).length - 1);
      // 2. We swap the positions
      const oldOlder = positions.value[id];
      if (newOrder !== oldOlder) {
        const idToSwap = Object.keys(positions.value).find((key) => positions.value[key] === newOrder);
        if (idToSwap) {
          const newPositions = { ...positions.value, [id]: newOrder, [idToSwap]: oldOlder };
          positions.value = newPositions;
        }
      }
      // 3. Scroll up and down if necessary
      if (e.absoluteY < 150 && scrollY!.value > 0) {
        const diff = 10;
        scrollTo!(scrollY!.value - diff);
        translateY.value -= diff;
      }
      if (e.absoluteY > maxScrollY!.value + 70 && scrollY!.value < maxScrollY!.value) {
        const diff = 10;
        scrollTo!(scrollY!.value + diff);
        translateY.value += diff;
      }
    })
    .onEnd(() => {
      // Re-allign the current item with the grid when it's released
      const newPosition = getPosition(positions.value[id]);
      translateX.value = withTiming(newPosition.x, animationConfig);
      translateY.value = withTiming(newPosition.y, animationConfig);
    })
    .onFinalize(() => {
      isGestureActive.value = false;
      runOnJS(onDragEnd)(positions.value);
    });

  // Re-allign the item with the grid when it's position in the array changes, even if it's not the touched one
  useAnimatedReaction(
    () => positions.value[id],
    (newOrder) => {
      if (!isGestureActive.value) {
        const pos = getPosition(newOrder);
        translateX.value = withTiming(pos.x, animationConfig);
        translateY.value = withTiming(pos.y, animationConfig);
      }
    }
  );

  const style = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 100 : 0;
    const scale = withSpring(isGestureActive.value ? 1.05 : 1);
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: SIZE,
      height: SIZE,
      zIndex: zIndex,
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale }],
    };
  });

  return (
    <Animated.View style={style}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={StyleSheet.absoluteFill}>{children}</Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}

export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350,
};

function getPosition(position: number) {
  "worklet";

  return {
    x: position % COL === 0 ? 0 : SIZE * (position % COL),
    y: Math.floor(position / COL) * SIZE,
  };
}

function getOrder(tx: number, ty: number, max: number) {
  "worklet";

  const x = Math.round(tx / SIZE) * SIZE;
  const y = Math.round(ty / SIZE) * SIZE;
  const row = Math.max(y, 0) / SIZE;
  const col = Math.max(x, 0) / SIZE;
  return Math.min(row * COL + col, max);
}

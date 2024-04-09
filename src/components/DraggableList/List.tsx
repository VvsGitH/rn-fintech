import React, { ReactElement } from "react";
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

import Item from "./Item";
import { COL, SIZE } from "./constants";
import { Positions } from "./types";

interface ListProps {
  children: ReactElement<{ id: string }>[];
  onDragEnd: (diff: Positions) => void;
}

export default function List({ children, onDragEnd }: ListProps) {
  const scrollView = useAnimatedRef<Animated.ScrollView>();

  const scrollY = useSharedValue(0);
  const positions = useSharedValue<Positions>(
    children.reduce<Positions>((obj, child, index) => ((obj[child.props.id] = index), obj), {})
  );

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      scrollY.value = y;
    },
  });

  return (
    <Animated.ScrollView
      onScroll={onScroll}
      ref={scrollView}
      contentContainerStyle={{
        height: Math.ceil(children.length / COL) * SIZE,
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}
    >
      {children.map((child) => (
        <Item
          key={child.props.id}
          positions={positions}
          id={child.props.id}
          onDragEnd={onDragEnd}
          scrollView={scrollView}
          scrollY={scrollY}
        >
          {child}
        </Item>
      ))}
    </Animated.ScrollView>
  );
}

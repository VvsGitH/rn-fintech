import React, { ReactElement } from "react";
import { View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import Item from "./Item";
import { COL, SIZE } from "./constants";
import { Positions } from "./types";

interface ListProps {
  children: ReactElement<{ id: string }>[];
  onDragEnd: (diff: Positions) => void;
}

export default function List({ children, onDragEnd }: ListProps) {
  const positions = useSharedValue<Positions>(
    children.reduce<Positions>((obj, child, index) => ((obj[child.props.id] = index), obj), {})
  );

  return (
    <View style={{ height: Math.ceil(children.length / COL) * SIZE }}>
      {children.map((child) => (
        <Item key={child.props.id} positions={positions} id={child.props.id} onDragEnd={onDragEnd}>
          {child}
        </Item>
      ))}
    </View>
  );
}

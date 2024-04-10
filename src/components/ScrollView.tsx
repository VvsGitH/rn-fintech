import { createContext, useCallback, useContext, useMemo } from "react";
import Animated, {
  AnimatedScrollViewProps,
  useAnimatedRef,
  useSharedValue,
  SharedValue,
  useAnimatedScrollHandler,
  scrollTo as scrollTo_reanimated,
} from "react-native-reanimated";

interface IScrollContext {
  scrollY?: SharedValue<number>;
  maxScrollY?: SharedValue<number>;
  scrollTo?: (to: number) => void;
}

export const ScrollContext = createContext<IScrollContext>({});

export function ScrollView(props: AnimatedScrollViewProps) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);
  const maxScrollY = useSharedValue(-1);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      scrollY.value = y;
    },
    onEndDrag: (e) => {
      const contentHeight = e.contentSize.height - e.contentInset.top - e.contentInset.bottom;
      const scrollerHeight = e.layoutMeasurement.height;
      maxScrollY.value = contentHeight - scrollerHeight;
    },
  });

  const scrollTo = useCallback(
    (to: number) => {
      "worklet";
      scrollTo_reanimated(scrollRef, 0, to, false);
    },
    [scrollRef]
  );

  const contextValue = useMemo(() => ({ scrollTo, scrollY, maxScrollY }), [scrollTo, scrollY, maxScrollY]);

  return (
    <ScrollContext.Provider value={contextValue}>
      <Animated.ScrollView {...props} ref={scrollRef} onScrollEndDrag={handleScroll} />
    </ScrollContext.Provider>
  );
}

export function useScrollContext() {
  return useContext(ScrollContext);
}

import * as React from "react";
import { Animated, Easing, View } from "react-native";
import { themeColors } from "./themeColors";

const AnimatedStars: React.FC = () => {
  const count = 3;
  const color = themeColors.yellow;
  const size = 20;

  const starScales = React.useMemo<Animated.Value[]>(
    () => Array.from({ length: count }, () => new Animated.Value(1)),
    []
  );
  const starOpacities = React.useMemo<Animated.Value[]>(
    () => Array.from({ length: count }, () => new Animated.Value(1)),
    []
  );

  React.useEffect(() => {
    const animations = starScales.map((scale, i) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(i * 250),
          Animated.parallel([
            Animated.timing(scale, {
              toValue: 1.3,
              duration: 350,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(starOpacities[i], {
              toValue: 0.7,
              duration: 350,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(scale, {
              toValue: 1,
              duration: 350,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(starOpacities[i], {
              toValue: 1,
              duration: 350,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
        ])
      );
    });
    animations.forEach(anim => anim.start());
    return () => { animations.forEach(anim => anim.stop()); };
  }, [starScales, starOpacities]);

  return (
    <View style={{ flexDirection: 'row', marginHorizontal: 8 }} accessible accessibilityLabel="Animated stars">
      {Array.from({ length: count }).map((_, i) => (
        <Animated.Text
          key={i}
          style={{
            fontSize: size,
            color,
            marginHorizontal: 2,
            transform: [{ scale: starScales[i] }],
            opacity: starOpacities[i],
          }}
          accessibilityLabel="Star"
          accessibilityRole="image"
        >
          ★
        </Animated.Text>
      ))}
    </View>
  );
};

export default AnimatedStars;

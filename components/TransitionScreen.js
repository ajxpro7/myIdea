// components/TransitionScreen.js
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useNavigationState } from '@react-navigation/native';

// export default function TransitionScreen({ children }) {
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const navigationState = useNavigationState(state => state);

//   useEffect(() => {
//     // Reset animatie bij elke navigation state change
//     fadeAnim.setValue(0);
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   }, [navigationState]); // Trigger bij elke navigatie

//   return (
//     <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
//       {children}
//     </Animated.View>
//   );
// }

export default function TransitionScreen({children}) {
  const fadeAnim = useRef(new Animated.Value(1)).current; // Start met opacity 1

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []); // Lege dependency array - alleen bij mount/unmount

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
}
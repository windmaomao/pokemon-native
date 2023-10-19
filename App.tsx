import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Home } from "./Home";
import Example from "./Example";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Example />
    </GestureHandlerRootView>
  );
}

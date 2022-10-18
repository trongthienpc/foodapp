import { Provider } from "react-redux";
import Navigators from "./src/navigators";
import { Store } from "./src/store/Store";

export default function App() {
  return (
    <Provider store={Store}>
      <Navigators />
    </Provider>
  );
}

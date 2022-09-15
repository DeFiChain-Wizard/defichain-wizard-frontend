import { registerRootComponent } from 'expo';
import codePush from "react-native-code-push";

import App from './App';

const CodePushedApp = codePush({
  checkFrequency: codePush.CheckFrequency.MANUAL,
})(App)

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(CodePushedApp);

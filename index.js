/**
 * @format
 */
import {AppRegistry} from 'react-native';
import app from './app/index.js';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => app);

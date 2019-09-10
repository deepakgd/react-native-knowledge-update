import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  Platform,
  View,
  StatusBar,
  DrawerLayoutAndroid,
} from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';


import reducer from './app/Redux/reducers';
import { setNavigator, setActiveRoute } from "./app/Redux/actions";
import DrawerContent from './app/Navigation/DrawerContent';
import Toolbar from './app/Navigation/Toolbar';
import AppNavigation from './app/Navigation/AppNavigation';
import { bgStatusBar, bgDrawer } from './app/global.styles';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from 'react-native-firebase';

let store = createStore(reducer);
/* getDrawerWidth       Default drawer width is screen width - header width
* https://material.io/guidelines/patterns/navigation-drawer.html
*/
const getDrawerWidth = () => Dimensions.get('window').width - (Platform.OS === 'android' ? 56 : 64);

export default class App extends Component {
  constructor() {
    super();

    this.drawer = React.createRef();
    this.navigator = React.createRef();
  }

  async componentDidMount() {
    store.dispatch(setNavigator(this.navigator.current));

    //this will get initial notification
    // when can we use this: this can be use if app running in background at that time
    // we receive notification, during on tap of notification we will get data
    const notificationOpen = await firebase.notifications().getInitialNotification();
    console.log("--", notificationOpen)
    if (notificationOpen) {
      const action = notificationOpen.action;
      const notification = notificationOpen.notification;
      var seen = [];
      // if you send custom data in additional option you can access those data like below
      alert(JSON.stringify(notification.data, function(key, val) {
          if (val != null && typeof val == "object") {
              if (seen.indexOf(val) >= 0) {
                  return;
              }
              seen.push(val);
          }
          return val;
      }));
    }
    const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
                .setDescription('My apps test channel');

    // Create the channel
    firebase.notifications().android.createChannel(channel);

    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        console.log("invoked display listener")
    });

    this.notificationListener = firebase.notifications().onNotification((notification) => {
      // Process your notification as required
      console.log("invoked onnotification listener")

      notification
          .android.setChannelId('test-channel')
      firebase.notifications()
          .displayNotification(notification);
        
    });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      console.log("invoked notification open")
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification = notificationOpen.notification;
        var seen = [];
        alert(JSON.stringify(notification.data, function(key, val) {
            if (val != null && typeof val == "object") {
                if (seen.indexOf(val) >= 0) {
                    return;
                }
                seen.push(val);
            }
            return val;
        }));
        firebase.notifications().removeDeliveredNotification(notification.notificationId);
    });

    this.messageListener = firebase.messaging().onMessage((message) => {
      // Process your message as required
      console.log("message listener")
    });
    setTimeout(()=> this.notificationListener(), 3000)
  } 

  componentWillUnmount() {
      this.notificationDisplayedListener();
      // this.notificationListener();
      this.notificationOpenedListener();
      this.messageListener();
  }



  openDrawer = () => {
    this.drawer.current.openDrawer();
  };

  closeDrawer = () => {
    this.drawer.current.closeDrawer();
  }; 
 
  getActiveRouteName = navigationState => {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return getActiveRouteName(route);
    }
    return route.routeName;
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Provider store={store}> 
          <DrawerLayoutAndroid
            drawerWidth={getDrawerWidth()}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={
              () => <DrawerContent closeDrawer={this.closeDrawer} />
            }
            drawerBackgroundColor={bgDrawer}
            ref={this.drawer}
          >
            <View style={styles.container}>
              <StatusBar
                  translucent
                  backgroundColor={bgStatusBar}
                  animated
              />
              <Toolbar showMenu={this.openDrawer} />
              <AppNavigation
                onNavigationStateChange={(prevState, currentState) => {
                  const currentScreen = this.getActiveRouteName(currentState);
                  store.dispatch(setActiveRoute(currentScreen));
                }}
                ref={this.navigator}
              />
            </View>
          </DrawerLayoutAndroid>
        </Provider>
        {/* common notification component */}
        <DropdownAlert ref={ref => global.dropDownAlertRef = ref}  closeInterval={2000} tapToCloseEnabled={true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

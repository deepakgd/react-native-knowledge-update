import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  Platform,
  View,
  StatusBar,
  DrawerLayoutAndroid, Alert
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
import AsyncStorage from '@react-native-community/async-storage';

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

  // async componentDidMount() {
  //   store.dispatch(setNavigator(this.navigator.current));

  //   //this will get initial notification
  //   // when can we use this: this can be use if app running in background at that time
  //   // we receive notification, during on tap of notification we will get data
  //   const notificationOpen = await firebase.notifications().getInitialNotification();
  //   console.log("--", notificationOpen)
  //   if (notificationOpen) {
  //     const action = notificationOpen.action;
  //     const notification = notificationOpen.notification;
  //     var seen = [];
  //     // if you send custom data in additional option you can access those data like below
  //     alert(JSON.stringify(notification.data, function(key, val) {
  //         if (val != null && typeof val == "object") {
  //             if (seen.indexOf(val) >= 0) {
  //                 return;
  //             }
  //             seen.push(val);
  //         }
  //         return val;
  //     }));
  //   }
  //   const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
  //               .setDescription('My apps test channel');

  //   // Create the channel
  //   firebase.notifications().android.createChannel(channel);

  //   this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
  //       // Process your notification as required
  //       // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
  //       console.log("invoked display listener")
  //   });

  //   // this.notificationListener = firebase.notifications().onNotification((notification) => {
  //   //   // Process your notification as required
  //   //   console.log("invoked onnotification listener")
  //   //   alert("i got it")

  //   //   notification
  //   //       .android.setChannelId('test-channel')
  //   //   firebase.notifications()
  //   //       .displayNotification(notification);
        
  //   // });

  //   console.log("listener created")

  //   this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
  //     console.log("invoked notification open")
  //       // Get the action triggered by the notification being opened
  //       const action = notificationOpen.action;
  //       // Get information about the notification that was opened
  //       const notification = notificationOpen.notification;
  //       var seen = [];
  //       alert(JSON.stringify(notification.data, function(key, val) {
  //           if (val != null && typeof val == "object") {
  //               if (seen.indexOf(val) >= 0) {
  //                   return;
  //               }
  //               seen.push(val);
  //           }
  //           return val;
  //       }));
  //       firebase.notifications().removeDeliveredNotification(notification.notificationId);
  //   });

  //   this.messageListener = firebase.messaging().onMessage((message) => {
  //     // Process your message as required
  //     console.log("message listener")
  //   });


  //   this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
  //     // Process your token as required
  //     console.log("ANUJ",fcmToken);
  // });

  // this.notificationListener = firebase.notifications().onNotification((notification) => {
  //   const { title, body } = notification;
  //   console.log('onNotification:');
  // })
  // } 

  // componentWillUnmount() {
  //     // this.notificationDisplayedListener();
  //     // this.notificationOpenedListener();
  //     // this.notificationListener();
  //     // this.messageListener();
  //     this.onTokenRefreshListener();
  //   this.notificationListener;
  //   this.notificationOpenedListener;
  // }

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners(); //add this line
     this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
        // Process your token as required
        console.log("ANUJ",fcmToken);
    });
  }
  


  componentWillUnmount() {
     this.onTokenRefreshListener();
    this.notificationListener;
    this.notificationOpenedListener;
  }

  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      console.log('onNotification:');
   // this.showAlert(title, body);
      //alert('message');
      Alert.alert('Today');
      // const localNotification = new firebase.notifications.Notification({
      //   sound: 'sampleaudio',
      //   show_in_foreground: true,
      // })
      //   .setNotificationId(notification.notificationId)
      //   .setTitle(notification.title)
      //   // .setSubtitle(notification.subtitle)
      //   .setBody(notification.body)
      //   // .setData(notification.data)
      //   .android.setChannelId('fcm_default_channel') // e.g. the id you chose above
      //   .android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
      //   .android.setColor('#000000') // you can set a color here
      //   .android.setPriority(firebase.notifications.Android.Priority.High);
        

      // firebase.notifications()
      //   .displayNotification(localNotification)
      //   .catch(err => console.error(err));
    });


    const channel = new firebase.notifications.Android.Channel('fcm_default_channel', 'Demo app name', firebase.notifications.Android.Importance.High)
      .setDescription('Demo app description')
      .setSound('sampleaudio.mp3');
    firebase.notifications().android.createChannel(channel);

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      console.log('onNotificationOpened:');

      Alert.alert('Your child is present Today');
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      console.log('getInitialNotification:');
     this.props.navigation.navigate('Attendance');
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
     var text=JSON.stringify(message);
      var text1 = JSON.parse(text)._data.gcm_message;
      var text2=JSON.parse(text1).title;
      var text3=JSON.parse(text1).body;
     
    
      console.log(JSON.stringify(message));
      const notification = new firebase.notifications.Notification()
  .setNotificationId('notificationId')
  .setTitle(text2)
  .setBody(text3)
  .setData({
    key1: 'value1',
    key2: 'value2',
  });
  notification
  .android.setChannelId('channelId')
  .android.setSmallIcon('ic_launcher');
  firebase.notifications().displayNotification(notification);

    });
  }



  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        console.log('fcmToken:', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    console.log('fcmToken:', fcmToken);
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
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

import React, { Component } from 'react';
import { View,StyleSheet, Button, Text } from 'react-native';
import { LoginButton, AccessToken, LoginManager, ShareDialog, ShareApi } from 'react-native-fbsdk';


export default class FacebookComponent extends Component {
  componentDidMount() {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function(result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString()
          );
        }
      },
      function(error) {
        console.log('Login fail with error: ' + error);
      }
    );
  }

  shareLinkWithShareDialog = () => {
    console.log("invoked")
    var tmp = this;
    ShareDialog.canShow( {
      contentType: 'link',
      contentUrl: "https://facebook.com",
      contentDescription: 'Wow, check out this great site!',
    }).then(
      function(canShow) {
        if (canShow) {
          return ShareDialog.show( {
            contentType: 'link',
            contentUrl: "https://facebook.com",
            contentDescription: 'Wow, check out this great site!',
          });
        }
      }
    ).then(
      function(result) {
        if (result.isCancelled) {
          console.log('Share cancelled');
        } else {
          console.log('Share success with postId: '
            + result.postId);
        }
      },
      function(error) {
        console.log('Share fail with error: ' + error);
      }
    );
  }


  render() {
    return (
      <View style={styles.container}>
        <LoginButton
          publishPermissions={['email','publish_actions']}
          onLoginFinished={(error, result) => {
            if (error) {
              console.log(error);
              console.log('login has error: ' + result.error);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                console.log(data.accessToken.toString());
              });
            }
          }}
          onLogoutFinished={() => console.log('logout.')}
        />


        <Text>Link share</Text>
        <Button title="FB Share" onPress={this.shareLinkWithShareDialog}/>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import firebase from 'firebase';

import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'

class LoginScreen extends Component {

  constructor(props) {
    super(props)
    this.state = ({
      email: '',
      password: '',
    })
  }
  componentDidMount() {
    this.checkIfLoggedIn();
  }
  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      console.log('Auth state changed call')
      if (user) {
        this.props.navigation.navigate('DashboardScreen')
      }
      else {
        this.props.navigation.navigate('LoginScreen')
      }
    }.bind(this))
  }

  loginUser = (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
        console.log('user signed in');
      })

    }
    catch (error) {
      console.log(error.toString())
    }

  }

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        // Sign in with credential from the Google user.
        firebase.auth().signInAndRetrieveDataWithCredential(credential)
          .then(function (result) {
            console.log('user signed in');
            var nullusername = '0';
            firebase
              .database()
              .ref('/users/' + result.user.uid)
              .set({
                email: result.user.email,
                username: nullusername
                // profile_picture: result.additionalUserInfo.profile.picture,
                // fname: result.additionalUserInfo.profile.given_name,
                // lname: result.additionalUserInfo.profile.family_name
              })

          })
          .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this));
  };
  signInWithGoogleAsync = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        behavior: 'web',
        iosClientId: '908328550456-503nb84u7vold58831gghqajh706k4k6.apps.googleusercontent.com',
        scopes: ["profile", "email"]
      })
      if (result.type === "success") {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };
  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Text style={styles.titleText}>Finsta</Text>
          <Item floatingLabel >
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({ email })}
            />

          </Item>

          <Item floatingLabel >
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(password) => this.setState({ password })}
            />

          </Item>
          <Button style={{ marginTop: 20 }}
            full
            rounded
            success
            onPress={() => this.loginUser(this.state.email, this.state.password, this.state.name)}
          >
            <Text style={{ color: 'white' }}>Login</Text>
          </Button>

          <Button style={{ marginTop: 20 }}
            full
            rounded
            primary
            onPress={() => this.props.navigation.navigate('Signup')}
          >
            <Text style={{ color: 'white' }}>SignUp</Text>
          </Button>
          <Button style={{ marginTop: 80 }}
            full
            rounded
            primary
            onPress={() => this.signInWithGoogleAsync()}
          >
            <Text style={{ color: 'white' }}>Login with Google</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  }, titleText: {
    fontSize: 50,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 50,
  },
});


export default LoginScreen;

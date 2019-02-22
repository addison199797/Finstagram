import React, { Component } from 'react';
import { StyleSheet, View, Text, AlertIOS } from 'react-native';
import firebase from 'firebase';




import { Container, Form, Input, Item, Button, Label } from 'native-base'

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      email: '',
      password: ''
    })
    this.signUpUser = this.signUpUser.bind(this);
  }

  signUpUser() {
    if (this.state.password.length < 6) {
      alert("Please enter at least 6 characters")
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        var getEmail = user.email;
        var getuid = user.uid;
        var nullusername = '0';
        firebase
          .database()
          .ref('/users/' + getuid)
          .set({
            email: getEmail,
            username: nullusername
          })

      } else {
        // User is signed out.
        // ...
      }
    });
  }



  render() {
    return (
      <Container style={styles.container}>
        <Form>
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
            primary
            onPress={this.signUpUser}

          >
            <Text style={{ color: 'white' }}>SignUp</Text>
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
  },
});


export default SignUp;

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'


class SignupInfoScreen extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      username: '',
      fname: '',
      lname: '',
      gender: ''
    })
    this.signupInfo = this.signupInfo.bind(this);
  }

  signupInfo() {
    // here if needed:
    // var getEmail = this.props.navigation.getParam('email')
    // var getPassword = this.props.navigation.getParam('password')
    var getUsername = this.state.username;
    var getFname = this.state.fname;
    var getLname = this.state.lname;
    var getGender = this.state.gender;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.

        var getuid = user.uid;
        firebase
          .database()
          .ref('/users/' + getuid)
          .set({
          });
      } else {
        console.log('user not signed in');
      }
      var getuid = user.uid;
      firebase.database().ref('users/' + getuid).update({
        Fname: getFname,
        Lname: getLname,
        gender: getGender,
        username: getUsername,
        email: user.email
      });
    });
    this.props.navigation.navigate('app')
  }


  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel >
            <Label>Username</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(username) => this.setState({ username })}
            />

          </Item>

          <Item floatingLabel >
            <Label>First Name</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(fname) => this.setState({ fname })}
            />

          </Item>
          <Item floatingLabel >
            <Label>Last Name</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(lname) => this.setState({ lname })}
            />

          </Item>

          <Item floatingLabel >
            <Label>Gender</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(gender) => this.setState({ gender })}
            />

          </Item>

          <Button style={{ marginTop: 20 }}
            full
            rounded
            primary
            onPress={this.signupInfo}

          >
            <Text style={{ color: 'white' }}>Lets go!</Text>
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
  }
});
export default SignupInfoScreen;

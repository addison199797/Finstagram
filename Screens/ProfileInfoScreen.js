import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  AlertIOS
} from "react-native";
import firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Button, Body, Label, Icon, Title, Left, Right } from 'native-base'
import AntDesign from 'react-native-vector-icons/Entypo'

class ProfileInfoScreen extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      username: '',
      fname: '',
      lname: '',
      gender: '',
      bio: '',
    })
    this.signupInfo = this.signupInfo.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  componentWillMount() {
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + userId).once('value').then(snapshot => {
      var disbio = snapshot.val().bio;
      var disfname = snapshot.val().Fname;
      var dislname = snapshot.val().Lname;
      var dispusername = snapshot.val().username;
      var dispgender = snapshot.val().gender;
      var disbio = snapshot.val().bio;
      this.setState({ Tbio: disbio });
      this.setState({ Tfname: disfname });
      this.setState({ Tlname: dislname });
      this.setState({ Tusername: dispusername });
      this.setState({ Tgender: dispgender });
      this.setState({ Tbio: disbio });
    });
  }
  goBack() {
    this.props.navigation.navigate('ProfileTab')
  }
  logoutUser() {
    firebase.auth().signOut()
    this.props.navigation.navigate('Login')
  }
  signupInfo() {
    var getUsername = this.state.username;
    var getFname = this.state.fname;
    var getLname = this.state.lname;
    var getGender = this.state.gender;
    var getBio = this.state.bio;
    var userId = firebase.auth().currentUser.uid;
    if (getUsername != '') {
      firebase.database().ref('/users/' + userId).update({ username: getUsername })
    }
    if (getFname != '') {
      firebase.database().ref('/users/' + userId).update({ Fname: getFname })
    }
    if (getLname != '') {
      firebase.database().ref('/users/' + userId).update({ Lname: getLname })
    }
    if (getGender != '') {
      firebase.database().ref('/users/' + userId).update({ gender: getGender })
    }
    if (getBio != '') {
      firebase.database().ref('/users/' + userId).update({ bio: getBio })
    }
    this.props.navigation.navigate('ProfileTab')

  }
  // })
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (<Button transparent onPress={() => this.goBack}>< AntDesign name="back" style={{ paddingLeft: 10, fontSize: 32 }}></AntDesign></Button>),
      title: "Edit Profile"
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item>
            <Label>Username</Label>
            <Input
              placeholder={this.state.Tusername}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(username) => this.setState({ username })}
            />

          </Item>

          <Item>
            <Label>First Name</Label>
            <Input
              placeholder={this.state.Tfname}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(fname) => this.setState({ fname })}
            />

          </Item>
          <Item>
            <Label>Last Name</Label>
            <Input
              placeholder={this.state.Tlname}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(lname) => this.setState({ lname })}
            />

          </Item>

          <Item>
            <Label>Gender</Label>
            <Input
              placeholder={this.state.Tgender}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(gender) => this.setState({ gender })}
            />

          </Item>
          <Item>
            <Label>Bio</Label>
            <Input
              placeholder={this.state.Tbio}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(bio) => this.setState({ bio })}
            />

          </Item>

          <Button bordered dark style={{ marginTop: 20, borderColor: 'black' }}
            full
            primary
            onPress={this.signupInfo}

          >
            <Text style={{ color: 'black' }}>UPDATE!</Text>
          </Button>
          <Button bordered dark style={{ marginTop: 20, borderColor: 'red' }}
            full
            primary
            onPress={this.logoutUser}

          >
            <Text style={{ color: 'black' }}>LOGOUT:(</Text>
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
export default ProfileInfoScreen;

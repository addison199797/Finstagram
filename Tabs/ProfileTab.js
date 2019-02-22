import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Container, Content, Header, Form, Input, Item, Button, Body, Label, Icon, Title, Left, Right } from 'native-base'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import firebase from 'firebase';

class ProfileTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            followers: '',
            posts: '',
            following: '',
            email: '',
            fname: '',
            lname: ''
        };
    }

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <MaterialIcons name='person-outline' size={32} style={{ color: tintColor }} />
        )
    }
    componentWillMount() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + userId).once('value').then(snapshot => {
            var dispfollowers = snapshot.val().followerCount;
            var dispfollowing = snapshot.val().followingCount;
            var disposts = snapshot.val().postCount;
            var disbio = snapshot.val().bio;
            var disfname = snapshot.val().Fname;
            var dislname = snapshot.val().Lname;
            var dispusername = snapshot.val().username;
            var dispemail = snapshot.val().email;
            this.setState({ followers: dispfollowers });
            this.setState({ posts: disposts });
            this.setState({ following: dispfollowing });
            this.setState({ bio: disbio });
            this.setState({ fname: disfname });
            this.setState({ lname: dislname });
            this.setState({ username: dispusername });
            this.setState({ email: dispemail })
        });
    }
    render() {
        return (
            <Container style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                <Header>
                    <Left><EntypoIcon name="back-in-time" style={{ paddingLeft: 10, fontSize: 32 }}></EntypoIcon></Left>
                    <Body><Text style={{ fontWeight: 'bold', fontSize: 15, paddingDown: 5 }}>{this.state.username}</Text></Body>
                    <Right><Icon name="md-menu" style={{ paddingRight: 10 }}></Icon></Right>
                </Header>
                <Content>
                    <View style={{ paddingTop: 10 }}>
                        <View style={{ flexDirection: 'center' }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Image source={{ uri: 'https://vimcare.com/assets/empty_user-e28be29d09f6ea715f3916ebebb525103ea068eea8842da42b414206c2523d01.png' }}
                                    style={{ width: 120, height: 120, borderRadius: 60 }} />
                            </View>
                            <View style={{ flex: 3, paddingLeft: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: "space-around", paddingTop: 20 }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text>{0}</Text>
                                        <Text style={{ color: 'grey', fontSize: 10 }}>posts</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text>{0}</Text>
                                        <Text style={{ color: 'grey', fontSize: 10 }}>followers</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text>{0}</Text>
                                        <Text style={{ color: 'grey', fontSize: 10 }}>following</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'center', paddingTop: 20, paddingLeft: 76 }}>
                                    <Button bordered dark style={{ flex: 4, marginLeft: 10, justifyContent: 'center', height: 30, width: 200 }}
                                        onPress={() => this.props.navigation.navigate('ProfileInfo')}>
                                        <Text>Edit Profile</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={{ paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'grey' }}>
                            <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}>{this.state.bio}</Text>
                        </View>
                    </View>
                </Content>
            </Container>

        );
    }
}
export default ProfileTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});
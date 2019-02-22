import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
class LoadingScreen extends Component {
    componentDidMount() {
        this.checkIfLoggedIn();
    }
    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(function (user) {
            console.log('Auth state changed call')
            if (user) {
                var userId = user.uid;
                firebase.database().ref('users/' + userId).once('value').then(snapshot => {
                    var dispUsername = snapshot.val().username;
                    if (dispUsername == '0') {
                        this.props.navigation.navigate('SignupInfo')
                    } else {
                        this.props.navigation.navigate('app')
                    }
                });
            }
            else {
                this.props.navigation.navigate('auth')
            }
        }.bind(this))
    }

    render() {
        return (
            <View style={styles.container} >
                <ActivityIndicator size="large" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default LoadingScreen;


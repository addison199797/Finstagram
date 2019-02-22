import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { Container, Content, Header, Form, Input, Item, Button, Body, Label, Icon, Title, Left, Right } from 'native-base'

class HomeTab extends Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-home" style={{ color: tintColor }} />
        )
    }

    render() {
        return (
            <View style = {{flex: 1, alignItems: 'center',justifyContent: 'center', fontWeight: 'bold', fontSize: 20}}>
            <Text>Welcome to Finstagram!</Text>
            </View>
        );
    }
}
export default HomeTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

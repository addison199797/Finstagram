import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";


import { Container, Content, Header, Form, Input, Item, Button, Body, Label, Icon, Title, Left, Right } from 'native-base'
class CameraTab extends Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-add-circle" style={{ color: tintColor }} />
        )
    }

    render() {
        return (
        <Container style = {styles.container}>
            <Form>
            <Button bordered dark style = {{ marginTop: 20, borderColor: 'black', }}
                full
                primary


                >
                <Text style = {{color: 'black'}}>Take a Photo!</Text>
                </Button>
                <Button bordered dark style = {{ marginTop: 20, borderColor: 'black'}}
                full
                primary
                

                >
                <Text style = {{color: 'black'}}>Upload</Text>
                </Button>
            </Form>
        </Container>
        );
    }
}
export default CameraTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 10
    }
});
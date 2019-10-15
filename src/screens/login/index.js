import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { Button, Container, Form, Item, Input } from 'native-base'
import { LinearGradient } from "expo"
import styles from '../../styles'
const logoUrl = require("../../../assets/icon.png");
// import ModalForgotAccount from '../../modals/modalForgetAccount'

class Main extends Component {
    state = {
        user: { name: "", password: "" },
        modals: { forgotAccount: false }
    };

    handleText = (name, value: string) => {
        let { user } = this.state;
        user[name] = value;
        this.setState({ user })
    }

    handleModal = (name) => {
        let { modals } = this.state;
        modals[name] = !modals[name];
        this.setState({ modals })
    }

    render() {
        const { handlePages, openRegister } = this.props;
        const { modals } = this.state;
        return (
            <LinearGradient
                colors={['#d38a9d', '#7777a9', '#d38a9d']}
                style={styles.loginMain}>
                {/* <Container > */}
                <View style={[styles.loginViewContent]} >
                    <View style={styles.loginViewLogo}>
                        <Image source={logoUrl} style={{ width: 100, height: 100, marginBottom: 0 }} />
                    </View>
                    <Form >
                        <Item rounded bordered style={styles.formItems} >
                            <Input placeholder="Usuario" onChangeText={(text) => this.handleText("name", text)} />
                        </Item>
                        <Item rounded bordered style={styles.formItems}>
                            <Input secureTextEntry placeholder="Contraseña" onChangeText={(text) => this.handleText("password", text)} />
                        </Item>
                        <Button style={[styles.formItems, styles.backgroundPrimary]} rounded bordered block onPress={() => handlePages("home")} >
                            <Text style={styles.textSecondary} >Iniciar sesión</Text>
                        </Button>
                        {/* <TouchableOpacity block onPress={() => this.handleModal("forgotAccount")} >
                            <Text style={{ textAlign: "center" }} >
                                Se me olvidó la clave
                                </Text>
                        </TouchableOpacity> */}
                    </Form>
                    {/* <ModalForgotAccount open_modal={modals.forgotAccount} close_modal={() => this.handleModal("forgotAccount")} /> */}
                </View>
                {/* </Container> */}
            </LinearGradient>

        )
    }
}

export default Main;

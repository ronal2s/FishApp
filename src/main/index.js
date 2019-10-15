import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { Drawer, Container, Spinner, Text } from 'native-base'
import Modal from "react-native-modal";

import styles from '../styles'
import Header from '../header'
import Calendar from '../screens/employees'
import MyHome from '../screens/init'
import Login from '../screens/login'

const Loading = (props) => {
    const { loading } = props;
    return <Modal style={styles.modal} isVisible={loading}>
        <View style={{ flex: 1 }}>
            <Spinner color="#7777a9" />
        </View>
    </Modal>
}


const Pages = (props) => {
    const { screen, handlePages } = props;
    // return <Container style={styles.mainContent}>
    return <Container >
        {screen == "Calendar" && <Calendar />}
        {screen == "Inicio" && <MyHome handlePages={handlePages} />}
    </Container>
}

const MyHeader = (props) => {
    const { open, screen } = props;
    if (screen != "login") {
        return <Header open={open} />
    }
    return <Text />
}

//Hay un error  con el drawer, se necesita poner mainOverlay: 0, si no aparece super oscuro. O type = displace
class Main extends Component {
    state = {
        screen: "Inicio",
        loading: false,
    };

    handlePages = (page) => {
        let { screen } = this.state;

        this.setState({ loading: true });
        if (screen != "login") {
            this.drawer._root.close()
        }
        setTimeout(() => this.setState({ screen: page, loading: false }), 300);
    }

    handleModalFilter = () => {
        const { open_modal } = this.state;
        this.setState({ open_modal: !open_modal });
    }
    static navigationOptions = {
        header: null
    }
    render() {
        const { screen, loading, open_modal } = this.state;
        const { navigation } = this.props;
        if (screen == "login") {
            return <Login openRegister={() => navigation.navigate("Register")} handlePages={this.handlePages} />
        }
        return (
            <Drawer panOpenMask={5} type="displace" ref={(ref) => this.drawer = ref} onClose={() => this.drawer._root.close()}
                 >
                {/* <Container style={styles.main} >   */}
                <MyHeader screen={screen} open={() => this.drawer._root.open()} />
                <StatusBar backgroundColor="#2980b9" barStyle="light-content" />
                <Pages open_modal={open_modal} screen={screen} handlePages={this.handlePages} loading={loading} />
                {/* <Home loading={loading} screen={screen} handlePages={this.handlePages}/>                 */}
                {/* </Container> */}
            </Drawer>
        )
    }

}



export default Main;
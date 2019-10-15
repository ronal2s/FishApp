import React, { Component } from 'react'
import { Text, View, } from 'react-native'
import { Container, Content, List, Thumbnail, Footer, FooterTab } from 'native-base'
import { LinearGradient } from "expo"
import styles from '../styles'
import { PRIMARY_COLOR } from "../const"
import _ListItem from '../components/listItem'
import _Button from "../components/_Button";
import profileImg from "../../assets/Joshua.jpeg"



class SideBar extends Component {
    render() {
        const { handlePages, screen } = this.props;
        return <Container style={[styles.sideBar, { flex: 1 }]} >
            <LinearGradient style={styles.sidebarProfileView}
                colors={[PRIMARY_COLOR, PRIMARY_COLOR]}>
                <View  >
                    <Thumbnail style={[styles.sidebarProfileThumbnail]} source={profileImg} />
                    <Text style={[styles.textSecondary, {textAlign: "center"}]}>Joshua Díaz</Text>
                </View>
            </LinearGradient>
            <Content>
                <List>
                    <_ListItem actualScreen={screen} itemName={"Inicio"} handlePages={handlePages} />
                </List>
            </Content>
            <Footer>
                <FooterTab>
                    <_Button text="CERRAR SESÍON" danger />
                </FooterTab>
            </Footer>
        </Container>

    }
}

export default SideBar;


import React, { Component } from 'react'
import { Header, Left, Right, Body, Button, Icon, Title, } from 'native-base'
import styles from '../styles'
class HeaderContainer extends Component {
    render() {
        const { open } = this.props;
        return (
            <Header style={styles.header} noShadow>
                <Left>
                    {/* <Button transparent onPress={() => open()} >
                        <Icon style={styles.textSecondary} type="MaterialCommunityIcons" name="menu" />
                    </Button> */}
                </Left>
                <Body >
                    <Title style={[styles.textSecondary]}>FishApp</Title>
                </Body>
                <Right/>
                
            </Header>
        )
    }
}


export default HeaderContainer;
import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { ListItem, Icon, Left, Right, Body } from 'native-base'
import styles from "../../styles"

export default class MyItem extends Component {
    render() {
        const { handlePages, actualScreen, itemName, icon, iconName } = this.props;
        if (!icon) {
            return (
                <ListItem button noIndent style={actualScreen == itemName ? styles.listItemSelected : styles.listItemUnselected} onPress={() => handlePages(itemName)}>
                    <Left>
                        <Text style={actualScreen == itemName ? styles.listTextSelected : styles.listTextUnselected} >{itemName}</Text>
                    </Left>
                    <Right>
                        <Icon name="chevron-right" type="MaterialCommunityIcons" />
                    </Right>
                </ListItem>
            )
        }

        return (
            <ListItem button icon onPress={() => handlePages("login")}>
                <Left>
                    <Icon style={styles.icon} name={iconName} type="MaterialIcons" />
                </Left>
                <Body>
                    <Text >{itemName}</Text>
                </Body>
            </ListItem>
        )

    }
}

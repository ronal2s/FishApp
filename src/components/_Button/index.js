import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon, Text } from 'native-base'

export default class MyItem extends Component {
    Default = () => { }
    render() {
        const { width, marginTop, paddingRight, iconName, text, full, block, iconLeft, info, danger, warning, color, onPress } = this.props;
        const _onPress = onPress? onPress : this.Default;
        return (
            <Button onPress={_onPress} iconLeft={iconLeft} block={block} full={full} info={info} danger={danger} warning={warning} 
            style={{ backgroundColor: color, marginTop, width, paddingRight}} >
                {iconName && <Icon name={iconName} type="MaterialCommunityIcons" />}
                <Text>{text}</Text>
            </Button>
        )

    }
}

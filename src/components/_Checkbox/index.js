import React, { Component } from 'react';

import { ListItem, CheckBox, Body, Text } from 'native-base'

export default class MyItem extends Component {

    Default = () => { }

    render() {
        const { value, label, onPress } = this.props;
        const _onPress = onPress ? onPress : _onPress;
        return (
            <ListItem button onPress={_onPress} noBorder >
                <CheckBox checked={value} color="green" />
                <Body>
                    <Text>
                        {label}
                    </Text>
                </Body>
            </ListItem>
        )

    }
}

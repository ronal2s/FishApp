import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Input, Item, Label, Textarea } from 'native-base'

export default class MyItem extends Component {
    render() {
        const { rounded, name, value, onChange, label, numeric, width } = this.props;
        return (
            // <Item stackedLabel  rounded={rounded}   >
            //     <Label>{label}:</Label>
                <Textarea rowSpan={5} placeholder={label} value={value} onChangeText={(text) => onChange(name, text)}  />
            // </Item>
        )

    }
}

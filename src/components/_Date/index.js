import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {DatePicker, Input, Item, Label} from 'native-base'

export default class MyItem extends Component {
    render() {
        const { rounded, name, value, onChange, label, numeric, width } = this.props;
        return (
            <Item inlineLabel rounded={rounded}  style={{width}} >
                <Label>{label}:</Label>
                <DatePicker locale={"en"} placeHolderText="" />
            </Item>
        )

    }
}

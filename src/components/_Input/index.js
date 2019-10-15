import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Input, Item, Label } from 'native-base'
import styles from "../../styles"
export default class MyItem extends Component {
    Default = () => { }
    render() {
        const { rounded, name, required, value, placeholder, onChange, label, numeric, width } = this.props;
        const _value = value ? value : ""
        const _onChange = onChange ? onChange : this.Default;
        return (
            <Item inlineLabel rounded={rounded} style={{ width }} >

                {label && <Label >{`${required ? '*' : ''}${label}`}:</Label>}
                <Input placeholder={placeholder} value={_value.toString()} onChangeText={(text) => _onChange(name, text)} keyboardType={numeric ? "numeric" : "default"} />

            </Item>
        )

    }
}

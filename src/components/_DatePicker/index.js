import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Input, Item, Label, DatePicker } from 'native-base'
import styles from "../../styles"

export default class MyItem extends Component {
    Default = () => { }
    render() {
        const { rounded, name, required, value, onChange, label, numeric, width } = this.props;
        const _value = value ? value : ""
        const _onChange = onChange ? onChange : this.Default;
        return (
            <Item inlineLabel rounded={rounded} style={{ width }} >

                <Label >{`${required ? '*' : ''}${label}`}:</Label>
                <DatePicker placeHolderText="Seleccionar" onDateChange={(date) => _onChange(date)} />
            </Item>
        )

    }
}

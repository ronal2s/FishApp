import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Input, Item, Label, Icon, Picker, View } from 'native-base'

export default class MyItem extends Component {

    Default = () => { }
    render() {
        const { rounded, name, onChange, label, list, placeholder, width, value, paddingHorizontal } = this.props;
        _onChange = onChange != undefined ? onChange : this.Default;
        const _list = list ? list : ["Opción #1", "Opción #2", "Opción #3"]
        if (paddingHorizontal) {
            return (
                <View style={{ paddingHorizontal: 10 }}>
                    <Item picker style={{ width }} >
                        <Label>{label}</Label>
                        <Picker
                            mode="dialog"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder={placeholder}
                            // placeholderStyle={{ color: "#bfc6ea" }}
                            // placeholderIconColor="#007aff"
                            selectedValue={value}
                            onValueChange={(item) => _onChange(name, item)}
                        >
                            {_list.map((v, i) => {
                                return <Picker.Item label={v} value={v} key={i} />
                            })}
                        </Picker>
                    </Item>
                </View>
            )
        }
        return <Item picker style={{ width }} >
            {/* <Label>Label</Label> */}
            <Picker
                mode="dialog"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder={placeholder}
                // placeholderStyle={{ color: "#bfc6ea" }}
                // placeholderIconColor="#007aff"
                selectedValue={value}
                onValueChange={(item) => _onChange(name, item)}
            >
                {_list.map((v, i) => {
                    return <Picker.Item label={v} value={v} key={i} />
                })}
            </Picker>
        </Item>


    }
}
// <Input placeholder="Usuario" onChangeText={(text) => this.handleText("name", text)} />

const styles = StyleSheet.create({
    listItemSelected: {
        backgroundColor: "#126d99"
    },
    listTextSelected: {
        color: "#fafafa",
        fontWeight: "bold"
    },
    listTextUnselected: {
        color: "#126d99"
    },
    icon: {
        color: "#126d99"
    }
})

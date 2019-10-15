import React, { Component } from 'react'
import { Text, Animated, } from 'react-native'

class Employees extends Component {

    state = {
        x: new Animated.Value(-100)
    }

    componentDidMount() {        
        this.slide();
    }

    slide = () => {
        Animated.spring(this.state.x, {
            toValue: 0,
        }).start();
    };

    static navigationOptions = {
        header: null
    }

    render() {
        return (
                <Animated.View
                    style={[{ transform: [{ translateX: this.state.x }] }]}>
                    <Text>Hola</Text>
                </Animated.View>
        )
    }
}
export default Employees;

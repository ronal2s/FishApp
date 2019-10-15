import React, { Component } from 'react';
import { Text, Card, CardItem, Left, Thumbnail, Body, Image } from 'native-base'

export default class MyItem extends Component {
    render() {
        const { title, subtitle, body, icon, image } = this.props;
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={icon} square/>
                        <Body>
                            <Text>{title}</Text>
                            <Text note>{subtitle}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    {image && <Image source={image} style={{width: null, height:200, flex: 1 }} />}
                    {body && <Text note style={{paddingHorizontal: 10}}>{body}</Text>}
                </CardItem>                
            </Card>
        )

    }
}
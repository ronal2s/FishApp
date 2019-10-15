import React, { Component } from "react"
import Modal from "react-native-modal";
import { View } from "react-native";
import { Spinner } from "native-base"
import { COLORS } from "../../const/config"

const Loading = (props) => {
    const { loading } = props;
    return <Modal style={styles.modal} isVisible={loading}>
        <View style={{ justifyContent: "center", alignItems: "center" }} transparent={true}>
            <Spinner color={COLORS.PRIMARY} />
        </View>
    </Modal>
}

class _Loading extends Component {
    render() {
        const { loading } = this.props;
        return (
            <Loading loading={loading} />
        )
    }
}

export default _Loading;
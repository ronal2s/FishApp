import React, { Component } from 'react'
import { Image, ScrollView, TouchableOpacity } from 'react-native'
import { Text, Header, Body, Title, Icon, Left, Right, Button, Content, View, Grid, Row, Col, Form, CardItem, FooterTab, Footer } from 'native-base'
import Modal from "react-native-modal";
import axios from "axios";

import _Input from "../../components/_Input";
import _TextArea from "../../components/_TextArea";
import _Picker from "../../components/_Picker";
import _Checkbox from "../../components/_Checkbox";
import _Button from "../../components/_Button";
import styles from '../../styles'
import { PRIMARY_COLOR } from "../../const";
import API from "../../api"


const sizeTitle = 22;
const sizeText = 18;

const _Header = (props) => {
    const { OpenFriends, onCloseModal } = props;
    return (
        <Header style={styles.header} noShadow>
            <Left style={{ flexDirection: "row" }}>
                <View>
                    <TouchableOpacity onPress={onCloseModal}>
                        <Icon name="arrow-left" type="MaterialCommunityIcons" style={{ color: "white" }} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginLeft: 10 }} >
                    <Title style={styles.headerTitle}>
                        Detalles
                    </Title>
                </View>
            </Left>
            <Body />
        </Header>
    )
}


const _ModalPerdidas = (props) => {
    const { onCloseModal, open, form, onChangeText, onAddPerdidas } = props;
    return (
        <Modal isVisible={open} animationIn="slideInLeft" animationOut="slideOutRight"
            onBackButtonPress={onCloseModal} onBackdropPress={onCloseModal}  >
            <View style={{ height: 150, backgroundColor: "white", borderRadius: 10 }} >
                <Content style={{ padding: 10 }}>
                    <Form>
                        <Text style={{ color: PRIMARY_COLOR, fontWeight: "bold", fontSize: sizeTitle, textAlign: "center" }} >Pérdidas del día</Text>
                        <_Input placeholder="Escribir" name="perdidas" value={form.perdidas} onChange={onChangeText} numeric />
                        <_Button info block color={PRIMARY_COLOR} mariginTop={10} text="Agregar" onPress={onAddPerdidas} />
                    </Form>
                </Content>
            </View>
        </Modal>
    )
}

const _ContentReadable = (props) => {
    const { item, editable, onOpenModalPerdida } = props;
    console.warn("Item: ", item)
    if (!editable) {
        let tipoAlimentos = '';
        let tipoPez = '';
        return (
            <View>
                <View>
                    <Text style={[styles.textPrimary, { fontWeight: "bold", fontSize: sizeTitle }]} >Alimentado</Text>
                    <Text style={{ fontSize: sizeText }} >{item.alimentadoFecha ? `${new Date(item.alimentadoFecha).toLocaleDateString()} ${new Date(item.alimentadoFecha).getHours()}:${new Date(item.alimentadoFecha).getMinutes()}` : "Aún no alimentado"}</Text>
                </View>
                <View>
                    <Text style={[styles.textPrimary, { fontWeight: "bold", fontSize: sizeTitle }]} >Cantidad</Text>
                    <Text style={{ fontSize: sizeText }} >{item.cantidad}</Text>
                </View>
                {item.tipoAlimento &&
                    <View>
                        <View>
                            <Text style={[styles.textPrimary, { fontWeight: "bold", fontSize: sizeTitle }]} >Tipo de alimento</Text>
                            <Text style={{ fontSize: sizeText }}>{item.tipoAlimento.nombre}</Text>
                        </View>
                        <View>
                            <Text style={[styles.textPrimary, { fontWeight: "bold", fontSize: sizeTitle }]} >Alimento en inventario</Text>
                            <Text style={{ fontSize: sizeText }}>{item.tipoAlimento.cantidadInventario}</Text>
                        </View>
                        <View>
                            <Text style={[styles.textPrimary, { fontWeight: "bold", fontSize: sizeTitle }]} >Etapa</Text>
                            <Text style={{ fontSize: sizeText }}>{item.tipoAlimento.etapa}</Text>
                        </View>
                    </View>
                }
                {item.perdidas &&
                    <View>
                        <View>
                            <Text style={[styles.textPrimary, { fontWeight: "bold", fontSize: sizeTitle }]} >Pérdidas</Text>
                            <Text style={{ fontSize: sizeText }}>{item.perdidas.cantidad}</Text>
                        </View>
                        <View>
                            <Text style={[styles.textPrimary, { fontWeight: "bold", fontSize: sizeTitle }]} >Fecha</Text>
                            {item.perdidas.fecha != 0 && <Text style={{ fontSize: sizeText }}>{new Date(item.perdidas.fecha).toLocaleDateString()}</Text>}
                            {item.perdidas.fecha == 0 && <Text style={{ fontSize: sizeText }}>N/A</Text>}
                        </View>
                    </View>
                }
                <_Button block primary color={PRIMARY_COLOR} text="Agregar perdidas" onPress={onOpenModalPerdida} />
            </View>
        )
    }
    return <Text />
}

const _ContentEditable = (props) => {
    const { item, editable, form, onChangeText, alimentosSeleccionados, onSelectItem } = props;
    if (editable) {
        let tipoAlimentos = ["Iniciador", "Crecimiento", "Engorde"];
        return (
            <Form>
                {/* <_Input label="Alimentado" name="alimentado" value={form.alimentado} onChange={onChangeText} /> */}
                <_Input label="Cantidad" name="cantidad" value={form.cantidad} onChange={onChangeText} />
                {/* <_Input label="Tipo de alimento" name="tipo" value={item.cantidad} onChange={onChangeText} /> */}
                {/* <_Input label="Tipo de peces" name="cantidad" value={item.cantidad} onChange={onChangeText} /> */}
                {/* <_Input label="Capacidad máxima" name="capacidadMaxima" value={form.detalle.capacidadMaxima} onChange={onChangeText} numeric /> */}
                <_Input label="Pérdidas totales" name="perdidas" value={form.perdidas.cantidad} onChange={onChangeText} />
                <_Picker label="Tipo de pez" name="tipoPez" list={["Tipo de pez", "Tipo #1", "Tipo #2", "Tipo #3"]} value={form.tipoPez} onChange={onChangeText} />
                {/* <_Button block info color={PRIMARY_COLOR} text="Seleccionar alimentos" />
                <_Button block info color={PRIMARY_COLOR} marginTop={10} text={`Tipo de pez: ${form.tipoPez}`} /> */}
                <Text style={[styles.textPrimary, { fontWeight: "bold", fontSize: sizeTitle }]}>Alimentos</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                    {tipoAlimentos.map((v, i) => {
                        return (
                            <View key={i} style={[styles.SquareShapeView, { marginVertical: 10, backgroundColor: alimentosSeleccionados.indexOf(v) != -1 ? "#3fc380" : PRIMARY_COLOR, justifyContent: "center", alignItems: "center" }]} >
                                <TouchableOpacity onPress={() => onSelectItem(v)} >
                                    <Text style={[styles.textSecondary, { textAlign: "center", fontSize: 24 }]} >{v}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </View>
            </Form>
        )
    }
    return <Text />
}

class Window extends Component {

    state =
        {
            modalPerdidas: false,
            editable: false,
            _item: {},
            form: {
                id: 0,
                acumulado: 0,
                isTrue: false,
                selected: false,
                alimentado: 0,
                perdidas: 0,
                cantidad: 0,
                detalle: {
                    tipoAlimentos: ["Cebada", "Haba", "Tarwi"],
                    tipoPez: ["Carpa"],
                    capacidadMaxima: 0,
                }
            },
            formModalPerdidas: { perdidas: "" },
            alimentosSeleccionados: []

        }

    onModalShow = () => {
        this.setState({ _item: this.props.item });
        this.onGetTipoAlimento();
        this.onGetPerdidas();
    }

    onModalHide = () => {

    }


    onGetTipoAlimento = () => {
        let { item } = this.props;
        let { _item } = this.state;
        axios.get(`${API.alimentos}/1`)
            .then(res => {
                _item.tipoAlimento = res.data;
                this.setState({ _item });
            })
            .catch(err => {
                alert("Ha ocurrido un error con tipo alimento");
                console.warn(err)
            })
    }

    onGetPerdidas = () => {
        // let { item } = this.props;
        let { _item } = this.state;
        axios.get(`${API.jaulasGrupoMuerte}`)
            .then(res => {
                let _data = res.data;
                let _perdidas = 0;
                let _fecha = 0;
                console.warn(res.data)
                for (let i = 0; i < _data.length; i++) {
                    if (_item.id == _data[i].jaulaGrupoID) {
                        // console.warn(_data[i])
                        _perdidas += _data[i].cantidad;
                        _fecha = _data[i].fecha;
                    }
                }
                _item.perdidas = {};
                _item.perdidas.cantidad = _perdidas;
                _item.perdidas.fecha = _fecha;
                this.setState({ _item });
            })
            .catch(err => {
                alert("Ha ocurrido un error con obtener perdidas");
                console.warn(err)
            })
    }

    onAddPerdidas = () => {
        let { _item, formModalPerdidas, modalPerdidas } = this.state;
        let _data = {
            idJaulaGrupo: _item.id,
            fecha: new Date().toISOString(),
            cantidad: formModalPerdidas.perdidas
        }
        axios.post(`${API.jaulasGrupoMuerte}`, _data)
            .then(res => {
                this.setState({ modalPerdidas: false, }, () => this.onGetPerdidas());
            })
            .catch(err => {
                alert("Ha ocurrido un error con agregar perdiads");
                console.warn(err)
            })
    }


    onEditPress = () => {
        let { editable, form } = this.state;
        let { item } = this.props;
        editable = !editable;
        form = { ...item };
        this.setState({ editable, form });
    }

    onChangeText = (name, value) => {
        let { form } = this.state;
        if (name == "capacidadMaxima") {
            form.detalle.capacidadMaxima = value;
        } else {
            form[name] = value;
        }
        this.setState({ form });
    }

    onChangeTextPerdidas = (name, value) => {
        let { formModalPerdidas } = this.state;
        formModalPerdidas[name] = value;
        this.setState({ formModalPerdidas });
    }

    onHandleModalPerdidas = () => {
        let { modalPerdidas } = this.state;
        modalPerdidas = !modalPerdidas;
        this.setState({ modalPerdidas });
    }

    onSelectItem = (v) => {
        let { alimentosSeleccionados } = this.state;
        let index = alimentosSeleccionados.indexOf(v);
        if (index != -1) {
            alimentosSeleccionados.splice(index, 1);
        } else {
            alimentosSeleccionados.push(v);
        }
        this.setState({ alimentosSeleccionados });
    }

    onOpenModalVisita = () => this.setState({ modalVisita: true })
    onCloseModalVisita = () => this.setState({ modalVisita: false })

    render() {
        const { open, onCloseModal, item } = this.props;
        const { modalPerdidas, editable, form, formModalPerdidas, alimentosSeleccionados, _item } = this.state;


        return (
            <Modal isVisible={open} onModalShow={this.onModalShow} animationIn="slideInUp" animationOut="slideOutDown"
                presentationStyle="overFullScreen" onModalHide={this.onModalHide}
                onBackButtonPress={onCloseModal} onBackdropPress={onCloseModal} style={[styles.modalWhite, { margin: 0 }]}  >
                <_Header onCloseModal={onCloseModal} />
                <Content style={{ padding: 10 }} >
                    <_ContentReadable item={_item} editable={editable} onOpenModalPerdida={this.onHandleModalPerdidas} />
                    <_ContentEditable item={item} editable={editable} form={form} alimentosSeleccionados={alimentosSeleccionados} onSelectItem={this.onSelectItem} onChangeText={this.onChangeText} />
                </Content>
                {/* <Footer>
                    <FooterTab style={{ backgroundColor: "white" }} >
                        <Left>
                            <_Button block danger text="Eliminar" />
                        </Left>
                        <Right>
                            <_Button block warning text={editable ? "GUARDAR" : "Actualizar"} onPress={this.onEditPress} />
                        </Right>
                    </FooterTab>
                </Footer> */}
                <_ModalPerdidas open={modalPerdidas} form={formModalPerdidas} onCloseModal={this.onHandleModalPerdidas}
                    onChangeText={this.onChangeTextPerdidas} onAddPerdidas={this.onAddPerdidas} />
            </Modal>
        )
    }
}

export default Window;

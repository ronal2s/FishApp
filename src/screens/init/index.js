import React, { Component } from 'react';
import { Animated, ScrollView, TouchableOpacity } from 'react-native';
import { Text, View, Fab, Icon, Container, Content, Form, Left, Right, Footer, FooterTab, Spinner } from 'native-base';
import Modal from 'react-native-modal';
import axios from "axios";

import styles from '../../styles';
import { PRIMARY_COLOR } from "../../const"
import _Button from "../../components/_Button";
import _Input from "../../components/_Input";
import _ModalItem from "../../modals/item";

import API from "../../api"


const sizeTitle = 22;

const _ModalJaulas = (props) => {
    const { open, onClose, onChangeText, onAddJaulas, jaulas } = props;
    return <Modal isVisible={open} onBackButtonPress={onClose} onBackdropPress={onClose} animationIn="slideInLeft" animationOut="slideOutRight">
        <View style={{ height: 150, backgroundColor: "white", borderRadius: 10 }} >
            <Content style={{ padding: 10 }}>
                <Form>
                    <Text style={{ color: PRIMARY_COLOR, fontWeight: "bold", fontSize: sizeTitle, textAlign: "center" }} >Agregar jaulas</Text>
                    <_Input placeholder="Cantidad" name="jaulas" value={jaulas} onChange={onChangeText} numeric />
                    <_Button info block color={PRIMARY_COLOR} mariginTop={20} text="AGREGAR" onPress={onAddJaulas} />
                </Form>
            </Content>
        </View>
    </Modal>
}

//Cambiar el valor de isTrue(alimentado) a false cada vez que sean las 12 PM

// Es cosa de hacer un formulario optimizado donde se escriba cantidad, capacidad máxima, blabla y en el caso de tipo de alimento/pez se tenga que seleccionar de una lista X
// Yo tengo en mente que este Modal sea una pantalla completa donde se va a incluir las pérdidas.
// Entonces tenga un botón para Eliminar y Modificar/Configurar/Actualizar.
// Si se le da a Modificar se abra otra pantalla con el formulario para escribir o seleccionar lo que haya que seleccionar de tipos


const _Items = (props) => {
    const { data, loading, onOpenModal, onSelectItem } = props;
    let backgroundItem = null;
    if (!loading) {
        // console.warn(data)
        let isAlimentado = true;
        let horaAlimentado = null;
        let horaActual = new Date();
        let horaAM = 8; let horaPM = 13;
        let _fechaAlimentado = null;
        return data.map((v, i) => {
            horaAlimentado = new Date(v.alimentadoFecha);

            if (v.alimentadoFecha) {
                _fechaAlimentado = parseInt(v.alimentadoFecha.substr(11, 2));
                isAlimentado = _fechaAlimentado > horaAM || _fechaAlimentado > horaPM;
            } else {
                isAlimentado = false;
            }
            backgroundItem = v.selected ? "#bdc3c7" : (isAlimentado || v.isTrue ? "#2980b9" : "#ec644b");
            return (
                <View style={[styles.SquareShapeView, { marginVertical: 10, backgroundColor: backgroundItem }]} key={i} >
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => onSelectItem(v)} onLongPress={() => onOpenModal("item", v)} >
                            <Text style={[styles.textSecondary, { textAlign: "center", fontSize: 24 }]} >{v.cantidad}</Text>
                            <Text style={[styles.textSecondary, { textAlign: "center" }]} >{v.etapa}</Text>
                            {v.alimentadoFecha && <Text style={[styles.textSecondary, { textAlign: "center" }]} >
                                {`Alimentado:\n${new Date(v.alimentadoFecha).toLocaleDateString()} ${new Date(v.alimentadoFecha).getHours()}:${new Date(v.alimentadoFecha).getMinutes()}`}
                            </Text>}
                            {!v.alimentadoFecha && <Text style={[styles.textSecondary, { textAlign: "center" }]} >
                                {`Alimentado:\nNo registrado`}
                            </Text>}
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.textSecondary, { textAlign: "right", marginRight: 10 }]} >{v.id}</Text>
                </View>
            )
        })
    }
    return <Text />

}



class Employees extends Component {

    state = {
        x: new Animated.Value(-100),
        modals: { item: false, jaulas: false },
        loading: true,
        item: {
            acumulado: 725,
            isTrue: true,
            alimentado: 39,
            perdidas: 3,
            cantidad: 12,
            tipoPez: "Carpa",
            detalle: {
                tipoAlimentos: ["Cebada", "Haba", "Tarwi"],
                capacidadMaxima: 1000,
            }
        },
        data: [
            {
                id: 1,
                tipoJaula: "Jaula Vacana By DhamarMJ",
                ubicacion: "En casa de Dhamar",
                ancho: 1.0,
                largo: 1.0,
                profundidad: 1.0,
                volumen: 1.0,
                capacidad: 1
            }
        ],
        selectedItems: 0,
        jaulas: ""
    }

    componentDidMount() {
        this.slide();
        this.getJaulas();
    }

    getJaulas = async () => {

        await axios.get(API.jaulasGrupo)
            .then(result => {
                // console.warn(result.data)
                // this.setState({ data: result.data, loading: false });
                this.setState({ data: result.data }, this.getHoraAlimento);
            })
            .catch(err => console.warn(err))
    }

    findIndex = (data, id) => {
        let index = -1;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                index = i;
                break;
            }
        }
        return index;
    }

    getHoraAlimento = () => {
        let { data } = this.state;
        // let _data = 
        axios.get(API.jaulasGrupoAlimento)
            .then(res => {
                // console.warn(res.data)
                let _dataAlimento = res.data;
                // console.warn(_dataAlimento)
                let indexData = null;
                for (let i = 0; i < _dataAlimento.length; i++) {
                    // console.warn(_dataAlimento[i].idJaulaGrupo)
                    // indexData = this.findIndex(data, _dataAlimento[i].idJaulaGrupo);

                    indexData = this.findIndex(data, _dataAlimento[i].jaulaGrupoID);
                    data[indexData].alimentadoFecha = _dataAlimento[i].fecha;
                }
                this.setState({ data, loading: false });
            })
    }

    onAlimentarJaula = (id) => {
        let data = {
            IDJaulaGrupo: id,
            IDAlimento: 1,
            Cantidad: 1,
            Fecha: new Date().toISOString()
        }
        // axios.post(`${API.jaulasGrupoAlimento}`, data)
        //     .then(res => {
        //         // alert("Lala");
        //         this.getJaulas();
        //     })
        //     .catch(err => {
        //         alert("Ha ocurrido un error");
        //     })
    }

    onOpenModal = (name, item) => {
        let { modals } = this.state;
        modals[name] = true;
        if (item) {
            this.setState({ item })
        }
        this.setState({ modals });
    }
    onCloseModal = (name) => {
        let { modals } = this.state;
        modals[name] = false;
        this.setState({ modals });
    }

    onSelectItem = (item) => {
        let { data, selectedItems } = this.state;
        data.map((v, i) => {
            if (v.id == item.id) {
                v.selected = !v.selected;
                if (v.selected) {
                    selectedItems++;
                } else {
                    selectedItems--;
                }
            }
        })

        this.setState({ data, selectedItems });
    }

    onAlimentarItems = () => {
        let { data } = this.state;
        data.map((v, i) => {
            if (v.selected) {
                v.isTrue = true;
                v.selected = false;
                // console.warn("x")
                this.onAlimentarJaula(v.id);
            }
        })
        // this.
        this.setState({ data, selectedItems: 0 })
    }

    onChangeText = (name, value) => {
        let { jaulas } = this.state;
        jaulas = value;
        this.setState({ jaulas });
    }

    onAddJaulas = () => {
        let { jaulas, data, modals } = this.state;
        let _jaulas = parseInt(jaulas);

        modals.jaulas = false;
        let _data = { Cantidad: jaulas, FechaInicio: new Date().toISOString(), FechaFin: new Date().toISOString(), IDGrupoTilapia: 1, IDJaulaGrupoAnterior: 1 }

        axios.post(API.jaulasGrupo, _data)
            .then(res => {
                alert("Agregado");
                this.getJaulas();
            })
            .catch(err => {
                console.warn(err);
                alert("Ha ocurrido un error");
            })
        this.setState({ data, modals });
    }

    onPostPerdidas = (item) => {
        let { perdidas } = this.state;
        let _data = { idJaulaGrupo: item.id, fecha: new Date().toISOString(), cantidad: perdidas }
        axios.post(`${API.jaulasGrupoMuerte}`, _data)
            .then(res => {
                this.getJaulas();
            })
            .catch(err => {
                alert("Ha ocurrido un error");
                console.warn(err)
            })
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
        let { modals, item, selectedItems, data, jaulas, loading } = this.state;
        return (
            <Container>
                <ScrollView  >
                    {loading && <Spinner color={PRIMARY_COLOR} />}
                    <View style={{ flexDirection: "row", flexWrap: 'wrap', justifyContent: "space-between", paddingHorizontal: 10 }}>
                        <_Items data={data} loading={loading} onOpenModal={this.onOpenModal} onSelectItem={this.onSelectItem} />
                    </View>
                    {selectedItems > 0 &&
                        <Footer>
                            <FooterTab style={styles.backgroundPrimary} >
                                <View style={{ justifyContent: "center", alignContent: "center", marginLeft: 10 }} >
                                    <Text style={[styles.textSecondary, { textAlign: "center" }]} >{`Seleccionado: ${selectedItems}`}</Text>
                                </View>
                            </FooterTab>
                        </Footer>
                    }
                    <_ModalItem item={item} open={modals.item} onCloseModal={() => this.onCloseModal("item")} />
                    <_ModalJaulas jaulas={jaulas} open={modals.jaulas} onChangeText={this.onChangeText} onAddJaulas={this.onAddJaulas} onClose={() => this.onCloseModal("jaulas")} />
                </ScrollView>
                {(selectedItems > 0) &&<View style={{ flex: 1 }} >
                    <Fab style={[styles.backgroundPrimary]} onPress={selectedItems > 0 ? this.onAlimentarItems : () => this.onOpenModal("jaulas")} >
                        {/* {!(selectedItems > 0) && <Icon name="plus" type="MaterialCommunityIcons" color="white" />} */}
                         <Icon name="check" type="MaterialCommunityIcons" color="white" />
                    </Fab>
                </View>}
            </Container>

        )
    }
}

export default Employees;

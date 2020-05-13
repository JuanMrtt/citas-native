import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

const Cita = ({ item, eliminarPaciente }) => {

    const dialogoEliminar = id => {
        eliminarPaciente(id)
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.label}>Paciente:</Text>
                <Text style={styles.texto}>{item.paciente}</Text>
            </View>
            <View>
                <Text style={styles.label}>Propietario:</Text>
                <Text style={styles.texto}>{item.propietario}</Text>
            </View>
            <View>
                <Text style={styles.label}>Sintomas:</Text>
                <Text style={styles.texto}>{item.sintomas}</Text>
            </View>


            <View>
                <TouchableHighlight onPress={() => dialogoEliminar(item.id)} style={styles.btnEliminar}>
                    <Text style={styles.textEliminar}>Eliminar &times;</Text>
                </TouchableHighlight>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderBottomColor: '#E1E1E1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    texto: {
        fontSize: 18,
    },
    btnEliminar: {
        padding: 10,
        backgroundColor: 'red',
        marginVertical: 10
    },
    textEliminar: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default Cita

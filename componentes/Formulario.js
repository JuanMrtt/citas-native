import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid'

const Formulario = ({ citas, setCitas, guardarMostrarForm }) => {

    const [paciente, guardarPaciente] = useState('')
    const [propietario, guardarPropietario] = useState('')
    const [telefono, guardarTelefono] = useState('')
    const [fecha, guardarFecha] = useState('')
    const [hora, guardarHora] = useState('')
    const [sintomas, guardarSintomas] = useState('')

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    // Fecha
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const confirmarFecha = (date) => {
        const opciones = { year: 'numeric', month: 'long', day: '2-digit' }
        guardarFecha(date.toLocaleDateString('es-ES', opciones))
        hideDatePicker();
    };

    // Hora
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const confirmarHora = (hora) => {
        const opciones = { hour: 'numeric', minute: '2-digit', hour12: false }
        guardarHora(hora.toLocaleString('en-US', opciones))
        hideTimePicker();
    };

    const crearNuevaCita = () => {

        // validar
        if (paciente.trim() === '' || propietario.trim() === '' || telefono.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            mostrarAlerta()
            return
        }

        // Crear nueva cita
        const cita = { paciente, propietario, telefono, fecha, hora, sintomas }
        cita.id = shortid.generate()
        console.log(cita)

        // Agregar al state
        const citasNuevo = [...citas, cita]
        setCitas(citasNuevo)

        // Ocultar el formulario
        guardarMostrarForm(false)

        // Resetar el formulario

    }

    // Muestra la alerta
    const mostrarAlerta = () => {
        Alert.alert(
            'Error', // Titulo
            'Todos los campos son obligatorios', // Mensaje
            [{
                text: 'OK' // Array de botones
            }]
        )
    }
    return (
        <>
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Paciente:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => guardarPaciente(texto)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Dueño:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(texto) => guardarPropietario(texto)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Telefono de Contacto:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(texto) => guardarTelefono(texto)}
                        keyboardType='numeric'
                    />
                </View>

                <View>
                    <Text style={styles.label}>Fecha</Text>
                    <Button title="Selecciona la fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={confirmarFecha}
                        onCancel={hideDatePicker}
                        locale='es_ES'
                        headerTextIOS='Elige una fecha'
                        cancelTextIOS='Cancelar'
                        confirmTextIOS='Confirmar'
                    />
                    <Text>{fecha}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Hora</Text>
                    <Button title="Selecciona la hora" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={confirmarHora}
                        onCancel={hideTimePicker}
                        locale='es_ES'
                        headerTextIOS='Elige una hora'
                        cancelTextIOS='Cancelar'
                        confirmTextIOS='Confirmar'
                        is24Hour

                    />
                    <Text>{hora}</Text>

                </View>

                <View>
                    <Text style={styles.label}>Sintomas:</Text>
                    <TextInput
                        multiline
                        style={styles.input}
                        onChangeText={(texto) => guardarSintomas(texto)}
                    />
                </View>
                <TouchableHighlight onPress={() => crearNuevaCita()} style={styles.btnSubmit}>
                    <Text style={styles.textSubmit}>Crear nueva cita </Text>
                </TouchableHighlight>
            </ScrollView>
        </>
    )
}

export default Formulario

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: '2.5%'
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: '#AA076B',
        marginVertical: 10
    },
    textSubmit: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})




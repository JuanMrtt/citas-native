import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import Cita from './componentes/Cita'
import Formulario from './componentes/Formulario'

export default function App() {

  const [mostrarForm, guardarMostrarForm] = useState(false)

  const [citas, setCitas] = useState([
    { id: '1', paciente: 'hook', propietario: 'Juan', sintomas: 'No tiene' },
    { id: '2', paciente: 'Redux', propietario: 'Pepe', sintomas: 'No duerme' },
    { id: '3', paciente: 'Native', propietario: 'Manolo', sintomas: 'No come' }
  ])

  // Eliminar pacientes del state
  const eliminarPaciente = id => {
    setCitas((citasActuales) => {
      return citasActuales.filter(cita => cita.id !== id)
    })
  }

  // Muestra u oculta el formulario
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm)
  }

  // Cerrar teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss()
  }

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>

      <View style={styles.container}>
        <Text style={styles.title}>Administrador de citas</Text>

        <View>
          <TouchableHighlight onPress={() => mostrarFormulario()} style={styles.btnMostrarForm}>
            <Text style={styles.textoMostrarForm}>{mostrarForm ? 'Cancelar Crear Cita' : 'Crear nueva cita'} </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.contain}>
          {mostrarForm ? (
            <>
              <Text style={styles.title}>Crear Nueva Cita</Text>

              <Formulario
                citas={citas}
                setCitas={setCitas}
                guardarMostrarForm={guardarMostrarForm}
              />
            </>
          ) : (
              <>
                <Text style={styles.title}>{citas.length > 0 ? 'Administra tus citas' : 'No hay citas, agrega una'}</Text>
                <FlatList
                  style={styles.listado}
                  data={citas}
                  renderItem={({ item }) => <Cita item={item} eliminarPaciente={eliminarPaciente} />}
                  keyExtractor={cita => cita.id}
                />
              </>
            )}

        </View>


      </View>
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#AA076B',
    flex: 1
  },
  title: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  contain: {
    flex: 1,
    marginHorizontal: '2,5%'
  },
  listado: {
    flex: 1,
  },
  btnMostrarForm: {
    padding: 10,
    // backgroundColor: '#AA076B',
    marginVertical: 10
  },
  textoMostrarForm: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

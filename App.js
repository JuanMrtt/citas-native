import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Cita from './componentes/Cita'
import Formulario from './componentes/Formulario'

export default function App() {

  // Definir el state
  const [citas, setCitas] = useState([
    { id: '1', paciente: 'hook', propietario: 'Juan', sintomas: 'No tiene' },
    { id: '2', paciente: 'Redux', propietario: 'Pepe', sintomas: 'No duerme' },
    { id: '3', paciente: 'Native', propietario: 'Manolo', sintomas: 'No folla' }
  ])

  // Eliminar pacientes del state
  const eliminarPaciente = id => {
    setCitas((citasActuales) => {
      return citasActuales.filter(cita => cita.id !== id)
    })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Administrador de citas</Text>

      <Formulario />
      <Text style={styles.title}>{citas.length > 0 ? 'Administra tus citas' : 'No hay citas, agrega una'}</Text>

      <FlatList
        data={citas}
        renderItem={({ item }) => <Cita item={item} eliminarPaciente={eliminarPaciente} />}
        keyExtractor={cita => cita.id}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#AA076B',
    flex: 1
  },
  title: {
    color: '#FFF',
    marginTop: 40,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

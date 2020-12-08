import React, { useReducer } from 'react';

import OperacionContext from './operacionContext';
import OperacionReducer from './operacionReducer';
import { FORMULARIO_OPERACION, OBTENER_OPERACIONES, AGREGAR_OPERACION, ELIMINAR_OPERACION, TAREA_ACTUAL, ACTUALIZAR_OPERACION} from '../../types';
import clienteAxios from '../../config/axios';

const OperacionState = props => {

    const initialState = {
        operaciones: [],
        formulario : false,
        operacionseleccionada: null
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(OperacionReducer, initialState);

    // Funciones para el CRUD
    const mostrarFormulario = (formulario) => {
        dispatch({
            type: FORMULARIO_OPERACION,
            payload: formulario
        })
    }

    // Obtener los proyectos
    const obtenerOperaciones = async () => {
        try {
            const resultado = await clienteAxios.get('/api/operacion');
            /* console.log(resultado.data) */
            dispatch({
                type: OBTENER_OPERACIONES,
                payload: resultado.data.operaciones
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Agregar un nuevo operacion 
    const agregarOperacion = async operacion => {
        try {
            let date = new Date()
            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()
            if(month < 10){
                operacion.fecha = `${day}/0${month}/${year}`
            }else{
                operacion.fecha =`${day}/${month}/${year}`
            }
            const resultado = await clienteAxios.post('/api/operacion', operacion)
        //Agregamos la operacion en el state
        dispatch({
            type: AGREGAR_OPERACION,
            payload: resultado.data
        })
        } catch (error) {
            console.log(error)
        }
    }

    // Elimina un proyecto
    const eliminarProyecto = async proyectoId => {
        try {
            await clienteAxios.delete(`/api/operacion/${proyectoId}`)
            dispatch({
                type: ELIMINAR_OPERACION,
                payload: proyectoId
            })
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarOperacion = async operacion => {
        try {
            const resultado = await clienteAxios.put(`/api/operacion/${operacion._id}`, operacion);
            
            dispatch({
                type: ACTUALIZAR_OPERACION,
                payload: resultado.data.operacion
            })
        } catch (error) {
            console.log(error);
        }
    }


    // Obtener la operacion actual
    const guardarOperacionActual = operacion => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: operacion
        })
    }

    return (
        <OperacionContext.Provider
            value={{
                operaciones: state.operaciones,
                formulario: state.formulario,
                operacionseleccionada: state.operacionseleccionada,
                mostrarFormulario,
                obtenerOperaciones,
                agregarOperacion,
                eliminarProyecto,
                guardarOperacionActual,
                actualizarOperacion
            }}
        >
            {props.children}
        </OperacionContext.Provider>
    )

}

export default OperacionState;
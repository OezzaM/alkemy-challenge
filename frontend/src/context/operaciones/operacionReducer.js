import { FORMULARIO_OPERACION, OBTENER_OPERACIONES, AGREGAR_OPERACION, ELIMINAR_OPERACION, TAREA_ACTUAL, ACTUALIZAR_OPERACION } from '../../types'

const OperacionReducer = (state, action) => {
    
    switch (action.type){
        case FORMULARIO_OPERACION:
            return {
                ...state,
                formulario: action.payload
            }
        case OBTENER_OPERACIONES: 
            return {
                ...state,
                operaciones: action.payload
            }
        case AGREGAR_OPERACION:
            return {
                ...state,
                operaciones: [...state.operaciones, action.payload]
            }
            case ACTUALIZAR_OPERACION:
                return {
                    ...state,
                    operaciones: state.operaciones.map(operacion => operacion._id === action.payload._id ? action.payload : operacion )
                }
        case ELIMINAR_OPERACION:
            return {
                ...state,
                operaciones: state.operaciones.filter(operacion => operacion._id !== action.payload),
                operacion: null
            }
        case TAREA_ACTUAL:
            return {
                ...state,
                operacionseleccionada: action.payload
            }
        default: 
            return state;
    }
}

export default OperacionReducer
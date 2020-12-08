import React, { useContext, useEffect } from 'react';
import { Table, Space, Button, Popconfirm, message  } from 'antd';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import operacionContext from '../../context/operaciones/operacionContext';

const Datatable = ({ setAuto, setActualizar }) => {

  const operacionesContext = useContext(operacionContext);
  const { mostrarFormulario, operaciones, obtenerOperaciones, eliminarProyecto, guardarOperacionActual } = operacionesContext;

  function confirm(e) {
    eliminarProyecto(e)
    message.success('Operacion eliminada');
  }


    // Obtener los proyectos
    useEffect(() => {
      obtenerOperaciones();
    }, [obtenerOperaciones])


    const columns = [
        {
          title: 'Concepto',
          dataIndex: 'concepto',
          key: 'concepto',
          id: 1
        },
        {
          title: 'Monto',
          dataIndex: 'monto',
          key: 'monto',
          id: 2
        },
        {
          title: 'Tipo',
          dataIndex: 'tipo',
          key: 'tipo',
          id: 3
        },
        {
          title: 'Fecha',
          dataIndex: 'fecha',
          key: 'fecha',
          id: 4
        },
        {
          title: 'Categoria',
          key: 'categoria',
          dataIndex: 'categoria',
          id: 5
        },
        {
          title: 'Accion',
          key: 'accion',
          id: 7,
          render: (text, record) => (
            <Space size="middle">
               <Button 
               icon={<EditTwoTone />  } 
               onClick={() => {
                guardarOperacionActual(text)
                mostrarFormulario(true);
              }}
               />
               <Popconfirm
                    title="¿Esta seguro que desea eliminar la operacion?"
                    onConfirm={() => confirm(text._id)}
                    okText="Si"
                    cancelText="No"
                    >
                    <Button icon={<DeleteTwoTone />}  />
                      
                </Popconfirm>
            </Space>
          )
        },
      ];

    return ( 
        <div >
            <Button
        type="primary"
        style={{border: 0, display: 'block', marginLeft: 'auto', margin:'10px 10px 0 auto'}}
        onClick={() => {
          guardarOperacionActual(undefined)
          mostrarFormulario(true)
        }}
      >
        Agregar operacion
      </Button>
            <Table columns={columns} dataSource={operaciones} scroll={{ x: 1300 }} locale={{emptyText:'No hay operaciones cargadas, ¡Agregue una! '}} />
        </div>
        );

    }
 
export default Datatable;
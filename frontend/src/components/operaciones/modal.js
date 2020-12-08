import React,{ useEffect, useContext } from 'react';
import operacionContext from '../../context/operaciones/operacionContext';
import 'antd/dist/antd.css';
import { Modal, Form, Input, InputNumber, Select } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const Modals = () => {
    
  // Obtener el state del formulario
  const operacionesContext = useContext(operacionContext);
  const { formulario, mostrarFormulario, agregarOperacion, operacionseleccionada, actualizarOperacion } = operacionesContext;
  
  
  const [form] = Form.useForm();

  const onCancel = () => {
    form.resetFields();
    mostrarFormulario(!formulario);
    
  };

  useEffect(() => {
    if(operacionseleccionada){
      const { concepto, monto, categoria, tipo } = operacionseleccionada
      form.setFieldsValue({
        concepto,
        monto,
        categoria,
        tipo
      });
    }else{
      form.resetFields();
    }
  }, [operacionseleccionada, form])
    
    // eslint-disable-next-line
    const validateMessages = {
      // eslint-disable-next-line
        required: '${label} es requerido',
        types: {
          // eslint-disable-next-line
          email: 'Por favor introduzca un mail valido',
          // eslint-disable-next-line
          number: '${label} is not a validate number!',
          // eslint-disable-next-line
        },// eslint-disable-next-line
        number: {
          // eslint-disable-next-line
          range: '${label} must be between ${min} and ${max}',
        },
      };
    return ( 
      <Modal
      visible={formulario}
      title="Agregar una nueva operacion"
      okText="Agregar"
      cancelText="Cancelar"
      onCancel={onCancel}
      onOk={() => {
        form
        .validateFields()
        .then((values) => { 
          form.resetFields();
          mostrarFormulario(!formulario);
          if(operacionseleccionada){
            values = {...values, key: operacionseleccionada.key, fecha: operacionseleccionada.fecha , creador: operacionseleccionada.creador, _id: operacionseleccionada._id }
            actualizarOperacion(values)
          }else{
            values = {...values, key: uuidv4()}
            agregarOperacion(values)
          }
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
forceRender
    >
      <Form
      style={{ marginLeft: 'auto !important', marginRight: 'auto !important'}}
      validateMessages={validateMessages}
        form={form}
        layout="vertical"
        name="form_in_modal"
        >
      <Form.Item style={{marginBottom: 0}}>
      <Input.Group compact>
        <Form.Item
          name="concepto"
          label="Concepto"
          hasFeedback
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          rules={[
            {
              required: true,
              message: 'Seleccione un concepto',
            },
          ]}
        >
          <Input />
          </Form.Item>
        <Form.Item style={{marginBottom: 0}}>
      <Input.Group compact>
      <Form.Item
          name="monto"
          label="Monto"
          style={{ display: 'inline-block', width: 'calc(70% - 8px)', margin: '0 8px' }}
          rules={[
            {
              required: true,
              message: 'Seleccione el monto',
            },
          ]}
        >
          <InputNumber />
          </Form.Item>
      </Input.Group>
    </Form.Item>
      </Input.Group>
    </Form.Item>

    <Input.Group compact>
    <Form.Item
      style={{width: 'calc(50% - 8px)'}}
        name="categoria"
        label="Categoria"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Selecciona una categoria',
          },
        ]}
      >
        <Select placeholder="Seleccione una categoria">
          <Select.Option value="Comida">Comida</Select.Option>
          <Select.Option value="Auto">Auto</Select.Option>
          <Select.Option value="Perro">Perro</Select.Option>
          <Select.Option value="Casa">Casa</Select.Option>
        </Select>
      </Form.Item>
    <Form.Item
      style={{width: 'calc(50% - 8px)'}}
        name="tipo"
        label="Tipo"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Selecciona un tipo',
          },
        ]}
      >
        {operacionseleccionada ?
        <Select placeholder="Seleccione un tipo" disabled>
        <Select.Option value="Ingreso">Ingreso</Select.Option>
        <Select.Option value="Egreso">Egreso</Select.Option>
      </Select>
        :
        <Select placeholder="Seleccione un tipo" >
          <Select.Option value="Ingreso">Ingreso</Select.Option>
          <Select.Option value="Egreso">Egreso</Select.Option>
        </Select>
        }
      </Form.Item>
      </Input.Group>
  
      </Form>
    </Modal>
     );
}
 
export default Modals;
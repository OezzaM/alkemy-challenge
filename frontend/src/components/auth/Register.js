import React, { useState, useContext, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Alert  } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Login.css'
import AuthContext from '../../context/autenticacion/authContext'


const Register = (props) => {

    const authContext = useContext(AuthContext);
    const { registrarUsuario, mensaje, autenticado } = authContext;

    // En caso de que el usuario se haya autenticado o registrado

    useEffect(() => {
        if(autenticado){
            props.history.push('/operaciones');
        }
    },[ autenticado, props.history]);

    const [usuario, guardarUsuario] = useState ({
        name: '',
        email: '',
        password: '',/* 
        rePassword: '' */
    })

    const { name, email, password } = usuario;

    const onFinish = (values) => {
        registrarUsuario(values)
      };

    const onChange = (e) => {
        guardarUsuario({...usuario,
            [e.target.name]:e.target.value
        })
      };


    return ( 
        <div className="body">
            <div className="login">
            <h1>Crear una cuenta</h1>
            <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                name,
                email,
                password
            }}
            onFinish={onFinish}
            >
                {mensaje ?
                 <Alert
                 description={mensaje}
                 type="error"
                 showIcon
                 style={{margin:'10px 0'}}
               />
                : null}
            <Form.Item
                name="nombre"
                rules={[
                {
                    required: true,
                    message: 'Por favor ingresa tu nombre',
                },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Nombre" 
                name="nombre"
                type="text"
                onChange={onChange}
                />
            </Form.Item>
            <Form.Item
                name="email"
                rules={[
                {
                    required: true,
                    message: 'Por favor ingresa tu email',
                },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email" 
                name="email"
                type="email"
                onChange={onChange}
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Por favor ingresa tu contraseña',
                },
                ]}
            >
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                name="password"
                onChange={onChange}
                />
            </Form.Item>
            {/* <Form.Item
                name="rePassword"
                rules={[
                {
                    required: true,
                    message: 'Por favor repite tu password',
                },
                ]}
            >
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Repite tu password"
                name="rePassword"
                onChange={onChange}
                />
            </Form.Item> */}
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Registrarse
                </Button>
            </Form.Item>
            <div style={{marginTop: '.7em'}}>
                <Button type="secondary"  className="login-form-button">
                    <Link to={'/'}>Inicia sesión</Link>
                </Button>
            </div>
            </Form>
            </div>
        </div>
     )
    }
export default Register;
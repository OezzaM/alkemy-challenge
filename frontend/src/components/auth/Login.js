import React, { useState, useContext, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Login.css'
import AuthContext from '../../context/autenticacion/authContext'

const Login = (props) => {


    const authContext = useContext(AuthContext);
    const { iniciarSesion, mensaje, autenticado } = authContext;

    const [usuario, guardarUsuario] = useState ({
        email: '',
        password: '',
    })

    const {email, password } = usuario;

    
    useEffect(() => {
        if(autenticado){
            props.history.push('/operaciones');
        }
    },[ autenticado, props.history]);

    const onFinish = (values) => {
        iniciarSesion(values)
      };

    const onChange = (e) => {
        guardarUsuario({...usuario,
            [e.target.name]:e.target.value
        })
      };



    return ( 
        <div className="body">
            <div className="login">
            <h1>Iniciar sesión</h1>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
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

                    <Form.Item>

                    <Button type="primary" htmlType="submit" className="login-form-button">
                            Inicia sesión
                    </Button>
                        
                    </Form.Item>
                    <div style={{marginTop: '.7em'}}>
                        <Button type="secondary" htmlType="submit" className="login-form-button">
                        <Link to={'/register'}>Registrarse</Link>
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
     )
    }
export default Login;
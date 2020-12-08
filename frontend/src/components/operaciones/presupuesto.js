import React, { useContext, useEffect } from 'react';
import { Card } from 'antd';
import './presupuesto.css';

import AuthContext from '../../context/autenticacion/authContext';

const Presupuesto = () => {

const authContext = useContext(AuthContext);
const { usuario,usuarioAutenticado } = authContext;


const actualizarValor = () => {
    return (usuario.saldo)
}

useEffect(() => {
    usuarioAutenticado();
    
    // eslint-disable-next-line
  }, [usuarioAutenticado])

    return ( 
        <div className="site-card-border-less-wrapper tarjeta">
            <Card title="Presupuesto" bordered={false} style={{ width: 300 }}>
            <p>${(usuario) ? actualizarValor() : '0'}</p>
            </Card>
        </div>
     );
}
 
export default Presupuesto;
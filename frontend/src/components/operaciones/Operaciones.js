import React, { useState, useEffect, useContext } from 'react';
import { Layout, Menu, Button } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CarOutlined,
  FileTextOutlined,
  UserOutlined,
  UserDeleteOutlined 
} from '@ant-design/icons';
import Datatable from './datatable';
import Presupuesto from './presupuesto';
import Modals from './modal';
import AuthContext from '../../context/autenticacion/authContext';

const { Header, Sider, Content } = Layout;

function Operaciones() {

  // Extraer la informacion de la autenticacion

  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    
    // eslint-disable-next-line
  }, [])

  const [auto, setAuto] = useState('')

  const [collapsed, setCollapsed] = useState(true);
  const toggle = () => {
    setCollapsed(!collapsed);
  }
  

  return (
    <div className="body-op">
      <Modals 
        auto={auto}
      />
 <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <h1 align="center" style={{color:'white', fontSize:20, marginTop:19}}>ALKEMY</h1>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<CarOutlined />}>
              Registro
            </Menu.Item>
            <Menu.Item key="2" icon={<FileTextOutlined />}>
              Lista operaciones
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              Categorias
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="header" style={{padding:'0px 15px', color:'white', fontSize:20}}>
            <div style={{display:'flex',alignItems:'center', marginTop:'3px'}}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle/* 
              style: {marginTop: '5px'} */
            })}
            <div style={{display:'inline', marginLeft:'auto'}}>
            <h1 style={{display:'inline', color:'white'}}>{usuario ? usuario.nombre : null}</h1>
            <Button 
               icon={<UserDeleteOutlined style={{fontSize: '1.3em'}} />  } 
               onClick={() => cerrarSesion()}
               style={{marginLeft:'10px',color:'white',backgroundColor:'transparent', border:'0'}}
               />
            </div>
            </div>
          </Header>
          <Content
            className="site-layout-background"
          >
           <Presupuesto />
           <Datatable 
            setAuto={setAuto}
           />
          </Content>
        </Layout>
      </Layout> 

    </div>
        );
}

export default Operaciones;

import Layouts from '../layout/Layout';
import React, { useState } from 'react';
import {  Table,Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space} from 'antd';
import {  UserAddOutlined } from '@ant-design/icons';
import axios from 'axios';
import Link from 'next/link';
import Swal from "sweetalert2";
import Router , {useRouter}  from 'next/router';

const FormLayoutDemo = () => {
  const router = useRouter();
  const [dataSource, setItems] = React.useState(null);

  React.useEffect(() => {
    axios.get("http://157.245.247.182:3005/api/trabajadores").then((result) => {
      console.table(result.data);
      setItems(result.data.rows);
    });
  }, []);

  const onSubmit = event => {
    event.preventDefault() // don't redirect the page
    // where we'll add our form logic
    let rfc = document.getElementById('rfc').value;
    let nombre = document.getElementById('nombre').value;
    let puesto = document.getElementById('puesto').value;
    let almacen = document.getElementById('local').value;
    
    axios.post('http://157.245.247.182:3005/api/trabajadores', {
      rfc,
      nombre,
      puesto,
      almacen
  })
  .then(response => {
      const {ok} = response.data;

      console.log(ok);
      if(ok){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Trabajador guardado con exito",
          showConfirmButton: false,
          timer: 1500,
        });
      }else{
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Su registro no se ha guardado con exito",
          showConfirmButton: false,
          timer: 1500,
        });
      }
  });
  

  }

  const Eliminar = event => {
    event.preventDefault();

    let valor1 = prompt("Norbre a Eliminar");

    axios.delete(`http://157.245.247.182:3005/api/trabajadores/${valor1}`)
  .then(response => {
      const {ok} = response.data;

      console.log(ok);
      if(ok){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Trabajador Eliminado con exito",
          showConfirmButton: true,
          timer: 2500,
        }).then((result) => {
  /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
    router.push('/trabajadores');
  } 
});
      }else{
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Su Eliminacion ha fallado",
          showConfirmButton: false,
          timer: 1500,
        });
      }
  });
  }

const onSubmitActualizar = event => {
    event.preventDefault() // don't redirect the page
    // where we'll add our form logic
    let rfc = document.getElementById('rfcActualizar').value;
    let nombre = document.getElementById('nombreActualizar').value;
    let puesto = document.getElementById('puestoActualizar').value;
    let almacen = document.getElementById('localActualizar').value;
    
    axios.put('http://157.245.247.182:3005/api/trabajadores', {
      rfc,
      nombre,
      puesto,
      almacen
  })
  .then(response => {
      const {ok} = response.data;

      console.log(ok);
      if(ok){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Trabajador Actualizado con exito",
          showConfirmButton: true,
          timer: 2500,
        }).then((result) => {
  /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
    router.push('/trabajadores');
  } 
});
      }else{
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Su Actualizaacion no se ha guardado",
          showConfirmButton: false,
          timer: 1500,
        });
      }
  });
  

  }


const [visible, setVisible] = React.useState(false);
const showDrawer = () => {
  setVisible(true);
};

const onClose = () => {
  setVisible(false);
};

const [visibleAc, setVisibleAc] = React.useState(false);
const showDrawerActualizar = () => {
  setVisibleAc(true);

};
const onCloseActualizar = () => {
  setVisibleAc(false);
};
const state = { visible: false }; 
  const { Option } = Select;
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const onSearch = value => console.log(value);
  const { Search } = Input;

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;
  const buttonItemLayout =
    formLayout === 'horizontal'
      ? {
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      : null;
      const columns = [
        {
          title: 'RFC',
          dataIndex: 'rfc',
          key: 'rfc'
        },
        {
          title: 'Nombre',
          dataIndex: 'nombre',
          key: 'nombre'
        },
        {
          title: 'Puesto',
          dataIndex: 'puesto',
          key: 'puesto',
        },
        {
          title: 'Almacen',
          dataIndex: 'almacen',
          key: 'almacen',
        },
        {
          title: 'Action',
          key: 'action',
          render: ( record) => (
          
            
            <Space size="middle">
              
              <Button type="button" onClick={showDrawerActualizar} >Actualizar</Button>
              <Button type="button" onClick={Eliminar} >Eliminar</Button>
            </Space>
          ),
        },
      ];
    return (
      
      <Layouts>
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
          onValuesChange={onFormLayoutChange}
        >
          <div className='center'>
          <h1>Trabajadores</h1>
          <Form.Item label="Nombre">

            <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            />
          </Form.Item>
          </div>
                  <div className='drawer'>
                  <Button type="primary" shape="round" className="" onClick={showDrawer} icon={<UserAddOutlined />}>
                      Agregar nuevo trabajador
                  </Button>
                  </div>
                  <Drawer
                      title="Agregar un nuevo trabajador"
                      width={720}
                      onClose={onClose}
                      visible={visible}
                      bodyStyle={{ paddingBottom: 80 }}
                      extra={
                      <Space>
 
                          <Button type="submit" onClick={onSubmit} htmlType="submit">
                              Agregar
                          </Button>
                      </Space>
                      }
                  >
                      <Form layout="vertical" hideRequiredMark>
                      <Row gutter={16}>
                          <Col span={12}>
                          <Form.Item
                              name="name"
                              label="RFC"
                              rules={[{ required: true,
                                minLength: 5,
                                required: '^\\([0-9]{2}\\)((3[0-9]{3}-[0-9]{4})|(9[0-9]{3}-[0-9]{5}))$'}]}
                          >
                              <Input id="rfc" placeholder="Ingrese su rfc" />
                          </Form.Item>
                          </Col>
                          <Col span={12}>
                          <Form.Item
                              name="nombre"
                              label="Nombre"
                              rules={[{ required: true, message: 'Please enter url' }]}
                          >
                              <Input id="nombre"placeholder="Ingrese el nombre" />
                          </Form.Item>
                          </Col>
                      </Row>
                      <Row gutter={16}>
                          <Col span={12}>
                          <Form.Item
                              name="puesto"
                              label="Puesto"
                              rules={[{ required: true, message: 'Please select an owner' }]}
                          >
                                      <Input id="puesto"placeholder="Ingrese el puesto" />

                          </Form.Item>
                          </Col>
                          <Col span={12}>
                          <Form.Item
                              name="local"
                              label="Local"
                              rules={[{ required: true, message: 'Please choose the type' }]}
                          >
                                      <Input id="local"placeholder="Ingrese el local" />
                          </Form.Item>
                          </Col>
                      </Row>
                      
                      </Form>
                  </Drawer>

           <Drawer
                      title="Actualizar trabajador"
                      width={720}
                      onClose={onCloseActualizar}
                      visible={visibleAc}
                      bodyStyle={{ paddingBottom: 80 }}
                      extra={
                      <Space>
 
                          <Button type="submit" onClick={onSubmitActualizar} htmlType="submit">
                              Actualizar
                          </Button>
                      </Space>
                      }
                  >
                      <Form layout="vertical" hideRequiredMark>
                      <Row gutter={16}>
                          <Col span={12}>
                          <Form.Item
                              name="name"
                              label="RFC"
                              rules={[{ required: true,
                                minLength: 5,
                                required: '^\\([0-9]{2}\\)((3[0-9]{3}-[0-9]{4})|(9[0-9]{3}-[0-9]{5}))$'}]}
                          >
                              <Input id="rfcActualizar"/>
                          </Form.Item>
                          </Col>
                          <Col span={12}>
                          <Form.Item
                              name="nombre"
                              label="Nombre"
                              rules={[{ required: true, message: 'Please enter url' }]}
                          >
                              <Input id="nombreActualizar"placeholder="Ingrese el nombre" />
                          </Form.Item>
                          </Col>
                      </Row>
                      <Row gutter={16}>
                          <Col span={12}>
                          <Form.Item
                              name="puesto"
                              label="Puesto"
                              rules={[{ required: true, message: 'Please select an owner' }]}
                          >
                                      <Input id="puestoActualizar"placeholder="Ingrese el puesto" />

                          </Form.Item>
                          </Col>
                          <Col span={12}>
                          <Form.Item
                              name="local"
                              label="Local"
                              rules={[{ required: true, message: 'Please choose the type' }]}
                          >
                                      <Input id="localActualizar"placeholder="Ingrese el local" />
                          </Form.Item>
                          </Col>
                      </Row>
                      
                      </Form>
                  </Drawer>
          <div className='table'>
          <Table columns={columns} dataSource={dataSource} />
          </div>
          <Form.Item {...buttonItemLayout}>
            
            
          </Form.Item>
    </Form>
      </Layouts>
    );
};

export default FormLayoutDemo ;
import Layouts from '../layout/Layout';
import React, { useState, useEffect } from "react";
import {  Table,Drawer, Form, Button, Col, Row, Input, Select, Space} from 'antd';
import {  UserAddOutlined } from '@ant-design/icons';
import Swal from "sweetalert2";
import Link from 'next/link';
import axios from 'axios';


const FormLayoutDemo = () => {
  const [dataSource, setItems] = React.useState(null);
  
  const columns = [
    {
      title: 'Nombre producto',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Marca',
      dataIndex: 'marca',
      key: 'marca',
    },
    {
      title: 'Modelo',
      dataIndex: 'modelo',
      key: 'modelo',
    },
    {
      title: 'Precio',
      dataIndex: 'precio',
      key: 'precio',
    },
    {
      title: 'Cantidad',
      dataIndex: 'cantidad',
      key: 'cantidad',
    }
  ];
  

  React.useEffect(() => {
    axios.get("http://157.245.247.182:3005/api/visualizar").then((result) => {
      console.table(result.data);
      setItems(result.data.rows);
    });
  }, []);

    const onSubmit = event => {
      
        event.preventDefault() // don't redirect the page
        // where we'll add our form logic
        let nombre = document.getElementById('nombre').value;
        let marca = document.getElementById('marca').value;
        let modelo = document.getElementById('modelo').value;
        let precio = document.getElementById('precio').value;
        let cantidad = document.getElementById('Cantidad').value;



      
        
        axios.post('http://157.245.247.182:3005/api/visualizar', {
          nombre,
          folio,
          descuento,
          /** */
      })
      .then(response => {
          const {ok} = response.data;
    
          console.log(ok);
          if(ok){
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Cliente registrado con exito",
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
const [visible, setVisible] = React.useState(false);
const showDrawer = () => {
  setVisible(true);
};
const onClose = () => {
  setVisible(false);
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
      /*const columns = [
        {
          title: 'Folio',
          dataIndex: 'folio',
          key: 'folio',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Nombre',
          dataIndex: 'Nombre',
          key: 'Nombre',
        },
        {
          title: 'descuento',
          dataIndex: 'descuento',
          key: 'descuento',
        },
       
       
      ];*/
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
          <h1>Visualizar productos</h1>
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
                  
                  <Drawer
                      title="Agregar un nuevo cliente"
                      width={420}
                      onClose={onClose}
                      visible={visible}
                      bodyStyle={{ paddingBottom: 80 }}
                      extra={
                      <Space>
                          <Button onClick={onClose}>Cancelar</Button>
                        <Button type="submit" onClick={onSubmit} htmlType="submit">
                          
                              Agregar
                          </Button>
                      </Space>
                      }
                  >
                      <Form layout="vertical" hideRequiredMark>
                      <Row gutter={16}>
                          <Col span={20}>
                          <Form.Item
                              name="name"
                              label="Nombre"
                              rules={[{ required: true,
                                minLength: 5,
                                required: '^\\([0-9]{2}\\)((3[0-9]{3}-[0-9]{4})|(9[0-9]{3}-[0-9]{5}))$'}]}
                          >
                             
                              <Input  id="nombre" placeholder="Ingrese el nombre" />
                          </Form.Item>
                          </Col>
                      </Row>
                      <Row gutter={16}>
                          <Col span={20}>
                          <Form.Item
                              name="Folio"
                              label="Folio"
                              rules={[{ required: true, message: 'Please select an owner' }]}
                          >
                              
                            
                              <Input id="folio" placeholder="Ingrese folio" />
                         
                        
                              
                          </Form.Item>
                          </Col>
                      </Row>
                      <Row gutter={16}>
                          <Col span={20}>
                          <Form.Item
                            name="Descuento"
                            label="Descuentos"
                            rules={[{ required: true, message: 'Please choose the approver' }]}
                          >                              
<Input  id="descuento" placeholder="Ingrese el descuento" />
                          </Form.Item>
                          </Col>
                      </Row>
                      </Form>
                  </Drawer>
             
          <div className='table'>
            
            <Table dataSource={dataSource} columns={columns} />;
            
          </div>
          <Form.Item {...buttonItemLayout}>
            
            
          </Form.Item>
    </Form>
      </Layouts>
    );
};

export default FormLayoutDemo ;
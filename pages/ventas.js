import Layouts from '../layout/Layout';
import React, { useState, useEffect } from "react";
import {  Table,Drawer, Form, Button, Col, Row, Input, Select, Space} from 'antd';
import {  UserAddOutlined } from '@ant-design/icons';
import Swal from "sweetalert2";
import Link from 'next/link';
import axios from 'axios';


export default function ventas() {
  const onSubmit = event => {
      
    event.preventDefault() // don't redirect the page
    // where we'll add our form logic
    let folio = document.getElementById('folio').value;
    let precio = document.getElementById('precio').value;
    let cantidad = document.getElementById('cantidad').value;

    
    axios.post('http://157.245.247.182:3005/api/ventas', {
      folio,
      precio,
      cantidad,
      /** */
  })
  .then(response => {
      const {ok} = response.data;

      console.log(ok);
      if(ok){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "venta registrada con exito",
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
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');

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
          <div className="login">
            <h1>VENTAS</h1>
          </div>
          
          <Form.Item label="folio">
            <Input id="folio" placeholder="" />
          </Form.Item>
          
          
          
          <Form.Item label="Precio">
            <Input id="precio" placeholder="" />
          </Form.Item>
          <Form.Item label="Cantidad">
            <Input id="cantidad" placeholder="" />
          </Form.Item>
          
          <Form.Item {...buttonItemLayout}>
          <Button type="submit" onClick={onSubmit} htmlType="submit">Guardar</Button>
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            
            
          </Form.Item>
        </Form>
      </Layouts>
  );
}

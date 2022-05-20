import Layouts from '../layout/Layout';
import React, { useState } from 'react';
import { Form, Input, Button, Radio } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import axios from 'axios';
import Swal from "sweetalert2";

const altaprod = () => {
  const onSubmit = event => {
    event.preventDefault() // don't redirect the page
    // where we'll add our form logic
    let nombre = document.getElementById('nombre').value;
    let marca = document.getElementById('marca').value;
    let modelo = document.getElementById('modelo').value;
    let precio = document.getElementById('precio').value;
    let cantidad = document.getElementById('cantidad').value;

    axios.post('http://164.92.113.213:3005/api/productos', {
      nombre,
      marca,
      modelo,
      precio,
      cantidad
  })
  .then(response => {
      const {ok} = response.data;

      console.log(ok);
      if(ok){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Producto registrado con exito",
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById("nombre").value='';
        document.getElementById("marca").value='';
        document.getElementById("modelo").value='';
        document.getElementById("precio").value='';
        document.getElementById("cantidad").value='';
      }else{
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Producto no registrado",
          showConfirmButton: false,
          timer: 1500,
        });
      }
  });
  

  }
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');
  function onChange(value) {
    console.log('changed', value);
  }
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  return (
    <Layouts>
      
      <Form
      Form={Form}
      layout="layout"
      initialValues={{
        requiredMarkValue: requiredMark,
      }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark}
      
    >
        <div>
            <h1 className='container'>Alta de producto</h1>
            <div className="centar">
                <Form.Item  label="Nombre del producto" required tooltip="ejemplo, mica, usb, cables, etc">
                    <Input id="nombre" placeholder="" size ="large"/>

                </Form.Item>
                <Form.Item  label="Marca " required tooltip="ejemplo, samsung, LG, etc" >
                    <Input id="marca" placeholder="" size ="large" />
                </Form.Item>
                <Form.Item label="Modelo" required tooltip="ejemplo, grand prime, a11, a22,etc">
                    <Input id="modelo" placeholder="" size ="large" />
                </Form.Item>
                <Form.Item label="Precio" required tooltip="costo total">
                    <Input id="precio" placeholder=""size ="large"  />
                </Form.Item>
                <Form.Item label ="Cantidad de producto" required tooltip="cantidad, unidades">
                    <Input id="cantidad" placeholder="" size ="large" />
                </Form.Item>
                <br/>
                <Form.Item>
                <Button type="submit" onClick={onSubmit} htmlType="submit">Guardar</Button>
                </Form.Item>
                <Form.Item>
                 
                </Form.Item>
            </div>
        </div>
        
    </Form>
    </Layouts>
  );
};
export default altaprod;
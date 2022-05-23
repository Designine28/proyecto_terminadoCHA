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
    
    
    axios.delete(`http://157.245.247.182:3005/api/productos/${nombre}`, {
      
  })
  .then(response => {
      const {ok} = response.data;

      console.log(ok);
      if(ok){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Se elimino con exito",
          showConfirmButton: false,
          timer: 1500,
        });
      }else{
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Producto no encontrado",
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
              <h1 className='container'>Baja de producto</h1>
              <div className="centar">
                  <Form.Item  label="Nombre del producto" required tooltip="Escribir solo el nombre del producto ">
                      <Input id="nombre" placeholder="" size ="large"/>
                  </Form.Item>
                  
                      
                  
                  <Form.Item>
                  <Button type="submit" onClick={onSubmit} htmlType="submit">Eliminar</Button>
                  </Form.Item>
              </div>
          </div>
        
        </Form>
      </Layouts>
    );
};
export default altaprod;
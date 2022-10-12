import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form   } from "shared/components";
import toast from 'shared/utils/toast';
import api from 'shared/utils/api';
import { getStoredAuthToken, storeAuthToken } from 'shared/utils/authToken';

import { FormCont, FormElement } from "./Styles";

const LoginForm =()=>{
    const history = useHistory();
    return (
    <Form
      initialValues= {{
        name:"",
        password:"",  
      }}
      validations={{
        name: [Form.is.required(), Form.is.maxLength(100)],
        password: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          const { authToken, user } = await api.post('/login',values);
          if (!authToken)
          {
            toast.error("Error in login");
          }else{
            toast.success('Login successed');
            storeAuthToken(authToken);
            history.push('/');
          }
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}    
    >
        <FormCont>
        <FormElement>
          <Form.Field.Input name="name" label="User Name" placeholder={"User Name"}  />
          <Form.Field.Input name="password" label="Password" type={"password"} placeholder={"Password"}/>
          <Button type="submit" variant="primary">
            Login
          </Button>
        </FormElement>
        </FormCont>
    </Form>
    );
};

export default LoginForm;
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Form   } from "shared/components";
import toast from 'shared/utils/toast';
import api from 'shared/utils/api';
import { getStoredAuthToken, storeAuthToken, removeStoredAuthToken } from 'shared/utils/authToken';

import { ActionButton, Actions, FormCont, FormElement } from "./Styles";

const propTypes = {
  logout:PropTypes.bool,
  setIsLogin:PropTypes.func.isRequired,
};

const LoginForm =({logout, setIsLogin})=>{
    const history = useHistory();
    if (logout)
    {
      removeStoredAuthToken();
      setIsLogin(false);
    }
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
            setIsLogin(true);
            history.push('/');
          }
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}    
    >
        <FormCont>
        <FormElement>
          <Form.Field.Input name="name" label="User Name" placeholder={"User Name"} tip={"UserName:demo"}  />
          <Form.Field.Input name="password" label="Password" type={"password"} placeholder={"Password"} tip={"Password:1234"} />
          <Actions>
            <ActionButton type="submit" variant="primary">
                Login
            </ActionButton>
          </Actions>
        </FormElement>
        </FormCont>
    </Form>
    );
};

export default LoginForm;
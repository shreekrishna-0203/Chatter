import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Forgot password values:', values);
    
    setTimeout(() => {
      navigate('/');
      setSubmitting(false);
    }, 500); 
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
  });

  return (
    <div className="container">
      <h2>Forgot Password</h2>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Email</label>
              <Field type="email" name="email" className="input" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting}>Submit</button>
          </Form>
        )}
      </Formik>
      <button onClick={() => navigate('/')}>Login</button>
    </div>
  );
};

export default ForgotPassword;

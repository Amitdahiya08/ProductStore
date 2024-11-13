import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
    const initialValues = {
        name: '',
        price: '',
        image: '',
    };

    const navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        price: Yup.number()
            .typeError('Price must be a number')
            .required('Price is required'),
        image: Yup.string().url('Enter a valid URL').required('Image URL is required'),
    });

    const onSubmit = (values) => {
        const apiUrl = 'http://localhost:8080/api/products';

        fetch(apiUrl,{
            method: "POST",
            headers :{
                'Content-Type' : "application/json"
            },
            body: JSON.stringify(values),
        }).then(response => response.json()).then(data => console.log(data))
        .catch(error => console.log("ERROR",error));

        console.log('Form Data:', values);
        navigate("/");
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.formCard}>
                <h2 style={styles.formTitle}>Create Product</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {() => (
                        <Form style={styles.form}>
                            <div style={styles.formField}>
                                <label htmlFor="name" style={styles.label}>Product Name</label>
                                <Field type="text" id="name" name="name" style={styles.input} />
                                <ErrorMessage name="name" component="div" style={styles.error} />
                            </div>

                            <div style={styles.formField}>
                                <label htmlFor="price" style={styles.label}>Price</label>
                                <Field type="text" id="price" name="price" style={styles.input} />
                                <ErrorMessage name="price" component="div" style={styles.error} />
                            </div>

                            <div style={styles.formField}>
                                <label htmlFor="image" style={styles.label}>Image URL</label>
                                <Field type="text" id="image" name="image" style={styles.input} />
                                <ErrorMessage name="image" component="div" style={styles.error} />
                            </div>

                            <button type="submit" style={styles.submitButton}>Create Product</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f6f8',
    },
    formCard: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '32px',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
    },
    formTitle: {
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '24px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formField: {
        marginBottom: '20px',
        textAlign: 'left',
    },
    label: {
        fontSize: '16px',
        marginBottom: '8px',
        color: '#555',
    },
    input: {
        width: '100%',
        padding: '12px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    error: {
        color: '#ff4d4d',
        fontSize: '12px',
        marginTop: '6px',
    },
    submitButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    submitButtonHover: {
        backgroundColor: '#0056b3',
    },
};

export default CreatePage;

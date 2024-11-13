import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const EditForm = ({ product, onClose }) => {
    const initialValues = {
        name: product?.name || '',
        price: product?.price || '',
        image: product?.image || '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        price: Yup.number()
            .typeError('Price must be a number')
            .required('Price is required'),
        image: Yup.string().url('Enter a valid URL').required('Image URL is required'),
    });

    const onSubmit = (values) => {
        const apiUrl = `https://productstore-0p51.onrender.com/api/products/${product._id}`;

        fetch(apiUrl, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(values),
        }).then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.log("ERROR", error));

        onClose(); // Close modal after submission
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <button onClick={onClose} style={styles.closeButton}>X</button>
                <h2 style={styles.formTitle}>Edit Product</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
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

                            <button type="submit" style={styles.submitButton}>Edit Product</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

const styles = {
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        fontSize: '18px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
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
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default EditForm;

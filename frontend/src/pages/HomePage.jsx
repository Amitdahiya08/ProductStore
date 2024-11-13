import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditForm from './EditForm';

const Homepage = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await fetch("https://productstore-0p51.onrender.com/api/products");
            const data = (await response.json()).data;
            console.log(data);
            setProducts(data); 
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [products]);

    const fallbackImage = 'https://via.placeholder.com/150?text=Image+Not+Available';

    const handleEdit = (product) => {
        setSelectedProduct(product); 
    };

    const handleDelete = (id) => {
        console.log(id);
        const apiUrl = `https://productstore-0p51.onrender.com/api/products/${id}`;
        fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Deleted:', data);
            fetchProducts(); // Refresh the product list after deletion
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const closeModal = () => {
        setSelectedProduct(null); // Close the modal
    };

    return (
        <div style={styles.container}>
            <ul style={styles.productList}>
                {products?.map((product) => (
                    <li key={product.id} style={styles.card}>
                        <img
                            src={product.image || fallbackImage}
                            alt={product.name}
                            style={styles.image}
                            onError={(e) => e.target.src = fallbackImage}
                        />
                        <div style={styles.details}>
                            <h1 style={styles.name}>{product.name}</h1>
                            <h2 style={styles.price}>${product.price}</h2>
                        </div>
                        <div style={styles.buttonContainer}>
                            <button onClick={() => handleEdit(product)} style={styles.editButton}>Edit</button>
                            <button onClick={() => handleDelete(product._id)} style={styles.deleteButton}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Render EditForm as modal if a product is selected */}
            {selectedProduct && (
                <EditForm product={selectedProduct} onClose={closeModal} />
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
    },
    productList: {
        listStyle: 'none',
        padding: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        maxWidth: '1200px',
        width: '100%',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '16px',
    },
    image: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
    },
    details: {
        padding: '10px',
    },
    name: {
        fontSize: '18px',
        color: '#333',
        margin: '8px 0',
    },
    price: {
        fontSize: '16px',
        color: '#555',
    },
    buttonContainer: {
        display: 'flex',
        gap: '10px',
        marginTop: '10px',
    },
    editButton: {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default Homepage;

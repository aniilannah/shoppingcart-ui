import axios from "axios";

const apiUrl = "http://localhost:9001/api/cart";

export const fetchCartItems = async () => {
    const items = await axios.get(`${apiUrl}/get-items`);
    return items.data;
};

export const fetchCartTotal = async () => {
    const total = await axios.get(`${apiUrl}/cart-total`);
    return total.data;
};

export const removeProduct = async (name) => {
    await axios.delete(`${apiUrl}/remove-product/${name}`);
};

export const addProduct = async (product) => {
    await axios.post(`${apiUrl}/add-product`, product);
};

export const applyDiscount = async (hasMembership) => {
    const response = await axios.post(`${apiUrl}/apply-discount`, null, {
        params: { hasMembership }
    });
    return response.data;
};

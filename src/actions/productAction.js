import { ALL_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../actionTypes';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

export const fetchAllProduct = () => async (dispatch) => {
	try {
		const { data } = await axios.get(API_URL);
		dispatch(allProduct(data));
	} catch (error) {
		console.log(error);
	}
};

const allProduct = (data) => ({
	type: ALL_PRODUCT,
	payload: data
});

export const createProductRequest = (product) => async (dispatch) => {
	try {
		const { data } = await axios.post(API_URL, product);
		dispatch(createProduct(data));
	} catch (error) {
		console.log(error);
	}
};

const createProduct = (product) => ({
	type: CREATE_PRODUCT,
	payload: product
});

// const updateProduct
export const updateProductRequest = (id, product) => async (dispatch) => {
	try {
		const { data } = await axios.patch(`${API_URL}/${id}`, product);
		dispatch(updateProduct(id, data));
	} catch (error) {
		console.log(error);
	}
};

const updateProduct = (id, product) => ({
	type: UPDATE_PRODUCT,
	payload: {
		id,
		product
	}
});

export const deleteProductRequest = (id) => async (dispatch) => {
	try {
		await axios.delete(`${API_URL}/${id}`);
		dispatch(deleteProduct(id));
	} catch (error) {
		console.log(error);
	}
};

const deleteProduct = (id) => ({
	type: DELETE_PRODUCT,
	payload: id
});

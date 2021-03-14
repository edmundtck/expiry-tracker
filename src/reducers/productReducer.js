import { ALL_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../actionTypes';

const initState = [];

const productReducer = (state = initState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ALL_PRODUCT:
			return payload;
		case CREATE_PRODUCT:
			return [ ...state, payload ];
		case UPDATE_PRODUCT:
			return state.map((item) => (item._id === payload.id ? payload.product : item));
		case DELETE_PRODUCT:
			return state.filter((item) => item._id !== payload);
		default:
			return state;
	}
};

export default productReducer;

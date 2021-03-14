import { createSelector } from 'reselect';
import moment from 'moment';

const productsSelector = (state) => state.products;

export const sortExpiryDateSelector = createSelector([ productsSelector ], (products) =>
	products.sort((a, b) => {
		const diff = moment(a.expiryDate).diff(moment(b.expiryDate));
		return diff;
	})
);

export const filterProductsByUserIdSelector = (userId) =>
	createSelector([ sortExpiryDateSelector ], (sortedProducts) =>
		sortedProducts.filter((item) => item.userId === userId)
	);

export const getProductByIdSelector = (id) =>
	createSelector([ productsSelector ], (products) => products.find((item) => item._id === id));

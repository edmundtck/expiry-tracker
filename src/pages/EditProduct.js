import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import { updateProductRequest } from '../actions/productAction';
import { getProductByIdSelector } from '../selectors/productSelector';

import Loading from '../components/Loading';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const initState = {
	product: '',
	location: '',
	description: '',
	expiryDate: ''
};

const useStyles = makeStyles((theme) => ({
	form: {
		maxWidth: '30rem'
	},
	btn: {
		marginTop: theme.spacing(1),
		marginLeft: theme.spacing(1)
	}
}));

function EditProduct() {
	const { id } = useParams();
	const product = useSelector(getProductByIdSelector(id));
	const [ form, setForm ] = useState(initState);
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(
		() => {
			if (product) {
				setForm({
					product: product.product,
					location: product.location,
					description: product.description,
					expiryDate: moment(product.expiryDate).format('YYYY-MM-DD')
				});
			}
		},
		[ product ]
	);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateProductRequest(id, form));
		history.push('/dashboard');
	};

	if (!product) {
		return <Loading />;
	}

	return (
		<div>
			<Container>
				<h1>Edit Product</h1>
				<form onSubmit={handleSubmit} className={classes.form}>
					<Grid container spacing={3}>
						<Grid item sm={12}>
							<TextField
								name="product"
								fullWidth
								onChange={handleInputChange}
								value={form.product}
								label="Product"
								required
							/>
						</Grid>
						<Grid item sm={12}>
							<TextField
								name="location"
								onChange={handleInputChange}
								value={form.location}
								label="Location"
								fullWidth
								required
							/>
						</Grid>
						<Grid item sm={12}>
							<TextField
								label="Description"
								multiline
								rows={4}
								name="description"
								onChange={handleInputChange}
								value={form.description}
								fullWidth
							/>
						</Grid>
						<Grid item sm={12}>
							<TextField
								label="Expiry Date"
								type="date"
								InputLabelProps={{
									shrink: true
								}}
								fullWidth
								name="expiryDate"
								onChange={handleInputChange}
								value={form.expiryDate}
								required
							/>
						</Grid>
						<Button type="submit" className={classes.btn} variant="contained" color="primary">
							Update
						</Button>
					</Grid>
				</form>
			</Container>
		</div>
	);
}

export default EditProduct;

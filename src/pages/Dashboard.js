import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '@auth0/auth0-react';

import { deleteProductRequest } from '../actions/productAction';
import { filterProductsByUserIdSelector } from '../selectors/productSelector';

import ProductCard from '../components/ProductCard';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
	fab: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2)
	},
	container: {
		paddingBottom: theme.spacing(10)
	}
}));

function Dashboard() {
	const dispatch = useDispatch();
	const classes = useStyles();
	const history = useHistory();
	const { user } = useAuth0();
	const products = useSelector(filterProductsByUserIdSelector(user.sub));

	const handleDelete = (id) => {
		dispatch(deleteProductRequest(id));
	};

	const handleAddProduct = () => {
		history.push('/products');
	};

	return (
		<div>
			<Container>
				<h1>Dashboard</h1>
				<Grid className={classes.container} container spacing={2}>
					{products.map((item) => (
						<Grid xs={12} sm={4} md={3} item key={item._id}>
							<ProductCard item={item} handleDelete={handleDelete} />
						</Grid>
					))}
				</Grid>
			</Container>
			<Fab onClick={handleAddProduct} className={classes.fab} color="secondary" aria-label="add">
				<AddIcon />
			</Fab>
		</div>
	);
}

export default Dashboard;

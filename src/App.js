import React, { useEffect } from 'react';
import { Switch, Route, Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '@auth0/auth0-react';

import { fetchAllProduct } from './actions/productAction';
import ProtectedRoute from './auth/protected-route';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';

import AuthenticationButton from './components/AuthenticationButton';
import Loading from './components/Loading';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import TodayIcon from '@material-ui/icons/Today';

const useStyles = makeStyles((theme) => ({
	logo: {
		flexGrow: 1,
		'&:hover': {
			textDecoration: 'none'
		}
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	paper: {
		minHeight: '100vh'
	}
}));

function App() {
	const { isLoading, isAuthenticated } = useAuth0();

	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(fetchAllProduct());
		},
		[ dispatch ]
	);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className="app">
			<Paper className={classes.paper}>
				<AppBar position="static">
					<Toolbar>
						<TodayIcon className={classes.menuButton} />
						<Link
							className={classes.logo}
							color="inherit"
							variant="h6"
							component={RouterLink}
							to={isAuthenticated ? '/dashboard' : '/'}
						>
							Expiry Tracker
						</Link>
						<AuthenticationButton />
					</Toolbar>
				</AppBar>
				<Switch>
					<Route exact path="/" component={Home} />
					<ProtectedRoute exact path="/dashboard" component={Dashboard} />
					<ProtectedRoute exact path="/products" component={CreateProduct} />
					<ProtectedRoute exact path="/products/:id" component={EditProduct} />

					{/* <Route exact path="/products">
						<CreateProduct />
					</Route>
					<Route exact path="/products/:id">
						<EditProduct />
					</Route> */}
				</Switch>
			</Paper>
		</div>
	);
}

export default App;

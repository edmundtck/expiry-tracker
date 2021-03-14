import React, { useState } from 'react';
import FileBase64 from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '@auth0/auth0-react';

import { createProductRequest } from '../actions/productAction';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const initState = {
	product: '',
	location: '',
	description: '',
	image: '',
	expiryDate: ''
};

const useStyles = makeStyles((theme) => ({
	form: {
		maxWidth: '30rem'
	},
	gridContainer: {
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column'
		}
	},
	btn: {
		[theme.breakpoints.down('xs')]: {
			width: '100%'
		}
	}
}));

function CreateProduct() {
	const [ form, setForm ] = useState(initState);
	const history = useHistory();
	const classes = useStyles();
	const dispatch = useDispatch();
	const { user } = useAuth0();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value
		});
	};

	const handleFileDone = (file) => {
		setForm({
			...form,
			image: file.base64
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const updateForm = { ...form, userId: user.sub };
		dispatch(createProductRequest(updateForm));
		history.push('/dashboard');
	};

	return (
		<Container>
			<h1>Create Product</h1>
			<form onSubmit={handleSubmit} className={classes.form}>
				<Grid className={classes.gridContainer} container spacing={3}>
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
					<Grid item sm={12}>
						<FormControl>
							<Typography variant="body2" color="textSecondary">
								File Upload
							</Typography>
							<FileBase64 multiple={false} onDone={handleFileDone} />
						</FormControl>
					</Grid>
					<Grid item sm={12}>
						<Button type="submit" className={classes.btn} variant="contained" color="primary">
							Create
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
}

export default CreateProduct;

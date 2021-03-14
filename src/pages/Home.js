import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';

import background from '../assets/pear-bg.jpg';

const useStyles = makeStyles((theme) => ({
	root: {
		background: '#8bc34a',
		height: 'calc(100vh - 64px)'
	},
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%'
	},
	img: {
		width: '100%'
	},
	imgWrapper: {
		[theme.breakpoints.down('xs')]: {
			order: -1
		}
	},
	btn: {
		marginTop: theme.spacing(2)
	}
}));

function Home() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Container className={classes.container}>
				<Grid container justify="center" alignItems="center">
					<Grid item sm={6}>
						<Typography variant="h2" gutterBottom>
							Expiry Tracker
						</Typography>
						<Typography variant="body1" gutterBottom>
							Keep track of product's expiry date before they are wasted.
						</Typography>
						<Button
							className={classes.btn}
							variant="contained"
							endIcon={<SendIcon />}
							color="primary"
							component={Link}
							to="/dashboard"
						>
							Let's Go!
						</Button>
					</Grid>
					<Grid className={classes.imgWrapper} item sm={6}>
						<img className={classes.img} src={background} alt="home page background" />
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default Home;

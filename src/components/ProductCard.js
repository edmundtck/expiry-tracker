import React, { useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: '#b2dfdb'
	},
	expireSoon: {
		backgroundColor: '#ffea00'
	},
	expire: {
		backgroundColor: '#f44336'
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	},
	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
	}
}));

function ProductCard({ item, handleDelete }) {
	const { _id, product, location, description, image, expiryDate } = item;
	const [ expanded, setExpanded ] = useState(false);
	const [ open, setOpen ] = useState(false);

	const classes = useStyles();
	const history = useHistory();

	const formatExpiryDate = moment(expiryDate).endOf('day');
	const expired = moment(formatExpiryDate).diff(moment().endOf('day'), 'days') < 0;
	const expireSoon = moment(formatExpiryDate).subtract(8, 'days').diff(moment().endOf('day')) < 0;
	const diff = moment(formatExpiryDate).fromNow();

	const handleEdit = () => {
		history.push(`/products/${_id}`);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<div>
			<Card
				className={classNames(
					classes.root,
					{ [classes.expire]: expired },
					{ [classes.expireSoon]: expireSoon }
				)}
			>
				<CardContent>
					<Typography variant="h5" component="h2" className={classes.title}>
						{product}
					</Typography>
					<Typography variant="subtitle1">{location}</Typography>
					<CardMedia
						className={classes.media}
						image={image || 'https://source.unsplash.com/random'}
						title={product}
					/>
					<Typography variant="subtitle1">{moment(expiryDate).format('MMMM DD YYYY')}</Typography>
					<Typography variant="subtitle2">{expired ? 'Has expired' : `${diff}`}</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton onClick={handleEdit} aria-label="edit">
						<EditIcon />
					</IconButton>
					<IconButton onClick={handleClickOpen} aria-label="delete">
						<DeleteIcon />
					</IconButton>
					{description && (
						<IconButton
							className={classNames(classes.expand, {
								[classes.expandOpen]: expanded
							})}
							onClick={handleExpandClick}
							aria-expanded={expanded}
							aria-label="show more"
						>
							<ExpandMoreIcon />
						</IconButton>
					)}
				</CardActions>
				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<CardContent>
						<Typography variant="body1">{description}</Typography>
					</CardContent>
				</Collapse>
			</Card>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Confirm to delete product?</DialogTitle>
				<DialogActions>
					<Button onClick={handleClose} color="primary" variant="outlined">
						No
					</Button>
					<Button onClick={() => handleDelete(_id)} variant="contained" color="secondary" autoFocus>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default ProductCard;

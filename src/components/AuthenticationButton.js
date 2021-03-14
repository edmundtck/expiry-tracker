import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '@auth0/auth0-react';

import Hidden from '@material-ui/core/Hidden';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import SignupButton from './SignupButton';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1)
		}
	}
}));

const AuthenticationButton = () => {
	const { isAuthenticated } = useAuth0();
	const classes = useStyles();

	return isAuthenticated ? (
		<LogoutButton />
	) : (
		<div className={classes.root}>
			<LoginButton />
			<Hidden xsDown>
				<SignupButton />
			</Hidden>
		</div>
	);
};

export default AuthenticationButton;

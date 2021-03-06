import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@mui/material'

import useStyles from './styles';
import memories from '../.././images/memories.png';
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const classes = useStyles();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate.push('/');
        setUser(null);

    };

    useEffect(() => {
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>

                <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">Souvenirs</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="container" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>

                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}

            </Toolbar>
        </AppBar>
    )
}

export default Navbar
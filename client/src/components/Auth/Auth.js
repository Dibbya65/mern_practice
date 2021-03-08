import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Icon from './Icon';

import Input from '../../components/Input/Input';
import { signup, signin } from '../../actions/auth';

import useStyles from './styles';
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    // console.log(formData);
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const switchMode = () => {
    setFormData(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = () => {
    console.log('Google sing was failed');
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avator}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'Signup' : 'Signin'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <Fragment>
                <Input
                  name='firstName'
                  lable='First Name'
                  handleChange={handleChange}
                  autoFocus
                  half
                  type='text'
                />
                <Input
                  name='lastName'
                  lable='Last Name'
                  handleChange={handleChange}
                  half
                  type='text'
                />
              </Fragment>
            )}
            <Input
              name='email'
              lable='Email'
              handleChange={handleChange}
              half
              type='email'
            />
            <Input
              name='password'
              lable='Password'
              handleChange={handleChange}
              half
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name='confirmPassword'
                lable='Confirm Password'
                handleChange={handleChange}
                half
                type='password'
              />
            )}
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {isSignup ? 'Signup' : 'Signin'}
          </Button>

          <GoogleLogin
            clientId='191402873539-ih2f83b9j0abe5m889j4rpeq4b7fuue2.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color='primary'
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant='contained'
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
          <Grid container justify='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? 'Already have an account? Signin'
                  : 'Donot have an account ? Signup'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;

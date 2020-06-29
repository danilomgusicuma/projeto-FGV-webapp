import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link, useParams} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle'
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import socket from '../../connection';
import {register, login} from '../../serverCalls';
import healthImg from '../../assets/health.png';
import cooperative from '../../assets/cooperative.jpg';

//socket.emit('teste', 'teste01')


const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image:{
    objectFit:'cover',
    height:'100%',
    width:'100%'
  },
  video: {
    display:'block',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '64px',
    marginBottom: '64px',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [signInData, setSignInData] = useState({
    login:null,
    senha:null
  })
  const {type} = useParams();

  function onSimulationClick(){
    const {username, senha} = signInData
    const creden = {login:username, senha};
    console.log(creden)
    login(creden)
    setError(true);
  }

  useEffect(()=>{
    socket.on('login-client-aprovado',creden=>{
      props.history.push(`/${type}/game/manual`)
    })
    return(()=>{
      socket.off('login-aprovado')
    })
  }, [])

  return (
    <>
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Hidden xsDown>
        <Grid item xs={false} sm={12} md={7}>
          <img src={type==='hsg' ? healthImg : cooperative} className={classes.image}/>
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Entrar
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              error={error}
              helperText={error? "falha no login" : null}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              name="login"
              autoComplete="login"
              autoFocus
              onChange={e=>setSignInData({...signInData, username:e.target.value})}
            />
            <TextField
              error={error}
              helperText={error? "falha no login" : null}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e=>setSignInData({...signInData, senha:e.target.value})}
            />
           {/* <TextField
              error={error}
              helperText={error? "falha no login" : null}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="instance"
              label="Instância"
              name="instância"
              autoComplete="instância"
              autoFocus
              onChange={e=>setSignInData({...signInData, instance:e.target.value})}
            /> */}
            <Button
              //type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={()=>onSimulationClick()}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link to={`register`} variant="body2">
                  {"Não tem uma conta? Cadastre-se"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
    </>
  );
}
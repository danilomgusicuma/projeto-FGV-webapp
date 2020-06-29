import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link, useHistory, useParams} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import socket from '../../connection';


function Copyright() {
  return (
    // <Typography variant="body2" color="textSecondary" align="center">
    //   {'Copyright © '}
    //   <Link color="inherit" href="https://material-ui.com/">
    //     Your Website
    //   </Link>{' '}
    //   {new Date().getFullYear()}
    //   {'.'}
    // </Typography>
    <></>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.primary[50] : theme.palette.primary[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    objectFit:'cover',
    height:'100%',
    width:'100%'
  },
  video: {
    display:'block',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '64px',
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

export default function Register(props) {
  const classes = useStyles();
  const history = useHistory();
  const {type} = useParams();
  const [signUpData, setSignUpData] = useState({
    cpf: null,
    nome: null,
    senha: null,
    login: null,
    telefone: null,
    email: null,
  });
  const healthImg = 'http://api.desafiosdegestao.com.br:3000/assets/health.png';
  const cooperativeImg = 'http://api.desafiosdegestao.com.br:3000/assets/cooperative.jpg';


  function register(){
    let {cpf, nome, senha, login, telefone, email} = signUpData
    if(cpf && nome && senha && login && telefone && email){
      socket.emit('register-client', signUpData )
    }
    
  }

  useEffect(()=>{
    socket.on('login-client-aprovado',data=>{
      history.push(`/${type}/game/inputs`)
    })
    return(()=>{
      socket.off('login-client-aprovado')
    })
  })

  return (
    <>
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7}>
        <img src={type==='hsg' ? healthImg : cooperativeImg} alt="illustration" className={classes.image}/>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nome"
              label="Nome"
              name="nome"
              autoComplete="nome"
              autoFocus
              onChange={e=>setSignUpData({...signUpData, nome:e.target.value})}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e=>setSignUpData({...signUpData, email:e.target.value})}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              name="login"
              autoComplete="login"
              autoFocus
              onChange={e=>setSignUpData({...signUpData, login:e.target.value})}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="senha"
              label="Senha"
              name="senha"
              autoComplete="senha"
              autoFocus
              onChange={e=>setSignUpData({...signUpData, senha:e.target.value})}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cpf"
              label="CPF"
              name="cpf"
              autoComplete="cpf"
              autoFocus
              onChange={e=>setSignUpData({...signUpData, cpf:e.target.value})}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="telefone"
              label="Telefone"
              type="telefone"
              id="telefone"
              autoComplete="current-password"
              onChange={e=>setSignUpData({...signUpData, telefone:e.target.value})}
            />
           
            <Button
              //type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={()=>register()}
            >
              Registrar-se
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link to='login' variant="body2">
                  {"Já tem uma conta? Faça login"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
    </>
  );
}
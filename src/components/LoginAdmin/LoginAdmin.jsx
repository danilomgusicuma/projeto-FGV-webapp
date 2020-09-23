import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import socket from '../../connection';

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
  const {type} = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [signInData, setSignInData] = useState({
    login:null,
    password:null,
  })

  const healthImg = 'http://api.desafiosdegestao.com.br:3000/assets/health.png';
  const cooperativeImg = 'http://api.desafiosdegestao.com.br:3000/assets/cooperative.jpg';


  function onClick(){
    console.log(signInData)
    socket.emit('login-adm', signInData);
    history.push(`/${type}/admin/panel`)
    setError(true);
  }

  useEffect(()=>{
    socket.on('login-client-aprovado',creden=>{
      history.push(`/${type}/game/inputs`)
    })
    return(()=>{
      socket.off('login-client-aprovado')
    })
  }, [history, type])

  return (
    <>
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Hidden xsDown>
        <Grid item xs={false} sm={12} md={7} className={classes.image}>
          <img alt="illustration" src={type === 'hsg' ? healthImg : cooperativeImg}/>
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
              onChange={e=>setSignInData({...signInData, login:e.target.value})}
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
              onChange={e=>setSignInData({...signInData, password:e.target.value})}
            />
            <Button
              //type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={()=>onClick()}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
    </>
  );
}
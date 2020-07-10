import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  container:{
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  video:{
    width:'70%',
    display:'block',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  button:{
    margin:'14px'
  },
  image:{
    objectFit:'cover',
    height:'100%',
    width:'100%'
  },
  grid:{
    marginTop:'5%'
  },
  texts:{
    display:'block',
    marginRight: 'auto',
    marginLeft: 'auto',
    width:'90%'
  }
}))

function SimSelect(props){
  const classes = useStyles();
  const history = useHistory();
  return(
    <>
      <CssBaseline />
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={12} md={6}>
          <img src={'http://api.desafiosdegestao.com.br:3000/assets/business.jpg'} alt="business" className={classes.image}/>
        </Grid>
        <Grid item xs={false} sm={12} md={6} className={classes.grid}>
          <div className = {classes.container}>
          
          <div className={classes.texts}>
            <Typography component="h1" variant="h5" className={classes.button}>
              Bem vindo ao Desafio de Gestão!
            </Typography>
            <Typography component="p" variant="body1" className={classes.button}>
              Aqui esperamos que você aprenda se divertindo. 
              E dessa forma possa entender de forma dinâmica como os vários elementos 
              da administração interferem no processo de gestão.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={()=>{
                history.push('/hsg/login');
              }}
              className={classes.button}
            >
              HSG - Health Service Game
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={()=>{
                history.push('/cbg/login');
              }}
              className={classes.button}
            >
              CBG - Cooperative Business Game
            </Button>
            <div><br></br></div>
          </div>
          <div><br></br></div>
          <video controls className={classes.video}>
            <source src='http://api.desafiosdegestao.com.br:3000/assets/video.mp4' type="video/mp4">
            </source>
          </video>
          <div className={classes.texts}>
          
          <div><br></br></div>
          <div><br></br></div>
          <div><br></br></div>
           <div>
            <p style={{fontSize:'10px'}}>TODOS OS DIREITOS Reservados. Nenhum dos jogos ou desafios simulados podem ser utilizados sem a devida permissão da QUES - Qualidade e Excelência em Serviços, detentora dos direitos legais de uso.</p>
            <img alt="ques" src={'http://api.desafiosdegestao.com.br:3000/assets/ques.png'} style={{width:'40px', marginLeft:'auto'}}/>
            </div>
          </div>
          
          </div>
          
        </Grid>
      </Grid>
    </>
  )
}

export default SimSelect;
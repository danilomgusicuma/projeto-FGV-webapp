import React, { useEffect, useState } from 'react';
import Balanco from './Balanco';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {useParams} from 'react-router-dom';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import socket from '../../connection';


const useStyles = makeStyles(theme => ({
  container:{
    marginLeft:'auto',
    marginRight:'auto'
  }
}))


function Reports (props){

  const [tipo, setTipo] = useState(['vazio'])
  const [tipo2, setTipo2] = useState(false)
  const [turnoc, setTurnoc] = useState('-')
  const {round} = useParams();
  const classes = useStyles();

  useEffect(()=>{
    socket.emit('puxar-bp-geral');
    socket.on('bp-geral', balanco => {
      setTipo(balanco)
    })
    return () => {socket.off('bp-geral')}

  },[])
  function gamb(a) {
    setTipo2(a.balanco_patrimonial);
    setTurnoc(a.turno)
  }
  

  return(
    <div className={classes.container}>
    <Grid container component="main">
      <Grid  item xs={false} sm={12} md={7}>
      <ButtonGroup disableElevation variant="contained" color="primary">
      {tipo.map((ativo,ce) => {
        
        if(ativo !== 'vazio'){
          return ( 
          <Button onClick={() => gamb(ativo)}>{ativo.cooperativa} - Bimestre: { ativo.turno}</Button>
          )
        }
        else{
          return (
            <Button onClick={() => {alert('Os balanços da concorrencia apenas se tornarão públicos após o segundo bimestre')}}>Informação indisponiel para o turno atual</Button>
            
          )
        }
          
      })} 
      </ButtonGroup> 
      </Grid>
  
      {tipo2 ? <Balanco ativo={'sim'} turno={turnoc} balanco={tipo2}/> : <h1></h1>}
    
      
      </Grid>
      
    </div>
  )
}

export default Reports;
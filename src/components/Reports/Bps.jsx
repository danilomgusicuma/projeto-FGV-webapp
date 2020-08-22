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
  const [tipo2, setTipo2] = useState(['vazio'])
  const [turno2, setTurno2] = useState(0)
  const {round} = useParams();
  const classes = useStyles();

  useEffect(()=>{
    socket.emit('puxar-bp-geral');
    socket.on('bp-geral', balanco => {
      setTipo(balanco)
      setTurno2(balanco.turno)
    })

  })

  

  return(
    <div className={classes.container}>
    <Grid container component="main">
      <Grid  item xs={false} sm={12} md={7}>
      <ButtonGroup disableElevation variant="contained" color="primary">
      {tipo.map((ativo,ce) => {
        
        if(ativo !== 'vazio'){
          return ( 
          <Button onClick={() => setTipo2([ativo.balanco_patrimonial])}>{ativo.cooperativa}</Button>
          )
        }
        else{
          return (
            <Button>Informação indisponiel para o turno atual</Button>
            
          )
        }
          
      })} 
      </ButtonGroup> 
      </Grid>
    {tipo2.map((ativo,ce) => {
          if(ativo !== 'vazio'){

          return (
            
              <Balanco ativo={'sim'} balanco={ativo} turnob={turno2}/>
            
          )

          }
         
        })}
    
      
      </Grid>
      
    </div>
  )
}

export default Reports;
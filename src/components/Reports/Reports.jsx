import React, { useEffect, useState } from 'react';
import Fluxo from './Fluxo';
import Dre from './Dre';
import Balanco from './Balanco';
import Decisions from './Decisions';
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

  const [tipo, setTipo] = useState(['f'])
  const {round} = useParams();
  const [turnoa, setTurnoa] = useState(1)
  const classes = useStyles();
  const [turnos, setTurnos] = useState([1,2])
  const [gamb, setGamb] = useState(0)

  useEffect(()=>{
    socket.emit('puxar-state');
    socket.on('update', update => {
      let arr = []
      for(let i = 1; i <= update[30]; i++){
        arr.push(i)
        console.log('arr.push('+i+')')
      }
      console.log('setTurnos('+arr+')')
      setTurnos(arr)
    })
    socket.emit('puxar-balancos', turnoa)

    return () => {socket.off('update')}
    

  }, [turnoa])
  

  

  return(
    <div className={classes.container}>
    <Grid container spacing={3} component="main">
    
    <Grid  item xs={false} sm={12} container
  direction="row"
  justify="space-evenly"
  alignItems="center">
          {turnos.map((t) => {
            if(t!==turnos.length){
              return <Button variant="contained" color="primary" onClick={() => setTurnoa(t)}>Bimetre {t}</Button>
            }
            else{
              return <Button variant="outlined" color="primary" onClick={() => setTurnoa(t)}>Bimetre {t}</Button>
            }
          })}
          
    </Grid>
    
      <Grid  item xs={false} sm={12} container
  direction="row"
  justify="center"
  alignItems="center"
  spacing={3}
  >
          
          <Button disableElevation variant="contained" color="primary"  onClick={() => setTipo(['b'])}>Balanço Patrimonial</Button>
          <Button disableElevation variant="contained" color="primary"  onClick={() => setTipo(['f'])}>Fluxo de Caixa</Button>
          <Button disableElevation variant="contained" color="primary" onClick={() => setTipo(['d'])}>Demonstração de Resultado (DRE)</Button> 
          <Button disableElevation variant="contained" color="primary" onClick={() => setTipo(['s'])}>Sumário de Decisões</Button>
          
      </Grid>
    {tipo.map((ativo,ce) => {

          if(ativo == 'b'){

          return (
            
              <Balanco round={turnoa}/>
            
          )

          }
          else if(ativo == 'd'){
            
          
            return (
              <Grid item xs={false} sm={12} container justify="center"
              alignItems="center"
            >
                <Grid>
                <Dre round={turnoa}/>
                </Grid>
              </Grid>
          
            )
            }
            else if(ativo == 'f'){

              return (
                <Grid item xs={false} sm={12} container justify="center"
                alignItems="center">
                  <Grid>
                  <Fluxo round={turnoa}/>
                  </Grid>
                </Grid>
            
              )
              }
              else if(ativo == 's'){

                return (
                  <Grid item xs={false} sm={12} container justify="center"
                  alignItems="center">
                    <Grid>
                    <Decisions round={round}/>
                    </Grid>
                  </Grid>
              
                )
                }
        
        
        })}
    
      
      </Grid>
      
    </div>
  )
}

export default Reports;
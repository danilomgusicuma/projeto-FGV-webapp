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


const useStyles = makeStyles(theme => ({
  container:{
    marginLeft:'auto',
    marginRight:'auto'
  }
}))


function Reports (props){

  const [tipo, setTipo] = useState(['f'])
  const {round} = useParams();
  const classes = useStyles();
  

  return(
    <div className={classes.container}>
    <Grid container component="main">
      <Grid  item xs={false} sm={12} md={7}>
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button onClick={() => setTipo(['b'])}>Balanço Patrimonial</Button>
          <Button onClick={() => setTipo(['d'])}>Demonstração de Resultado (DRE)</Button>
          <Button onClick={() => setTipo(['f'])}>Fluxo de Caixa</Button> 
          <Button onClick={() => setTipo(['s'])}>Sumário de Decisões</Button>
          </ButtonGroup>  
      </Grid>
    {tipo.map((ativo,ce) => {
          if(ativo == 'b'){

          return (
            
              <Balanco round={round}/>
            
          )

          }
          else if(ativo == 'd'){
            
          
            return (
              <Grid item xs={false} sm={12} md={8}>
                <Dre round={round}/>
              </Grid>
          
            )
            }
            else if(ativo == 'f'){

              return (
                <Grid m={10} item xs={false} sm={12} md={8}>
                  <Fluxo round={round}/>
                </Grid>
            
              )
              }
              else if(ativo == 's'){

                return (
                  <Grid m={10} item xs={false} sm={12} md={8}>
                    <Decisions round={round}/>
                  </Grid>
              
                )
                }
        })}
    
      
      </Grid>
      
    </div>
  )
}

export default Reports;
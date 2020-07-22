import React, { useEffect, useState } from 'react';
import Fluxo from './Fluxo';
import Dre from './Dre';
import Balanco from './Balanco';
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

  const [tipo, setTipo] = useState(['b'])
  const {round} = useParams();
  const classes = useStyles();
  

  return(
    <div className={classes.container}>
    <Grid container component="main">
      <Grid align="right" item xs={false} sm={12} md={8}>
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button onClick={() => setTipo(['b'])}>Balanço Patrimonial</Button>
          <Button onClick={() => setTipo(['d'])}>Demonstração de Resultado (DRE)</Button>
          <Button onClick={() => setTipo(['f'])}>Fluxo de Caixa</Button>  
          </ButtonGroup>  
      </Grid>
    {tipo.map((ativo,ce) => {
          if(ativo == 'b'){

          return (
            <Grid item xs={false} sm={12} md={10}>
              <Balanco round={round}/>
            </Grid>
          )

          }
          else if(ativo == 'd'){
            
          
            return (
              <Grid item xs={false} sm={12} md={10}>
                <Dre round={round}/>
              </Grid>
          
            )
            }
            else if(ativo == 'f'){

              return (
                <Grid item xs={false} sm={12} md={10}>
                  <Fluxo round={round}/>
                </Grid>
            
              )
              }
        })}
    
      
      </Grid>
      
    </div>
  )
}

export default Reports;
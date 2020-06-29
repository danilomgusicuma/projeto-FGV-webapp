import React from 'react';
import Fluxo from './Fluxo';
import Dre from './Dre';
import Balanco from './Balanco';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {useParams} from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  container:{
    marginLeft:'auto',
    marginRight:'auto'
  }
}))


function Reports (props){

  const {round} = useParams();
  const classes = useStyles();

  return(
    <div className={classes.container}>
      <Grid container component="main">
      <Grid item xs={false} sm={12} md={7}>
        <Balanco round={round}/>
      </Grid>
        <br/>
      <Grid item xs={false} sm={12} md={7}>
        <Dre round={round}/>
      </Grid>
        <br/>
      <Grid item xs={false} sm={12} md={7}>
        <Fluxo round={round}/>
      </Grid>
      </Grid>
      
    </div>
  )
}

export default Reports;
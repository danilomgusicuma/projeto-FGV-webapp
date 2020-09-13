import React from 'react';
  import { makeStyles } from '@material-ui/core/styles';
  import Table from '@material-ui/core/Table';
  import TableBody from '@material-ui/core/TableBody';
  import TableCell from '@material-ui/core/TableCell';
  import TableContainer from '@material-ui/core/TableContainer';
  import TableHead from '@material-ui/core/TableHead';
  import TableRow from '@material-ui/core/TableRow';
  import Paper from '@material-ui/core/Paper';
  import {useParams} from 'react-router-dom';
  import Grid from '@material-ui/core/Grid';

import socket from '../../connection';
import { useEffect, useState } from 'react';

function Balanco(props) {
    
   
//const {round} = useParams();
const [lista, setLista] = useState([])
useEffect(()=>{
    socket.emit('puxar-pesquisas');
    socket.on('pesquisas', (pes) => {
        console.log(props.round)
        setLista(pes)
    });
    return () => {socket.off('pesquisas')}
  },[])
  
      
  
  
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
    const classes = useStyles();
  
    return (
      <Grid m={10} item xs={false} sm={12}> 
          <TableContainer  component={Paper}>
        <Table className={classes.table} size="small" aria-label="spanning table" id="pesquisas">
          <TableHead>
            <TableRow style={{
            backgroundColor: '#3f51b5',
            height: 5
        }}>
              <TableCell style={{fontSize: 20, color: 'White'}} align="center" colSpan={3}>
                Registro de Pesquisas
              </TableCell>
             
            </TableRow>
            <TableRow style={{
            backgroundColor: '#A8A8A8'
        }}>
              <TableCell>Pesquisa Realizada</TableCell>
              <TableCell align="right">Resultado</TableCell>
              <TableCell align="right">Bimestre Análisado</TableCell>
           
            </TableRow>
          </TableHead>
          <TableBody>
          {lista.map((linhas,num) => {
          

          return (
            <TableRow>
              <TableCell>{linhas.tipo}</TableCell>
              <TableCell align="right">{linhas.resultado}</TableCell>
              <TableCell align="right">{linhas.bimestre}</TableCell>
            </TableRow>
          )

          
          
        })}
            
             
              
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
    );
      
}


export default Balanco;







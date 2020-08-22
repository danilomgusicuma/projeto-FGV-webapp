import React from 'react';
  import { makeStyles } from '@material-ui/core/styles';
  import Table from '@material-ui/core/Table';
  import TableBody from '@material-ui/core/TableBody';
  import TableCell from '@material-ui/core/TableCell';
  import TableContainer from '@material-ui/core/TableContainer';
  import TableHead from '@material-ui/core/TableHead';
  import TableRow from '@material-ui/core/TableRow';
  import Paper from '@material-ui/core/Paper';
  import Grid from '@material-ui/core/Grid';

import socket from '../../connection';
import { useEffect } from 'react';

function Balanco(props) {
    
   


useEffect(()=>{
    socket.emit('puxar-balancos', props.round);
    socket.on('balancos', balanco => {
      console.log("balancos", balanco.balanco_patrimonial)
      if(balanco.balanco_patrimonial){
       
       
      
        
        //table.rows[2].cells[1].innerHTML = 'teste'
        

        
      }
    });
    return () => {socket.off('balancos')}
  },[])
  
      
  
  
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
    const classes = useStyles();
  
    return (
      <Grid item xs={false} sm={12} md={8}>
      <TableContainer style={{ marginLeft: '0.8rem', marginTop: '1rem' }} component={Paper}>
        <Table className={classes.table} size="small" aria-label="spanning table" id="balancop">
          <TableHead>
            <TableRow style={{
            backgroundColor: '#3f51b5',
            height: 5
        }}>
              <TableCell style={{fontSize: 20, color: 'White'}} align="center" colSpan={3}>
                Cronograma da Simulação
              </TableCell>
              
            </TableRow>
            <TableRow style={{
            backgroundColor: '#A8A8A8'
        }}>
              <TableCell>Ação Programada</TableCell>
              <TableCell align="center">Data de Execução</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            
              <TableRow>
                <TableCell>Início do bimestre 1</TableCell>
                <TableCell align="center">10/07/2020 14:00</TableCell>
                
                
              </TableRow>
              <TableRow>
                <TableCell>Reunião entre as cooperativas</TableCell>
                <TableCell align="center">10/07/2020 17:30</TableCell>
                
                
              </TableRow>

              
              <TableRow>
                <TableCell>Encerramento do bimestre 1</TableCell>
                <TableCell align="center">10/07/2020 22:30</TableCell>
                
                
              </TableRow>
              

              
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
    );
      
}


export default Balanco;







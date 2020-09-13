import React, { useEffect, useState } from 'react';
  import { makeStyles } from '@material-ui/core/styles';
  import Table from '@material-ui/core/Table';
  import TableBody from '@material-ui/core/TableBody';
  import TableCell from '@material-ui/core/TableCell';
  import TableContainer from '@material-ui/core/TableContainer';
  import TableHead from '@material-ui/core/TableHead';
  import TableRow from '@material-ui/core/TableRow';
  import Paper from '@material-ui/core/Paper';

import socket from '../../connection';

function Balanco(props) {
    
   


useEffect(()=>{
    socket.emit('puxar-deci');
    socket.on('deci', decisions => {
    console.log("balancos", decisions)
    setRows(decisions)
    });
    return () => {socket.off('deci')}
  },[])
  
      
  
  
  const [rows, setRows] = useState([])
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
    const classes = useStyles();

  
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="spanning table" id="decisions">
          <TableHead>
            <TableRow style={{
            backgroundColor: '#3f51b5',
            height: 5
        }}>
              <TableCell style={{fontSize: 20, color: 'White'}} align="center" colSpan={3}>
                Registro de Ações
              </TableCell>
             
            </TableRow>
            </TableHead>
            <TableBody>
            <TableRow style={{
            backgroundColor: '#A8A8A8'
        }}>
              <TableCell>Ação Realizada</TableCell>
              <TableCell align="right">Autor da Ação</TableCell>
              <TableCell align="right">Data de modificação</TableCell>
           
            </TableRow>
            {}
            {rows.map((linhas,num) => {
          

          return (
            <TableRow>
              <TableCell>{linhas.acao}</TableCell>
              <TableCell align="right">{linhas.autor}</TableCell>
              <TableCell align="right">{linhas.data}</TableCell>
            </TableRow>
          )

          
          
        })}
            
         
            
              

              
              
            
          </TableBody>
        </Table>
      </TableContainer>
    );
      
}


export default Balanco;







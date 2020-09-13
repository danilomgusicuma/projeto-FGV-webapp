import React, { useEffect, useState } from 'react';
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

function Balanco(props) {
    
   


useEffect(()=>{
    socket.emit('puxar-news');
    socket.on('news', decisions => {
    setRows(decisions)
    });
    return () => {socket.off('news')}
  },[])
  
      
  
  
  const [rows, setRows] = useState([])
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
    const classes = useStyles();

  
    return (
      <Grid item xs={false} sm={12}>
      <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="spanning table" id="decisions">
          <TableHead>
            <TableRow style={{
            backgroundColor: '#3f51b5',
            height: 5
        }}>
              <TableCell style={{fontSize: 20, color: 'White'}} align="center" colSpan={3}>
                HSG news
              </TableCell>
             
            </TableRow>
            </TableHead>
            <TableBody>
            <TableRow style={{
            backgroundColor: '#A8A8A8'
        }}>
              <TableCell>Manchete</TableCell>
              <TableCell align="right">Informações</TableCell>
              <TableCell align="right">Bimestre de publicação da notícia</TableCell>
           
            </TableRow>
            {}
            {rows.map((linhas,num) => {
          

          return (
            <TableRow>
              <TableCell>{linhas.titulo}</TableCell>
              <TableCell align="right">{linhas.info}</TableCell>
              <TableCell align="right">{linhas.bimestre}</TableCell>
            </TableRow>
          )

          
          
        })}

          </TableBody>
        </Table>
      </TableContainer>
      
      </div>
      </Grid>
    );
      
}


export default Balanco;






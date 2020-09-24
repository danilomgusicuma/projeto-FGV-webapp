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
    socket.emit('puxar-balancos', props.round);
    socket.on('balancos', c => {
    if(c){
      let decisions = c.deci
      if(document.getElementById('decisions') !== null && decisions){
        document.getElementById('decisions').querySelector('thead').querySelectorAll('tr')[0].querySelectorAll('th')[1].innerText = '(Bimestre ' + c.turno+')'
       
        document.getElementById('servico_1').innerText = 'Serviço ' + decisions.servico_1
        
        document.getElementById('servico_2').innerText = 'Serviço ' + decisions.servico_2
        
        document.getElementById('preco_1').innerText = Math.round(decisions.preco_1)
        
        document.getElementById('preco_2').innerText = Math.round(decisions.preco_2)
        
        document.getElementById('planejado_1').innerText = decisions.planejado_1
        
        document.getElementById('planejado_2').innerText = decisions.planejado_2
        
        document.getElementById('compras_1').innerText = decisions.compras_1
        
        document.getElementById('compras_2').innerText = decisions.compras_2
        
        document.getElementById('propaganda_1').innerText = decisions.propaganda_1
        
        document.getElementById('propaganda_2').innerText = decisions.propaganda_2
        
        document.getElementById('institucional').innerText = decisions.institucional
        
        document.getElementById('comissao').innerText = decisions.comissao
        
        document.getElementById('frota').innerText = decisions.frota
        
        document.getElementById('pas').innerText = decisions.pas
      }
    }
    //setTabela(decisions.deci)
    });
    return () => {socket.off('balancos')}
  },[props.round])
  
      
  
  
  //const [tabela, setTabela] = useState({servico_1: 0, servico_2: 0, preco_1: 0, preco_2: 0, planejado_1: 0, planejado_2: 0, compras_1: 0, compras_2: 0, propaganda_1: 0, propaganda_2: 0, institucional: 0, comissao: 0, frota: 0, pas: 0})
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
              <TableCell style={{fontSize: 20, color: 'White'}} align="center" colSpan={2}>
                Registro de Ações
              </TableCell>
              <TableCell style={{fontSize: 20, color: 'White'}} align="center" colSpan={2}>
                Bimestre
              </TableCell>
             
            </TableRow>
            </TableHead>
            
            <TableBody>
            <TableRow style={{
            backgroundColor: '#A8A8A8'
        }}>
              <TableCell align="center" id='servico_1'>Serviço "1"</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right" id='servico_2'>Serviço "2"</TableCell>
              <TableCell align="right"></TableCell>
           
            </TableRow>
            <TableRow>
            <TableCell align="left">Preço ofertado ($)</TableCell>
              <TableCell align="left" id='preco_1'>-</TableCell>
              <TableCell align="center">Preço ofertado ($)</TableCell>
              <TableCell align="center" id='preco_2'>-</TableCell>
            </TableRow>
            <TableRow>
            <TableCell align="left">Previsão de Atendimentos (#)</TableCell>
              <TableCell align="left" id='planejado_1'>-</TableCell>
              <TableCell align="center" >Previsão de Atendimentos (#)</TableCell>
              <TableCell align="center" id='planejado_2'>-</TableCell>
            </TableRow>
            <TableRow>
            <TableCell align="left">Contratação de Insumos (#)</TableCell>
              <TableCell align="left" id='compras_1'>-</TableCell>
              <TableCell align="center">Contratação de Insumos (#)</TableCell>
              <TableCell align="center" id='compras_2'>-</TableCell>
            </TableRow>
            <TableRow>
            <TableCell align="left">Investimento em Propaganda ($)</TableCell>
              <TableCell align="left" id='propaganda_1'>-</TableCell>
              <TableCell align="center">Investimento em Propaganda ($)</TableCell>
              <TableCell align="center" id='propaganda_2'>-</TableCell>
            </TableRow>
            <TableRow>
            <TableCell align="right"></TableCell>
            <TableCell align="left">Propaganda Institucional ($)</TableCell>
            <TableCell align="left" id='institucional'>-</TableCell>
            <TableCell align="center"></TableCell>
              
            </TableRow>
            <TableRow>
            <TableCell align="right"></TableCell>
            <TableCell align="left">Comissão (%)</TableCell>
            <TableCell align="left" id='comissao'>-</TableCell>
            <TableCell align="center"></TableCell>
              
            </TableRow>
            <TableRow>
            <TableCell align="right"></TableCell>
            <TableCell align="left">Frota (#)</TableCell>
            <TableCell align="left" id='frota'>-</TableCell>
            <TableCell align="center"></TableCell>
              
            </TableRow>
            <TableRow>
            <TableCell align="right"></TableCell>
            <TableCell align="left">Postos Avançados (#)</TableCell>
            <TableCell align="left" id='pas'>-</TableCell>
            <TableCell align="center"></TableCell>
              
            </TableRow>
            
            
            
            
         
            
              

              
              
            
          </TableBody>
        </Table>
      </TableContainer>
    );
      
}


export default Balanco;







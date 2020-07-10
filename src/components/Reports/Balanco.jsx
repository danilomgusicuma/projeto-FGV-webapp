import React from 'react';
  import { makeStyles } from '@material-ui/core/styles';
  import Table from '@material-ui/core/Table';
  import TableBody from '@material-ui/core/TableBody';
  import TableCell from '@material-ui/core/TableCell';
  import TableContainer from '@material-ui/core/TableContainer';
  import TableHead from '@material-ui/core/TableHead';
  import TableRow from '@material-ui/core/TableRow';
  import Paper from '@material-ui/core/Paper';

import socket from '../../connection';
import { useEffect } from 'react';

function Balanco(props) {
    
   


useEffect(()=>{
    socket.emit('puxar-balancos', props.round);
    socket.on('balancos', balanco => {
      console.log("balancos", balanco.balanco_patrimonial)
      if(balanco.balanco_patrimonial){
        let b = balanco.balanco_patrimonial 
        //update(balanco.balanco_patrimonial)
        
        let linhas = document.getElementById('balancop').querySelector('tbody').querySelectorAll('tr')
        
        
        
        console.log(linhas)
        
        for(let i = 0; i < linhas.length; i++){
          let valores = linhas[i].querySelectorAll('td')
          for(let ii = 0; ii < valores.length; ii++){
            //valores[ii].innerText = valores[ii].innerText + ` (` +i + ', ' + ii + `)`
          
          if(i == 0 && ii == 1){
            valores[ii].innerText = Math.round(b.caixa)
          }
          if(i == 0 && ii == 3){
            valores[ii].innerText = Math.round(b.caixa)
          }
          if(i == 1 && ii == 1){
            valores[ii].innerText = Math.round(b.estoque)
          }
          if(i == 1 && ii == 3){
            valores[ii].innerText = Math.round(b.estoque)
          }
          if(i == 2 && ii == 1){
            valores[ii].innerText = Math.round(b.contas_a_receber60 + b.contas_a_receber120)
          }
          if(i == 3 && ii == 2){
            valores[ii].innerText = Math.round(b.contas_a_receber60 + b.contas_a_receber120)
          } 
          if(i == 4 && ii == 1){
            valores[ii].innerText = Math.round(b.contas_a_receber60)
          }    
          if(i == 5 && ii == 1){
            valores[ii].innerText = Math.round(b.contas_a_receber120)
          }
          if(i == 7 && ii == 2){
            valores[ii].innerText = Math.round(b.contas_a_receber120 + b.contas_a_receber60 + b.estoque + b.caixa)
          }
          if(i == 9 && ii == 1){
            valores[ii].innerText = Math.round(b.maquinas)
          }
          if(i == 9 && ii == 3){
            valores[ii].innerText = Math.round(b.maquinas)
          }
          if(i == 10 && ii == 2){
            valores[ii].innerText = Math.round(b.maquinas - b.depreciacao_maquinas)
          }
          if(i == 11 && ii == 1){
            valores[ii].innerText = Math.round(b.depreciacao_maquinas)
          }
          if(i == 12 && ii == 1){
            valores[ii].innerText = Math.round(b.veiculos)
          }
          if(i == 13 && ii == 2){
            valores[ii].innerText = Math.round(b.veiculos - b.depreciacao_veiculos)
          }
          if(i == 14 && ii == 1){
            valores[ii].innerText = Math.round(b.depreciacao_veiculos)
          }
          if(i == 16 && ii == 2){
            valores[ii].innerText = Math.round(b.maquinas - b.depreciacao_maquinas + b.veiculos - b.depreciacao_veiculos)
          }
          if(i == 17 && ii == 3){
            valores[ii].innerText = Math.round(b.maquinas - b.depreciacao_maquinas + b.veiculos - b.depreciacao_veiculos + b.contas_a_receber120 + b.contas_a_receber60 + b.estoque + b.caixa)
          }
          if(i == 19 && ii == 1){
            valores[ii].innerText = Math.round(b.tributos_a_pagar_anterior)
          }
          if(i == 19 && ii == 3){
            valores[ii].innerText = Math.round(b.tributos_a_pagar_anterior)
          }
          if(i == 20 && ii == 1){
            valores[ii].innerText = Math.round(b.tributos_a_pagar_atual)
          }
          if(i == 20 && ii == 3){
            valores[ii].innerText = Math.round(b.tributos_a_pagar_atual)
          }
          if(i == 21 && ii == 1){
            valores[ii].innerText = Math.round(b.emprestimos)
          }
          if(i == 21 && ii == 3){
            valores[ii].innerText = Math.round(b.emprestimos)
          }
          if(i == 23 && ii == 2){
            valores[ii].innerText = Math.round(b.tributos_a_pagar_atual + b.tributos_a_pagar_anterior + b.emprestimos)
          }
          if(i == 25 && ii == 1){
            valores[ii].innerText = Math.round(b.capial)
          }
          if(i == 25 && ii == 3){
            valores[ii].innerText = Math.round(b.capial)
          }
          if(i == 27 && ii == 2){
            valores[ii].innerText = Math.round(b.lucros_acumulados + 2130849)
          }
          if(i == 28 && ii == 1){
            valores[ii].innerText = 2130849
          }
          if(i == 29 && ii == 1){
            valores[ii].innerText = Math.round(b.lucros_acumulados)
          }
          if(i == 30 && ii == 1){
            valores[ii].innerText = 0
          }
          if(i == 31 && ii == 2){
            valores[ii].innerText = Math.round(b.lucros_acumulados + 2130849 + b.capial)
          }
          if(i == 32 && ii == 3){
            valores[ii].innerText = Math.round(b.lucros_acumulados + 2130849 + b.capial + b.emprestimos + b.tributos_a_pagar_anterior + b.tributos_a_pagar_atual)
            }

           
          
        }
       
          
        }
      
        
        //table.rows[2].cells[1].innerHTML = 'teste'
        

        
      }
    });
  },[])
  
      
  
  
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
    const classes = useStyles();
  
    return (
      <TableContainer style={{ marginLeft: '0.8rem', marginTop: '0.8rem' }} component={Paper}>
        <Table className={classes.table} size="small" aria-label="spanning table" id="balancop">
          <TableHead>
            <TableRow style={{
            backgroundColor: '#3f51b5',
            height: 5
        }}>
              <TableCell style={{fontSize: 20, color: 'White'}} align="center" colSpan={3}>
                Balanço Patrimonial
              </TableCell>
              <TableCell align="right" style={{color: 'White'}}>Bimestre 1</TableCell>
            </TableRow>
            <TableRow style={{
            backgroundColor: '#A8A8A8'
        }}>
              <TableCell>Ativo Circulante</TableCell>
              <TableCell align="right">Saldo</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
              <TableRow>
                <TableCell>CAIXA E BANCOS</TableCell>
                <TableCell align="right">18703</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">18703</TableCell>
              </TableRow>

              
              <TableRow>
                <TableCell>INFRAESTRUTURA -
                   INSUMOS JÁ DISPONÍVEIS ($)</TableCell>
                <TableCell align="right">18703</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">18703</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>CONTAS A RECEBER</TableCell>
                <TableCell align="right">2000</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
          

            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">2000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>60 dias</TableCell>
              <TableCell align="center">1000</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>120 dias</TableCell>
              <TableCell align="center">1000</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={2} />
              <TableCell colSpan={2}></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{fontWeight: "bold"}}>TOTAL (Ativo Circulante)</TableCell>
              <TableCell align="rigth"></TableCell>
              <TableCell align="center">402000</TableCell>
            </TableRow>
            <TableRow style={{
            backgroundColor: '#A8A8A8'
        }}>
              <TableCell>Ativo Permanente</TableCell>
              <TableCell align="right">Saldo</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">Subtotal</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>MÁQUINAS E EQUIPAMENTOS</TableCell>
              <TableCell align="right">17280000</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={2} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">17280000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>(-) DEPRECIAÇÃO DE MAQUINAS/EQUIPAMENTOS($)</TableCell>
              <TableCell align="center">1000</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>VEÍCULOS</TableCell>
              <TableCell align="right">17280000</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={2} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">1680000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>(-) DEPRECIAÇÃO DE VEÍCULOS ($)</TableCell>
              <TableCell align="rigth">402000</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={2} />
              <TableCell colSpan={2}></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{fontWeight: "bold"}}>TOTAL (Ativo Permanente)</TableCell>
              <TableCell align="rigth"></TableCell>
              <TableCell align="center">400035</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{fontWeight: "bold"}}>Ativo Total</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">246969</TableCell>
            </TableRow>
            
            
            <TableRow style={{
            backgroundColor: '#A8A8A8'
        }}>
              <TableCell>Passivo Circulante</TableCell>
              <TableCell align="right">Saldo</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TRIBUTOS A PAGAR - EXERCÍCIO ANTERIOR ($)</TableCell>
              <TableCell align="right">913221</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TRIBUTOS A PAGAR - DESTE EXERCÍCIO ($)</TableCell>
              <TableCell align="right">0</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>FINANCIAMENTO DA OPERAÇÕES (EMPRÉSTIMOS) ($)</TableCell>
              <TableCell align="right">28800</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={2} />
              <TableCell colSpan={2}></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{fontWeight: "bold"}}>TOTAL (Passivo Circulante)</TableCell>
              <TableCell align="rigth"></TableCell>
              <TableCell align="center">28920270</TableCell>
            </TableRow>
            
            <TableRow style={{
            backgroundColor: '#A8A8A8'
        }}>
              <TableCell>PATRIMÔNIO LIQUIDO</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CAPITAL</TableCell>
              <TableCell align="right">18720000</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>RESULTADO OPERACIONAL ACUMULADO</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={5} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">1680000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ANO X0 ($)</TableCell>
              <TableCell align="rigth">2130849</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ANO X1 ($)</TableCell>
              <TableCell align="rigth">0</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ANO X2 ($)</TableCell>
              <TableCell align="rigth">0</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{fontWeight: "bold"}}>TOTAL (Patrimônio Liquido)</TableCell>
              <TableCell align="rigth"></TableCell>
              <TableCell align="center">230230920</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{fontWeight: "bold"}}>Passivo Total</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">246969</TableCell>
            </TableRow>
            
          </TableBody>
        </Table>
      </TableContainer>
    );
      
}


export default Balanco;







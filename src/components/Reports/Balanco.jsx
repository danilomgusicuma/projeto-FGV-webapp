import React, { useState } from 'react';
  import { makeStyles } from '@material-ui/core/styles';
  import Table from '@material-ui/core/Table';
  import TableBody from '@material-ui/core/TableBody';
  import TableCell from '@material-ui/core/TableCell';
  import TableContainer from '@material-ui/core/TableContainer';
  import TableHead from '@material-ui/core/TableHead';
  import TableRow from '@material-ui/core/TableRow';
  import Paper from '@material-ui/core/Paper';
  import Grid from '@material-ui/core/Grid';
  import Chart from 'react-google-charts';

import socket from '../../connection';
import { useEffect } from 'react';

function Balanco(props) {
    
   


useEffect(()=>{
    if(props.ativo !== 'sim'){
      socket.emit('puxar-balancos', props.round);
      socket.on('balancos', balanco => {
      console.log("balancos", balanco.balanco_patrimonial)
      if(balanco.balanco_patrimonial){
        
       
        let b = balanco.balanco_patrimonial
        let p = balanco.planejado 
        //update(balanco.balanco_patrimonial)
        if(document.getElementById('balancop') !== null){
          
          let cel_bimestre = document.getElementById('balancop').querySelector('thead').querySelectorAll('tr')[0].querySelectorAll('th')[1]
        if(p==0){
          cel_bimestre.innerText = 'Bimestre: ' + balanco.turno
        }
        else{
          cel_bimestre.innerText = 'Balanço Atual'
        }
        let linhas = document.getElementById('balancop').querySelector('tbody').querySelectorAll('tr')
        console.log(linhas)
        let dive = 0
        for(let i = 0; i < linhas.length; i++){
          let valores = linhas[i].querySelectorAll('td')
          for(let ii = 0; ii < valores.length; ii++){
            //valores[ii].innerText = valores[ii].innerText + ` (` +i + ', ' + ii + `)`
          
          if(i == 0 && ii == 1){
            valores[ii].innerText = Math.round(b.caixa).toLocaleString('pt-BR')
            if(Math.round(b.caixa) < 0){
              valores[ii].innerText = 0
              dive = dive + (-1)*Math.round(b.caixa)
            }
          }
          if(i == 0 && ii == 3){
            if(b.caixa > 0){
              valores[ii].innerText = Math.round(b.caixa).toLocaleString('pt-BR')
            }
            else{
              valores[ii].innerText = 0
            }
          }
          if(i == 1 && ii == 1){
            valores[ii].innerText = Math.round(b.estoque).toLocaleString('pt-BR')
          }
          if(i == 1 && ii == 3){
            valores[ii].innerText = Math.round(b.estoque).toLocaleString('pt-BR')
          }
          if(i == 2 && ii == 1){
            valores[ii].innerText = Math.round(b.contas_a_receber60 + b.contas_a_receber120).toLocaleString('pt-BR')
          }
          if(i == 3 && ii == 2){
            valores[ii].innerText = Math.round(b.contas_a_receber60 + b.contas_a_receber120).toLocaleString('pt-BR')
          } 
          if(i == 4 && ii == 1){
            valores[ii].innerText = Math.round(b.contas_a_receber60).toLocaleString('pt-BR')
          }    
          if(i == 5 && ii == 1){
            valores[ii].innerText = Math.round(b.contas_a_receber120).toLocaleString('pt-BR')
          }
          if(i == 7 && ii == 2){
            if(b.caixa > 0){
              valores[ii].innerText = Math.round(b.contas_a_receber120 + b.contas_a_receber60 + b.estoque + b.caixa).toLocaleString('pt-BR')
            }
            else{
              valores[ii].innerText = Math.round(b.contas_a_receber120 + b.contas_a_receber60 + b.estoque).toLocaleString('pt-BR')
            }
          }
          if(i == 9 && ii == 1){
            valores[ii].innerText = Math.round(b.maquinas).toLocaleString('pt-BR')
          }
          if(i == 9 && ii == 3){
            //valores[ii].innerText = Math.round(b.maquinas).toLocaleString('pt-BR')
          }
          if(i == 10 && ii == 2){
            valores[ii].innerText = Math.round(b.maquinas - b.depreciacao_maquinas).toLocaleString('pt-BR')
            if(p!==0){
              valores[ii].innerText = Math.round(b.maquinas - b.depreciacao_maquinas - 2880).toLocaleString('pt-BR')
            }
          }
          if(i == 11 && ii == 1){
            valores[ii].innerText = Math.round(b.depreciacao_maquinas).toLocaleString('pt-BR')
            if(p!==0){
              valores[ii].innerText = Math.round(b.depreciacao_maquinas+2880).toLocaleString('pt-BR')
            }
          }
          if(i == 12 && ii == 1){
            valores[ii].innerText = Math.round(b.veiculos).toLocaleString('pt-BR')
          }
          if(i == 13 && ii == 2){
            valores[ii].innerText = Math.round(b.veiculos - b.depreciacao_veiculos).toLocaleString('pt-BR')
          }
          if(i == 14 && ii == 1){
            valores[ii].innerText = Math.round(b.depreciacao_veiculos).toLocaleString('pt-BR')
          }
          if(i == 16 && ii == 2){
            valores[ii].innerText = Math.round(b.maquinas - b.depreciacao_maquinas + b.veiculos - b.depreciacao_veiculos).toLocaleString('pt-BR')
            if(p!==0){
              valores[ii].innerText = Math.round(b.maquinas - b.depreciacao_maquinas - 2880 + b.veiculos - b.depreciacao_veiculos).toLocaleString('pt-BR')
            }
          }
          if(i == 17 && ii == 3){
            if(b.caixa > 0){
              valores[ii].innerText = Math.round(b.maquinas - b.depreciacao_maquinas + b.veiculos - b.depreciacao_veiculos + b.contas_a_receber120 + b.contas_a_receber60 + b.estoque + b.caixa).toLocaleString('pt-BR')
            }
            else{
              valores[ii].innerText = Math.round(b.maquinas - b.depreciacao_maquinas + b.veiculos - b.depreciacao_veiculos + b.contas_a_receber120 + b.contas_a_receber60 + b.estoque).toLocaleString('pt-BR')
            }
            if(p!==0){
              if(b.caixa > 0){
                valores[ii].innerText = Math.round(b.maquinas - b.depreciacao_maquinas - 2880 + b.veiculos - b.depreciacao_veiculos + b.contas_a_receber120 + b.contas_a_receber60 + b.estoque + b.caixa).toLocaleString('pt-BR')
              }
              else{
                valores[ii].innerText = Math.round(b.maquinas - b.depreciacao_maquinas - 2880 + b.veiculos - b.depreciacao_veiculos + b.contas_a_receber120 + b.contas_a_receber60 + b.estoque).toLocaleString('pt-BR')
              }
            }
          }
          if(i == 19 && ii == 1){
            valores[ii].innerText = Math.round(b.tributos_a_pagar_anterior).toLocaleString('pt-BR')
          }
          if(i == 19 && ii == 3){
            valores[ii].innerText = Math.round(b.tributos_a_pagar_anterior).toLocaleString('pt-BR')
          }
          if(i == 20 && ii == 1){
            valores[ii].innerText = Math.round(b.tributos_a_pagar_atual).toLocaleString('pt-BR')
          }
          if(i == 20 && ii == 3){
            valores[ii].innerText = Math.round(b.tributos_a_pagar_atual).toLocaleString('pt-BR')
          }
          if(i == 21 && ii == 1){
            valores[ii].innerText = Math.round(b.emprestimos+ dive).toLocaleString('pt-BR')
          }
          if(i == 21 && ii == 3){
            valores[ii].innerText = Math.round(b.emprestimos + dive).toLocaleString('pt-BR')
          }
          if(i == 23 && ii == 2){
            valores[ii].innerText = Math.round(b.tributos_a_pagar_atual + b.tributos_a_pagar_anterior + b.emprestimos + dive).toLocaleString('pt-BR')
          }
          if(i == 25 && ii == 1){
            valores[ii].innerText = Math.round(b.capial).toLocaleString('pt-BR')
          }
          if(i == 25 && ii == 3){
            valores[ii].innerText = Math.round(b.capial).toLocaleString('pt-BR')
          }
          if(i == 27 && ii == 2){
            valores[ii].innerText = Math.round(b.lucros_acumulados + 2130849).toLocaleString('pt-BR')
          }
          if(i == 28 && ii == 1){
            valores[ii].innerText = (2130849).toLocaleString('pt-BR')
          }
          if(i == 29 && ii == 1){
            valores[ii].innerText = Math.round(b.lucros_acumulados - 2880*balanco.turno).toLocaleString('pt-BR')
          }
          if(i == 30 && ii == 1){
            valores[ii].innerText = 0
          }
          if(i == 31 && ii == 2){
            valores[ii].innerText = Math.round(b.lucros_acumulados + 2130849 + b.capial - 2880*balanco.turno).toLocaleString('pt-BR')
          }
          if(i == 32 && ii == 3){
            valores[ii].innerText = Math.round(b.lucros_acumulados + 2130849 + b.capial + b.emprestimos + dive + b.tributos_a_pagar_anterior + b.tributos_a_pagar_atual - 2880*balanco.turno).toLocaleString('pt-BR')
            if(p!==0){
              valores[ii].innerText = Math.round(b.lucros_acumulados + 2130849 + b.capial + b.emprestimos + dive + b.tributos_a_pagar_anterior + b.tributos_a_pagar_atual - 2880*balanco.turno).toLocaleString('pt-BR')
            }
          }

           
          
        }
       
          
        }

        function positivo(x) {
          if(x !== undefined){
            if(x < 0){
              return 0 
            }
            else{
              return x
            }
          }
          
        }
        setData({
          caixa: positivo(b.caixa),
          estoque: positivo(b.estoque),
          contas_a_receber: positivo(b.contas_a_receber120) + positivo(b.contas_a_receber60),
          frota: positivo(b.veiculos),
          maq: positivo(b.maquinas) - positivo(b.depreciacao_maquinas),
          lucro: positivo(b.lucros_acumulados) + 2130849,
          divida: positivo(b.emprestimos) + positivo(dive),
          tributos: positivo(b.tributos_a_pagar_anterior) + positivo(b.tributos_a_pagar_atual)
        })

        }
      }
      
        
      
      
      });
      
    }
    else{
        let b = props.balanco        
        //update(balanco.balanco_patrimonial)
        if(document.getElementById('balancop') !== null){
          
          let cel_bimestre = document.getElementById('balancop').querySelector('thead').querySelectorAll('tr')[0].querySelectorAll('th')[1]
          cel_bimestre.innerText = 'Bimestre ' + props.turno
        let linhas = document.getElementById('balancop').querySelector('tbody').querySelectorAll('tr')
        console.log(linhas)
        let dive = 0
        for(let i = 0; i < linhas.length; i++){
          let valores = linhas[i].querySelectorAll('td')
          for(let ii = 0; ii < valores.length; ii++){
            //valores[ii].innerText = valores[ii].innerText + ` (` +i + ', ' + ii + `)`
          
          if(i == 0 && ii == 1){
            valores[ii].innerText = Math.round(b.caixa)
            if(Math.round(b.caixa) < 0){
              valores[ii].innerText = 0
              dive = dive + (-1)*Math.round(b.caixa)
            }
          }
          if(i == 0 && ii == 3){
            if(dive == 0){
              valores[ii].innerText = Math.round(b.caixa).toLocaleString('pt-BR')
            }
            else{
              valores[ii].innerText = 0
            }
          }
          if(i == 1 && ii == 1){
            valores[ii].innerText = Math.round(b.estoque).toLocaleString('pt-BR')
          }
          if(i == 1 && ii == 3){
            valores[ii].innerText = Math.round(b.estoque).toLocaleString('pt-BR')
          }
          if(i == 2 && ii == 1){
            valores[ii].innerText = Math.round(b.contas_a_receber60 + b.contas_a_receber120).toLocaleString('pt-BR')
          }
          if(i == 3 && ii == 2){
            valores[ii].innerText = Math.round(b.contas_a_receber60 + b.contas_a_receber120).toLocaleString('pt-BR')
          } 
          if(i == 4 && ii == 1){
            valores[ii].innerText = Math.round(b.contas_a_receber60).toLocaleString('pt-BR')
          }    
          if(i == 5 && ii == 1){
            valores[ii].innerText = Math.round(b.contas_a_receber120).toLocaleString('pt-BR')
          }
          if(i == 7 && ii == 2){
            if(b.caixa > 0){
              valores[ii].innerText = Math.round(b.contas_a_receber120 + b.contas_a_receber60 + b.estoque + b.caixa).toLocaleString('pt-BR')
            }
            else{
              valores[ii].innerText = Math.round(b.contas_a_receber120 + b.contas_a_receber60 + b.estoque).toLocaleString('pt-BR')
            }
          }
          if(i == 9 && ii == 1){
            valores[ii].innerText = Math.round(b.maquinas).toLocaleString('pt-BR')
          }
          if(i == 9 && ii == 3){
            //valores[ii].innerText = Math.round(b.maquinas).toLocaleString('pt-BR')
          }
          if(i == 10 && ii == 2){
            valores[ii].innerText = Math.round(b.maquinas - b.depreciacao_maquinas).toLocaleString('pt-BR')
          }
          if(i == 11 && ii == 1){
            valores[ii].innerText = Math.round(b.depreciacao_maquinas).toLocaleString('pt-BR')
          }
          if(i == 12 && ii == 1){
            valores[ii].innerText = Math.round(b.veiculos).toLocaleString('pt-BR')
          }
          if(i == 13 && ii == 2){
            valores[ii].innerText = Math.round(b.veiculos - b.depreciacao_veiculos).toLocaleString('pt-BR')
          }
          if(i == 14 && ii == 1){
            valores[ii].innerText = Math.round(b.depreciacao_veiculos).toLocaleString('pt-BR')
          }
          if(i == 16 && ii == 2){
            valores[ii].innerText = Math.round(b.maquinas - b.depreciacao_maquinas + b.veiculos - b.depreciacao_veiculos).toLocaleString('pt-BR')
          }
          if(i == 17 && ii == 3){
            if(b.caixa > 0){
              valores[ii].innerText = Math.round(b.maquinas - b.depreciacao_maquinas + b.veiculos - b.depreciacao_veiculos + b.contas_a_receber120 + b.contas_a_receber60 + b.estoque + b.caixa).toLocaleString('pt-BR')
            }
            else{
              valores[ii].innerText = Math.round(b.maquinas - b.depreciacao_maquinas + b.veiculos - b.depreciacao_veiculos + b.contas_a_receber120 + b.contas_a_receber60 + b.estoque).toLocaleString('pt-BR')
            }
          }
          if(i == 19 && ii == 1){
            valores[ii].innerText = Math.round(b.tributos_a_pagar_anterior).toLocaleString('pt-BR')
          }
          if(i == 19 && ii == 3){
            valores[ii].innerText = Math.round(b.tributos_a_pagar_anterior).toLocaleString('pt-BR')
          }
          if(i == 20 && ii == 1){
            valores[ii].innerText = Math.round(b.tributos_a_pagar_atual).toLocaleString('pt-BR')
          }
          if(i == 20 && ii == 3){
            valores[ii].innerText = Math.round(b.tributos_a_pagar_atual).toLocaleString('pt-BR')
          }
          if(i == 21 && ii == 1){
            valores[ii].innerText = Math.round(b.emprestimos+ dive).toLocaleString('pt-BR')
          }
          if(i == 21 && ii == 3){
            valores[ii].innerText = Math.round(b.emprestimos + dive).toLocaleString('pt-BR')
          }
          if(i == 23 && ii == 2){
            valores[ii].innerText = Math.round(b.tributos_a_pagar_atual + b.tributos_a_pagar_anterior + b.emprestimos + dive).toLocaleString('pt-BR')
          }
          if(i == 25 && ii == 1){
            valores[ii].innerText = Math.round(b.capial).toLocaleString('pt-BR')
          }
          if(i == 25 && ii == 3){
            valores[ii].innerText = Math.round(b.capial).toLocaleString('pt-BR')
          }
          if(i == 27 && ii == 2){
            valores[ii].innerText = Math.round(b.lucros_acumulados + 2130849).toLocaleString('pt-BR')
          }
          if(i == 28 && ii == 1){
            valores[ii].innerText = (2130849).toLocaleString('pt-BR')
          }
          if(i == 29 && ii == 1){
            valores[ii].innerText = Math.round(b.lucros_acumulados - 2880*props.turno).toLocaleString('pt-BR')
          }
          if(i == 30 && ii == 1){
            valores[ii].innerText = 0
          }
          if(i == 31 && ii == 2){
            valores[ii].innerText = Math.round(b.lucros_acumulados + 2130849 + b.capial - 2880*props.turno).toLocaleString('pt-BR')
          }
          if(i == 32 && ii == 3){
            valores[ii].innerText = Math.round(b.lucros_acumulados + 2130849 + b.capial + b.emprestimos + dive + b.tributos_a_pagar_anterior + b.tributos_a_pagar_atual - 2880*props.turno).toLocaleString('pt-BR')
            }

           
          
        }
       
          
        }
        function positivo(x) {
          if(x !== undefined){
            if(x < 0){
              return 0 
            }
            else{
              return x
            }
          }
          
        }
        setData({
          caixa: positivo(b.caixa),
          estoque: positivo(b.estoque),
          contas_a_receber: positivo(b.contas_a_receber120) + positivo(b.contas_a_receber60),
          frota: positivo(b.veiculos),
          maq: positivo(b.maquinas) - positivo(b.depreciacao_maquinas),
          lucro: positivo(b.lucros_acumulados) + 2130849,
          divida: positivo(b.emprestimos) + positivo(dive),
          tributos: positivo(b.tributos_a_pagar_anterior) + positivo(b.tributos_a_pagar_atual)
        })
        }
      
    }
    return () => {socket.off('balancos')}
  },[props])
  
      
  
  const [data, setData] = useState({
      caixa: 250,
      estoque: 250,
      contas_a_receber: 250,
      frota: 250,
      maq: 1000,
      lucro: 400,
      divida: 150,
      tributos: 50
  })
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
    const classes = useStyles();
  
    return (
      <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={7}>
        <TableContainer style={{ marginLeft: '0.8rem', marginTop: '1rem' }} component={Paper}>
        <Table className={classes.table} size="small" aria-label="spanning table" id="balancop">
          <TableHead>
            <TableRow style={{
            backgroundColor: '#3f51b5',
            height: 5
        }}>
              <TableCell style={{fontSize: 20, color: 'White'}} align="center" colSpan={3}>
                Balanço Patrimonial
              </TableCell>
              <TableCell align="right" style={{color: 'White'}}></TableCell>
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
                <TableCell >CAIXA E BANCOS</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>

              
              <TableRow>
                <TableCell >INFRAESTRUTURA -
                   INSUMOS JÁ DISPONÍVEIS ($)</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>

              <TableRow>
                <TableCell>CONTAS A RECEBER</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
          

            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>60 dias</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>120 dias</TableCell>
              <TableCell align="center"></TableCell>
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
              <TableCell align="center" style={{fontWeight: "bold"}}></TableCell>
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
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={2} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>(-) DEPRECIAÇÃO DE MAQUINAS/EQUIPAMENTOS($)</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>VEÍCULOS</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={2} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>(-) DEPRECIAÇÃO DE VEÍCULOS ($)</TableCell>
              <TableCell align="rigth"></TableCell>
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
              <TableCell align="center" style={{fontWeight: "bold"}}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{fontWeight: "bold"}}>Ativo Total</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right" style={{fontWeight: "bold"}}></TableCell>
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
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TRIBUTOS A PAGAR - DESTE EXERCÍCIO ($)</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>FINANCIAMENTO DA OPERAÇÕES (EMPRÉSTIMOS) ($)</TableCell>
              <TableCell align="right"></TableCell>
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
              <TableCell align="center" style={{fontWeight: "bold"}}></TableCell>
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
              <TableCell align="right"></TableCell>
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
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ANO X0 ($)</TableCell>
              <TableCell align="rigth"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ANO X1 ($)</TableCell>
              <TableCell align="rigth"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ANO X2 ($)</TableCell>
              <TableCell align="rigth"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{fontWeight: "bold"}}>TOTAL (Patrimônio Liquido)</TableCell>
              <TableCell align="rigth"></TableCell>
              <TableCell align="center" style={{fontWeight: "bold"}}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{fontWeight: "bold"}}>Passivo Total</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right" style={{fontWeight: "bold"}}></TableCell>
            </TableRow>
            
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
      <Grid item xs={12} sm={12} md={2}>
      <Chart style={{ marginLeft: '0.8rem', marginTop: '1rem' }}
  width={'500px'}
  height={'300px'}
  chartType="PieChart"
  loader={<div style={{ marginLeft: '0.8rem', marginTop: '1rem' }}>Carregando Distribuição dos Ativos</div>}
  data={[
    ['Task', 'Hours per Day'],
    ['Caixa e Bancos', data.caixa],
    ['Estoque', data.estoque],
    ['Contas a receber', data.contas_a_receber],
    ['Máquinas e Equipamentos', data.maq],
    ['Veículos', data.frota],
  ]}
  options={{
    title: 'Distribuição dos Ativos',
    // Just add this option
    is3D: true,
  }}
  rootProps={{ 'data-testid': '2' }}
/>
<Chart style={{ marginLeft: '0.8rem', marginTop: '1rem' }}
  width={'500px'}
  height={'300px'}
  chartType="PieChart"
  loader={<div style={{ marginLeft: '0.8rem', marginTop: '1rem' }}>Carregando Distribuição dos Passivos</div>}
  data={[
    ['Task', 'Hours per Day'],
    ['Tributos a pagar', data.tributos],
    ['Empréstimos', data.divida],
    ['Capital', 18720000],
    ['Lucros acumulados', data.lucro],
  ]}
  options={{
    title: 'Distribuição dos Passivos',
    // Just add this option
    is3D: true,
  }}
  rootProps={{ 'data-testid': '2' }}
/>
      </Grid>
      </Grid>
    );
      
}


export default Balanco;







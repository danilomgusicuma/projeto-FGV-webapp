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



const useStyles = makeStyles(theme => ({
  class1:{
    border: '1px solid black'
  },
  class2:{
    borderCollapse: 'collapse',
    width: '35%',
    border: '1px solid black'
  },
  class3:{
    height: '25px',
    border: '1px solid black',
  },
}))

function Dre(props){

  useEffect(()=>{
    socket.emit('puxar-balancos', props.round);
    socket.on('balancos', balanco => {
      console.log("fluxo", balanco.fluxo)
      if(balanco.fluxo){
        let f = balanco.fluxo
        let linhas = document.getElementById('balancof').querySelector('tbody').querySelectorAll('tr')
        
        console.log(linhas)
        
        for(let i = 0; i < linhas.length; i++){
          let valores = linhas[i].querySelectorAll('td')
          for(let ii = 0; ii < valores.length; ii++){
            //valores[ii].innerText = valores[ii].innerText + ' (' + i + ', ' + ii + ')'
            if(i == 0 && ii == 1){
                valores[ii].innerText = Math.round(f.saldo_anterior)
            }
            if(i == 1 && ii == 1){
                valores[ii].innerText = Math.round(f.emprestimos_contratados)
            }
            if(i == 2 && ii == 1){
                valores[ii].innerText = Math.round(f.faturamento)
            }
            if(i == 3 && ii == 1){
                valores[ii].innerText = Math.round(f.veiculos_vendidos)
            }
            if(i == 4 && ii == 1){
                valores[ii].innerText = Math.round(f.depreciacao_de_veiculos)
            }
            if(i == 5 && ii == 1){
                valores[ii].innerText = Math.round(f.depreciacao_de_maquinas)
            }
            if(i == 7 && ii == 2){
                valores[ii].innerText = Math.round(f.faturamento + f.depreciacao_de_veiculos + f.depreciacao_de_maquinas + f.veiculos_vendidos)
            }
            if(i == 9 && ii == 1){
                valores[ii].innerText = Math.round(f.custo_de_servico_prestado)
            }
            if(i == 10 && ii == 1){
                valores[ii].innerText = Math.round(f.veiculos_comprados)
            }
            if(i == 11 && ii == 1){
                valores[ii].innerText = Math.round(f.maquinas)
            }
            if(i == 12 && ii == 1){
                valores[ii].innerText = Math.round(f.tributos)
            }
            if(i == 14 && ii == 1){
                valores[ii].innerText = Math.round(f.promotores)
            }
            if(i == 15 && ii == 1){
                valores[ii].innerText = Math.round(f.propaganda)
            }
            if(i == 16 && ii == 1){
                valores[ii].innerText = Math.round(f.depreciacao_de_maquinas)
            }
            if(i == 17 && ii == 1){
                valores[ii].innerText = Math.round(f.pesquisas)
            }
            if(i == 18 && ii == 1){
                valores[ii].innerText = Math.round(f.pas)
            }
            if(i == 19 && ii == 1){
                valores[ii].innerText = Math.round(f.uso_frota)
            }
            if(i == 20 && ii == 1){
                valores[ii].innerText = Math.round(f.despesas_operacionais_n_planejadas)
            }
            if(i == 21 && ii == 1){
                valores[ii].innerText = Math.round(f.despesas_administrativas)
            }
            if(i == 22 && ii == 1){
                valores[ii].innerText = Math.round(f.encargos_financiamento)
            }
            if(i == 24 && ii == 1){
                valores[ii].innerText = Math.round(f.promotores + f.depreciacao_de_maquinas + f.propaganda + f.pesquisas + f.pas + f.uso_frota + f.despesas_operacionais_n_planejadas + f.despesas_administrativas + f.encargos_financiamento)
            }
            if(i == 25 && ii == 2){
                valores[ii].innerText = Math.round(f.promotores + f.depreciacao_de_maquinas + f.propaganda + f.pesquisas + f.pas + f.uso_frota + f.despesas_operacionais_n_planejadas + f.despesas_administrativas + f.encargos_financiamento + f.custo_de_servico_prestado + f.veiculos_comprados + f.maquinas + f.tributos)            
            }
            if(i == 26 && ii == 1){
                valores[ii].innerText = Math.round(f.financiamento)
            }
            if(i == 27 && ii == 3){
                valores[ii].innerText = Math.round((f.faturamento + f.depreciacao_de_veiculos + f.depreciacao_de_maquinas + f.veiculos_vendidos) - (f.promotores + f.depreciacao_de_maquinas + f.propaganda + f.pesquisas + f.pas + f.uso_frota + f.despesas_operacionais_n_planejadas + f.despesas_administrativas + f.encargos_financiamento + f.custo_de_servico_prestado + f.veiculos_comprados + f.maquinas + f.tributos))
            }
            
            }
        }
        
      }
    });
  },[])

  const classes = useStyles();



  return (
    <TableContainer style={{ marginLeft: '0.8rem', marginTop: '0.8rem' }} component={Paper}>
      <Table className={classes.table} size="small" aria-label="spanning table" id="balancof">
        <TableHead>
          <TableRow style={{
          backgroundColor: '#3f51b5',
          height: 5
      }}>
            <TableCell style={{fontSize: 20, color: 'White'}} align="center" colSpan={3}>
              Fluxo de Caixa
            </TableCell>
            <TableCell align="right" style={{color: 'White'}}>Bimestre: 1</TableCell>
          </TableRow>
          <TableRow style={{fontWeight: "bold",
            backgroundColor: '#A8A8A8'}}>
            <TableCell>(+) ENTRADAS</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow>
              <TableCell>SALDO ANTERIOR ($)</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>

            
            <TableRow>
              <TableCell>EMPRÉSTIMOS CONTRATADOS ($)</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>

            <TableRow>
              <TableCell>FATURAMENTO ($)</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>VEÍCULOS VENDIDOS ($)</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>DEPRECIAÇÃO DE VEÍCULOS</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>DEPRECIAÇÃO DE MÁQUINAS E EQUIPAMENTOS</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={2} />
              <TableCell colSpan={2}></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Entradas</TableCell>
              <TableCell align="center">60794</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>



            <TableRow style={{fontWeight: "bold",
            backgroundColor: '#A8A8A8'}}>
              <TableCell>(-) SAÍDAS</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CUSTO DE PRESTAÇÃO DE SERVIÇOS ($)</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>VEÍCULOS COMPRADOS ($)</TableCell> 
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>MAQUÍNAS E EQUIPAMENTOS</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>PAGAMENTO DA PARCELA DE TRIBUTOS ($)</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{fontWeight: "bold"}}>DESPESAS OPERACIONAIS</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>VENDEDORES / PROMOTORES ($)</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>PROPAGANDA E PROMOÇÃO ($)</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>DEPRECIAÇÃO DE MÁQUINAS ($)</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>PESQUISAS CONTRATADAS ($)</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>POSTOS AVANÇADOS DE SERVIÇO ($)</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>FROTA DE VEÍCULOS ($)</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>DESPESAS OPERACIONAIS NÃO PLANEJADAS ($)</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>DESPESAS ADMINISTRATIVAS ($)</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ENCARGOS SOBRE FINANCIAMENTO DAS OPERAÇÕES ($)</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Despesas Operacionais</TableCell>
              <TableCell align="center">60794</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Saídas</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">54800</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>FINANCIAMENTO / ADIANTAMENTO PARA OPERAÇÕES ($)</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow style={{fontWeight: "bold",
            backgroundColor: '#A8A8A8'}}>
              <TableCell>SALDO ATUAL</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            
          
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Dre;
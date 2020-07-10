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
      console.log("dre", balanco.dre)
      if(balanco.dre){
        console.log(balanco.dre)
        let d = balanco.dre
        let linhas = document.getElementById('balancod').querySelector('tbody').querySelectorAll('tr')
        
        console.log(linhas)
        
        for(let i = 0; i < linhas.length; i++){
          let valores = linhas[i].querySelectorAll('td')
          for(let ii = 0; ii < valores.length; ii++){
            //valores[ii].innerText = valores[ii].innerText + ` (` + i + `, ` + ii + `)`
            if(i == 0 && ii == 1){
                valores[ii].innerText = Math.round(d.receita)
              }
              if(i == 4 && ii == 1){
                valores[ii].innerText = Math.round(d.estoque_inicial)
              }
              if(i == 5 && ii == 1){
                valores[ii].innerText = Math.round(d.custo_prestacao_servico)
              }
              if(i == 6 && ii == 1){
                valores[ii].innerText = Math.round(d.custo_estocagem)
              }
              if(i == 7 && ii == 1){
                valores[ii].innerText = Math.round(d.custo_troca_insumo)
              }
              if(i == 8 && ii == 1){
                valores[ii].innerText = Math.round(d.hora_extra)
              }
              if(i == 9 && ii == 2){
                valores[ii].innerText = Math.round(d.custo_prestacao_servico + d.hora_extra + d.custo_troca_insumos + d.custo_estocagem)
              }
              if(i == 10 && ii == 2){
                valores[ii].innerText = Math.round(d.capacidade_n_utilizada)
              }
              if(i == 11 && ii == 2){
                valores[ii].innerText = Math.round(d.custo_prestacao_servico + d.hora_extra + d.custo_troca_insumos + d.custo_estocagem - d.capacidade_n_utilizada)
              }
              if(i == 12 && ii == 2){
                valores[ii].innerText = Math.round(d.receita - (d.custo_prestacao_servico + d.hora_extra + d.custo_troca_insumos + d.custo_estocagem - d.capacidade_n_utilizada))
              }
              if(i == 13 && ii == 1){
                valores[ii].innerText = Math.round(d.atendimentos)
              }
              if(i == 16 && ii == 1){
                valores[ii].innerText = Math.round(d.despesas_administrativas)
              }
              if(i == 17 && ii == 3){
                valores[ii].innerText = Math.round(d.salario_promotores/2160)
              }
              if(i == 18 && ii == 1){
                valores[ii].innerText = Math.round(d.salario_promotores)
              }
              if(i == 18 && ii == 3){
                valores[ii].innerText = d.comissao
              }
              if(i == 19 && ii == 1){
                valores[ii].innerText = Math.round(d.comissao*d.receita)
              }
              if(i == 21 && ii == 1){
                valores[ii].innerText = Math.round(d.propaganda_institucional)
              }
              if(i == 22 && ii == 1){
                valores[ii].innerText = Math.round(d.propaganda_unitaria)
              }
              if(i == 23 && ii == 1){
                valores[ii].innerText = Math.round(d.depreciacao_de_maquinas)
              }
              if(i == 24 && ii == 1){
                valores[ii].innerText = Math.round(d.encargos_financiamento)
              }
              if(i == 26 && ii == 1){
                valores[ii].innerText = Math.round(d.salario_frota)
              }
              if(i == 27 && ii == 1){
                valores[ii].innerText = Math.round(d.manutencao_frota)
              }
              if(i == 28 && ii == 1){
                valores[ii].innerText = Math.round(d.depreciacao_de_veiculos)
              }
              if(i == 29 && ii == 1){
                valores[ii].innerText = Math.round(d.frota_terceirizada)
              }
              if(i == 30 && ii == 1){
                valores[ii].innerText = Math.round(d.despesas_operacionais_n_planejadas)
              }
              if(i == 31 && ii == 1){
                valores[ii].innerText = Math.round(d.pas)
              }
              if(i == 31 && ii == 3){
                valores[ii].innerText = Math.round(d.pas/2160)
              }
              if(i == 32 && ii == 1){
                valores[ii].innerText = Math.round(d.pesquisa)
              }
              if(i == 34 && ii == 2){
                valores[ii].innerText = Math.round(d.despesas_administrativas + d.salario_promotores + d.comissao*d.receita + d.propaganda_institucional + d.propaganda_unitaria + d.depreciacao_de_maquinas + d.encargos_financiamento + d.salario_frota + d.manutencao_frota + d.depreciacao_de_veiculos + d.despesas_operacionais_n_planejadas + d.pas + d.pesquisas)
              }
              if(i == 35 && ii == 1){
                valores[ii].innerText = Math.round(d.receita - (d.custo_prestacao_servico + d.hora_extra + d.custo_troca_insumos + d.custo_estocagem - d.capacidade_n_utilizada) - (d.despesas_administrativas + d.salario_promotores + d.comissao*d.receita + d.propaganda_institucional + d.propaganda_unitaria + d.depreciacao_de_maquinas + d.encargos_financiamento + d.salario_frota + d.manutencao_frota + d.depreciacao_de_veiculos + d.despesas_operacionais_n_planejadas + d.pas + d.pesquisas))
              }
              if(i == 36 && ii == 1){
                valores[ii].innerText = Math.round((d.receita - (d.custo_prestacao_servico + d.hora_extra + d.custo_troca_insumos + d.custo_estocagem - d.capacidade_n_utilizada) - (d.despesas_administrativas + d.salario_promotores + d.comissao*d.receita + d.propaganda_institucional + d.propaganda_unitaria + d.depreciacao_de_maquinas + d.encargos_financiamento + d.salario_frota + d.manutencao_frota + d.depreciacao_de_veiculos + d.despesas_operacionais_n_planejadas + d.pas + d.pesquisas))*0.05)
              }
              if(i == 37 && ii == 1){
                valores[ii].innerText = Math.round((d.receita - (d.custo_prestacao_servico + d.hora_extra + d.custo_troca_insumos + d.custo_estocagem - d.capacidade_n_utilizada) - (d.despesas_administrativas + d.salario_promotores + d.comissao*d.receita + d.propaganda_institucional + d.propaganda_unitaria + d.depreciacao_de_maquinas + d.encargos_financiamento + d.salario_frota + d.manutencao_frota + d.depreciacao_de_veiculos + d.despesas_operacionais_n_planejadas + d.pas + d.pesquisas))*0.95)
              }
          }
        }
      }
    });
  },[])

  const classes = useStyles();



  return (
    <TableContainer style={{ marginLeft: '0.8rem', marginTop: '0.8rem' }} component={Paper}>
      <Table className={classes.table} size="small" aria-label="spanning table" id="balancod">
        <TableHead>
          <TableRow style={{
          backgroundColor: '#3f51b5',
          height: 5
      }}>
            <TableCell style={{fontSize: 20, color: 'White'}} align="center" colSpan={3}>
              Demonstração de Resultado
            </TableCell>
            <TableCell align="right" style={{color: 'White'}}>Bimestre: 1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">Tipos de serviço:</TableCell>
            <TableCell align="right">147</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow>
              <TableCell style={{fontWeight: "bold"}}>REEMBOLSO TOTAL</TableCell>
              <TableCell>96708</TableCell>
              <TableCell align="right">$ Preço Médio</TableCell>
              <TableCell align="right">609</TableCell>
            </TableRow>

            
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Atendimentos</TableCell>
              <TableCell align="right">1876</TableCell>
            </TableRow>

            <TableRow>
              <TableCell style={{fontWeight: "bold"}}>(-) Custo dos serviços prestados (CSP)</TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Custo 147</TableCell>
              <TableCell align="right">288</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Custo 159</TableCell>
              <TableCell align="right">308</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CAPACIDADE INSTALADA INICIAL DE PRESTAÇÃO DE SERVIÇOS</TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Estoque Inicial</TableCell>
              <TableCell align="right">988</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CUSTO DE PRESTAÇÃO DOS SERVIÇOS</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CUSTO DE ESTOCAGEM ($36/unit)</TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Total não utilizado</TableCell>
              <TableCell align="right">403</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CUSTO DE ALTERAÇÃO DE TIPO DE SERVIÇO</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ATENDIMENTOS NA BASE DE HORA EXTRA</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TOTAL EM DISPONIBILIDADE</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>(-) CAPACIDADE INSTALADA NÃO UTILIZADA</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow style={{
            backgroundColor: '#A8A8A8'
        }}>
              <TableCell style={{fontWeight: "bold"}}>(-) CSP</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{fontWeight: "bold"}}>MARGEM BRUTA</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TOTAL DE SERVIÇOS PRESTADOS</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow style={{
            backgroundColor: '#A8A8A8'
        }}>
              <TableCell style={{fontWeight: "bold"}}>(-) DESPESAS OPERACIONAIS</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>DESPESAS ADMINISTRATIVAS</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{fontWeight: "bold"}}>PROMOTORES</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"># Promotores</TableCell>
              <TableCell align="right">40</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>SALÁRIOS</TableCell>
              <TableCell></TableCell>
              <TableCell align="right">% Comissão</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>COMISSÕES</TableCell>
              <TableCell></TableCell>
              <TableCell align="right">$ Salário Unitário</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{fontWeight: "bold"}}>PROPAGANDA</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>INSTITUCIONAL</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>PRODUTOS</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{fontWeight: "bold"}}>DEPRECIAÇÃO DE MÁQUINAS / EQUIPAMENTOS</TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Período depreciação máquinas (ANOS)</TableCell>
              <TableCell align="right">192000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{fontWeight: "bold"}}>ENCARGOS SOBRE FINANCIAMENTOS</TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Taxa de Juros</TableCell>
              <TableCell align="right">8%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{fontWeight: "bold"}}>TRANSPORTE</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"># Motoristas</TableCell>
              <TableCell align="right">10</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>SALÁRIOS</TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Salário Unitário</TableCell>
              <TableCell align="right">4800</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>LUBRIFICAÇÃO E MANUTENÇÃO</TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Manutenção</TableCell>
              <TableCell align="right">600</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>DEPRECIAÇÃO DE VEÍCULOS</TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Valor do Veículo</TableCell>
              <TableCell align="right">57600</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>FROTA DE TERCEIROS</TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Depreciação (ANOS)</TableCell>
              <TableCell align="right">4</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{fontWeight: "bold"}}>DESPESAS NÃO PLANEJADOS</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{fontWeight: "bold"}}>POSTOS AVANÇADOS DE ATENDIMENTO</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"># Postos</TableCell>
              <TableCell align="right">30</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{fontWeight: "bold"}}>PESQUISA DE MERCADO</TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Custo Unitário</TableCell>
              <TableCell align="right">2160</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Custo Fixo</TableCell>
              <TableCell align="right">50400</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{fontWeight: "bold"}}>TOTAL DESPESAS OPERACIONAIS</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>RESULTADO ANTES DE CONSIDERAR TRIBUTOS</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TRIBUTOS E TAXAS TOTAIS</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>RESULTADO DA OPERAÇÃO</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Dre;
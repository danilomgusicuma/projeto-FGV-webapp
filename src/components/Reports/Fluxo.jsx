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
import { Checkbox } from '@material-ui/core';



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
      console.log('Planejado: ' + balanco.planejado.distribuidores)
      console.log("fluxo", balanco.fluxo)
      //console.log('servs: ' + balanco.servs['147'])
      if(balanco.fluxo){
        let dive = 0
        if(balanco.balanco_patrimonial.caixa < 0){
          dive = Math.round(balanco.balanco_patrimonial.caixa*(-1))
        }
        let cel_bimestre = document.getElementById('balancof').querySelector('thead').querySelectorAll('tr')[0].querySelectorAll('th')[1]
        cel_bimestre.innerText = 'Bimestre: ' + balanco.turno
        
        let idx = [
          "147",
          "148",
          "149",
          "157",
          "158",
          "159",
          "257",
          "258",
          "259",
          "267",
          "268",
          "269",
          "347",
          "348",
          "349",
          "357",
          "358",
          "359",
          "367",
          "368",
          "369"]
        let f = balanco.fluxo
        let p = balanco.planejado
        let b = balanco.balanco_patrimonial
        if(document.getElementById('balancof') !== null){
        let linhas = document.getElementById('balancof').querySelector('tbody').querySelectorAll('tr')
        
        console.log(linhas)
        
        for(let i = 0; i < linhas.length; i++){
          let valores = linhas[i].querySelectorAll('td')
          for(let ii = 0; ii < valores.length; ii++){
            //valores[ii].innerText = valores[ii].innerText + ' (' + i + ', ' + ii + ')'
            if(i == 0 && ii == 1){
                valores[ii].innerText = Math.round(f.saldo_anterior).toLocaleString('pt-BR')
            }
            if(i == 1 && ii == 1){
                valores[ii].innerText = Math.round(f.emprestimos_contratados).toLocaleString('pt-BR')
                if(p !== 0){
                  valores[ii].innerText = Math.round(p.emprestimo + dive).toLocaleString('pt-BR')
                }
            }
            if(i == 2 && ii == 1){
                valores[ii].innerText = Math.round(b.contas_a_receber60).toLocaleString('pt-BR')
                if(p !== 0){
                  valores[ii].innerText = Math.round(b.contas_a_receber60).toLocaleString('pt-BR')
                }
            }
            if(i == 3 && ii == 1){
                valores[ii].innerText = Math.round(f.veiculos_vendidos).toLocaleString('pt-BR')
            }
            if(i == 4 && ii == 1){
                valores[ii].innerText = Math.round(f.depreciacao_de_veiculos).toLocaleString('pt-BR')
                if(p !== 0){
                  valores[ii].innerText = Math.round(p.frota*2400).toLocaleString('pt-BR')
                }
              }
            if(i == 5 && ii == 1){
                valores[ii].innerText = Math.round(f.depreciacao_de_maquinas).toLocaleString('pt-BR')
                if(p !== 0){
                  valores[ii].innerText = Math.round(2880).toLocaleString('pt-BR')
                }
              }
            if(i == 7 && ii == 2){
                valores[ii].innerText = Math.round(b.contas_a_receber60 + f.depreciacao_de_veiculos + f.depreciacao_de_maquinas + f.veiculos_vendidos + f.emprestimos_contratados).toLocaleString('pt-BR')
                if(p !== 0){
                  valores[ii].innerText = Math.round(b.contas_a_receber60 + p.frota*2400 + 2880 + f.veiculos_vendidos + p.emprestimo+ dive).toLocaleString('pt-BR')
                }
              }
            if(i == 9 && ii == 1){
                valores[ii].innerText = Math.round(f.custo_de_servico_prestado).toLocaleString('pt-BR')
                if(p !== 0){
                  function checar(xx) {
                    if(xx !== 0 && balanco.servs[xx]){
                      console.log(p.volume2*balanco.servs[xx][2])
                    return p.volume2*balanco.servs[xx][2]
                    }
                    else{
                      return 0
                    }
                  }
                  function checar1(xx) {
                    if(xx !== 0 && balanco.servs[xx]){
                    return p.volume1*balanco.servs[xx][2]
                    }
                    else{
                      return 0
                    }
                  }
                  valores[ii].innerText = Math.round(checar1(p.serv1)+checar(p.serv2))
                }
              }
            if(i == 10 && ii == 1){
                valores[ii].innerText = Math.round(f.veiculos_comprados).toLocaleString('pt-BR')
            }
            if(i == 11 && ii == 1){
                valores[ii].innerText = Math.round(f.maquinas).toLocaleString('pt-BR')
            }
            if(i == 12 && ii == 1){
                valores[ii].innerText = Math.round(f.tributos).toLocaleString('pt-BR')
            }
            if(i == 14 && ii == 2){
                valores[ii].innerText = Math.round(f.promotores).toLocaleString('pt-BR')
                if(p !== 0){
                  valores[ii].innerText = Math.round(p.promotores*2160).toLocaleString('pt-BR')
                }
              }
            if(i == 15 && ii == 2){
                valores[ii].innerText = Math.round(f.propaganda).toLocaleString('pt-BR')
                if(p!==0){
                  valores[ii].innerText = Math.round(p.prop1+p.prop2+f.propaganda).toLocaleString('pt-BR')
                }
              }
            if(i == 16 && ii == 2){
                valores[ii].innerText = Math.round(2880).toLocaleString('pt-BR')
            }
            if(i == 17 && ii == 2){
                valores[ii].innerText = Math.round(f.pesquisas).toLocaleString('pt-BR')
            }
            if(i == 18 && ii == 2){
                valores[ii].innerText = Math.round(f.pas).toLocaleString('pt-BR')
              if(p!== 0){
                valores[ii].innerText = Math.round(p.pas*2160).toLocaleString('pt-BR')
              }
              }
            if(i == 19 && ii == 2){
                valores[ii].innerText = Math.round(f.uso_frota).toLocaleString('pt-BR')
                if(p!==0){
                  valores[ii].innerText = Math.round(p.frota*10800).toLocaleString('pt-BR')
                }
            }
            if(i == 20 && ii == 2){
                valores[ii].innerText = Math.round(f.despesas_operacionais_n_planejadas).toLocaleString('pt-BR')
            }
            if(i == 21 && ii == 2){
                valores[ii].innerText = Math.round(f.despesas_administrativas).toLocaleString('pt-BR')
            }
            if(i == 22 && ii == 2){
                valores[ii].innerText = Math.round(f.encargos_financiamento).toLocaleString('pt-BR')
              if(p!==0){
                valores[ii].innerText = Math.round((p.emprestimo+ dive)*0.08).toLocaleString('pt-BR')
              }
              }
            if(i == 24 && ii == 1){
                valores[ii].innerText = Math.round(f.promotores + f.depreciacao_de_maquinas + f.propaganda + f.pesquisas + f.pas + f.uso_frota + f.despesas_operacionais_n_planejadas + f.despesas_administrativas + f.encargos_financiamento).toLocaleString('pt-BR')
              if(p!== 0){
                valores[ii].innerText = Math.round((p.emprestimo*0.08+ dive)+ p.promotores*2160+2880+p.prop1+p.prop2+f.propaganda+p.pas*2160 + f.pesquisas+p.frota*10800).toLocaleString('pt-BR')
              }
              }
            if(i == 25 && ii == 2){
                valores[ii].innerText = Math.round(f.promotores + f.depreciacao_de_maquinas + f.propaganda + f.pesquisas + f.pas + f.uso_frota + f.despesas_operacionais_n_planejadas + f.despesas_administrativas + f.encargos_financiamento + f.custo_de_servico_prestado + f.veiculos_comprados + f.maquinas + f.tributos).toLocaleString('pt-BR')            
                function checar(xx) {
                  if(xx !== 0 && balanco.servs[xx]){
                    console.log(p.volume2*balanco.servs[xx][2])
                  return p.volume2*balanco.servs[xx][2]
                  }
                  else{
                    return 0
                  }
                }
                function checar1(xx) {
                  if(xx !== 0 && balanco.servs[xx]){
                  return p.volume1*balanco.servs[xx][2]
                  }
                  else{
                    return 0
                  }
                }
                if(p!== 0){
                  valores[ii].innerText = Math.round((p.emprestimo+ dive)*0.08+p.promotores*2160+2880+p.prop1+p.prop2+f.propaganda+p.pas*2160 + f.pesquisas+p.frota*10800+ checar1(p.serv1)+checar(p.serv2)+f.veiculos_comprados).toLocaleString('pt-BR')
                }
              }
            if(i == 26 && ii == 1){
                valores[ii].innerText = Math.round(f.emprestimos_contratados).toLocaleString('pt-BR')
            }
            if(i == 27 && ii == 3){
                valores[ii].innerText = Math.round((b.contas_a_receber60 + f.depreciacao_de_veiculos + f.depreciacao_de_maquinas + f.veiculos_vendidos) - (f.promotores + f.propaganda + f.pesquisas + f.pas + f.uso_frota + f.despesas_operacionais_n_planejadas + f.despesas_administrativas + f.encargos_financiamento + f.custo_de_servico_prestado + f.veiculos_comprados + f.maquinas + f.tributos)).toLocaleString('pt-BR')
                function checar(xx) {
                  if(xx !== 0 && balanco.servs[xx]){
                    console.log(p.volume2*balanco.servs[xx][2])
                  return p.volume2*balanco.servs[xx][2]
                  }
                  else{
                    return 0
                  }
                }
                function checar1(xx) {
                  if(xx !== 0 && balanco.servs[xx]){
                  return p.volume1*balanco.servs[xx][2]
                  }
                  else{
                    return 0
                  }
                }
                if(p!==0){
                valores[ii].innerText = Math.round((f.saldo_anterior + p.emprestimo+ dive+b.contas_a_receber60 + p.frota*2400 + 2800 + f.veiculos_vendidos + f.emprestimos_contratados)+(-1)*(p.promotores*2160+2880+p.prop1+p.prop2+f.propaganda+p.pas*2160 + f.pesquisas+p.frota*10800+ checar1(p.serv1)+checar(p.serv2)+f.veiculos_comprados+(p.emprestimo+ dive)*0.08)).toLocaleString('pt-BR')
              }
              }
            
            }
        }
      }
        
      }
    });
    return () => {socket.off('balancos')}
  },[])

  const classes = useStyles();



  return (
    <TableContainer style={{ marginLeft: '0.8rem', marginTop: '1rem' }} component={Paper}>
      <Table className={classes.table} size="small" aria-label="spanning table" id="balancof">
        <TableHead>
          <TableRow style={{
          backgroundColor: '#3f51b5',
          height: 5
      }}>
            <TableCell style={{fontSize: 20, color: 'White'}} align="center" colSpan={3}>
              Fluxo de Caixa
            </TableCell>
            <TableCell align="right" style={{color: 'White'}}></TableCell>
          </TableRow>
          <TableRow style={{fontWeight: "bold",
            backgroundColor: '#A8A8A8'}}>
            <TableCell style={{fontWeight: "bold"}}>(+) ENTRADAS</TableCell>
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
              <TableCell>RECEBIMENTO DE CLIENTES ($)</TableCell>
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
              <TableCell style={{fontWeight: "bold"}}>Total Entradas</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center" style={{fontWeight: "bold"}}></TableCell>
            </TableRow>



            <TableRow style={{fontWeight: "bold",
            backgroundColor: '#A8A8A8'}}>
              <TableCell style={{fontWeight: "bold"}}>(-) SAÍDAS</TableCell>
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
              <TableCell style={{fontWeight: "bold"}}>Total Saídas</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center" style={{fontWeight: "bold"}}>54800</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>FINANCIAMENTO / ADIANTAMENTO PARA OPERAÇÕES ($)</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow style={{fontWeight: "bold",
            backgroundColor: '#A8A8A8'}}>
              <TableCell style={{fontWeight: "bold"}}>SALDO ATUAL</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right" style={{fontWeight: "bold"}}></TableCell>
            </TableRow>
            
          
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Dre;
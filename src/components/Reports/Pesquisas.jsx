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
  import Chart from 'react-google-charts';

import socket from '../../connection';
import { useEffect, useState } from 'react';
import { SettingsSystemDaydreamTwoTone } from '@material-ui/icons';

function Balanco(props) {
    
   
//const {round} = useParams();
const [lista, setLista] = useState([])
const [gamb, setGamb] = useState([])



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
                Resultados de Pesquisas
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
          
          if(linhas.cod == 'Tipos de serviço ofertados no mercado:'){
            let empresas = []

            let servs = []
            for(let i = 0; i < linhas.resultado.length; i++){
              let te = 0
              for(let ii = 0; ii < servs.length; ii++){
                if(servs[ii] == linhas.resultado[i].serv){
                  te = te + 1

                }
              }
              if(te == 0){
                servs.push(linhas.resultado[i].serv)
              }

            }
            for(let i = 0; i < servs.length; i++){
              let listat = []
              for(let ii = 0; ii < linhas.resultado.length; ii++){
                if(servs[i] == linhas.resultado[ii].serv){
                  listat.push(linhas.resultado[ii].user)
                }
              }
              empresas.push(listat)
            }
          return (
            <TableRow>
              <TableCell>{linhas.cod}</TableCell>
              <TableCell align="right">

            <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        
          <TableRow>
            {servs.map((serv) => (
              <TableCell>{serv}</TableCell>
            ))}
          </TableRow>
       
        <TableBody>
          {empresas.map((empresa) => (
    
            <TableRow>
              {empresa.map((cuni) => (
                <TableCell>{cuni}</TableCell>
              ))}
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          
        </TableCell>
              <TableCell align="right">{linhas.bimestre}</TableCell>
            </TableRow>
          )
          }//0kk
          else if(linhas.cod == 'Total de postos avançados de serviço em funcionamento:'){
              return (
                <TableRow>
              <TableCell>{linhas.cod}</TableCell>

              <TableCell>
                {linhas.resultado}
              </TableCell>
                
              <TableCell align="right">{linhas.bimestre}</TableCell>
            </TableRow>
              )
          }//okk
          else if(linhas.cod == 'Participação na receita total dos serviços prestados:'){
            
            
            return (
              <TableRow>
            <TableCell>{linhas.cod}</TableCell>

            <TableCell>
            
      <Chart style={{ marginLeft: '0.8rem', marginTop: '1rem' }}
  width={'500px'}
  height={'300px'}
  chartType="PieChart"
  loader={<div style={{ marginLeft: '0.8rem', marginTop: '1rem' }}>Carregando Distribuição dos Ativos</div>}
  data={[
    ['Task', 'Hours per Day'],
    ['147', 200000],
    ['158', 120000],
    ['247', 80000]
  ]}
  options={{
    title: 'Participação na receita',
    // Just add this option
    is3D: true,
  }}
  rootProps={{ 'data-testid': '2' }}
/>
            </TableCell>
              
            <TableCell align="right">{linhas.bimestre}</TableCell>
          </TableRow>
            )
          }
          else if(linhas.cod == 'Teste entre dois tipos de serviço:'){

          }

          
          
        })}
            
             
              
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
    );
      
}


export default Balanco;







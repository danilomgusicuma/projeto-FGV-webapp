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
import { SearchRounded, SettingsSystemDaydreamTwoTone } from '@material-ui/icons';

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



/*
)I would like to 0try to se see how many0 words can i chartType
0000000000000i can type 40 words pwer SearchRounded
i can type 100 words per second as we speak so i dont nedd me oral voice to comuniate what i mean
i can type 100 words per second as we speak so i dont nedd me oral voice to comuni
000bef0o0re the robot can enven finishing telling whatr i a wriot ing 0 so i now think this is a better wa0y  to cpommunicate to you becaouse in this way I can 00translate what I am ral0ireally 00felling 0about 0y ou me dear loe . Ass Asss Busrgues I can see you  iu nn the dark my son so I can go to mi homnedont start now tanlk to me wh0en i aim goin to listen to you ininthisdidiireallyndiididirelayneed topressspewace to000000000000000000talke0bea0cucde0000000if0000000ifi00couldbeableto000000000000wr00it0e0s00omethome i can go to you wh ow do you ask me? well in wa0ys y0ou could even think about , beac0use your 0litle ha0rqere
can make you 0achieve about the real cocnern ab00000w0hy0000000000000000000000000000000000000000000000000002100000000000000000000o00000000000000000000000000000000000000000000000000000000000000w0hatishappeningwouldyoutrytoaskb0u0t00t0he000000very00instatnof this momento is granteede by all soete of great concuions around the 0m0y0 imaginnation?:000000000000000000000000000000000000000000000000                 00000      ifi00coudificouldbeabletowritesentencesinthiswayiwouldtypemuchfasterrthyeonlything htatneedsto000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ooooooooooogus00000gustavo0000000902193021930912039210390219301290391212312091203903921092310932100000999100000000000000000000000ithin00000000000000000000000000000000000000000000000000000000000000000000000099999999990000000000000000000000000000000000000000000000
0 eu estou testando esse teclado porque ele nao para de digitar 0 em segunecia 0 0 0 09 0 0 0 0 como que pode 0 eu consiugo 0 digitar 0 como um 0 ser humano 0 n0o0rmal 0 0 por ceqnto dos 0 mamiferos que esxcistem nos 0 paises 00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000--000000000000000000000000000000000000000000000000000000000iiuu0000000000000000000000000000000000000000000000000000000009890000000000000000009 aff acho que 0 00000000000000000000000000000000000000000000000
*/
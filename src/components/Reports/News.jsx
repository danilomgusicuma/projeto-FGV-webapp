import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import socket from '../../connection';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


//import socket from '../../connection';
//socket.emit("teste", "dados")

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    //color: theme.palette.text.secondary,
  },
  title:{
    textAlign:'center'
  }
}))



export default function Manual() {

  //TODO: Move lists to here
  const [show, setShow] = useState(false)
  const classes = useStyles();
  const location = useLocation();

  useEffect(()=>{
    socket.emit('puxar-news');
    socket.on('news', decisions => {
    setShow(true)
    });
    return () => {socket.off('news')}
  },[])

  // function generateListItems(itensArray) {
  //   return itensArray.map(item=>(
  //     <ListItem>
  //       <ListItemText
  //         primary={item}
  //       />
  //     </ListItem>
  //   ))
  // }
if(show){
  return(
    <div style={{margin:'0 80px'}}>
    <Paper className={classes.paper}>
  <Typography variant="h4" className={classes.title}>{location.pathname.includes(`hsg`) ? <img src='http://localhost:3000/assets/cabe_h.png' alt="Desafios de Gestão"/> : <img src='http://localhost:3000/assets/cabe_c.png' alt="Desafios de Gestão"/>}</Typography>
    
    <Typography variant="h4" className={classes.title}>{location.pathname.includes(`hsg`) ? `HSG News T2` : `CBG News T2`}</Typography>
    <br/>
    <br/>
    <br/>
    <Typography variant="h5">Extra! Extra!</Typography>
    <List>
      <ListItem>
        <ListItemText
          primary="MERCADO REAGE E DEMONSTRA AUMENTO DE FATURAMENTO NO PRIMERIO QUADRIMESTRE DO ANO. 
          CONFORME DEMONSTRAM AS ANÁLISE SETORIAIS, O FATURAMENTO MÉDIO DOS DOIS PRIMEIROS BIMESTRES DO ANO FOI DA ORDEM DE $ 50.000"
        />
      </ListItem>
      </List>
    
    
    <Typography variant="h5">PARA REFLEXÃO</Typography>
    <br/>
    <Typography variant="h4" className={classes.title}><img src='http://localhost:3000/assets/reflex.png' alt="Desafios de Gestão"/></Typography>
    <Typography variant="h6">PORTFÓLIO DE SERVIÇOS</Typography>
    <List>
      <ListItem>
        <ListItemText
          primary="COMO ESPERADO, NO MERCADO EM T1, TODAS AS COOPERATIVAS TRABALHARAM APENAS COM 1 TIPO DE SERVIÇO, HAVENDO A OFERTA DE “N” (* tirar o sistema do jogo) TIPOS DISTINTOS DE SERVIÇOS. JÁ EM  T2, POR SUA VEZ, PUDEMOS OBSERVAR, COM BASE EM PESQUISAS REALIZADAS QUE HOUVE A OFERTA DE “X” (*Pegar dado do sistema do jogo) TIPOS DISTINTOS DE SERVIÇO"
        />
      </ListItem>
      
      
      
      
       
    </List>   
    <Typography variant="h6">ENSINAMENTO DE GESTÃO</Typography> 
    <List>
      <ListItem>
        <ListItemText
          primary="Cedo ou tarde, toda a reflexão precisa degenerar em trabalho. (Peter F. Drucker)"
        />
      </ListItem>
    </List>
    <br/>
    <br/>
    <Typography variant="h5">INVESTIMENTO EM PROPAGANDA</Typography>
    <List>
      <ListItem>
        <ListItemText
          primary=" COM BASE E A PARTIR DA AUDITORIA RECÉM EMPREENDIDA, ACERCA DO INVESTIMENTO EM PROPAGANDA, É POSSÍVEL VERIFICAR QUE A MÉDIA TOTAL DO INVESTIMENTO REALIZADO POR COOPERATIVA POR BIMESTRE AO LONGO DE T1 E T2 FOI DA ORDEM DE $ XXX.YYY. RESSATE-SE QUE POR ESCASSEZ DO TEMPO PARA IMPRESSÃO DESSE TABLÓIDE NÃO FOI POSÍVEL A COMPARAÇÃO OU A AVALIAÇÃO DOS INVESTIMENTOS FEITOS PARA PROMOÇÃO DE UM TIPO DE CONTRATO OU PARA A PROMOÇÃO DE DA COOPERATIVA COMO UM TODO
          "
        />
      </ListItem>
      
      
      
      
       
    </List> 
    <br/>
    <br/>
    <Typography variant="h5">ESPORTE</Typography>
    
    <List>
      <ListItem>
        <ListItemText
          primary="NO TORNEIO DE FUTEBOL REALIZADO NO ÚLIMO BIMESTRE, PUDEMOS OBSERVAR A RELEVANTE CONQUISTA DA AGREMIÇÃO PALMAULENSE ESPORTE CLUBE QUE DERROTOU O SANTÍNTHIANS REGATAS, SINUCA E FUTEBOL POR 3 A 2, NUMA FINAL ELETRIZANTE MARCADA PELA EXPUSLÃO DE 4 ATETAS (2 DE CADA TIME). AO FINAL, O CAPITÃO E LIDER DO S.R.S.F DECLAROU NÃO HAVER PROBLEMAS POIS EM BREVE, SE TERIA A CHANCE DA REVENACHE"
        />
      </ListItem> 
      
    </List>
  
    <br/>
    <br/>
    <Typography variant="h5">P.A.S – POSTOS AVANÇADOS DE SERVIÇOS</Typography>
    <List>
      <ListItem>
        <ListItemText
          primary="PUDEMOS OBSVERAR QUE NÃO HOUVE ALTERAÇÃO NENHUMA NO NÚMERO DE P.A.S DE CADA UMA DAS COOPERATIVAS PARTICIPANTES DO JOGO. TALVEZ, ALGUMA DELAS ATÉ TENHA MODIFICADO O SEU NÚMERO, MAS POR UMA QUESTÃO DE TEMPO, TAL MUDANÇA AINDA NÃO FOI CONCRETIZADA."
        />
      </ListItem> 
      
    </List>
    <Typography variant="h9">Editado por: Desafios de Gestão World Publishing</Typography>
    </Paper>
    </div>
  )
}
else{
  return (
    <ButtonGroup disableElevation variant="contained" color="primary">
      <Button onClick={() => {alert('A publicação do jornal ocorre apenas nos bimestres 2 e 4')}}>Informação indisponiel para o turno atual</Button>
    </ButtonGroup>    
  )
}
}
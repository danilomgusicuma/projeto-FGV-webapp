import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Select from 'react-select';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DraftsIcon from '@material-ui/icons/Drafts';

import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import MenuIcon from '@material-ui/icons/Menu';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DescriptionIcon from '@material-ui/icons/Description';
import ListIcon from '@material-ui/icons/List';
import CachedIcon from '@material-ui/icons/Cached';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle'
import { DialogContent } from '@material-ui/core';
import HistoryIcon from '@material-ui/icons/History';
import PieChartIcon from '@material-ui/icons/PieChart';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ServicesContainer from '../ServicesContainer/ServicesContainer';
import Deci from '../Reports/Decisions'
import Crono from '../Reports/Crono';
import News from '../Reports/News';
import Bps from '../Reports/Bps';
import Manual from '../Manual/Manual';
import Reports from '../Reports/Reports';
import Pes from '../Reports/Pesquisas'
import AnnouncementIcon from '@material-ui/icons/Announcement';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import Timer from 'react-compound-timer'
import SaveIcon from '@material-ui/icons/Save';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Grid from '@material-ui/core/Grid';

import { Route, Link, useHistory, useLocation, useParams } from 'react-router-dom'

import { makeStyles, useTheme } from '@material-ui/core/styles';

import socket from '../../connection';
//socket.emit("testar", "Deus_Nemo_RULES")


socket.emit('teste', 'vitoria')


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },

  dialog:{
    height:'400px',
  },

  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  h1:{
    textAlign: 'center',
    padding: '22px',
    margin: '0px',
    fontSize: '14px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbarButton:{
    marginLeft: 'auto',
  },
  navbarButton:{
    color: 'white',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Game(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [game, setGame] = useState([])
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [downloadModal, setDownloadModal] = useState(false);
  const [round, setRound] = useState();
  
  

  setTimeout(function(){ 
    //window.location.reload() 
  }, 1800000);

  const history = useHistory();
  const location = useLocation();
  const {type} = useParams();

  useEffect(()=>{
    socket.emit('puxar-state');
    socket.on('final-turno',()=>{
      console.log("final-turno")
      socket.emit('puxar-state');
    })
    socket.on('update', state => {
      setGame(state)
      console.log(state[30])
    return ()=>{
      socket.off('update');
      socket.off('final-turno');
    }});
  },[])

  function generateRounds(){
    const currentRound = game[30] ? game[30] : 0;
    let rounds = []
    let i;
    for(i=1; i<=currentRound; i++){
      rounds.push({value:i, label:i});
    }
    return rounds
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarComponents = [
    {
      path:`/${type}/game/manual`,
      label:'Manual do Jogo',
      component: Manual,
      icon: <LibraryBooksIcon/>,
    },
    {
      path:`/${type}/game/crono`,
      label:'Cronograma',
      component: Crono,
      icon: <EventNoteIcon/>,
    },
    {
      path:`/${type}/game/bps`,
      label:'Balanços do mercado',
      component: Bps,
      icon: <CollectionsBookmarkIcon/>,
    }
    
  ]
  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <h1 className={classes.h1}><img style={{width:'60px', height:'60px'}} src='http://api.desafiosdegestao.com.br:3000/assets/logo.png' alt="Desafios de Gestão"/></h1>
      </div>
      
      <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
>

  <Grid style={{ color: 'green' }}>Bimestre {game[30]} </Grid>
  

      </Grid>
      
      <List>

          <Link to={`/${type}/game/inputs`}>
            <ListItem button>
              <ListItemIcon><PlayCircleOutlineIcon color="primary"/></ListItemIcon>
              <Typography color='primary' variant="h6" noWrap>Simulação</Typography>
            

            </ListItem>
            <Divider />
          </Link>
        {sidebarComponents.map((sidebarComponent, index) => (
          <Link to={sidebarComponent.path} key={index}>
            <ListItem button key={sidebarComponent.label}>
              <ListItemIcon>{sidebarComponent.icon}</ListItemIcon>
              <ListItemText primary={sidebarComponent.label} />
            </ListItem>
          </Link>
        ))}
        
    <Link to={`/${type}/game/news`}>
        <ListItem button>
          <ListItemIcon><AnnouncementIcon /></ListItemIcon>
          <Typography noWrap>{location.pathname.includes(`hsg`) ? `HSG News` : `CBG News`}</Typography>
        </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
      
        <Link to={`/${type}/game/pesquisas`}>
        <ListItem button>
          <ListItemIcon><DraftsIcon /></ListItemIcon>
          <ListItemText primary="Pesquisas Contratadas" />
        </ListItem>
        </Link>
        <Link to={`/${type}/game/reports/1`}>
        <ListItem button>
          <ListItemIcon><PieChartIcon/></ListItemIcon>
          <ListItemText primary="Relatórios" />
        </ListItem>
        </Link>
        <a target="_blank" href="http://api.desafiosdegestao.com.br:3000/assets/sazonalidade.xlsx">
        <ListItem button>
            <ListItemIcon><CachedIcon/></ListItemIcon>
            <ListItemText primary="Sazonalidade (.xlsx)" />
          </ListItem>
        </a>
        <a target="_blank" href="http://api.desafiosdegestao.com.br:3000/assets/passo.xlsx">
        <ListItem button>
            <ListItemIcon><ListIcon/></ListItemIcon>
            <ListItemText primary="Passo a Passo (.xlsx)" />
          </ListItem>
        </a>
      <Link to={`/${type}/login`} style={{ color: 'red' }}>
        <ListItem button><ListItemIcon style={{ color: 'red' }}><ExitToAppIcon/></ListItemIcon><Typography color='red' variant="h6" noWrap>Desconectar</Typography>
  </ListItem>
  </Link>
        
      </List>
    </div>
  );

  function returnSidebarComponents(sidebarComponents){
    return sidebarComponents.map((sidebarComponent, index)=>{
      return(
        <Route key={index} path={sidebarComponent.path} render={props => <sidebarComponent.component {...props}/>}/>
      )
    })
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Dialog open={downloadModal} aria-labelledby="simple-dialog-title" onClose={()=>setDownloadModal(prevState=>!prevState)}>
        <DialogTitle>
          Selecione um bimestre
        </DialogTitle>
        <DialogContent className={classes.dialog}>
          <Select
            defaultValue={game[30] ? game[30]-1 : 0}
            options={generateRounds()}
            onChange={event=>{
              
              setRound(event.value)
            }}
          />
          <Button
            onClick={round ? ()=>{history.push(`/${type}/game/reports/${round}`); setDownloadModal(false);socket.emit('puxar-balancos', round)} : null}
          >
            Ver Demonstrativos
          </Button>
          
        </DialogContent>
      </Dialog>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Desafiosdegestao 
          </Typography>
          <Timer marginLeft='auto'
          initialTime={30*60000}
          direction="backward"
          marginLeft='auto'
>
          {() => (
              <React.Fragment>
                  <h4 style={{color: 'Yellow'}}>.  [<Timer.Minutes />:<Timer.Seconds /> até a sessão expirar]</h4>
              </React.Fragment>
          )}
          </Timer>
          
          <Button onClick={()=>{socket.emit('salvar')}} color="inherit" className={classes.toolbarButton}> 
            Salvar
          </Button>
          <SaveIcon/>
          
          <Button color="inherit" onClick={()=>{socket.emit('resetar')}}> 
            Resetar Jogada
          </Button>
          <RotateLeftIcon/>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route path='/:type/game/inputs' component={ServicesContainer}/>
        <Route path="/:type/game/reports/:round" component={Reports}/>
        <Route path='/:type/game/decisions' component={Deci}/>
        <Route path='/:type/game/pesquisas' component={Pes}/>
        <Route path='/:type/game/news' component={News}/>

        
        {returnSidebarComponents(sidebarComponents)}
      </main>
    </div>
  );
}



Game.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.any,
};

export default Game;
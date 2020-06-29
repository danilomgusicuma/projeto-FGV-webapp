import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DescriptionIcon from '@material-ui/icons/Description';
import ListIcon from '@material-ui/icons/List';
import CachedIcon from '@material-ui/icons/Cached';


import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Manual from '../Manual/Manual';
import AdminOptions from '../AdminOptions/AdminOptions';

import { Route, Link, useParams } from 'react-router-dom'

import { makeStyles, useTheme } from '@material-ui/core/styles';

import socket from '../../connection';
//socket.emit("testar", "Deus_Nemo_RULES")


socket.emit('teste', 'banho_de_feto')



const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
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

function PanelAdmin(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const {type} = useParams();
  const [mobileOpen, setMobileOpen] = React.useState(false);

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
      path:`/${type}/game/schedule`,
      label:'Cronograma',
      component: Manual,
      icon: <EventNoteIcon/>,
    },
    {
      path:`/${type}/game/decisions`,
      label:'Síntese de Decisões',
      component: Manual,
      icon: <DescriptionIcon/>,
    },
    {
      path:`/${type}/game/step-by-step`,
      label:'Passo a Passo',
      component: Manual,
      icon: <ListIcon/>,
    },
    {
      path:`/${type}/game/seasonality`,
      label:'Sazonalidade',
      component: Manual,
      icon: <CachedIcon/>,
    }
  ]
  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <h1 className={classes.h1}>Simulation 2 Learn</h1>
      </div>
      <Divider />
      <List>
        {sidebarComponents.map((sidebarComponent, index) => (
          <Link to={sidebarComponent.path} key={index}>
            <ListItem button key={sidebarComponent.label}>
              <ListItemIcon>{sidebarComponent.icon}</ListItemIcon>
              <ListItemText primary={sidebarComponent.label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
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
        <Route path=':type/admin/panel' component={AdminOptions}/>
        {returnSidebarComponents(sidebarComponents)}
      </main>
    </div>
  );
}



PanelAdmin.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.any,
};

export default PanelAdmin;
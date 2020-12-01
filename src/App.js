import { Brightness4, Brightness7, ImportExport, Menu as NavMenu } from '@material-ui/icons';
import clsx from 'clsx';
import { useState } from 'react';

import {
  AppBar,
  makeStyles,
  Toolbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  Container,
  useTheme,
  Tooltip,
  MenuItem,
  Menu,
} from '@material-ui/core';

import Drawer from './components/Drawer';
import { add, purge } from './services/store/reducers/boardSlice';
import { useDispatch, useSelector } from 'react-redux';
import Board from './components/Board';
import { persistor } from './services/store/store';
import { set } from './services/store/reducers/themeSlice';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    justifyContent: 'space-between',
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  contentRoot: {
    padding: 20,
    flexGrow: 1,
  },
}));

const App = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.boardReducer.selected);
  const type = useSelector((state) => state.themeReducer.type);

  const [open, setOpen] = useState(false);
  const [isAddBoardDialogShown, setIsAddBoardDialogShown] = useState(false);
  const [exportImportMenuEl, setExportImportMenuEl] = useState(null);
  const [name, setName] = useState('');

  const hideDialog = () => {
    clearFields();
    setIsAddBoardDialogShown(false);
  };

  const clearFields = () => {
    setName('');
  };

  const addBoard = () => {
    dispatch(add(name));
    hideDialog();
  };

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar} color="primary">
        <Toolbar className={classes.toolbar}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={() => setOpen(true)}
              edge="start"
              color="inherit"
              aria-label="open drawer"
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
              style={{
                marginRight: theme.spacing(1),
              }}
            >
              <NavMenu style={{ color: grey[50] }} />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              {selected ? selected.name : 'No Board Selected'}
            </Typography>
          </div>
          <div>
            {/* <Tooltip title="Import/Export" aria-label="Import/Export">
              <IconButton
                aria-controls="export-import-menu"
                aria-haspopup="true"
                style={{
                  marginRight: theme.spacing(1),
                }}
                onClick={(e) => setExportImportMenuEl(e.currentTarget)}
              >
                <ImportExport style={{ color: grey[50] }} />
              </IconButton>
            </Tooltip> */}
            <Menu
              anchorEl={exportImportMenuEl}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              keepMounted
              open={Boolean(exportImportMenuEl)}
              onClose={() => setExportImportMenuEl(null)}
              id="export-import-menu"
            >
              <MenuItem
                onClick={() => {
                  setExportImportMenuEl(null);
                }}
              >
                Export Boards
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setExportImportMenuEl(null);
                }}
              >
                Import Boards
              </MenuItem>
            </Menu>
            <Tooltip
              title={type === 'light' ? 'Dark' : 'Light'}
              aria-label={type === 'light' ? 'Dark' : 'Light'}
            >
              <IconButton
                style={{
                  marginRight: theme.spacing(1),
                }}
                onClick={() => dispatch(set(type === 'light' ? 'dark' : 'light'))}
              >
                {type === 'light' ? (
                  <Brightness4 style={{ color: grey[50] }} />
                ) : (
                  <Brightness7 style={{ color: grey[50] }} />
                )}
              </IconButton>
            </Tooltip>
            <Button
              style={{ color: '#FFF' }}
              onClick={() => {
                persistor.purge().then(() => {
                  dispatch(purge());
                });
              }}
            >
              Clear Boards
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer open={open} setOpen={setOpen} setShown={setIsAddBoardDialogShown} window={window} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container
          maxWidth={false}
          classes={{
            root: classes.contentRoot,
          }}
        >
          {selected ? <Board board={selected} /> : null}
        </Container>
      </main>
      <Dialog open={isAddBoardDialogShown} onClose={() => hideDialog()}>
        <DialogTitle>Add Board</DialogTitle>
        <DialogContent>
          <TextField
            variant="filled"
            autoFocus={true}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => (e.key === 'Enter' ? addBoard() : null)}
            label="Name"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => addBoard()} disabled={name.length < 3}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;

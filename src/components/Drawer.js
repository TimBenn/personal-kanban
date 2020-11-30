import React from 'react';
import {
  makeStyles,
  Drawer as MuiDrawer,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@material-ui/core';
import { Add, ChevronRight } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setSelected } from '../services/store/reducers/boardSlice';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarSpacer: {
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 20,
  },
}));

export default function Drawer(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { open, setOpen, setShown, window } = props;

  const container = window !== undefined ? () => window().document.body : undefined;

  const boards = useSelector((state) => state.boardReducer.boards);

  const selectBoard = (board) => {
    dispatch(setSelected(board));
    setOpen(false);
  };

  return (
    <MuiDrawer
      container={container}
      open={open}
      onClose={() => setOpen(false)}
      variant="temporary"
      classes={{
        paper: classes.drawerPaper,
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <div className={classes.appBarSpacer}>
        <Typography component="h1" variant="h6">
          Boards
        </Typography>
      </div>
      <Divider />
      <List>
        <ListItem button onClick={() => setShown(true)}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary="Add Board" />
        </ListItem>
        {boards.map((board) => (
          <Tooltip title="Select" aria-label="Select">
            <ListItem key={board.id} button onClick={() => selectBoard(board)}>
              <ListItemText primary={board.name} />
              <ListItemIcon>
                <ChevronRight />
              </ListItemIcon>
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </MuiDrawer>
  );
}

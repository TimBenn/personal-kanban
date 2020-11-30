import { Card, CardHeader, IconButton, makeStyles, Menu, MenuItem } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import React, { useState } from 'react';

import { ItemDialog } from './Dialogs/Item';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginBottom: 8,
    '&:last-child': {
      marginBottom: 0,
    },
  },
}));

export const Item = (props) => {
  const classes = useStyles();
  let { item } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.wrapper}>
      <Card>
        <CardHeader
          title={item.title}
          subheader={item.description}
          action={
            <IconButton
              style={{ borderRadius: 8 }}
              onClick={(e) => setAnchorEl(e.currentTarget)}
              aria-label="settings"
            >
              <MoreVert />
            </IconButton>
          }
        />
      </Card>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => setOpen(true)}>Edit</MenuItem>
      </Menu>
      <ItemDialog item={item} open={open} setOpen={setOpen} />
    </div>
  );
};

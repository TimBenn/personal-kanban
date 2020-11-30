import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateItem } from '../../services/store/reducers/boardSlice';

export const ItemDialog = (props) => {
  const dispatch = useDispatch();

  let { item, open, setOpen } = props;

  const [title, setTitle] = useState(item ? item.title : '');
  const [description, setDescription] = useState(item ? item.description : '');

  const save = () => {
    dispatch(
      updateItem({
        ...item,
        title: title,
        description: description,
      }),
    );
  };

  const clear = () => {
    setTitle();
    setDescription();
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        clear();
        setOpen(false);
      }}
    >
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          variant="filled"
          value={title}
          style={{ marginBottom: 8 }}
          label="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          variant="filled"
          multiline={true}
          value={description}
          style={{ marginBottom: 8 }}
          label="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            save();
            clear();
            setOpen(false);
          }}
        >
          Save
        </Button>
        <Button
          onClick={() => {
            clear();
            setOpen(false);
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

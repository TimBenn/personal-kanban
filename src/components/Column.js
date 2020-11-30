import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
  Paper,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem, updateColumn } from '../services/store/reducers/boardSlice';
import { Item } from './Item';
import TextToInput from './TextToInput';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 5,
    borderRadius: 4,
    background: theme.palette.secondary.main,
  },
  wrapper: {
    marginBottom: 8,
  },
}));

export const Column = (props) => {
  let classes = useStyles();
  const dispatch = useDispatch();
  let { column } = props;

  const [showNewItem, setShowNewItem] = useState(false);
  const [title, setTitle] = useState('');

  const createItem = () => {
    dispatch(addItem({ id: column.id, title }));

    setTitle('');
    setShowNewItem(false);
  };

  return (
    <Grid key={column.id} style={{ flexShrink: 0 }} item xs={12} md={6} lg={3}>
      <Paper>
        <Card>
          <CardContent>
            <TextToInput
              typographycontainerProps={{
                style: {
                  marginBottom: 8,
                  paddingLeft: 10,
                  minHeight: 56,
                },
              }}
              TextFieldProps={{
                fullWidth: true,
                variant: 'filled',
                value: column.name,
                style: { marginBottom: 8 },
                label: 'Name',
                onChange: (e) =>
                  dispatch(
                    updateColumn({
                      ...column,
                      name: e.target.value,
                    }),
                  ),
                autoFocus: !Boolean(column.name),
              }}
              TypographyProps={{
                variant: 'h6',
              }}
            />
            <Button
              style={{ marginBottom: 8 }}
              onClick={() => setShowNewItem(true)}
              fullWidth={true}
            >
              Add Item
            </Button>
            {showNewItem ? (
              <div className={classes.wrapper}>
                <Card>
                  <CardHeader
                    title={
                      <TextField
                        fullWidth
                        variant="filled"
                        value={title}
                        style={{ marginBottom: 8 }}
                        label="Name"
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={() => createItem()}
                        autoFocus
                      />
                    }
                  />
                </Card>
              </div>
            ) : null}
            {column.items.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </CardContent>
        </Card>
      </Paper>
    </Grid>
  );
};

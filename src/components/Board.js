import { Button, Card, CardContent, Grid, Paper, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addColumn } from '../services/store/reducers/boardSlice';
import { Column } from './Column';

export default function Board(props) {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.boardReducer.selected);

  const [showNewColumn, setShowNewColumn] = useState(false);
  const [name, setName] = useState('');

  const createColumn = () => {
    if (name) {
      dispatch(addColumn(name));
    }

    setName('');
    setShowNewColumn(false);
  };

  return (
    <Grid container wrap="nowrap" spacing={3}>
      <Grid style={{ flexShrink: 0 }} item xs={12} md={6} lg={3}>
        <Paper>
          <Card>
            <CardContent>
              <Button onClick={() => setShowNewColumn(true)} fullWidth={true}>
                Add Column
              </Button>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
      {showNewColumn ? (
        <Grid style={{ flexShrink: 0 }} item xs={12} md={6} lg={3}>
          <Paper>
            <Card>
              <CardContent>
                <TextField
                  variant="filled"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => createColumn()}
                  onKeyPress={(e) => (e.key === 'Enter' ? createColumn() : null)}
                  style={{ marginBottom: 8 }}
                  label="Name"
                  autoFocus
                />
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      ) : null}
      {board.columns.map((column) => (
        <Column column={column} key={column.id} />
      ))}
    </Grid>
  );
}

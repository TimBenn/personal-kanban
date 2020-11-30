import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  boards: [],
  selected: null,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    add: (state, action) => {
      let board = {
        id: uuidv4(),
        name: action.payload,
        columns: [],
      };

      state.boards.push(board);
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    addColumn: (state, action) => {
      let index = state.boards.findIndex((b) => b.id === state.selected.id);

      let column = {
        id: uuidv4(),
        name: action.payload,
        items: [],
      };

      state.boards[index].columns = [column, ...state.boards[index].columns];
      state.selected.columns = [column, ...state.selected.columns];
    },
    updateColumn: (state, action) => {
      let boardIndex = state.boards.findIndex((b) => b.id === state.selected.id);
      let columnIndex = state.boards[boardIndex].columns.findIndex(
        (c) => c.id === action.payload.id,
      );

      state.boards[boardIndex].columns[columnIndex] = action.payload;
      state.selected.columns[columnIndex] = action.payload;
    },
    addItem: (state, action) => {
      let boardIndex = state.boards.findIndex((b) => b.id === state.selected.id);
      let columnIndex = state.boards[boardIndex].columns.findIndex(
        (c) => c.id === action.payload.id,
      );

      let items = state.boards[boardIndex].columns[columnIndex].items;

      let item = {
        id: uuidv4(),
        title: action.payload.title,
        description: '',
        subItems: [],
      };

      state.boards[boardIndex].columns[columnIndex].items = [item, ...items];
      state.selected.columns[columnIndex].items = [item, ...items];
    },
    updateItem: (state, action) => {
      let boardIndex = state.boards.findIndex((b) => b.id === state.selected.id);
      let columnIndex = state.boards[boardIndex].columns.findIndex(
        (c) => c.items.findIndex((i) => i.id === action.payload.id) !== -1,
      );
      let itemIndex = state.boards[boardIndex].columns[columnIndex].items.findIndex(
        (i) => i.id === action.payload.id,
      );

      state.boards[boardIndex].columns[columnIndex].items[itemIndex] = action.payload;
      state.selected.columns[columnIndex].items[itemIndex] = action.payload;
    },
    purge: (state) => initialState,
  },
});

export const {
  add,
  setSelected,
  addColumn,
  updateColumn,
  addItem,
  updateItem,
  purge,
} = boardSlice.actions;

export default boardSlice.reducer;

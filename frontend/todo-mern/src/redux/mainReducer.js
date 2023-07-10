import { createReducer, createAction } from '@reduxjs/toolkit';

const initialValue = {
  status: false,
  data: [],
};

export const setStatus = createAction('SET_STATUS');
export const getData = createAction('GET_DATA');

export default createReducer(initialValue, {
  [setStatus]: function (state, action) {
    state.status = !state.status;
    console.log(state.status);
  },

  [getData]: function (state, action) {
    state.data = action.payload;
  },
});

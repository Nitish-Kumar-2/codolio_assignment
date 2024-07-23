import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import {  Transaction } from '../../services/type';
import { apiConnector } from '../../services/apiConnector';
import { endpoints } from "../../services/apis";
import toast from 'react-hot-toast';
const {
  ALL_DATA_API,
} = endpoints;

interface DataState {
  data: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
};

const getAllTransaction = createSlice({
  name: 'data',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action: PayloadAction<Transaction[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = getAllTransaction.actions;

export const fetchData = () => async (dispatch: AppDispatch) => {
  dispatch(fetchDataStart());
  try {
    const response = await apiConnector("GET",ALL_DATA_API);
    // toast.success("Data fetch Successfully");
    dispatch(fetchDataSuccess(response.data.data));
  } catch (error:any) {
    toast.error("Error while fetching the data!");
    dispatch(fetchDataFailure(error.message));
  }
};

export default getAllTransaction.reducer;

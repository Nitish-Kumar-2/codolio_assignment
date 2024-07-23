import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import {  Total } from '../../services/type';
import { apiConnector } from '../../services/apiConnector';
import { endpoints } from "../../services/apis";
import toast from 'react-hot-toast';
const {
  TOTALS_API
} = endpoints;

interface DataState {
  data: Total;
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: {_id:null,totalExpense:0,totalIncome:0},
  loading: false,
  error: null,
};

const getTotal = createSlice({
  name: 'total',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action: PayloadAction<Total>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = getTotal.actions;

export const getTotals = () => async (dispatch: AppDispatch) => {
  dispatch(fetchDataStart());
  try {
    const response = await apiConnector("GET",TOTALS_API);
    // toast.success("Transaction fetchD Successfully");
    dispatch(fetchDataSuccess(response.data.data));
  } catch (error:any) {
    toast.error("Error while Deleting the tranaction, try Again!");
    dispatch(fetchDataFailure(error.message));
  }
};

export default getTotal.reducer;

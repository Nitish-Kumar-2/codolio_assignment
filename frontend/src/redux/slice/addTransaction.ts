import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { Data } from '../../services/type';
import { apiConnector } from '../../services/apiConnector';
import { endpoints } from "../../services/apis";
import toast from 'react-hot-toast';
const {
  ADD_DATA_API} = endpoints;

interface DataState {
  data: Data;
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: {amount:0,title:"",type:"",category:"",currency:"",note:"",date:""},
  loading: false,
  error: null,
};

const addTransaction = createSlice({
  name: 'addTransaction',
  initialState,
  reducers: {
    addDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    addDataSuccess(state, action: PayloadAction<Data>) {
      state.loading = false;
      state.data = action.payload;
    },
    addDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addDataStart, addDataSuccess, addDataFailure } = addTransaction.actions;

export const addData = (data:Data) => async (dispatch: AppDispatch) => {
  dispatch(addDataStart());
  try {
    const response = await apiConnector("POST",ADD_DATA_API,data);
    toast.success("Data Add Successfully")
    dispatch(addDataSuccess(response.data.data));
  } catch (error:any) {
    toast.success("Data is not add, try again")
    dispatch(addDataFailure(error.message));
  }
};

export default addTransaction.reducer;


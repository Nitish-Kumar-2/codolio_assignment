
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { Data } from '../../services/type';
import { apiConnector } from '../../services/apiConnector';
import { endpoints } from "../../services/apis";
import toast from 'react-hot-toast';
const {
  UPDATE_DATA_API} = endpoints;

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

const updateTransaction = createSlice({
  name: 'updateTransaction',
  initialState,
  reducers: {
    updateDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateDataSuccess(state, action: PayloadAction<Data>) {
      state.loading = false;
      state.data = action.payload;
    },
    updateDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { updateDataStart, updateDataSuccess, updateDataFailure } = updateTransaction.actions;

export const updateData = (data:Data) => async (dispatch: AppDispatch) => {
  dispatch(updateDataStart());
  try {
    const response = await apiConnector("PUT",`${UPDATE_DATA_API}/${data.id}`,data);
    toast.success("Data updated Successfully")
    dispatch(updateDataSuccess(response.data.data));
  } catch (error:any) {
    toast.error("Data is not add, try again")
    dispatch(updateDataFailure(error.message));
  }
};

export default updateTransaction.reducer;


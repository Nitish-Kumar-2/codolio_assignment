import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { IncomePerDay } from '../../services/type';
import { apiConnector } from '../../services/apiConnector';
import { endpoints } from "../../services/apis";
import toast from 'react-hot-toast';
const {
  INCOME_AND_EXPENSE_API
} = endpoints;

interface DataState {
  data: IncomePerDay[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
};

const getIncome = createSlice({
  name: 'income',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action: PayloadAction<IncomePerDay[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = getIncome.actions;

export const getExpenditureData = () => async (dispatch: AppDispatch) => {
  dispatch(fetchDataStart());
  try {
    const response = await apiConnector("GET",INCOME_AND_EXPENSE_API);
    // toast.success("Transaction fetchD Successfully");
    dispatch(fetchDataSuccess(response.data.data));
  } catch (error:any) {
    toast.error("Error while Deleting the tranaction, try Again!");
    dispatch(fetchDataFailure(error.message));
  }
};

export default getIncome.reducer;

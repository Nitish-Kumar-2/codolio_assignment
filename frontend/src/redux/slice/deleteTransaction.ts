import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { apiConnector } from "../../services/apiConnector";
import { endpoints } from "../../services/apis";
import toast from "react-hot-toast";
const { DELETE_TRANSACTION_API } = endpoints;

interface DataState {
  data: string;
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: "",
  loading: false,
  error: null,
};

const deleteTransaction = createSlice({
  name: "data",
  initialState,
  reducers: {
    deleteDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteDataSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.data = action.payload;
    },
    deleteDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { deleteDataStart, deleteDataSuccess, deleteDataFailure } =
  deleteTransaction.actions;

export const deleteData = (id: any) => async (dispatch: AppDispatch) => {
  dispatch(deleteDataStart());
  try {
    const response = await apiConnector(
      "DELETE",
      `${DELETE_TRANSACTION_API}/${id}`
    );
    toast.success("Transaction Deleted Successfully");
    dispatch(deleteDataSuccess(response.data.message));
  } catch (error: any) {
    toast.error("Error while Deleting the tranaction, try Again!");
    dispatch(deleteDataFailure(error.message));
  }
};

export default deleteTransaction.reducer;

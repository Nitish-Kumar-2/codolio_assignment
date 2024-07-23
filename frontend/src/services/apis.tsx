const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const endpoints = {
  ADD_DATA_API: BASE_URL + "/add",
  DELETE_TRANSACTION_API: BASE_URL + "/delete",
  INCOME_AND_EXPENSE_API: BASE_URL + "/income-expenses-per-day",
  UPDATE_DATA_API: BASE_URL + "/update",
  TOTALS_API: BASE_URL + "/totals",
  ALL_DATA_API: BASE_URL + "/all",
};

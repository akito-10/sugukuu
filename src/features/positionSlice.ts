import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../app/store";

export const positionSlice = createSlice({
  name: "destPosition",
  initialState: {
    destPosition: {
      destLatitude: null,
      destLongitude: null,
    },
  },
  reducers: {
    getDestPosition: (state, action) => {
      state.destPosition = action.payload;
    },
  },
});

export const { getDestPosition } = positionSlice.actions;

// export const incrementAsync = (amount: number): AppThunk => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export const selectPosition = (state: RootState) => state.position.destPosition;

export default positionSlice.reducer;

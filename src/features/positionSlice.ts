import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../app/store";

interface PositionState {
  destPosition: {
    destLatitude: null | number;
    destLongitude: null | number;
  };
}

const initialState: PositionState = {
  destPosition: {
    destLatitude: null,
    destLongitude: null,
  },
};

export const positionSlice = createSlice({
  name: "destPosition",
  initialState,
  reducers: {},
});

export const {} = positionSlice.actions;

// export const incrementAsync = (amount: number): AppThunk => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export const selectCount = (state: RootState) => state.position.destPosition;

export default positionSlice.reducer;

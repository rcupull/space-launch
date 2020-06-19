import { Reducer } from "redux";
// import { SessionReducer, SessionState } from "./session_reducer";
import { ILaunch, ILaunch_details } from "../utils/definitions";
import { OwnAction } from "./actions";

export interface RootReducerState {
  fetching: boolean;
  error: boolean;
  updated: boolean;
  count: number;
  offset: number;
  launches: ILaunch[];

  launch_details?: ILaunch_details;
}
const def_RootReducerState: RootReducerState = {
  fetching: false,
  error: false,
  updated: false,

  count: 0,
  offset: 0,

  launches: [],
};

export const RootReducer: Reducer<RootReducerState, OwnAction> = (
  state = def_RootReducerState,
  action
) => {
  switch (action.type) {
    case "FETCHING":
      return { ...state, fetching: true };
    case "ERROR":
      return { ...state, error: true };
    case "SUCCESS_FETCH_LAUNCHES":
      return {
        ...state,
        error: false,
        fetching: false,
        updated: true,
        launches: action.launches,
      };
    case "SET_OFFSET":
      return { ...state, updated: false, offset: action.offset };
    case "SET_COUNT":
      return { ...state, count: action.count };
    case "SUCCESS_FETCH_LAUNCH_DETAILS":
      return {
        ...state,
        error: false,
        fetching: false,
        updated: true,
        launch_details: action.launch,
      };
    default:
      return state;
  }
};

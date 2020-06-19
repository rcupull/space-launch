import { ILaunch, ILaunch_details } from "../utils/definitions";
import { RootReducerState } from "./root_reducer";
import { ThunkAction } from "redux-thunk";
import axios, { AxiosRequestConfig } from "axios";
import {
  url_launcher,
  url_launch_details,
  launches_for_pages,
} from "../utils/api";

export type OwnAction =
  | { type: "FETCHING" }
  | { type: "ERROR" }
  | { type: "SUCCESS_FETCH_LAUNCHES"; launches: ILaunch[] }
  | { type: "SUCCESS_FETCH_LAUNCH_DETAILS"; launch: ILaunch_details }
  | { type: "SET_OFFSET"; offset: number }
  | { type: "SET_COUNT"; count: number };

const A_fetching = (): OwnAction => {
  return { type: "FETCHING" };
};
const A_error = (): OwnAction => {
  return { type: "ERROR" };
};
const A_fetch_launches = (launches: ILaunch[]): OwnAction => {
  return { type: "SUCCESS_FETCH_LAUNCHES", launches: launches };
};
const A_fetch_launch_details = (launch: ILaunch_details): OwnAction => {
  return { type: "SUCCESS_FETCH_LAUNCH_DETAILS", launch: launch };
};
export const A_set_offset = (offset: number): OwnAction => {
  return { type: "SET_OFFSET", offset: offset };
};
const A_set_count = (count: number): OwnAction => {
  return { type: "SET_COUNT", count: count };
};

type ThunkResult<R> = ThunkAction<R, RootReducerState, undefined, OwnAction>;

export const A_fetch_launches_thunk = (): ThunkResult<void> => {
  return (dispatch, getState) => {
    dispatch(A_fetching());
    const error = () => {
      dispatch(A_error());
    };
    const success = (res: any) => {
      dispatch(A_set_count(res.data.count));

      dispatch(A_fetch_launches(res.data.results));
    };

    let config: AxiosRequestConfig = {
      method: "get",
      url: url_launcher,
      params: {
        format: "json",
        limit: launches_for_pages,
        offset: getState().offset,
      },
    };
    axios(config).then(success).catch(error);
  };
};

export const A_fetch_launch_details_thunk = (id: string): ThunkResult<void> => {
  return (dispatch) => {
    dispatch(A_fetching());
    const error = () => {
      dispatch(A_error());
    };
    const success = (res: any) => {
      dispatch(A_fetch_launch_details(res.data));
    };

    let config: AxiosRequestConfig = {
      method: "get",
      url: `${url_launch_details}/${id}`,
      params: {
        format: "json",
      },
    };
    axios(config).then(success).catch(error);
  };
};

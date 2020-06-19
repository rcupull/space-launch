import React, { useEffect, Fragment } from "react";
import { MapDispatchToProps, MapStateToProps, connect } from "react-redux";
import { RootReducerState } from "../reducers/root_reducer";
import { ILaunch } from "../utils/definitions";
import LaunchBasics from "./launch_basics";
import * as actions from "../reducers/actions";
import Pagination from "./pagination";

interface OwnProps {}
interface StateProps {
  launches: ILaunch[];
  updated: boolean;
  fetching: boolean;
}
interface DispatchProps {
  handle_fetch_launches: () => void;
}

type ListLaunchesProps = OwnProps & StateProps & DispatchProps;

const ListLaunches: React.SFC<ListLaunchesProps> = ({
  launches,
  updated,
  fetching,
  handle_fetch_launches,
}) => {
  useEffect(() => {
    if (!updated) handle_fetch_launches();
    if (!launches.length) handle_fetch_launches();
  }, [updated, launches]);

  if (fetching) return null;

  return (
    <Fragment>
      {launches.map((launch, id) => (
        <LaunchBasics key={id} launch={launch} />
      ))}

      <Pagination />
    </Fragment>
  );
};

const LocalMapStateToProps: MapStateToProps<
  StateProps,
  OwnProps,
  RootReducerState
> = (state, ownProps) => {
  return {
    launches: state.launches,
    updated: state.updated,
    fetching: state.fetching,
  };
};
const LocalMapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  handle_fetch_launches: actions.A_fetch_launches_thunk,
};

export default connect(
  LocalMapStateToProps,
  LocalMapDispatchToProps
)(ListLaunches);

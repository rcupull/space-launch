import React from "react";
import { ClipLoader } from "react-spinners";
import { MapDispatchToProps, MapStateToProps, connect } from "react-redux";
import { RootReducerState } from "../reducers/root_reducer";
import { css } from "@emotion/core";
import { Modal } from "react-bootstrap";
const MySpinner: React.SFC = () => {
  const size: number = 100;
  return (
    <ClipLoader
      css={css`
        position: absolute;
        top: calc(50% - ${size / 2}px);
        left: calc(50% - ${size / 2}px);
        z-index: 100;
      `}
      size={size}
      color={"black"}
    />
  );
};
////////////////////////////////////////////
interface OwnProps {}
interface StateProps {
  active: boolean;
}
interface DispatchProps {}
///////////////////////////////////////////
type SpinnerProps = OwnProps & StateProps & DispatchProps;
const Spinner: React.SFC<SpinnerProps> = ({ active }) => {
  return <Modal show={active} centered dialogAs={MySpinner} />;
};

const LocalMapStateToProps: MapStateToProps<
  StateProps,
  OwnProps,
  RootReducerState
> = (state, ownProps) => {
  return {
    active: state.fetching,
  };
};
const LocalMapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {};

export default connect(LocalMapStateToProps, LocalMapDispatchToProps)(Spinner);

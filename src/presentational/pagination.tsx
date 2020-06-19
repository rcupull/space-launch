import React, { useState, useEffect } from "react";
import { Row, Button } from "react-bootstrap";
import { MapDispatchToProps, MapStateToProps, connect } from "react-redux";
import { RootReducerState } from "../reducers/root_reducer";
import * as actions from "../reducers/actions";
import { launches_for_pages } from "../utils/api";

interface OwnProps {}
interface StateProps {
  count: number;
  offset: number;
  updated: boolean;
}
interface DispatchProps {
  set_offset: (offset: number) => void;
}

type PaginationProps = OwnProps & StateProps & DispatchProps;

const style_button: React.CSSProperties = {
  padding: "1rem",
  fontSize: "1.5rem",
};

const Pagination: React.SFC<PaginationProps> = ({
  count,
  offset,
  updated,
  set_offset,
}) => {
  const [next_disabled, set_next_disabled] = useState<boolean>(true);
  const [prev_disabled, set_prev_disabled] = useState<boolean>(false);
  const [current_count, set_current_count] = useState<number>(1);

  useEffect(() => {
    if (updated) {
      set_next_disabled(offset === 0);
      set_prev_disabled(offset > count - launches_for_pages);
      set_current_count(offset / launches_for_pages + 1);
    }
  }, [updated]);

  const handle_next_pagination = () => {
    set_offset(offset + launches_for_pages);
  };

  const handle_previous_pagination = () => {
    set_offset(offset - launches_for_pages);
  };

  return (
    <Row>
      <Button
        disabled={next_disabled}
        style={style_button}
        onClick={() => {
          handle_previous_pagination();
        }}
        variant="link"
      >
        {"<< Prev"}
      </Button>

      <div style={style_button}>
        {`Pages ${current_count} / ${Math.ceil(count / launches_for_pages)}`}
      </div>
      <Button
        disabled={prev_disabled}
        style={style_button}
        onClick={() => {
          handle_next_pagination();
        }}
        variant="link"
      >
        {"Next >>"}
      </Button>
    </Row>
  );
};

const LocalMapStateToProps: MapStateToProps<
  StateProps,
  OwnProps,
  RootReducerState
> = (state, ownProps) => {
  return {
    count: state.count,
    offset: state.offset,
    updated: state.updated,
  };
};
const LocalMapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  set_offset: actions.A_set_offset,
};

export default connect(
  LocalMapStateToProps,
  LocalMapDispatchToProps
)(Pagination);

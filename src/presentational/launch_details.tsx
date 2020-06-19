import React, { useEffect, Fragment, useState } from "react";
import { MapDispatchToProps, MapStateToProps, connect } from "react-redux";
import { RootReducerState } from "../reducers/root_reducer";
import * as actions from "../reducers/actions";
import { useParams, Redirect } from "react-router-dom";
import { ILaunch_details, routes } from "../utils/definitions";

import { Card, Row, Col, Button } from "react-bootstrap";
interface OwnProps {}
interface StateProps {
  launch_details?: ILaunch_details;
}
interface DispatchProps {
  handle_fetch_launch_details: (id: string) => void;
}

type LaunchDetailsProps = OwnProps & StateProps & DispatchProps;

const size_col_1 = 3;
const size_col_2 = 12 - size_col_1;

const size_col_3 = 2;
const size_col_4 = 12 - size_col_3;

const LaunchDetails: React.SFC<LaunchDetailsProps> = ({
  launch_details,
  handle_fetch_launch_details,
}) => {
  const [redirect, set_redirect] = useState<boolean>(false);

  let { id } = useParams();

  useEffect(() => {
    handle_fetch_launch_details(id);
  }, [id]);

  if (typeof launch_details === "undefined") return null;
  if (redirect) return <Redirect to={routes.launches} />;

  const handle_render_image = () => {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundColor: "gray",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "3rem",
            position: "absolute",
            top: "40%",
            left: "8%",
          }}
        >
          No image
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <Card style={{ margin: "2rem 0", padding: "1rem" }}>
        <Row style={{ height: "20 rem" }}>
          <Col sm={size_col_1}>{handle_render_image()}</Col>
          <Col sm={size_col_2}>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title
                    style={{
                      fontSize: "2.5rem",
                      textAlign: "left",
                      padding: "1rem 0",
                    }}
                  >
                    {launch_details.name}
                  </Card.Title>
                </Col>
              </Row>
              <Row>
                <Col sm={size_col_3}>
                  <Card.Title
                    style={{ textAlign: "right", fontSize: "1.5rem" }}
                  >
                    Rocket
                  </Card.Title>
                </Col>
                <Col sm={size_col_4}>
                  <Card.Text>
                    <b>Name: </b> {launch_details.rocket.configuration.name}
                  </Card.Text>
                  <Card.Text>
                    <b>Full name: </b>
                    {launch_details.rocket.configuration.full_name}
                  </Card.Text>
                  <Card.Text>
                    <b>Provider: </b>
                    {
                      launch_details.rocket.configuration
                        .launch_service_provider.name
                    }
                    .
                    {
                      launch_details.rocket.configuration
                        .launch_service_provider.country_code
                    }
                  </Card.Text>
                  <Card.Text>
                    <b>Family: </b>
                    {launch_details.rocket.configuration.family}
                  </Card.Text>
                  <Card.Text>
                    <b>Description: </b>
                    {launch_details.rocket.configuration.description}
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
            <Card.Body>
              <Card.Text>
                <b>View more details in: </b>
                <a href={launch_details.slug} style={{}}>
                  {launch_details.slug}
                </a>
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <div style={{ textAlign: "right", margin: "2rem 0" }}>
        <Button
          onClick={() => {
            set_redirect(true);
          }}
          variant="secondary"
        >
          Back
        </Button>
      </div>
    </Fragment>
  );
};

const LocalMapStateToProps: MapStateToProps<
  StateProps,
  OwnProps,
  RootReducerState
> = (state, ownProps) => {
  return {
    launch_details: state.launch_details,
  };
};
const LocalMapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  handle_fetch_launch_details: actions.A_fetch_launch_details_thunk,
};

export default connect(
  LocalMapStateToProps,
  LocalMapDispatchToProps
)(LaunchDetails);

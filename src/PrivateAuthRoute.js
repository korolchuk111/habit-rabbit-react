import React from "react";
import { connect } from "react-redux";
import {
  Route,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const PrivateAuthRoute = props => {
  const { isAuthUser } = props;

  if (isAuthUser) {
    return history.back();
  }

  if (!isAuthUser) {
    return props.children;
  }

  return <Route {...props} />;
};

const mapStateToProps = (stateRedux) => ({
  isAuthUser: stateRedux.authReducer.isAuthUser
});

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}
export default withRouter(connect(mapStateToProps)(PrivateAuthRoute));

import React from "react";
import { connect } from "react-redux";
import {
  Navigate,
  Route,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";

const PrivateRoute = props => {
  const { isAuthUser } = props;

  // console.log(isAuthUser)
  if (isAuthUser) {
    return props.children;
  }

  if (!isAuthUser) {
    return <Navigate to={"/login"} />;
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
export default withRouter(connect(mapStateToProps)(PrivateRoute));

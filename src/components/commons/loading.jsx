import React from 'react';
import PropTypes from 'prop-types';
import Loading from 'react-loading-overlay';

function LoadingComponent(props) {
  if (props.error) {
    // When the loader has errored
    return <div>Error!</div>;
  } else if (props.timedOut) {
    // When the loader has taken longer than the timeout
    return <div>Taking a long time...</div>;
  } else if (props.pastDelay) {
    // When the loader has taken longer than the delay
    return (
      <Loading
        active
        spinner
      >
        <div className="main-container" />
      </Loading>
    );
  }
  // When the loader has just started
  return null;
}
LoadingComponent.propTypes = {
  timedOut: PropTypes.bool,
  pastDelay: PropTypes.bool,
  error: PropTypes.bool,
};
LoadingComponent.defaultProps = {
  timedOut: false,
  pastDelay: false,
  error: false,
};
export default LoadingComponent;

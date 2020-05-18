import React from "react";

const Marker = props => {
  const { color, name, id } = props;
  return <div className="marker" title={name} />;
};

export default Marker;

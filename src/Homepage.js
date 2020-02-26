import React from "react";

export default props => {
  const ready = props.user._id;

  if (!ready) return "⏳ loading...";

  return (
    <h1>
      Welcome {props.user.firstname} {props.user.lastname}!
    </h1>
  );
};

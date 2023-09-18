import React from "react";
import { Link } from "react-router-dom";

const UnAuthorized = () => {
  return (
    <div>
      You're not authorized to access this route! Please try to signin with
      authorized user credentials <Link to={"/"}>Sign In</Link>
    </div>
  );
};

export default UnAuthorized;

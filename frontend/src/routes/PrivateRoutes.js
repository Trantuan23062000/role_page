import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
const PrivateRouter = (props) => {
  useEffect(() => {}, []);
  return (
    <Routes>
      <Route path={props.path} element={props.element} />
    </Routes>
  );
};

export default PrivateRouter;

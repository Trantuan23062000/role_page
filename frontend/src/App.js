import { BrowserRouter as Router} from "react-router-dom";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fragment, useEffect, useState } from "react";
import _ from "lodash";
import AppRoutes from "./routes/Route";

const App = () => {
  const [account, setAccount] = useState({});
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (!session) {
      setAccount(JSON.parse(session));
    }
  }, []);
  return (
    <div className="App">
      <div className="app-container">
        <Router>
          <Fragment>
            <NavBar />
          </Fragment>
          <AppRoutes/>
        </Router>
      </div>
      <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    </div>
  );
};

export default App;

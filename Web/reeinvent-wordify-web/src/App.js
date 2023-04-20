import { Toaster } from "react-hot-toast";
import "./App.css";

import Loading from "components/layout/Loading";
import NavigationBar from "components/layout/NavigationBar";
import { Fragment, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "utils/routes";

function App() {
  return (
    <Fragment>
      <div className="App">
        <NavigationBar />
        <Routes>{renderRoutes()}</Routes>
      </div>
      <Toaster />
    </Fragment>
  );
}

const renderRoutes = () => {
  return Object.values(routes).map((r) => {
    const Component = r.component;
    return (
      <Route
        key={r.id}
        path={r.path}
        element={
          <Suspense fallback={<Loading />}>
            <Component />
          </Suspense>
        }
      />
    );
  });
};

export default App;

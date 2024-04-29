import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import appRoutes from "./configs/routes";
import LoadingModal from "./components/Loadings";

function App() {
  const routes = useRoutes(appRoutes);

  return <Suspense fallback={<LoadingModal open={true} />}>{routes}</Suspense>;
}

export default App;
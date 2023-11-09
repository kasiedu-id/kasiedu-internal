import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import appRoutes from "./config/routes";
import LoadingModal from "./components/reusables/Loading/Loading";

function App() {
  const routes = useRoutes(appRoutes);

  return <Suspense fallback={<LoadingModal open={true} />}>{routes}</Suspense>;
}

export default App;

import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import appRoutes from "./config/routes";
import { Loader } from "./components/reusables/Loading";

function App() {
  const routes = useRoutes(appRoutes);

  return <Suspense fallback={<Loader color={"gray-500"} />}>{routes}</Suspense>;
}

export default App;

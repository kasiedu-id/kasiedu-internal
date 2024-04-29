import { Suspense } from "react";
import LoadingModal from ".";

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingModal />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
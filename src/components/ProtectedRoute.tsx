import { useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      navigate("/login");
    }
  });

  return <>{children}</>;
}

export default ProtectedRoute;

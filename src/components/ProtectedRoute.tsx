import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token === undefined || token === null) {
      navigate("/login");
    }
  });

  return <>{children}</>;
}

export default ProtectedRoute;

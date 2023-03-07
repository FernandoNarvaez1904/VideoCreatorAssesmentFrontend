import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect } from "react";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const [token] = useLocalStorage({
    key: "access_token",
    defaultValue: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  return <>{children}</>;
}

export default ProtectedRoute;

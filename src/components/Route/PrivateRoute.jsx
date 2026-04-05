import { Navigate } from "react-router-dom";
import { getUser } from "../../utils/userUtils";

export default function PrivateRoute({ children }) {
  const user = getUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
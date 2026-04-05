import { Navigate } from "react-router-dom";
import { getUser } from "../../utils/userUtils";

export default function PublicRoute({ children }) {
  const user = getUser();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
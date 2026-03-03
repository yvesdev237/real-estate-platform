import { Navigate } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";

const ProtectedRoute = ({children }) => {
    const { user , loading , role } = UseAuth();
    console.log("ProtectedRoute status", { user, loading , role });
      if(loading) return <div className="h-screen flex justify-center items-center w-full">
    <TailSpin />
  </div>
    // require both an authenticated user and a known role
    if (!user || !role) {
        toast.error('Unauthorized user');
        return <Navigate to="/login" />};

    return children ;
}

export default ProtectedRoute ;
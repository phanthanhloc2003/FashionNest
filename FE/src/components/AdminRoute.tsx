import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { authApi } from "../api/userApi";
import { User } from "../types/auth";

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const [role, setRole] = useState<User | null>(null);

  useEffect(() => {
    const fectData = async () => {
      const roles = await authApi.role();
      setRole(roles);
    };
    fectData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (role) {
    console.log(role)
    if (role?.role !== "admin") {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}

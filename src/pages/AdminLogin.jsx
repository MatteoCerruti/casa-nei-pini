import { SignIn, useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

function AdminLogin() {
  const { isLoaded, isSignedIn } = useAuth();

  if (isLoaded && isSignedIn) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="page section-page section-page-admin">
      <div className="section-title-row">
        <LayoutDashboard className="section-title-icon" size={24} strokeWidth={1.75} />
        <h1 className="section-title">Area riservata</h1>
      </div>

      <hr className="section-title-divider" />

      <div className="section-content">
        <div style={{ display: "flex", justifyContent: "center", padding: "2rem 0" }}>
          <SignIn routing="path" path="/admin/login" fallbackRedirectUrl="/admin" />
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;

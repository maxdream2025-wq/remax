import AdminLayout from "@/components/Admin/AdminLayout";
import AdminAuth from "@/components/Admin/AdminAuth";
import ErrorBoundary from "@/components/Admin/ErrorBoundary";
import React from "react";

const Admin = ({ logout }) => {
  return <AdminLayout logout={logout} />;
};

const ProtectedAdmin = () => {
  return (
    <ErrorBoundary>
      <AdminAuth>
        <Admin />
      </AdminAuth>
    </ErrorBoundary>
  );
};

export default ProtectedAdmin;
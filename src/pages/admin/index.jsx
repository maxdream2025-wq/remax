import AdminLayout from "@/components/Admin/AdminLayout";
import AdminAuth from "@/components/Admin/AdminAuth";
import React from "react";

const Admin = ({ logout }) => {
  return <AdminLayout logout={logout} />;
};

const ProtectedAdmin = () => {
  return (
    <AdminAuth>
      <Admin />
    </AdminAuth>
  );
};

export default ProtectedAdmin;
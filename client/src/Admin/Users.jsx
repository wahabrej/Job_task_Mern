import React from "react";
import AdminMenu from "./AdminMenu";

export default function Users() {
  return (
    <div className="container mx-auto">
      <div className="flex">
        <div className="w-1/4">
          <AdminMenu />
        </div>
        <div className="w-3/4">
          <h1 className="text-2xl">Create User</h1>
        </div>
      </div>
    </div>
  );
}

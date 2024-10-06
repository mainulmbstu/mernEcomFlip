import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div>
      <h3>Admin Panel</h3>
      <div className="list-group">
        <NavLink
          to="/dashboard/admin/profile"
          className="list-group-item list-group-item-action"
          aria-current="true"
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action"
          aria-current="true"
        >
          Create Category
        </NavLink>

        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action"
          aria-current="true"
        >
          Products
        </NavLink>

        <NavLink
          to="/dashboard/admin/user-list"
          className="list-group-item list-group-item-action"
          aria-current="true"
        >
          Users
        </NavLink>
        <NavLink
          to="/dashboard/admin/order-list"
          className="list-group-item list-group-item-action"
          aria-current="true"
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Добавяме Link
import "./Sidebar.css";
import { FaFolder, FaCaretDown, FaCaretRight, FaBars } from "react-icons/fa";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(
    JSON.parse(localStorage.getItem("sidebar-collapsed")) || true
  );
  const [openMenu1, setOpenMenu1] = useState(false); // За менюто Counteragents
  const [openMenu2, setOpenMenu2] = useState(false); // За менюто Invoices

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", isCollapsed);
  }, [isCollapsed]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </div>
      <h2 className="sidebar-title">{!isCollapsed && "Menu"}</h2>
      <div className="menu">
        {/* Counteragents Menu */}
        <div className="menu-header" onClick={() => setOpenMenu1(!openMenu1)}>
          <FaFolder />
          {!isCollapsed && <span>Counteragents</span>}
          {!isCollapsed && (openMenu1 ? <FaCaretDown /> : <FaCaretRight />)}
        </div>
        {!isCollapsed && openMenu1 && (
          <ul className="submenu">
            <li className="submenu-item">
              <Link to="/create-contractor">Create New</Link> {/* Линк за създаване на контрагент */}
            </li>
            <li className="submenu-item">
              <Link to="/modify-existing">Modify Existing</Link> {/* Линк за модифициране на контрагент */}
            </li>
          </ul>
        )}

        {/* Invoices Menu */}
        <div className="menu-header" onClick={() => setOpenMenu2(!openMenu2)}>
          <FaFolder />
          {!isCollapsed && <span>Invoices</span>}
          {!isCollapsed && (openMenu2 ? <FaCaretDown /> : <FaCaretRight />)}
        </div>
        {!isCollapsed && openMenu2 && (
          <ul className="submenu">
            <li className="submenu-item">
              <Link to="/create-invoice">Create Invoice</Link> {/* Линк за създаване на фактура */}
            </li>
            <li className="submenu-item">
              <Link to="/modify-invoice">Modify Invoice</Link> {/* Линк за модифициране на фактура */}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

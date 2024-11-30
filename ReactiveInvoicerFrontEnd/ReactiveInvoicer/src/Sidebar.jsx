import React, { useState } from 'react';
import './Sidebar.css';
import { FaFolder, FaCaretDown, FaCaretRight, FaBars } from 'react-icons/fa';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);  
  const [openMenu1, setOpenMenu1] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </div>
      <h2 className="sidebar-title">{!isCollapsed && 'Меню'}</h2>
      <div className="menu">
        <div
          className="menu-header"
          onClick={() => setOpenMenu1(!openMenu1)}
        >
          <FaFolder />
          {!isCollapsed && <span>Контрагенти</span>}
          {!isCollapsed && (openMenu1 ? <FaCaretDown /> : <FaCaretRight />)}
        </div>
        {!isCollapsed && openMenu1 && (
          <ul className="submenu">
            <li className="submenu-item">Създай нов</li>
            <li className="submenu-item">Модифицирай съществуващ</li>
          </ul>
        )}
      </div>
      <div className="menu">
        <div
          className="menu-header"
          onClick={() => setOpenMenu2(!openMenu2)}
        >
          <FaFolder />
          {!isCollapsed && <span>Фактури</span>}
          {!isCollapsed && (openMenu2 ? <FaCaretDown /> : <FaCaretRight />)}
        </div>
        {!isCollapsed && openMenu2 && (
          <ul className="submenu">
            <li className="submenu-item">Създай нов</li>
            <li className="submenu-item">Модифицирай съществуващ</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

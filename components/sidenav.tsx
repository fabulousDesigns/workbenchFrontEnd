import React from "react";
import styles from "./sidenav.module.css";
import {
  Home,
  Columns4,
  ListChecks,
  CircleDashed,
  CalendarX2,
} from "lucide-react";

interface SidenavProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

const Sidenav = ({ activeMenu, setActiveMenu }: SidenavProps) => {
  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.taskButtonWrapper}>
        <button className={styles.createTaskButton}>Create Task</button>
      </div>
      <div className={styles.sideBarLinks}>
        <ul className={styles.sideBarLinksMenus}>
          <li className={styles.menus}>
            <Home size={16} className={styles.icon} />
            <a href="#" onClick={() => handleMenuClick("Home")}>
              Home
            </a>
          </li>
          <li className={styles.menus}>
            <Columns4 size={16} className={styles.icon} />
            <a href="#" onClick={() => handleMenuClick("All")}>
              All
            </a>
          </li>
          <li className={styles.menus}>
            <ListChecks size={16} className={styles.icon} />
            <a href="#" onClick={() => handleMenuClick("Completed")}>
              Completed
            </a>
          </li>
          <li className={styles.menus}>
            <CircleDashed size={16} className={styles.icon} />
            <a href="#" onClick={() => handleMenuClick("Pending")}>
              Pending
            </a>
          </li>
          <li className={styles.menus}>
            <CalendarX2 size={16} className={styles.icon} />
            <a href="#" onClick={() => handleMenuClick("Overdue")}>
              Overdue
            </a>
          </li>
        </ul>
      </div>
      <div className="footer">
        <button className={styles.logout}>logout</button>
      </div>
    </div>
  );
};

export default Sidenav;

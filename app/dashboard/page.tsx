"use client";
import {
  AllContent,
  CompletedContent,
  HomeContent,
  OverdueContent,
  PendingContent,
} from "@/components/layout";
import Sidenav from "@/components/sidenav";
import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { useRouter } from "next/navigation";

const renderContent = (activeMenu: any) => {
  switch (activeMenu) {
    case "Home":
      return <HomeContent />;
    case "All":
      return <AllContent />;
    case "Completed":
      return <CompletedContent />;
    case "Pending":
      return <PendingContent />;
    case "Overdue":
      return <OverdueContent />;
    default:
      return null;
  }
};

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState("Home");
  const router = useRouter();

  useEffect(() => {
    // Check if the access_token exists in the local storage
    const data: any = localStorage.getItem("userData");
    const userData = JSON.parse(data);
    if (!userData || !userData.access_token) {
      // Redirect to the login page if access_token is not found
      router.push("/");
    }
  }, [router]);
  return (
    <div>
      <Sidenav activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className={styles.main__wrapper}>{renderContent(activeMenu)}</div>
    </div>
  );
};

export default Dashboard;

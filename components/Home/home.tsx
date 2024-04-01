import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./home.module.css";
import UserProfilePictures from "../Profile/UserProfilePictures";
import { CircleCheckBig, PersonStanding, SquareCheck, Tag } from "lucide-react";

const HOME = () => {
  const [userTeams, setUserTeams] = useState([]);
  useEffect(() => {
    // Retrieve user data from localStorage
    const userDataString = localStorage.getItem("userData");
    const user = userDataString ? JSON.parse(userDataString) : null;

    if (user) {
      const fetchTeamTaskCounts = async () => {
        const teamTaskCounts: any = await Promise.all(
          user.teams.map(async (team: any) => {
            const [taskCountResponse, subtaskCountResponse, allUsersData] =
              await Promise.all([
                fetch(`http://localhost:4001/auth/team/task/${team.id}`),
                fetch(`http://localhost:4001/auth/team/subtask/${team.id}`),
                fetch(`http://localhost:4001/auth/team/allusers/${team.id}`),
              ]);
            const taskCount = await taskCountResponse.json();
            const subtaskCount = await subtaskCountResponse.json();
            const allUsers = await allUsersData.json();
            return { ...team, taskCount, subtaskCount, allUsers };
          })
        );
        setUserTeams(teamTaskCounts);
      };

      fetchTeamTaskCounts();
    } else {
      setUserTeams([]);
    }
  }, []);

  const getTeamBackgroundColor = (teamName: any) => {
    switch (teamName) {
      case "flip":
        return styles.boxColor4;
      case "eauqtion":
        return styles.boxColor2;
      case "pcpa":
        return styles.boxColor3;
      case "myresque":
        return styles.boxColor1;
      case "finance":
        return styles.tag2Text;
      case "operations":
        return styles.tag4Text;
      default:
        return "";
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.listTeams}>
        <p className={styles.logo}>Your Team(s)</p>
        <div className={styles.wrapperListTeams}>
          {userTeams.map((team: any) => {
            const backgroundColorClass = getTeamBackgroundColor(team.name);
            return (
              <div key={team.id} className={backgroundColorClass}>
                <div className={styles.TeamName}>
                  <span>
                    <Tag size={24} />
                  </span>
                  <span className={styles.teamname}>{team.name}</span>
                </div>
                <div className={styles.profImage}>
                  <div className={styles.prof}>
                    <PersonStanding size={24} />
                    <span>Team Members</span>
                  </div>
                  <UserProfilePictures users={team.allUsers} />
                </div>
                <div className={styles.teamTasks}>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <SquareCheck size={16} />
                    <span>Tasks: {team.taskCount}</span>
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <CircleCheckBig size={16} />
                    <span>Subtasks: {team.subtaskCount}</span>
                  </span>
                  <Link href={`/team?id=${team.id}`}>
                    <button className={styles.ViewMoreBtn}>View More</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="listProjects">
        <h5>Projects</h5>
        <div>
          <p>Project 1</p>
          <p>Project 2</p>
          <p>Project 3</p>
        </div>
      </div>
      <div className="teamMembers">
        <h2>Team Members</h2>
        <div>
          <p>Member 1</p>
          <p>Member 2</p>
          <p>Member 3</p>
        </div>
      </div>
    </div>
  );
};

export default HOME;

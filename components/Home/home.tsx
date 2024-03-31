import React from "react";
import Link from "next/link";
import styles from "./home.module.css";
const HOME = () => {
  //!--------> Retrieve user data from localStorage
  const userDataString = localStorage.getItem("userData");
  const user = userDataString ? JSON.parse(userDataString) : null;
  if (!user) {
    return <div>User data not found</div>;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.listTeams}>
        <p>Your Team(s)</p>
        <div>
          {user.teams.map((team: any) => (
            <div key={team.id}>
              <p>{team.name}</p>
              <Link href={`/team?id=${team.id}`}>
                <button>View More</button>
              </Link>
            </div>
          ))}
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

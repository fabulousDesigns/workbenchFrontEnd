"use client";
import { useSearchParams } from "next/navigation";
const TeamLayout = () => {
  const searchParams = useSearchParams();
  const teamId = searchParams.get("id");
  console.log(teamId);
  // Retrieve user data from localStorage
  const userDataString = localStorage.getItem("userData");
  const user = userDataString ? JSON.parse(userDataString) : null;
  if (!user) {
    return <div>User data not found</div>;
  }
  // Find the team with the given ID
  const team = user.teams.find(
    (team: any) => team.id === parseInt(teamId ?? "")
  );
  if (!team) {
    return <div>Team not found</div>;
  }

  return (
    <div>
      <h1>{team.name}</h1>
      {/* Render tasks, subtasks, and other data related to the team */}
    </div>
  );
};

export default TeamLayout;

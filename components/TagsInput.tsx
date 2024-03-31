import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import swal from "sweetalert";
interface TagsInputProps {
  teamz: number[];
  onTagsChange: (teams: number[]) => void;
}
const TagsInput: React.FC<TagsInputProps> = ({ teamz, onTagsChange }) => {
  const [teams, setTeams] = useState<any>([]);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("http://localhost:4001/auth/teams");
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchTeams();
  }, []);
  const handleInputKeyDown = (e: {
    key: string;
    preventDefault: () => void;
  }) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const team: any = teams.find(
        (t: { name: string | any }) =>
          t.name.toLowerCase() === inputValue.trim().toLowerCase()
      );
      if (team) {
        onTagsChange([...teamz, team.id]);
        setInputValue("");
      } else {
        swal({
          title: "warning",
          text: `The team "${inputValue.trim()}" doesn't exist.\n\nHere are the teams that exist:\n\n${teams
            .map((t: any) => `- ${t.name}`)
            .join("\n")}`,
          icon: "warning",
        });
      }
    }
  };
  const handleDeleteTag = (index: any) => {
    const newTags = [...teamz];
    newTags.splice(index, 1);
    onTagsChange(newTags);
  };
  return (
    <div className={styles.tagsInput}>
      <ul>
        {teamz.map((tag, index) => (
          <li key={index}>
            {teams.find((t: any) => t.id === tag)?.name || "Unknown"}
            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteTag(index)}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleInputKeyDown}
        placeholder="Enter team name and press enter to add it to the list"
        // required
      />
    </div>
  );
};

export default TagsInput;

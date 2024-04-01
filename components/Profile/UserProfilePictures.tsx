import React from "react";
import styles from "./UserProfilePictures.module.css";

interface UserProfilePicprops {
  users: any;
  backgroundColorClass?: string;
}

const UserProfilePictures: React.FC<UserProfilePicprops> = ({
  users,
  backgroundColorClass,
}) => {
  const MAX_PROFILE_PICTURES = 4;
  return (
    <div className={`${styles.container} ${backgroundColorClass}`}>
      {users.slice(0, MAX_PROFILE_PICTURES).map((user: any, index: any) => (
        <div
          key={user.id}
          className={`${styles.profilePicture} ${
            index === 0
              ? styles.firstPicture
              : index === 1
              ? styles.secondPicture
              : index === 2
              ? styles.thirdPicture
              : styles.fourthPicture
          } ${backgroundColorClass}`}
        >
          <span>{user.name.slice(0, 2).toUpperCase()}</span>
        </div>
      ))}
      {users.length > MAX_PROFILE_PICTURES && (
        <div
          className={`${styles.profilePicture} ${styles.fourthPicture} ${backgroundColorClass}`}
        >
          <span>+{users.length - MAX_PROFILE_PICTURES}</span>
        </div>
      )}
    </div>
  );
};

export default UserProfilePictures;

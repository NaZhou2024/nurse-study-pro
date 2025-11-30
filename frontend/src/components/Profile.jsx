import { useEffect, useState } from "react";
import { getProfile } from "../api";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    }

    loadUser();
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
}

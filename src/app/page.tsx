'use client';

import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { getUserData } from "@/lib/userData";

export default function HomePage() {
  const { user, loading } = useAuth();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (user) {
      getUserData(user.uid).then(setData);
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please log in.</p>;

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

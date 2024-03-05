import React from "react";
import { getUser } from "@/lib/utils";

const ProfilePage = async () => {
  const user = await getUser();
  return <div>{JSON.stringify(user)}</div>;
};

export default ProfilePage;

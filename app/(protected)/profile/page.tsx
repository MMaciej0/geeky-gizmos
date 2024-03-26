import React from "react";
import { getUser } from "@/lib/utils";

const ProfilePage = async () => {
  const user = await getUser();
  return (
    <div className="py-10 ">
      <div className="text-center">
        <h1 className="text-center text-3xl">Hello {user?.name}</h1>
        <p>Thank you for visitig this page.</p>
      </div>
    </div>
  );
};

export default ProfilePage;

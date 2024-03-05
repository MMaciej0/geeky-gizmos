import React from "react";

import prisma from "@/lib/prisma";

const AdminPage = async () => {
  const unapprovedProducts = await prisma.product.findMany({
    where: {
      approved: false,
    },
  });
  return (
    <div>
      {unapprovedProducts.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};

export default AdminPage;

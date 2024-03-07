import RoleGate from "@/components/RoleGate";
import { Role } from "@prisma/client";

import AdminNavbar from "./_components/AdminNavbar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <RoleGate allowedRole={Role.ADMIN}>
        <AdminNavbar />
        {children}
      </RoleGate>
    </div>
  );
}

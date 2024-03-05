import RoleGate from "@/components/RoleGate";
import { Role } from "@prisma/client";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <RoleGate allowedRole={Role.ADMIN}>{children}</RoleGate>
    </div>
  );
}

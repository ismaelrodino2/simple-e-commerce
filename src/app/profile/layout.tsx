import { ProfilePage } from "@/components/ProfilePage";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="pl-4 flex py-6 min-h-[calc(100vh-112px)]">
        <ProfilePage />
        {children}
      </div>
    </section>
  );
}

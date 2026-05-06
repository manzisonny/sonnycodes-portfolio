import Sidebar from "@/components/layout/Sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-primary min-h-screen">
      <Sidebar />
      <main className="flex-1 md:ml-[80px] min-h-screen p-6 md:p-12 pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

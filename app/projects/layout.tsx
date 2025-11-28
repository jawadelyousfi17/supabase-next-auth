import CBreadComp from "@/components/customs/CBreadComp";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
    
      {/* Main content */}
      <div className="flex-1 p-6">

        <div className="mb-4">
        <CBreadComp/>

        </div>
        {children}
      </div>
    </div>
  );
}

'use client';
import { ProjectCard } from "@/components/Projectcard"
import CBreadComp from "@/components/customs/CBreadComp";

const Page = () => {
  return (
    <div className=" space-y-2">
    
      <h1 className="text-2xl font-bold text-foreground mb-6">Projects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          projectName="E-Commerce Platform"
          projectId="PRJ-001"
          projectManager={{
            name: "Jawad Elyousfi",
            avatar: ""
          }}
          taskCount={24}
          memberCount={8}
          status="active"
          createdAt={new Date('2025-01-15')}
          onClick={() => console.log('Project clicked')}
        />

        <ProjectCard
          projectName="Mobile App Redesign"
          projectId="PRJ-002"
          projectManager={{
            name: "Sarah Johnson",
          }}
          taskCount={15}
          memberCount={5}
          status="on-hold"
          createdAt={new Date('2025-02-01')}
        />

        <ProjectCard
          projectName="API Migration"
          projectId="PRJ-003"
          projectManager={{
            name: "Mike Chen",
          }}
          taskCount={32}
          memberCount={12}
          status="completed"
          createdAt={new Date('2024-12-10')}
        />
      </div>
    </div>
  );
}

export default Page
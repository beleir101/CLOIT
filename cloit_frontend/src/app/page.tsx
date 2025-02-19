import MenuManagementComponent from "@/components/rightPart";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="flex">
      <div className="flex gap-3">
        <Sidebar />
        <MenuManagementComponent menuItems={[]} />
      </div>
    </div>
  );
}

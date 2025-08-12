import { useState, useEffect } from "react";
import type { Employee } from "@/types";
import { devLog } from "@/utils/devUtils";
import EmployeeList from "@/components/EmployeeList";
import { Button } from "@/components/ui/button";
import { PlusIcon, Trash } from "lucide-react";
import AddEmployeeModal from "@/components/AddEmployeeModal";
import { Toaster } from "@/components/ui/sonner";

const Home = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);

  const fetchEmployees = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/employees`);
    devLog(response);
    const data = await response.json();
    devLog(data);
    setEmployees(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  devLog(employees);

  const handleAddEmployee = () => {
    setIsAddEmployeeModalOpen(true);
  };

  const onEmployeeAdded = () => {
    fetchEmployees();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto py-4">
      <h1 className="text-2xl font-bold pb-4">Employee Management System</h1>
      <div className="top-actions w-full flex justify-end gap-2">
        <Button size="xs" variant="destructive">
          <Trash className="w-4 h-4" />
          Delete All
        </Button>
        <Button size="xs" onClick={handleAddEmployee}>
          <PlusIcon className="w-4 h-4" />
          Add Employee
        </Button>
      </div>
      {isLoading ? null : <EmployeeList employees={employees} />}
      {isAddEmployeeModalOpen && (
        <AddEmployeeModal
          open={isAddEmployeeModalOpen}
          onOpenChange={setIsAddEmployeeModalOpen}
          onEmployeeAdded={onEmployeeAdded}
        />
      )}
      <Toaster />
    </div>
  );
};

export default Home;

import { useState, useEffect } from "react";
import type { Employee } from "@/types";
import { devLog } from "@/utils/devUtils";
import EmployeeList from "@/components/EmployeeList";
import { Button } from "@/components/ui/button";
import { PlusIcon, Trash } from "lucide-react";
import AddEmployeeModal from "@/components/AddEmployeeModal";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

const Home = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSelectEmployee = (employeeId: string, checked: boolean) => {
    setSelectedEmployees((prev) =>
      checked ? [...prev, employeeId] : prev.filter((id) => id !== employeeId)
    );
  };

  async function fetchEmployees() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/employees`);
    devLog(response);
    const data = await response.json();
    devLog(data);
    setEmployees(data);
    setIsLoading(false);
  }

  async function deleteEmployees(employeeIds: string[]) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/delete-employees`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeIds),
      }
    );
    devLog(response);
    if (!response.ok) {
      toast.error("Failed to delete employee(s)");
      return;
    }
    toast.success("Employee(s) deleted successfully");
    updateEmployeesList();
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  devLog(employees);

  function handleAddEmployee() {
    setIsAddEmployeeModalOpen(true);
  }

  function updateEmployeesList() {
    fetchEmployees();
  }

  function handleDeleteEmployees() {
    setIsDeleteModalOpen(true);
  }

  function onDeleteConfirm() {
    deleteEmployees(selectedEmployees);
    setIsDeleteModalOpen(false);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto py-4">
      <h1 className="text-2xl font-bold pb-4">Employee Management System</h1>
      <div className="top-actions w-full flex justify-end gap-2">
        <Button
          size="xs"
          variant="destructive"
          className="disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={selectedEmployees.length === 0}
          onClick={() => handleDeleteEmployees()}
        >
          <Trash className="w-4 h-4" />
          Delete
        </Button>
        <Button size="xs" onClick={handleAddEmployee}>
          <PlusIcon className="w-4 h-4" />
          Add Employee
        </Button>
      </div>
      {isLoading ? null : (
        <EmployeeList
          employees={employees}
          selectedEmployees={selectedEmployees}
          handleSelectEmployee={handleSelectEmployee}
        />
      )}
      {isAddEmployeeModalOpen && (
        <AddEmployeeModal
          open={isAddEmployeeModalOpen}
          onOpenChange={setIsAddEmployeeModalOpen}
          onEmployeeAdded={updateEmployeesList}
        />
      )}
      {isDeleteModalOpen && selectedEmployees.length > 0 && (
        <ConfirmDeleteModal
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          confirmDelete={onDeleteConfirm}
        />
      )}
      <Toaster />
    </div>
  );
};

export default Home;

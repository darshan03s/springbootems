import { useState, useEffect } from "react";
import type { Employee } from "@/types";
import { devLog } from "@/utils/devUtils";
import EmployeeList from "@/components/EmployeeList";

const Home = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/employees`);
      devLog(response);
      const data = await response.json();
      devLog(data);
      setEmployees(data);
      setIsLoading(false);
    };
    fetchEmployees();
  }, []);

  devLog(employees);

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto py-4">
      <h1 className="text-2xl font-bold">Employee Management System</h1>
      {isLoading ? null : <EmployeeList employees={employees} />}
    </div>
  );
};

export default Home;

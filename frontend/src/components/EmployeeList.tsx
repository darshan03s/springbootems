import type { Employee } from "@/types";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";

const EmployeeList = ({
  employees,
  selectedEmployees,
  handleSelectEmployee,
  handleEditEmployee,
}: {
  employees: Employee[];
  selectedEmployees: string[];
  handleSelectEmployee: (employeeId: string, checked: boolean) => void;
  handleEditEmployee: (employee: Employee) => void;
}) => {
  return (
    <div className="w-full overflow-hidden rounded-xl border bg-background/50 shadow-sm my-2">
      <Table className="min-w-[720px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[160px] text-center">Select</TableHead>
            <TableHead className="w-[160px] text-center">Edit</TableHead>
            <TableHead className="w-[160px] text-center">Department</TableHead>
            <TableHead className="w-[140px] text-center">Employee ID</TableHead>
            <TableHead className="w-[160px] text-center">First Name</TableHead>
            <TableHead className="w-[160px] text-center">Last Name</TableHead>
            <TableHead className="w-[280px] text-center">Email</TableHead>
            <TableHead className="w-[160px] text-center">Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="text-center">
                <Checkbox
                  checked={selectedEmployees.includes(employee.id)}
                  onCheckedChange={(checked) =>
                    handleSelectEmployee(employee.id, checked as boolean)
                  }
                />
              </TableCell>
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => handleEditEmployee(employee)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
              </TableCell>
              <TableCell className="max-w-[200px] truncate text-center">
                {employee.department}
              </TableCell>
              <TableCell className="font-medium text-center">
                {employee.employeeId}
              </TableCell>
              <TableCell className="text-center">
                {employee.firstName}
              </TableCell>
              <TableCell className="text-center">{employee.lastName}</TableCell>
              <TableCell className="max-w-[280px] truncate text-center">
                {employee.email}
              </TableCell>
              <TableCell className="tabular-nums">
                {employee.phoneNumber}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeeList;

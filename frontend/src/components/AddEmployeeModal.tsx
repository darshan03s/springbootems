import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { devLog } from "@/utils/devUtils";
import { toast } from "sonner";

const employeeSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  department: z.string().min(2, "Department is required"),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

const AddEmployeeModal = ({
  open,
  onOpenChange,
  onEmployeeAdded,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEmployeeAdded: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      employeeId: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      department: "",
    },
  });

  const onSubmit = async (data: EmployeeFormData) => {
    devLog("Form data:", data);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/create-employee`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      toast.error("Failed to add employee");
      return;
    }

    const result = await response.json();
    devLog("Result:", result);
    reset();
    onOpenChange(false);
    onEmployeeAdded();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
          <DialogDescription>
            Add a new employee to the system.
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2 max-h-[70vh] overflow-y-auto hide-scrollbar p-2">
            {/* Employee ID */}
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs">Employee ID</Label>
              {errors.employeeId && (
                <p className="text-xs text-red-500">
                  {errors.employeeId.message}
                </p>
              )}
              <Input
                type="text"
                className="text-xs h-8 placeholder:text-xs"
                placeholder="Enter Employee ID"
                {...register("employeeId")}
              />
            </div>

            {/* First Name */}
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs">First Name</Label>
              {errors.firstName && (
                <p className="text-xs text-red-500">
                  {errors.firstName.message}
                </p>
              )}
              <Input
                type="text"
                className="text-xs h-8 placeholder:text-xs"
                placeholder="Enter First Name"
                {...register("firstName")}
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs">Last Name</Label>
              {errors.lastName && (
                <p className="text-xs text-red-500">
                  {errors.lastName.message}
                </p>
              )}
              <Input
                type="text"
                className="text-xs h-8 placeholder:text-xs"
                placeholder="Enter Last Name"
                {...register("lastName")}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs">Email</Label>
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
              <Input
                type="email"
                className="text-xs h-8 placeholder:text-xs"
                placeholder="Enter Email"
                {...register("email")}
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs">Phone</Label>
              {errors.phoneNumber && (
                <p className="text-xs text-red-500">
                  {errors.phoneNumber.message}
                </p>
              )}
              <Input
                type="tel"
                className="text-xs h-8 placeholder:text-xs"
                placeholder="Enter Phone"
                {...register("phoneNumber")}
              />
            </div>

            {/* Department */}
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs">Department</Label>
              {errors.department && (
                <p className="text-xs text-red-500">
                  {errors.department.message}
                </p>
              )}
              <Input
                type="text"
                className="text-xs h-8 placeholder:text-xs"
                placeholder="Enter Department"
                {...register("department")}
              />
            </div>
          </div>

          <DialogFooter>
            <Button size="xs" variant="outline" onClick={() => reset()}>
              Reset
            </Button>
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              size="xs"
              variant="outline"
            >
              Cancel
            </Button>
            <Button size="xs" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeModal;

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

const AddEmployeeModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
          <DialogDescription>
            Add a new employee to the system.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <Label>Employee ID</Label>
            <Input type="text" placeholder="Enter Employee ID" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>First Name</Label>
            <Input type="text" placeholder="Enter First Name" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Last Name</Label>
            <Input type="text" placeholder="Enter Last Name" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input type="email" placeholder="Enter Email" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Phone</Label>
            <Input type="tel" placeholder="Enter Phone" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Department</Label>
            <Input type="text" placeholder="Enter Department" />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={() => onOpenChange(false)}
            size="xs"
            variant="outline"
          >
            Cancel
          </Button>
          <Button size="xs">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeModal;

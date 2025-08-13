package com.springbootems.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.springbootems.entities.Employee;
import com.springbootems.services.EmployeeService;

@RestController
public class EmployeeController {

    private EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        try {
            return ResponseEntity.ok(employeeService.getAllEmployees());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employees not found");
        }
    }

    @GetMapping("/employees/{id}")
    public Employee getEmployeeById(@PathVariable String id) {
        try {
            return employeeService.getEmployeeById(id);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found");
        }
    }

    @PostMapping("/create-employee")
    public Employee createEmployee(@RequestBody Employee employee) {
        try {
            return employeeService.createEmployee(employee);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Employee not created");
        }
    }

    @PutMapping("/update-employee/{id}")
    public Employee updateEmployee(@PathVariable String id, @RequestBody Employee employee) {
        try {
            return employeeService.updateEmployee(id, employee);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found");
        }
    }

    @DeleteMapping("/delete-employee/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable String id) {
        try {
            employeeService.deleteEmployee(id);
            return ResponseEntity.ok("Employee deleted successfully");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found");
        }
    }

    @DeleteMapping("/delete-employees")
    public ResponseEntity<String> deleteEmployees(@RequestBody List<String> employeeIds) {
        try {
            employeeService.deleteEmployees(employeeIds);
            return ResponseEntity.ok("Employees deleted successfully");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found");
        }
    }

}

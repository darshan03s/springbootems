package com.springbootems.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springbootems.entities.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {

}

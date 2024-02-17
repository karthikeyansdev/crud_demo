import { EmployeeDetailsComponent } from './../employee-details/employee-details.component';
import { Observable } from "rxjs";
import { EmployeeService } from "./../employee.service";
import { Employee } from "./../employee";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: "app-employee-list",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  employees!: Observable<Employee[]>;

  constructor(private employeeService: EmployeeService,
    private router: Router) {}

  ngOnInit() {
    console.log("list init")
    this.reloadData();
  }

  reloadData() {
    this.employees = this.employeeService.getEmployeesList();
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  employeeDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updateEmployee(id: number){
    this.router.navigate(['update', id]);
  }
}

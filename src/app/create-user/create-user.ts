import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-user.html',
  styleUrl: './create-user.css',
})
export class CreateUser {
  
  entityTypes: any[] = [];

  model: any = {
    fullName: '',
    email: '',
    password: '',
    mobileNumber: '',
    address: '',
    description: '',
    entityType: null,
    role: 'client',      
    // entityName: '',
    confirmPassword: '' 
  };

  constructor(private router: Router, private apiCallService: ApiCallService) {}

  ngOnInit(): void {
    this.loadEntityTypes();
  }

  loadEntityTypes() {
    this.apiCallService.getEntityTypes().subscribe({
      next: (res) => {
        if (res.success) {
          this.entityTypes = res.data;
        }
      },
      error: (err) => console.error("Error loading entity types:", err)
    });
  }

  onSubmit() {
    if (this.model.password !== this.model.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const payload = {
      fullName: this.model.fullName,
      email: this.model.email,
      password: this.model.password,
      role: this.model.role,
      mobileNumber: this.model.mobileNumber,
      address: this.model.address,
      description: this.model.description,
      entityType: this.model.entityType
    };

    this.apiCallService.registerUser(payload).subscribe({
      next: (res) => {
        if (res.success) {
          alert("Client registered successfully!");
          this.router.navigate(['/open-ticket']);
        } else {
          alert(res.message || "Registration failed.");
        }
      },
      error: (err) => {
        console.error("Registration error:", err);
        alert("Error occurred while registering.");
      }
    });
  }

  onCancel() {
    this.router.navigate(['/home']);
  }
}
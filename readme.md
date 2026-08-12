# Shifty – Employee Management and Shift Scheduling System

This repository contains the client-side implementation of **Shifty**, an Employee Management and Shift Scheduling System developed as part of the **CW2 Group C Client-Side Development Project**.

## Project Overview

Shifty is a web-based employee management platform designed to make it easier for companies to manage their employees and control access to their system.

A company can create an account and receive a unique **Company ID**. Employees can then use this ID when registering and requesting access to the company. The administrator can review these requests and decide whether to approve or reject them.

The **Administrator Dashboard** is one of the main parts of Shifty. It gives managers a central place to view employee information, manage access requests and keep track of their company.

## The Problem

Many small businesses still use spreadsheets, messaging apps or manual methods to manage their employees. This can make things such as employee onboarding, communication and access management harder and more time-consuming.

We created Shifty to provide a simple solution where companies can manage employee access and basic staff information from one place.

## Administrator Dashboard

The Administrator Dashboard is designed to give managers an easy way to manage their company and employees.

From the dashboard, administrators can:

- View company information
- View the unique Company ID
- See employee access requests
- Review employee registration details
- Approve employee requests
- Reject employee requests
- Manage approved employees
- View employee information
- Monitor employee access
- Navigate between different administrator features

The dashboard brings these functions together in one interface, making the employee onboarding process easier for managers.

## Employee Access Management

A key feature of Shifty is the employee access request system.

When an employee registers using a company's unique Company ID, their request can be reviewed by the administrator.

The administrator can:

1. View the employee's request.
2. Check the submitted information.
3. Approve the employee.
4. Reject the request if the information is not suitable.
5. Allow approved employees to access the system.

This gives the company control over who is allowed to join their workspace.

## Authentication and User Roles

Shifty includes a login system that allows the application to identify different types of users.

The system supports administrators and employees, with different functionality depending on the user's role.

JavaScript is used to check the stored user information and determine the appropriate access for the logged-in user.

## Company Management

Administrators can create a company account during the registration process.

Once the company is registered, Shifty generates a unique **Company ID**. Employees can use this ID when requesting to join the company.

This provides a simple way of connecting employees with the correct company.

## Main Features

- Company registration
- Unique Company ID generation
- Employee registration
- Employee access requests
- Administrator approval and rejection
- Role-based login
- Password validation
- Administrator dashboard
- Employee management
- Responsive design
- Image slider
- Local Storage for client-side data

## Technologies Used

- **HTML** – Used to structure the website pages and content.
- **CSS** – Used for styling, layout and responsive design.
- **JavaScript** – Used for interactive features, authentication and form validation.
- **Local Storage** – Used to store information on the client side.
- **Git** – Used for version control.
- **GitHub** – Used for collaboration and project management.

## 📂 Project Layout

Here is a quick look at how our project files are organized:

```text
CW2_Grp-C_Client/
│
├── html/
│   ├── home.html
│   ├── signup.html
│   ├── login.html
│   ├── terms.html
│   ├── success.html
│   └── admin_dashboard.html
│
├── css/
│   ├── home.css
│   ├── signup.css
│   ├── login.css
│   └── admin_dashboard.css
│
├── js/
│   ├── home.js
│   ├── signup.js
│   ├── login.js
│   └── admin_dashboard.js
│
├── images/
│
├── README.md
└── .gitignore

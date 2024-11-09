# University Database Management System

## Project Description
The University Database Management System is a web application designed to manage and organize university-related data. It provides CRUD (Create, Read, Update, Delete) operations for various entities within a university, such as classrooms, departments, students, teachers, guardians, and more. This project is implemented using Node.js for the server, MySQL for the database, and EJS as the templating engine, providing a dynamic and interactive web experience.

## Technologies Used
- **Server**: Node.js
- **Database**: MySQL
- **Templating Engine**: EJS (Embedded JavaScript)
- **Libraries**:
  - **Express**: For building the server and routing.
  - **body-parser**: For parsing incoming request bodies.
  - Other related libraries to support functionality.

## Features
- **CRUD Operations**: Manage data for multiple university entities, including classrooms, departments, students, teachers, and guardians.
- **Dynamic UI**: Built using EJS for rendering dynamic HTML content.
- **Modular Structure**: Organized routes and views for easy navigation and scalability.
- **User-Friendly Interface**: Simple and intuitive web interface for data management.

## Database Schema
The MySQL database schema for this project includes the following tables:
- **classroom_types**
- **classroom**
- **department**
- **subject**
- **guardian**
- **guardian_type**
- **student**
- **student_guardian**
- **teacher**
- **school_year**
- **year_level**
- **student_year_level**
- **term**
- **period**
- **class**
- **student_class**

Refer to the `schema.sql` file for the complete table definitions and relationships.

## Installation and Setup

### Prerequisites
- **Node.js**: Install from [nodejs.org](https://nodejs.org)
- **MySQL**: Install from [mysql.com](https://www.mysql.com)

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/university-database-management.git
   cd university-database-management

Create database UniDB;
USE UniDB;

CREATE TABLE classroom_types (
    id CHAR(5) PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE classroom (
    id CHAR(4) PRIMARY KEY,
    room_type_id CHAR(5),
    room_name VARCHAR(50),
    capacity INT,
    FOREIGN KEY (room_type_id) REFERENCES classroom_types(id)
);

CREATE TABLE department (
    id CHAR(4) PRIMARY KEY,
    department_name VARCHAR(50)
);

CREATE TABLE subject (
    id CHAR(4) PRIMARY KEY,
    department_id CHAR(4),
    subject_name VARCHAR(50), 
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE guardian (
    id CHAR(4) PRIMARY KEY,
    first_name VARCHAR(15),
    last_name VARCHAR(15),
    email VARCHAR(255),
    phone_number VARCHAR(10)
);

CREATE TABLE guardian_type (
    id CHAR(5) PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE student (
    id CHAR(4) PRIMARY KEY,
    given_name VARCHAR(15),
    middle_name VARCHAR(15),
    last_name VARCHAR(15),
    date_of_birth DATE,
    gender CHAR(6),
    enrollment_date DATE
);
       
CREATE TABLE student_guardian (
    student_id CHAR(4),
    guardian_type_id CHAR(5),
    guardian_id CHAR(4),
    FOREIGN KEY (student_id) REFERENCES student(id),
    FOREIGN KEY (guardian_type_id) REFERENCES guardian_type(id),
    FOREIGN KEY (guardian_id) REFERENCES guardian(id)
);

CREATE TABLE teacher (
    id CHAR(4) PRIMARY KEY,
    first_name VARCHAR(15),
    last_name VARCHAR(15),
    gender CHAR(6),
    email VARCHAR(255),
    phone_number VARCHAR(10)
);

CREATE TABLE school_year (
    id CHAR(4) PRIMARY KEY,
    year_name VARCHAR(50),
    start_year DATE,
    end_year DATE
);

CREATE TABLE year_level (
    id CHAR(4) PRIMARY KEY,
    level_name VARCHAR(50),
    level_order INT
);
       
CREATE TABLE student_year_level (
    student_id CHAR(4),
    level_id CHAR(4),
    school_year_id CHAR(4),
    score INT,
    PRIMARY KEY (student_id, level_id, school_year_id),
    FOREIGN KEY (student_id) REFERENCES student(id),
    FOREIGN KEY (level_id) REFERENCES year_level(id),
    FOREIGN KEY (school_year_id) REFERENCES school_year(id)
);

CREATE TABLE term (
    id CHAR(4) PRIMARY KEY,
    year_id CHAR(4),
    term_name VARCHAR(50),
    term_number INT,
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (year_id) REFERENCES school_year(id)
);
       
CREATE TABLE period (
    id CHAR(4) PRIMARY KEY,
    year_id CHAR(4),
    name VARCHAR(50),
    start_time TIME,
    end_time TIME,
    FOREIGN KEY (year_id) REFERENCES school_year(id)
);
CREATE TABLE class (
    id CHAR(4) PRIMARY KEY,
    subject_id CHAR(4),
    teacher_id CHAR(4),
    term_id CHAR(4),
    start_period_id CHAR(4),
    end_period_id CHAR(4),
    classroom_id CHAR(4),
    name VARCHAR(15),
    FOREIGN KEY (subject_id) REFERENCES subject(id),
    FOREIGN KEY (teacher_id) REFERENCES teacher(id),
    FOREIGN KEY (term_id) REFERENCES term(id),
    FOREIGN KEY (start_period_id) REFERENCES period(id),
    FOREIGN KEY (end_period_id) REFERENCES period(id),
    FOREIGN KEY (classroom_id) REFERENCES classroom(id)
);

CREATE TABLE student_class (
    student_id CHAR(4),
    class_id CHAR(4),
    score CHAR(4),
    PRIMARY KEY (student_id, class_id),
    FOREIGN KEY (student_id) REFERENCES student(id),
    FOREIGN KEY (class_id) REFERENCES class(id)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'student') NOT NULL
);
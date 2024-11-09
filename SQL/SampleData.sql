-- Sample data for classroom_types
INSERT INTO classroom_types (id, name) VALUES
('CT01', 'Lecture Hall'),
('CT02', 'Laboratory'),
('CT03', 'Seminar Room');

-- Sample data for classroom
INSERT INTO classroom (id, room_type_id, room_name, capacity) VALUES
('C001', 'CT01', 'Main Lecture Hall', 100),
('C002', 'CT02', 'Chemistry Lab', 30),
('C003', 'CT03', 'Small Seminar Room', 20);

-- Sample data for department
INSERT INTO department (id, department_name) VALUES
('D001', 'Computer Science'),
('D002', 'Mathematics'),
('D003', 'Physics');

-- Sample data for subject
INSERT INTO subject (id, department_id, subject_name) VALUES
('S001', 'D001', 'Data Structures'),
('S002', 'D001', 'Algorithms'),
('S003', 'D002', 'Calculus');

-- Sample data for guardian
INSERT INTO guardian (id, first_name, last_name, email, phone_number) VALUES
('G001', 'John', 'Doe', 'john.doe@example.com', '1234567890'),
('G002', 'Jane', 'Smith', 'jane.smith@example.com', '0987654321');

-- Sample data for guardian_type
INSERT INTO guardian_type (id, name) VALUES
('GT01', 'Parent'),
('GT02', 'Guardian');

-- Sample data for student
INSERT INTO student (id, given_name, middle_name, last_name, date_of_birth, gender, enrollment_date) VALUES
('ST01', 'Alice', 'B.', 'Johnson', '2005-05-15', 'Female', '2021-09-01'),
('ST02', 'Bob', 'C.', 'Williams', '2004-03-22', 'Male', '2021-09-01');

-- Sample data for student_guardian
INSERT INTO student_guardian (student_id, guardian_type_id, guardian_id) VALUES
('ST01', 'GT01', 'G001'),
('ST02', 'GT02', 'G002');

-- Sample data for teacher
INSERT INTO teacher (id, first_name, last_name, gender, email, phone_number) VALUES
('T001', 'Emily', 'Davis', 'Female', 'emily.davis@example.com', '1112223333'),
('T002', 'Michael', 'Brown', 'Male', 'michael.brown@example.com', '4445556666');

-- Sample data for school_year
INSERT INTO school_year (id, year_name, start_year, end_year) VALUES
('SY01', '2021-2022', '2021-09-01', '2022-06-30'),
('SY02', '2022-2023', '2022-09-01', '2023-06-30');

-- Sample data for year_level
INSERT INTO year_level (id, level_name, level_order) VALUES
('YL01', 'Freshman', 1),
('YL02', 'Sophomore', 2);

-- Sample data for student_year_level
INSERT INTO student_year_level (student_id, level_id, school_year_id, score) VALUES
('ST01', 'YL01', 'SY01', 85),
('ST02', 'YL01', 'SY01', 90);

-- Sample data for term
INSERT INTO term (id, year_id, term_name, term_number, start_date, end_date) VALUES
('T01', 'SY01', 'Fall Term', 1, '2021-09-01', '2021-12-15'),
('T02', 'SY01', 'Spring Term', 2, '2022-01-10', '2022-05-15');

-- Sample data for period
INSERT INTO period (id, year_id, name, start_time, end_time) VALUES
('P01', 'SY01', 'Morning Session', '08:00:00', '12:00:00'),
('P02', 'SY01', 'Afternoon Session', '13:00:00', '17:00:00');

-- Sample data for class
INSERT INTO class (id, subject_id, teacher_id, term_id, start_period_id, end_period_id, classroom_id, name) VALUES
('CL01', 'S001', 'T001', 'T01', 'P01', 'P02', 'C001', 'DSA Class'),
('CL02', 'S002', 'T002', 'T01', 'P01', 'P02', 'C002', 'Algo Class');

-- Sample data for student_class
INSERT INTO student_class (student_id, class_id) VALUES
('ST01', 'CL01'),
('ST02', 'CL02');

INSERT INTO users (username, password, role) VALUES ('admin', 'admin123', 'admin');
INSERT INTO users (username, password, role) VALUES ('ST01', 'student123', 'student');

-- Create roles
CREATE ROLE 'admin';
CREATE ROLE 'student';     
-- Grant privileges to admin role
GRANT ALL PRIVILEGES ON UniDB.* TO 'admin';

-- Grant limited privileges to student role
GRANT SELECT, INSERT, UPDATE ON UniDB.student TO 'student';
GRANT SELECT ON UniDB.student_class TO 'student';

  
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'student') NOT NULL
);


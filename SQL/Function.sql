DELIMITER //

CREATE FUNCTION GetFullName(student_id CHAR(4))
RETURNS VARCHAR(50)
DETERMINISTIC
BEGIN
    DECLARE full_name VARCHAR(50);
    
    SELECT CONCAT(given_name, ' ', middle_name, ' ', last_name) INTO full_name
    FROM student
    WHERE id = student_id;
    
    RETURN full_name;
END; //

DELIMITER ;

DELIMITER //

CREATE FUNCTION CalculateAge(date_of_birth DATE)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE age INT;
    
    SET age = TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE());
    
    RETURN age;
END; //

DELIMITER ;


SELECT GetFullName('ST01') AS full_name; -- Replace 'ST01' with the actual student ID
SELECT CalculateAge('2000-01-01') AS age; -- Replace '2000-01-01' with the actual date of birth
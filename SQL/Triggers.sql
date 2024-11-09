DELIMITER //

CREATE TRIGGER update_student_timestamp
BEFORE UPDATE ON student
FOR EACH ROW
BEGIN
    SET NEW.last_updated = CURRENT_TIMESTAMP;
END;

//

DELIMITER ;
















DELIMITER //

-- 1. Validate Student Age and Enrollment Date
CREATE TRIGGER before_student_insert 
BEFORE INSERT ON student
FOR EACH ROW
BEGIN
    IF TIMESTAMPDIFF(YEAR, NEW.date_of_birth, CURDATE()) < 4 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Student must be at least 4 years old';
    END IF;
    
    IF NEW.enrollment_date > CURDATE() THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Enrollment date cannot be in the future';
    END IF;
END;//

-- 2. Validate Class Score Range (0-100)
CREATE TRIGGER before_student_class_score_insert
BEFORE INSERT ON student_class
FOR EACH ROW
BEGIN
    IF CAST(NEW.score AS SIGNED) < 0 OR CAST(NEW.score AS SIGNED) > 100 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Score must be between 0 and 100';
    END IF;
END;//

-- 3. Check Classroom Capacity Before Class Assignment
CREATE TRIGGER before_student_class_insert
BEFORE INSERT ON student_class
FOR EACH ROW
BEGIN
    DECLARE current_count INT;
    DECLARE room_capacity INT;
    
    -- Get current number of students in the class
    SELECT COUNT(*) INTO current_count
    FROM student_class
    WHERE class_id = NEW.class_id;
    
    -- Get classroom capacity
    SELECT c.capacity INTO room_capacity
    FROM class cl
    JOIN classroom c ON cl.classroom_id = c.id
    WHERE cl.id = NEW.class_id;
    
    IF current_count >= room_capacity THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Classroom capacity exceeded';
    END IF;
END;//

-- 4. Prevent Schedule Conflicts for Teachers
CREATE TRIGGER before_class_insert
BEFORE INSERT ON class
FOR EACH ROW
BEGIN
    DECLARE conflict_count INT;
    
    SELECT COUNT(*) INTO conflict_count
    FROM class
    WHERE teacher_id = NEW.teacher_id
    AND term_id = NEW.term_id
    AND ((start_period_id <= NEW.start_period_id AND end_period_id >= NEW.start_period_id)
    OR (start_period_id <= NEW.end_period_id AND end_period_id >= NEW.end_period_id));
    
    IF conflict_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Schedule conflict detected for teacher';
    END IF;
END;//

-- 5. Validate Period Times
CREATE TRIGGER before_period_insert
BEFORE INSERT ON period
FOR EACH ROW
BEGIN
    IF NEW.end_time <= NEW.start_time THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'End time must be after start time';
    END IF;
END;//

-- 6. Validate Term Dates
CREATE TRIGGER before_term_insert
BEFORE INSERT ON term
FOR EACH ROW
BEGIN
    DECLARE year_start DATE;
    DECLARE year_end DATE;
    
    SELECT start_year, end_year INTO year_start, year_end
    FROM school_year
    WHERE id = NEW.year_id;
    
    IF NEW.start_date < year_start OR NEW.end_date > year_end THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Term dates must be within school year dates';
    END IF;
    
    IF NEW.end_date <= NEW.start_date THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Term end date must be after start date';
    END IF;
END;//

-- 7. Audit Trail for Student Updates
CREATE TABLE student_audit (
    audit_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id CHAR(4),
    changed_field VARCHAR(50),
    old_value VARCHAR(255),
    new_value VARCHAR(255),
    change_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);//

CREATE TRIGGER after_student_update
AFTER UPDATE ON student
FOR EACH ROW
BEGIN
    IF OLD.given_name != NEW.given_name THEN
        INSERT INTO student_audit (student_id, changed_field, old_value, new_value)
        VALUES (NEW.id, 'given_name', OLD.given_name, NEW.given_name);
    END IF;
    
    IF OLD.last_name != NEW.last_name THEN
        INSERT INTO student_audit (student_id, changed_field, old_value, new_value)
        VALUES (NEW.id, 'last_name', OLD.last_name, NEW.last_name);
    END IF;
    
    -- Add other fields as needed
END;//

-- 8. Validate Guardian Email Format
CREATE TRIGGER before_guardian_insert
BEFORE INSERT ON guardian
FOR EACH ROW
BEGIN
    IF NEW.email NOT REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid email format';
    END IF;
END;//

DELIMITER ;
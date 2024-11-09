DELIMITER //

CREATE PROCEDURE GetStudentsWithGuardians()
BEGIN
    SELECT 
        s.id AS student_id,
        s.given_name,
        s.middle_name,
        s.last_name,
        g.first_name AS guardian_first_name,
        g.last_name AS guardian_last_name,
        g.email AS guardian_email,
        g.phone_number AS guardian_phone
    FROM 
        student s
    LEFT JOIN 
        student_guardian sg ON s.id = sg.student_id
    LEFT JOIN 
        guardian g ON sg.guardian_id = g.id;
END; //

DELIMITER ;


CALL GetStudentsWithGuardians();
-- register_participant_for_trip_secure.sql
-- פרוצדורה 2: רושמת משתתף לטיול בצורה מאובטחת. בודקת שגודל הקבוצה לא חרג, שהטיול מתקיים בעתיד,
-- שהמשתתף קיים ומבצעת פקודת DML (הוספה ב-REGISTERS_TO).
-- משתמשת בהסתעפויות וטיפול בחריגות (במיוחד מניעת כפל רישום).

CREATE OR REPLACE PROCEDURE register_participant_for_trip_secure(
    p_participant_id INT,
    p_trip_id INT
) AS $$
DECLARE
    v_trip_name VARCHAR(50);
    v_trip_start DATE;
    v_group_size INT;
    v_current_registrations INT;
    v_part_exists INT;
BEGIN
    -- בדיקה האם המשתתף קיים
    SELECT 1 INTO v_part_exists FROM PARTICIPANT WHERE ParticipantID = p_participant_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Participant with ID % does not exist', p_participant_id;
    END IF;
    
    -- בדיקה האם הטיול קיים ושליפת פרטים
    SELECT TripName, StartDate, GroupSize INTO v_trip_name, v_trip_start, v_group_size 
    FROM TRIP WHERE TripID = p_trip_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Trip with ID % does not exist', p_trip_id;
    END IF;
    
    -- בדיקה שמועד התחלת הטיול הוא בעתיד
    IF v_trip_start < CURRENT_DATE THEN
        RAISE EXCEPTION 'Cannot register for a trip that has already started or ended. Start Date: %', v_trip_start;
    END IF;
    
    -- בדיקת כמות המשתתפים שכבר רשומים לטיול זה
    SELECT COUNT(*) INTO v_current_registrations FROM REGISTERS_TO WHERE TripID = p_trip_id;
    
    -- בדיקה האם הגענו לקיבולת המקסימלית של הטיול (GroupSize)
    IF v_current_registrations >= v_group_size THEN
        RAISE EXCEPTION 'Trip % has reached maximum capacity of % participants', v_trip_name, v_group_size;
    END IF;
    
    -- ביצוע פקודת DML להוספת הרישום
    INSERT INTO REGISTERS_TO (ParticipantID, TripID)
    VALUES (p_participant_id, p_trip_id);
    
    RAISE NOTICE 'Successfully registered Participant % for Trip % (%)', 
        p_participant_id, p_trip_id, v_trip_name;
        
EXCEPTION
    -- טיפול בחריגת מפתח ייחודי (במידה והמשתתף כבר רשום לטיול)
    WHEN unique_violation THEN
        RAISE NOTICE 'Participant % is already registered for Trip % (Unique violation caught)', p_participant_id, p_trip_id;
    WHEN OTHERS THEN
        RAISE NOTICE 'Error in register_participant_for_trip_secure: %', SQLERRM;
        RAISE;
END;
$$ LANGUAGE plpgsql;

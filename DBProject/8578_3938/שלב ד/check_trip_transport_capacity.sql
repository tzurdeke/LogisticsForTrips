-- check_trip_transport_capacity.sql
-- פונקציה 2: בודקת האם נפח ההסעות של טיול מסוים מספיק למספר המשתתפים הרשומים.
-- משתמשת ברשומה (Record) מסוג TRIP%ROWTYPE, סמן מפורש, לולאה, הסתעפויות וטיפול בחריגות.

CREATE OR REPLACE FUNCTION check_trip_transport_capacity(p_trip_id INT)
RETURNS VARCHAR AS $$
DECLARE
    v_trip_record TRIP%ROWTYPE;
    v_participant_count INT;
    v_total_capacity INT := 0;
    v_transport_rec RECORD;
    v_result VARCHAR(200);
    
    -- סמן (Cursor) מפורש למציאת קיבולת ההסעות המשויכות לטיול
    v_transport_cursor CURSOR FOR 
        SELECT TR.Capacity 
        FROM TRIP_TRANSPORTATION TT
        JOIN TRANSPORTATION TR ON TT.TransportID = TR.TransportID
        WHERE TT.TripID = p_trip_id;
BEGIN
    -- בדיקה האם הטיול קיים (הסתעפות / תנאי)
    SELECT * INTO v_trip_record FROM TRIP WHERE TripID = p_trip_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Trip with ID % not found', p_trip_id;
    END IF;
    
    -- ספירת משתתפים רשומים בטיול (סמן משתמע)
    SELECT COUNT(*) INTO v_participant_count FROM REGISTERS_TO WHERE TripID = p_trip_id;
    
    -- שימוש בלולאה למעבר על כל ההסעות של הטיול וחישוב הקיבולת הכוללת
    OPEN v_transport_cursor;
    LOOP
        FETCH v_transport_cursor INTO v_transport_rec;
        EXIT WHEN NOT FOUND;
        v_total_capacity := v_total_capacity + v_transport_rec.Capacity;
    END LOOP;
    CLOSE v_transport_cursor;
    
    -- בדיקת התאמת הקיבולת (הסתעפויות)
    IF v_total_capacity = 0 THEN
        v_result := 'WARNING: No transportation allocated for trip: ' || v_trip_record.TripName;
    ELSIF v_total_capacity < v_participant_count THEN
        v_result := 'INSUFFICIENT CAPACITY: ' || (v_participant_count - v_total_capacity) || ' participants lack seats.';
    ELSE
        v_result := 'SUFFICIENT: Total capacity (' || v_total_capacity || ') meets or exceeds registered participants (' || v_participant_count || ').';
    END IF;
    
    RETURN v_result;
EXCEPTION
    -- טיפול בחריגות
    WHEN OTHERS THEN
        RAISE NOTICE 'Error in check_trip_transport_capacity: %', SQLERRM;
        RAISE;
END;
$$ LANGUAGE plpgsql;

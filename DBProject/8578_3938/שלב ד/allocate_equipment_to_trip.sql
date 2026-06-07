-- allocate_equipment_to_trip.sql
-- פרוצדורה 1: מקצה ציוד לטיול. בודקת זמינות מלאי ומבצעת פקודות DML (עדכון או הוספה ב-TRIP_EQUIPMENT).
-- משתמשת בהסתעפויות וטיפול בחריגות.

CREATE OR REPLACE PROCEDURE allocate_equipment_to_trip(
    p_trip_id INT,
    p_equipment_id INT,
    p_quantity INT
) AS $$
DECLARE
    v_trip_start DATE;
    v_available_stock INT;
    v_current_allocated INT;
BEGIN
    -- בדיקה האם הטיול קיים ושליפת תאריך התחלה
    SELECT StartDate INTO v_trip_start FROM TRIP WHERE TripID = p_trip_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Trip with ID % not found', p_trip_id;
    END IF;
    
    -- בדיקה האם הציוד קיים ושליפת המלאי
    SELECT TotalInStock INTO v_available_stock FROM EQUIPMENT WHERE EquipmentID = p_equipment_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Equipment with ID % not found', p_equipment_id;
    END IF;
    
    -- בדיקה שהכמות חיובית
    IF p_quantity <= 0 THEN
        RAISE EXCEPTION 'Allocation quantity must be greater than zero. Provided: %', p_quantity;
    END IF;

    -- בדיקת מלאי פשוטה
    IF v_available_stock < p_quantity THEN
        RAISE EXCEPTION 'Insufficient stock. Equipment ID: %, Available: %, Requested: %', 
            p_equipment_id, v_available_stock, p_quantity;
    END IF;
    
    -- בדיקה האם כבר יש הקצאה קיימת לטיול זה
    SELECT QuantityAllocated INTO v_current_allocated 
    FROM TRIP_EQUIPMENT 
    WHERE TripID = p_trip_id AND EquipmentID = p_equipment_id;
    
    IF FOUND THEN
        -- עדכון הקצאה קיימת (DML - UPDATE)
        UPDATE TRIP_EQUIPMENT
        SET QuantityAllocated = QuantityAllocated + p_quantity,
            Checkout_Date = v_trip_start
        WHERE TripID = p_trip_id AND EquipmentID = p_equipment_id;
        
        RAISE NOTICE 'Updated existing allocation. Added % units of Equipment % to Trip %.', 
            p_quantity, p_equipment_id, p_trip_id;
    ELSE
        -- יצירת הקצאה חדשה (DML - INSERT)
        INSERT INTO TRIP_EQUIPMENT (TripID, EquipmentID, QuantityAllocated, Checkout_Date)
        VALUES (p_trip_id, p_equipment_id, p_quantity, v_trip_start);
        
        RAISE NOTICE 'Created new allocation of % units of Equipment % to Trip %.', 
            p_quantity, p_equipment_id, p_trip_id;
    END IF;
    
EXCEPTION
    -- טיפול בשגיאות וביצוע רולבק אוטומטי במקרה של תקלה
    WHEN OTHERS THEN
        RAISE NOTICE 'Transaction aborted due to error in allocate_equipment_to_trip: %', SQLERRM;
        RAISE;
END;
$$ LANGUAGE plpgsql;

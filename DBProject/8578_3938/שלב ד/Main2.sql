-- Main2.sql
-- תוכנית ראשית 2: מזמנת את פונקציה 1 (get_available_equipment_report)
-- ואת פרוצדורה 2 (register_participant_for_trip_secure) להדגמת פעולתן.
-- כוללת שימוש בסמן משתנה (Ref Cursor), לולאת קריאה, הסתעפויות וטיפול בחריגות.

DO $$
DECLARE
    v_cursor REFCURSOR;
    v_equip_id INT;
    v_item_name VARCHAR(50);
    v_total_stock INT;
    v_allocated INT;
    v_net_available INT;
    
    v_supplier_id INT := 1;      -- מזהה ספק קיים
    v_participant_id INT := 5;   -- מזהה משתתף קיים
    v_trip_id INT := 3;          -- מזהה טיול קיים בעתיד (למשל Trip 3 מתחיל באוקטובר 2026)
BEGIN
    RAISE NOTICE '==================================================';
    RAISE NOTICE 'התחלת תוכנית ראשית 2: קריאת סמנים ורישום משתתף';
    RAISE NOTICE '==================================================';
    
    -- 1. זימון פונקציה 1 לקבלת סמן (Ref Cursor) של הציוד של הספק
    RAISE NOTICE 'שלב א: שליפת דוח ציוד עבור ספק ID %...', v_supplier_id;
    v_cursor := get_available_equipment_report(v_supplier_id);
    
    RAISE NOTICE 'הדפסת פריטי הציוד של הספק מתוך ה-Cursor:';
    LOOP
        FETCH v_cursor INTO v_equip_id, v_item_name, v_total_stock, v_allocated, v_net_available;
        EXIT WHEN NOT FOUND;
        RAISE NOTICE '  * קוד ציוד: %, שם: %, מלאי כללי: %, הוקצה: %, זמין נטו: %',
            v_equip_id, v_item_name, v_total_stock, v_allocated, v_net_available;
    END LOOP;
    CLOSE v_cursor;
    
    -- 2. זימון פרוצדורה 2 לרישום משתתף
    RAISE NOTICE 'שלב ב: רישום משתתף ID % לטיול ID %...', v_participant_id, v_trip_id;
    CALL register_participant_for_trip_secure(v_participant_id, v_trip_id);
    
    -- 3. זימון עם שגיאה בכוונה (משתתף שאינו קיים)
    BEGIN
        RAISE NOTICE 'שלב ג: ניסיון רישום משתתף לא קיים כדי להדגים שגיאה...';
        CALL register_participant_for_trip_secure(-9999, v_trip_id);
    EXCEPTION
        WHEN OTHERS THEN
            RAISE NOTICE 'נלכדה חריגה צפויה ברישום משתתף: %', SQLERRM;
    END;
    
    RAISE NOTICE '==================================================';
    RAISE NOTICE 'תוכנית ראשית 2 הסתיימה בהצלחה!';
    RAISE NOTICE '==================================================';
END $$;

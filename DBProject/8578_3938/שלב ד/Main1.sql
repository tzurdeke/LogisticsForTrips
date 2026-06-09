-- Main1.sql
-- תוכנית ראשית 1: מזמנת את פונקציה 2 (check_trip_transport_capacity)
-- ואת פרוצדורה 1 (allocate_equipment_to_trip) להדגמת פעולתן.
-- כוללת טיפול בחריגות מובנה והדפסות.

DO $$
DECLARE
    v_status VARCHAR(200);
    v_trip_id INT := 1;        -- מזהה טיול קיים
    v_equip_id INT := 2;       -- מזהה פריט ציוד קיים
    v_quantity INT := 5;       -- כמות להקצאה
BEGIN
    RAISE NOTICE '==================================================';
    RAISE NOTICE 'התחלת תוכנית ראשית 1: בדיקת הסעות והקצאת ציוד';
    RAISE NOTICE '==================================================';
    
    -- 1. זימון פונקציה 2 לבדיקת קיבולת הסעות
    RAISE NOTICE 'שלב א: בדיקת התאמת קיבולת ההסעות לטיול ID %...', v_trip_id;
    v_status := check_trip_transport_capacity(v_trip_id);
    RAISE NOTICE 'סטטוס קיבולת הסעות: %', v_status;
    
    -- 2. זימון פרוצדורה 1 להקצאת ציוד
    RAISE NOTICE 'שלב ב: הקצאת % יחידות מפריט ציוד ID % לטיול ID %...', v_quantity, v_equip_id, v_trip_id;
    CALL allocate_equipment_to_trip(v_trip_id, v_equip_id, v_quantity);
    
    -- 3. זימון פרוצדורה עם שגיאה לצורך הדגמת טיפול בחריגות (Exception Handling)
    BEGIN
        RAISE NOTICE 'שלב ג: ניסיון הקצאה של כמות מוגזמת (999999 יח) כדי להדגים שגיאה...';
        CALL allocate_equipment_to_trip(v_trip_id, v_equip_id, 999999);
    EXCEPTION
        WHEN OTHERS THEN
            RAISE NOTICE 'נלכדה חריגה צפויה בהקצאת ציוד: %', SQLERRM;
    END;

    RAISE NOTICE '==================================================';
    RAISE NOTICE 'תוכנית ראשית 1 הסתיימה בהצלחה!';
    RAISE NOTICE '==================================================';
END $$;

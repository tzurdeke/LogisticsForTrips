-- trg_audit_trip_changes.sql
-- טריגר 2 (AFTER UPDATE): מופעל לאחר עדכון בטבלת TRIP. 
-- במידה וגודל הקבוצה (GroupSize) עודכן כלפי מעלה, הטריגר בודק האם נפח ההסעות המשויך לטיול
-- עדיין מספק. אם נפח ההסעות קטן מגודל הקבוצה החדש, הטריגר רושם התראה (DML - INSERT) 
-- בטבלת logistics_warnings.

CREATE OR REPLACE FUNCTION audit_trip_changes_trigger()
RETURNS TRIGGER AS $$
DECLARE
    v_total_capacity INT := 0;
BEGIN
    -- בדיקה האם גודל הקבוצה גדל (הסתעפות / תנאי)
    IF NEW.GroupSize > OLD.GroupSize THEN
        -- חישוב סך קיבולת הרכבים שהוקצו לטיול זה
        SELECT COALESCE(SUM(TR.Capacity), 0) INTO v_total_capacity
        FROM TRIP_TRANSPORTATION TT
        JOIN TRANSPORTATION TR ON TT.TransportID = TR.TransportID
        WHERE TT.TripID = NEW.TripID;
        
        -- אם הקיבולת אינה מספיקה לגודל הקבוצה החדש - נרשום התראה בטבלת ההתראות (DML - INSERT)
        IF v_total_capacity < NEW.GroupSize THEN
            INSERT INTO logistics_warnings (TripID, WarningType, Message)
            VALUES (
                NEW.TripID, 
                'TRANSPORT_UNDER_CAPACITY',
                'Trip group size increased from ' || OLD.GroupSize || ' to ' || NEW.GroupSize || 
                ', which exceeds current allocated transportation capacity of ' || v_total_capacity || ' seats.'
            );
            RAISE NOTICE 'AUDIT: Logistics warning logged for Trip % (GroupSize % exceeds transport capacity %)', 
                NEW.TripID, NEW.GroupSize, v_total_capacity;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- יצירת הטריגר על טבלת TRIP
DROP TRIGGER IF EXISTS trg_audit_trip_changes ON TRIP;
CREATE TRIGGER trg_audit_trip_changes
AFTER UPDATE ON TRIP
FOR EACH ROW
EXECUTE FUNCTION audit_trip_changes_trigger();

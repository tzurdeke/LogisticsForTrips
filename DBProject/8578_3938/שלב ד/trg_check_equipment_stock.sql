-- trg_check_equipment_stock.sql
-- טריגר 1 (BEFORE INSERT OR UPDATE): מוודא שסך ההקצאות הפעילות (שטרם הוחזרו - Return_Date IS NULL)
-- של פריט ציוד מסוים אינו עולה על המלאי הכולל של אותו ציוד בטבלת EQUIPMENT.
-- מונע את פקודת ה-DML וזורק חריגה (Exception) במידה ויש חריגה מהמלאי.

CREATE OR REPLACE FUNCTION check_equipment_stock_trigger()
RETURNS TRIGGER AS $$
DECLARE
    v_total_stock INT;
    v_allocated_active INT;
BEGIN
    -- שליפת המלאי הכולל של הציוד מתוך טבלת EQUIPMENT
    SELECT TotalInStock INTO v_total_stock FROM EQUIPMENT WHERE EquipmentID = NEW.EquipmentID;
    
    -- חישוב סך ההקצאות הפעילות (שטרם הוחזרו) של אותו פריט ציוד (בנטרול השורה הנוכחית במידה וזה עדכון)
    SELECT COALESCE(SUM(QuantityAllocated), 0) INTO v_allocated_active
    FROM TRIP_EQUIPMENT
    WHERE EquipmentID = NEW.EquipmentID 
      AND Return_Date IS NULL
      AND TripID != NEW.TripID;
      
    -- אם ההקצאה הנוכחית פעילה (תאריך החזרה ריק), נוסיף אותה לחישוב
    IF NEW.Return_Date IS NULL THEN
        v_allocated_active := v_allocated_active + NEW.QuantityAllocated;
    END IF;
    
    -- אם סך ההקצאות הפעילות גדול מהמלאי הזמין - נזרוק חריגה ונמנע את העדכון/הכנסה
    IF v_allocated_active > v_total_stock THEN
        RAISE EXCEPTION 'Cannot allocate % units of Equipment ID %. Total stock is %, while active allocations would reach %.', 
            NEW.QuantityAllocated, NEW.EquipmentID, v_total_stock, v_allocated_active;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- יצירת הטריגר על טבלת TRIP_EQUIPMENT
DROP TRIGGER IF EXISTS trg_check_equipment_stock ON TRIP_EQUIPMENT;
CREATE TRIGGER trg_check_equipment_stock
BEFORE INSERT OR UPDATE ON TRIP_EQUIPMENT
FOR EACH ROW
EXECUTE FUNCTION check_equipment_stock_trigger();

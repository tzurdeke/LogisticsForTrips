-- get_available_equipment_report.sql
-- פונקציה 1: מחזירה Ref Cursor (סמן מפורש) המציג את דוח הציוד של ספק מסוים,
-- כולל המלאי הכולל, הכמות שהוקצתה לטיולים פעילים, והמלאי הנטו הזמין כעת.

CREATE OR REPLACE FUNCTION get_available_equipment_report(p_supplier_id INT)
RETURNS REFCURSOR AS $$
DECLARE
    v_supplier_name VARCHAR(50);
    ref_cursor REFCURSOR := 'equipment_cursor';
BEGIN
    -- בדיקה האם הספק קיים במערכת (הסתעפות / תנאי)
    SELECT Company_Name INTO v_supplier_name FROM SUPPLIER WHERE SupplierID = p_supplier_id;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Supplier with ID % not found', p_supplier_id;
    END IF;
    
    -- פתיחת סמן (Cursor) מפורש להחזרה
    OPEN ref_cursor FOR
        SELECT 
            E.EquipmentID,
            E.ItemName,
            E.TotalInStock,
            COALESCE(SUM(TE.QuantityAllocated), 0) AS TotalAllocated,
            E.TotalInStock - COALESCE(SUM(TE.QuantityAllocated), 0) AS NetAvailable
        FROM EQUIPMENT E
        LEFT JOIN TRIP_EQUIPMENT TE ON E.EquipmentID = TE.EquipmentID AND TE.Return_Date IS NULL
        WHERE E.SupplierID = p_supplier_id
        GROUP BY E.EquipmentID, E.ItemName, E.TotalInStock;
        
    RETURN ref_cursor;
EXCEPTION
    -- טיפול בשגיאות
    WHEN OTHERS THEN
        RAISE NOTICE 'Error in get_available_equipment_report: %', SQLERRM;
        RAISE;
END;
$$ LANGUAGE plpgsql;

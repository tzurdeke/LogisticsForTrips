-- ==============================================
-- PART 1: ROLLBACK & COMMIT DEMONSTRATION
-- ==============================================

-- === ROLLBACK DEMO ===
-- שלב 1: צילום מסך ראשון - מראה את הנתונים לפני המחיקה
SELECT * FROM EQUIPMENT WHERE TotalInStock <= 15 AND EquipmentID NOT IN (SELECT EquipmentID FROM TRIP_EQUIPMENT);

-- שלב 2: התחלת טרנזקציה ומחיקה
BEGIN;
DELETE FROM EQUIPMENT WHERE TotalInStock <= 15 AND EquipmentID NOT IN (SELECT EquipmentID FROM TRIP_EQUIPMENT);

-- שלב 3: צילום מסך שני - מראה שהטבלה ריקה (הנתונים נמחקו זמנית)
SELECT * FROM EQUIPMENT WHERE TotalInStock <= 15 AND EquipmentID NOT IN (SELECT EquipmentID FROM TRIP_EQUIPMENT);

-- שלב 4: ביטול הפעולה
ROLLBACK;

-- שלב 5: צילום מסך שלישי - מראה שהנתונים חזרו
SELECT * FROM EQUIPMENT WHERE TotalInStock <= 15 AND EquipmentID NOT IN (SELECT EquipmentID FROM TRIP_EQUIPMENT);


-- === COMMIT DEMO ===
-- שלב 1: צילום מסך ראשון - הנתונים המקוריים
SELECT * FROM TRIP WHERE EXTRACT(YEAR FROM StartDate) = 2026 AND EXTRACT(MONTH FROM StartDate) = 10;

-- שלב 2: התחלת טרנזקציה וביצוע עדכון
BEGIN;
UPDATE TRIP SET GroupSize = ROUND(GroupSize * 1.10) WHERE EXTRACT(YEAR FROM StartDate) = 2026 AND EXTRACT(MONTH FROM StartDate) = 10;

-- שלב 3: צילום מסך שני - מראה שהמספרים גדלו
SELECT * FROM TRIP WHERE EXTRACT(YEAR FROM StartDate) = 2026 AND EXTRACT(MONTH FROM StartDate) = 10;

-- שלב 4: שמירה סופית
COMMIT;

-- שלב 5: צילום מסך שלישי - מראה שהנתונים נשארו מעודכנים גם אחרי השמירה
SELECT * FROM TRIP WHERE EXTRACT(YEAR FROM StartDate) = 2026 AND EXTRACT(MONTH FROM StartDate) = 10;

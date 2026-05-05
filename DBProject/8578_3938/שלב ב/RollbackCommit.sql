-- ==============================================
-- PART 1: ROLLBACK & COMMIT DEMONSTRATION
-- ==============================================

-- === ROLLBACK DEMO (Using Delete 1 from Queries.sql) ===
-- Step 1: First screenshot - show data before deletion
SELECT * FROM EQUIPMENT WHERE TotalInStock <= 15 AND EquipmentID NOT IN (SELECT EquipmentID FROM TRIP_EQUIPMENT);

-- Step 2: Begin transaction and execute delete
BEGIN;
DELETE FROM EQUIPMENT WHERE TotalInStock <= 15 AND EquipmentID NOT IN (SELECT EquipmentID FROM TRIP_EQUIPMENT);

-- Step 3: Second screenshot - show table is temporarily empty
SELECT * FROM EQUIPMENT WHERE TotalInStock <= 15 AND EquipmentID NOT IN (SELECT EquipmentID FROM TRIP_EQUIPMENT);

-- Step 4: Rollback the transaction
ROLLBACK;

-- Step 5: Third screenshot - show data has been restored
SELECT * FROM EQUIPMENT WHERE TotalInStock <= 15 AND EquipmentID NOT IN (SELECT EquipmentID FROM TRIP_EQUIPMENT);


-- === COMMIT DEMO (Using Update 2 from Queries.sql) ===
-- Step 1: First screenshot - show original data
SELECT * FROM TRIP WHERE EXTRACT(YEAR FROM StartDate) = 2026 AND EXTRACT(MONTH FROM StartDate) = 5;

-- Step 2: Begin transaction and execute update
BEGIN;
UPDATE TRIP SET GroupSize = ROUND(GroupSize * 1.10) WHERE EXTRACT(YEAR FROM StartDate) = 2026 AND EXTRACT(MONTH FROM StartDate) = 5;

-- Step 3: Second screenshot - show the updated numbers
SELECT * FROM TRIP WHERE EXTRACT(YEAR FROM StartDate) = 2026 AND EXTRACT(MONTH FROM StartDate) = 5;

-- Step 4: Commit the transaction to save changes
COMMIT;

-- Step 5: Third screenshot - show data remains updated after commit
SELECT * FROM TRIP WHERE EXTRACT(YEAR FROM StartDate) = 2026 AND EXTRACT(MONTH FROM StartDate) = 5;

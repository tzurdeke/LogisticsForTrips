-- ==========================================
-- SELECT QUERIES
-- ==========================================

-- Query 1 (Way 1): Find participants registered for trips starting in summer 2026.
-- Method 1: Using JOIN. Modern SQL engines optimize these queries well.
SELECT P.ParticipantID, P.FirstName, P.LastName, P.Email, T.TripName, 
       EXTRACT(DAY FROM T.StartDate) AS StartDay, 
       EXTRACT(MONTH FROM T.StartDate) AS StartMonth, 
       EXTRACT(YEAR FROM T.StartDate) AS StartYear
FROM PARTICIPANT P
JOIN REGISTERS_TO R ON P.ParticipantID = R.ParticipantID
JOIN TRIP T ON R.TripID = T.TripID
WHERE EXTRACT(YEAR FROM T.StartDate) = 2026 
  AND EXTRACT(MONTH FROM T.StartDate) IN (6, 7, 8)
ORDER BY T.StartDate, P.LastName;

-- Query 1 (Way 2): Same query using a subquery with IN.
-- Efficiency note: IN subqueries might be less efficient in older engines.
-- Additionally, we cannot select columns from the TRIP table in the final output.
SELECT P.ParticipantID, P.FirstName, P.LastName, P.Email
FROM PARTICIPANT P
WHERE P.ParticipantID IN (
    SELECT R.ParticipantID
    FROM REGISTERS_TO R
    JOIN TRIP T ON R.TripID = T.TripID
    WHERE EXTRACT(YEAR FROM T.StartDate) = 2026 
      AND EXTRACT(MONTH FROM T.StartDate) IN (6, 7, 8)
)
ORDER BY P.LastName;


-- Query 2 (Way 1): Total equipment allocated per trip, only for trips with >5 items.
-- Method 1: JOIN followed by GROUP BY and HAVING.
SELECT T.TripName, 
       EXTRACT(YEAR FROM T.StartDate) AS TripYear, 
       SUM(TE.QuantityAllocated) AS TotalEquipment
FROM TRIP T
JOIN TRIP_EQUIPMENT TE ON T.TripID = TE.TripID
GROUP BY T.TripID, T.TripName, EXTRACT(YEAR FROM T.StartDate)
HAVING SUM(TE.QuantityAllocated) > 5
ORDER BY TotalEquipment DESC;

-- Query 2 (Way 2): Same query using a Derived Table in the FROM clause.
-- Efficiency note: Grouping before joining can significantly reduce the number of rows to merge,
-- which might be faster if the HAVING clause filters out many rows early on.
SELECT T.TripName, 
       EXTRACT(YEAR FROM T.StartDate) AS TripYear, 
       AggTE.TotalEquipment
FROM TRIP T
JOIN (
    SELECT TripID, SUM(QuantityAllocated) AS TotalEquipment
    FROM TRIP_EQUIPMENT
    GROUP BY TripID
    HAVING SUM(QuantityAllocated) > 5
) AggTE ON T.TripID = AggTE.TripID
ORDER BY TotalEquipment DESC;


-- Query 3 (Way 1): Find suppliers providing both transportation and equipment.
-- Method 1: Using EXISTS.
SELECT S.SupplierID, S.Company_Name, S.ContactPhone, S.Service_Type
FROM SUPPLIER S
WHERE EXISTS (
    SELECT 1 FROM TRANSPORTATION TR WHERE TR.SupplierID = S.SupplierID
)
AND EXISTS (
    SELECT 1 FROM EQUIPMENT EQ WHERE EQ.SupplierID = S.SupplierID
);

-- Query 3 (Way 2): Same query using INTERSECT.
-- Efficiency note: EXISTS uses short-circuit evaluation making it very fast.
-- INTERSECT requires evaluating both tables fully and computing the intersection, which is heavier.
SELECT S.SupplierID, S.Company_Name, S.ContactPhone, S.Service_Type
FROM SUPPLIER S
WHERE S.SupplierID IN (
    SELECT SupplierID FROM TRANSPORTATION
    INTERSECT
    SELECT SupplierID FROM EQUIPMENT
);


-- Query 4 (Way 1): Details of the trip with the highest number of participants.
-- Method 1: Sorting and LIMIT 1.
SELECT T.TripName, T.Trip_Type, 
       EXTRACT(DAY FROM T.StartDate) AS StartDay,
       EXTRACT(MONTH FROM T.StartDate) AS StartMonth,
       EXTRACT(YEAR FROM T.StartDate) AS StartYear,
       COUNT(R.ParticipantID) AS NumParticipants
FROM TRIP T
JOIN REGISTERS_TO R ON T.TripID = R.TripID
GROUP BY T.TripID, T.TripName, T.Trip_Type, T.StartDate
ORDER BY NumParticipants DESC
LIMIT 1;

-- Query 4 (Way 2): Same query using a nested subquery with ALL.
-- Efficiency note: ORDER BY and LIMIT is much faster as it requires only one pass.
-- Using ALL requires computing the COUNT function twice (outer and inner), which is very slow.
SELECT T.TripName, T.Trip_Type, 
       EXTRACT(DAY FROM T.StartDate) AS StartDay,
       EXTRACT(MONTH FROM T.StartDate) AS StartMonth,
       EXTRACT(YEAR FROM T.StartDate) AS StartYear,
       COUNT(R.ParticipantID) AS NumParticipants
FROM TRIP T
JOIN REGISTERS_TO R ON T.TripID = R.TripID
GROUP BY T.TripID, T.TripName, T.Trip_Type, T.StartDate
HAVING COUNT(R.ParticipantID) >= ALL (
    SELECT COUNT(ParticipantID)
    FROM REGISTERS_TO
    GROUP BY TripID
);


-- Query 5: Full itinerary (Location, Address, Order) for 'Adventure' trips, ordered by arrival.
-- Complex query joining 3 tables.
SELECT T.TripName, L.LocationName, L.Region, L.Address, LT.Location_order,
       EXTRACT(DAY FROM T.StartDate) AS StartDay,
       EXTRACT(MONTH FROM T.StartDate) AS StartMonth,
       EXTRACT(YEAR FROM T.StartDate) AS StartYear
FROM TRIP T
JOIN Location_Trip LT ON T.TripID = LT.TripID
JOIN LOCATION L ON LT.LocationID = L.LocationID
WHERE T.Trip_Type = 'Adventure'
ORDER BY T.TripID, LT.Location_order;


-- Query 6: Find adult participants (18+) with unreturned equipment from past trips.
-- Joins 5 tables and uses date extraction.
SELECT P.FirstName, P.LastName, P.Phone, T.TripName, EQ.ItemName, TE.Checkout_Date
FROM PARTICIPANT P
JOIN REGISTERS_TO R ON P.ParticipantID = R.ParticipantID
JOIN TRIP T ON R.TripID = T.TripID
JOIN TRIP_EQUIPMENT TE ON T.TripID = TE.TripID
JOIN EQUIPMENT EQ ON TE.EquipmentID = EQ.EquipmentID
WHERE EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM P.birthday) >= 18
  AND TE.Return_Date IS NULL
  AND T.EndDate < CURRENT_DATE;


-- Query 7: Monthly report - Year, Month, number of trips starting, and average group size.
SELECT EXTRACT(YEAR FROM StartDate) AS TripYear,
       EXTRACT(MONTH FROM StartDate) AS TripMonth,
       COUNT(TripID) AS NumberOfTrips,
       ROUND(AVG(GroupSize), 2) AS AverageGroupSize
FROM TRIP
GROUP BY EXTRACT(YEAR FROM StartDate), EXTRACT(MONTH FROM StartDate)
ORDER BY TripYear DESC, TripMonth DESC;


-- Query 8: Top 3 most popular locations by trip count, with total unique participants visiting.
SELECT L.LocationName, L.Region, 
       COUNT(DISTINCT LT.TripID) AS TripsVisiting,
       COUNT(DISTINCT R.ParticipantID) AS TotalParticipants
FROM LOCATION L
JOIN Location_Trip LT ON L.LocationID = LT.LocationID
JOIN REGISTERS_TO R ON LT.TripID = R.TripID
GROUP BY L.LocationID, L.LocationName, L.Region
ORDER BY TripsVisiting DESC, TotalParticipants DESC
LIMIT 3;


-- ==========================================
-- UPDATE QUERIES
-- ==========================================

-- Update 1: Set Return_Date to Trip EndDate for past trips where equipment is unreturned.
-- (Pre-check test query)
SELECT * FROM TRIP_EQUIPMENT WHERE Return_Date IS NULL AND EXISTS (SELECT 1 FROM TRIP WHERE TRIP.TripID = TRIP_EQUIPMENT.TripID AND EndDate < CURRENT_DATE AND EndDate >= '2025-01-01');

-- (Execute Update)
UPDATE TRIP_EQUIPMENT
SET Return_Date = (SELECT EndDate FROM TRIP WHERE TRIP.TripID = TRIP_EQUIPMENT.TripID)
WHERE Return_Date IS NULL 
  AND EXISTS (
      SELECT 1 FROM TRIP 
      WHERE TRIP.TripID = TRIP_EQUIPMENT.TripID 
        AND EndDate < CURRENT_DATE
        AND EndDate >= '2025-01-01'
  );

-- Update 2: Increase GroupSize by 10% for all trips occurring in May 2026.
UPDATE TRIP
SET GroupSize = ROUND(GroupSize * 1.10)
WHERE EXTRACT(YEAR FROM StartDate) = 2026 
  AND EXTRACT(MONTH FROM StartDate) = 5;

-- Update 3: Append ' - Popular' to Location Description in the North if visited by >3 trips.
UPDATE LOCATION
SET Description = CONCAT(COALESCE(Description, ''), ' - Popular')
WHERE Region = 'North' 
  AND LocationID IN (
      SELECT LocationID 
      FROM Location_Trip 
      GROUP BY LocationID 
      HAVING COUNT(TripID) > 3
  );


-- ==========================================
-- DELETE QUERIES
-- ==========================================

-- Delete 1: Delete unused equipment with low stock (<= 15) that was never allocated.
-- (Pre-check test query)
SELECT * FROM EQUIPMENT WHERE TotalInStock <= 15 AND EquipmentID NOT IN (SELECT EquipmentID FROM TRIP_EQUIPMENT);

-- (Execute Delete)
DELETE FROM EQUIPMENT
WHERE TotalInStock <= 15 
  AND EquipmentID NOT IN (SELECT EquipmentID FROM TRIP_EQUIPMENT);


-- Delete 2: Delete registrations for 'Extreme' trips occurring in 2024.
-- (Pre-check test query)
SELECT * FROM REGISTERS_TO WHERE TripID IN (SELECT TripID FROM TRIP WHERE Trip_Type = 'Extreme' AND EXTRACT(YEAR FROM StartDate) = 2024);

-- (Execute Delete)
DELETE FROM REGISTERS_TO
WHERE TripID IN (
    SELECT TripID FROM TRIP 
    WHERE Trip_Type = 'Extreme' 
      AND EXTRACT(YEAR FROM StartDate) = 2024
);


-- Delete 3: Delete old transportation records for trips that already arrived.
-- (Pre-check test query)
SELECT * FROM TRIP_TRANSPORTATION WHERE Arrival_Date_Time < CURRENT_TIMESTAMP;

-- (Execute Delete)
DELETE FROM TRIP_TRANSPORTATION
WHERE Arrival_Date_Time < CURRENT_TIMESTAMP;

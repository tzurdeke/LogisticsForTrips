-- ==============================================
-- PART 3: INDEXES (אינדקסים)
-- ==============================================

-- *** אינדקס 1: על אזור המיקום (Region) ***
-- להריץ לפני בניית האינדקס ולצלם זמנים:
SELECT L.LocationName, L.Region, COUNT(DISTINCT LT.TripID) 
FROM LOCATION L JOIN Location_Trip LT ON L.LocationID = LT.LocationID 
WHERE L.Region = 'North' 
GROUP BY L.LocationID, L.LocationName, L.Region;

CREATE INDEX idx_location_region ON LOCATION(Region);
-- להריץ שוב את השאילתה מלמעלה ולצלם זמנים!


-- *** אינדקס 2: על שם משפחה של משתתפים ***
-- להריץ לפני בניית האינדקס ולצלם זמנים:
SELECT * FROM PARTICIPANT WHERE LastName LIKE 'S%';

CREATE INDEX idx_participant_lastname ON PARTICIPANT(LastName);
-- להריץ שוב את השאילתה מלמעלה ולצלם זמנים!


-- *** אינדקס 3: על תאריך התחלת טיול ***
-- להריץ לפני בניית האינדקס ולצלם זמנים:
SELECT * FROM TRIP WHERE StartDate >= '2025-01-01' AND StartDate <= '2025-12-31';

CREATE INDEX idx_trip_startdate ON TRIP(StartDate);
-- להריץ שוב את השאילתה מלמעלה ולצלם זמנים!

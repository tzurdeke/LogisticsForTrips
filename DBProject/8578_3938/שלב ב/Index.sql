-- ==============================================
-- PART 3: INDEXES
-- ==============================================

-- *** Index 1: On Location Region ***
-- Run this query before and after creating the index to compare execution times:
SELECT L.LocationName, L.Region, COUNT(DISTINCT LT.TripID) 
FROM LOCATION L JOIN Location_Trip LT ON L.LocationID = LT.LocationID 
WHERE L.Region = 'North' 
GROUP BY L.LocationID, L.LocationName, L.Region;

CREATE INDEX idx_location_region ON LOCATION(Region);


-- *** Index 2: On Participant Last Name ***
-- Run this query before and after creating the index to compare execution times:
SELECT * FROM PARTICIPANT WHERE LastName LIKE 'P%';

CREATE INDEX idx_participant_lastname ON PARTICIPANT(LastName);


-- *** Index 3: On Trip Start Date ***
-- Run this query before and after creating the index to compare execution times:
SELECT * FROM TRIP WHERE StartDate >= '2025-01-01' AND StartDate <= '2025-12-31';

CREATE INDEX idx_trip_startdate ON TRIP(StartDate);


-- ==============================================
-- DROP INDEX COMMANDS (For resetting the tests)
-- ==============================================
-- If you need to reset the state and run the tests again, run these commands:
-- DROP INDEX idx_location_region;
-- DROP INDEX idx_participant_lastname;
-- DROP INDEX idx_trip_startdate;

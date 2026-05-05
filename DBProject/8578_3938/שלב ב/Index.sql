-- ==============================================
-- PART 3: INDEXES
-- ==============================================

-- Index 1: On Location Region
-- Optimizes queries filtering or grouping by Region (e.g., Query 8, Update 3).
-- (Run Query 8 before and after creating this index to see performance improvement).

-- Check performance BEFORE index:
SELECT * FROM LOCATION WHERE Region = 'North';

CREATE INDEX idx_location_region ON LOCATION(Region);

-- Check performance AFTER index:
SELECT * FROM LOCATION WHERE Region = 'North';


-- Index 2: On Participant Last Name
-- Optimizes queries sorting or searching by LastName (e.g., Query 1).

-- Check performance BEFORE index:
SELECT * FROM PARTICIPANT WHERE LastName = 'Cohen';

CREATE INDEX idx_participant_lastname ON PARTICIPANT(LastName);

-- Check performance AFTER index:
SELECT * FROM PARTICIPANT WHERE LastName = 'Cohen';


-- Index 3: On Trip Start Date
-- Optimizes queries filtering or grouping by StartDate (e.g., Query 1, Query 4, Query 7).

-- Check performance BEFORE index:
SELECT * FROM TRIP WHERE StartDate >= '2025-01-01' AND StartDate <= '2025-12-31';

CREATE INDEX idx_trip_startdate ON TRIP(StartDate);

-- Check performance AFTER index:
SELECT * FROM TRIP WHERE StartDate >= '2025-01-01' AND StartDate <= '2025-12-31';

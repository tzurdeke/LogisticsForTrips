/* 
====================================================================
  Fault-Tolerant Integration Script (Final Version!)
  Merges our database schema and data with the peer group's database.
  Adds an offset of 1,000,000 to their identifiers to prevent PK conflicts,
  and seamlessly adjusts foreign keys and table structure.
====================================================================
*/

-- =================================================================
-- Step 1: Temporary renaming of our shared tables
-- Prevents name conflicts when loading the backup of the second group
-- =================================================================

ALTER TABLE IF EXISTS PARTICIPANT RENAME TO our_participant;
ALTER TABLE IF EXISTS TRIP RENAME TO our_trip;
ALTER TABLE IF EXISTS LOCATION RENAME TO our_location;

-- =================================================================
-- Step 2: Adjusting the structure of our original tables
-- Adding missing columns, expanding VARCHAR lengths and dropping constraints to prevent errors
-- =================================================================

-- 1. Adjusting PARTICIPANT:
ALTER TABLE our_participant ADD COLUMN IF NOT EXISTS Age INT CHECK (Age > 0);
ALTER TABLE our_participant ALTER COLUMN birthday DROP NOT NULL; -- peer group participant has no birthday
ALTER TABLE our_participant ALTER COLUMN Phone DROP NOT NULL;    -- phone is optional in peer group
ALTER TABLE our_participant ALTER COLUMN Email TYPE VARCHAR(100); -- expand length to prevent overflow errors

-- 2. Adjusting TRIP:
ALTER TABLE our_trip ADD COLUMN IF NOT EXISTS GuideId INT;       -- foreign key to guide
ALTER TABLE our_trip ALTER COLUMN Trip_Type DROP NOT NULL;        -- peer group trip has no trip type in this field
ALTER TABLE our_trip ALTER COLUMN Trip_Type TYPE VARCHAR(50);     -- expand to match peer backup (triptype VARCHAR(50))

-- [At this point, run the backup script of the peer group that creates their tables:
-- participant, trip, location, guide, "GROUP", event, eventregistration, participantgroup, grouptrip]

-- =================================================================
-- Step 3: Copying their data to our tables with a 1,000,000 offset
-- =================================================================

-- 1. Copy participants (handling email uniqueness by adding '_peer' suffix)
INSERT INTO our_participant (ParticipantID, FirstName, LastName, Phone, Email, birthday, Age)
SELECT 
  participantid + 1000000, 
  firstname, 
  lastname, 
  phone, 
  CASE 
    WHEN email LIKE '%@%' THEN REPLACE(email, '@', '_peer@')
    ELSE email || '_peer'
  END, 
  NULL, -- peer has no birthday data
  age
FROM participant;

-- 2. Copy locations
INSERT INTO our_location (LocationID, LocationName, Region, Address, Description)
SELECT 
  locationid + 1000000, 
  locationname, 
  region, 
  address, 
  description
FROM location;

-- 3. Copy trips (copying their triptype to our Trip_Type)
INSERT INTO our_trip (TripID, TripName, StartDate, EndDate, GroupSize, Trip_Type, GuideId)
SELECT 
  tripid + 1000000, 
  tripname, 
  startdate, 
  enddate, 
  1,        -- default group size value
  triptype, -- trip type from peer table
  guideid
FROM trip;

-- =================================================================
-- Step 4: Dropping the duplicate source tables (CASCADE will remove old FK constraints)
-- =================================================================

DROP TABLE IF EXISTS participant CASCADE;
DROP TABLE IF EXISTS trip CASCADE;
DROP TABLE IF EXISTS location CASCADE;

-- =================================================================
-- Step 5: Updating foreign keys in their child tables to match the 1,000,000 offset
-- =================================================================

-- 1. Update event table
UPDATE event SET tripid = tripid + 1000000 WHERE tripid IS NOT NULL;
UPDATE event SET locationid = locationid + 1000000;

-- 2. Update participantgroup table
UPDATE participantgroup SET participantid = participantid + 1000000;

-- 3. Update grouptrip table
UPDATE grouptrip SET tripid = tripid + 1000000;

-- =================================================================
-- Step 6: Recreating foreign key constraints pointing to our merged tables
-- =================================================================

-- 1. Link events to the merged trip and location tables
ALTER TABLE event ADD CONSTRAINT fk_event_our_trip FOREIGN KEY (tripid) REFERENCES our_trip(TripID);
ALTER TABLE event ADD CONSTRAINT fk_event_our_location FOREIGN KEY (locationid) REFERENCES our_location(LocationID);

-- 2. Link participantgroup foreign keys
ALTER TABLE participantgroup ADD CONSTRAINT fk_pg_our_participant FOREIGN KEY (participantid) REFERENCES our_participant(ParticipantID);
ALTER TABLE participantgroup ADD CONSTRAINT fk_pg_group FOREIGN KEY (groupid) REFERENCES "GROUP"(groupid);

-- 3. Link grouptrip foreign keys
ALTER TABLE grouptrip ADD CONSTRAINT fk_gt_group FOREIGN KEY (groupid) REFERENCES "GROUP"(groupid);
ALTER TABLE grouptrip ADD CONSTRAINT fk_gt_trip FOREIGN KEY (tripid) REFERENCES our_trip(TripID);

-- 4. Link merged trips to guides
ALTER TABLE our_trip ADD CONSTRAINT fk_trip_guide FOREIGN KEY (GuideId) REFERENCES guide(guideid);

-- =================================================================
-- Step 7: Renaming the shared tables back to their original names
-- =================================================================

ALTER TABLE our_trip RENAME TO TRIP;
ALTER TABLE our_participant RENAME TO PARTICIPANT;
ALTER TABLE our_location RENAME TO LOCATION;

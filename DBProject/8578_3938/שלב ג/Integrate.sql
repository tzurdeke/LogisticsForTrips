/*
====================================================================
  סקריפט אינטגרציה חסין-שגיאות (גרסה סופית!)
  ממזג את בסיס הנתונים שלנו עם הנתונים של הקבוצה השנייה.
  מוסיף הזחה (Offset) של 1,000,000 למזהים שלהן כדי למנוע התנגשויות מפתחות,
  ומתאים את המבנה והמפתחות הזרים בצורה חלקה.
====================================================================
*/

-- =================================================================
-- שלב 1: שינוי זמני של שמות הטבלאות המשותפות שלנו
-- מונע התנגשויות שמות כאשר נטען את הגיבוי של הקבוצה השנייה
-- =================================================================

ALTER TABLE IF EXISTS PARTICIPANT RENAME TO our_participant;
ALTER TABLE IF EXISTS TRIP RENAME TO our_trip;
ALTER TABLE IF EXISTS LOCATION RENAME TO our_location;

-- =================================================================
-- שלב 2: התאמת המבנה של הטבלאות המקוריות שלנו
-- הוספת שדות חסרים, הרחבת אורכי VARCHAR וביטול אילוצים למניעת שגיאות
-- =================================================================

-- 1. התאמת PARTICIPANT:
ALTER TABLE our_participant ADD COLUMN IF NOT EXISTS Age INT CHECK (Age > 0);
ALTER TABLE our_participant ALTER COLUMN birthday DROP NOT NULL; -- אצלן אין תאריך לידה
ALTER TABLE our_participant ALTER COLUMN Phone DROP NOT NULL;    -- אצלן טלפון הוא אופציונלי
ALTER TABLE our_participant ALTER COLUMN Email TYPE VARCHAR(100); -- הרחבה למניעת שגיאות אורך

-- 2. התאמת TRIP:
ALTER TABLE our_trip ADD COLUMN IF NOT EXISTS GuideId INT;       -- המפתח הזר למדריך
ALTER TABLE our_trip ALTER COLUMN Trip_Type DROP NOT NULL;        -- אצלן אין סוג טיול מקביל בשדה זה
ALTER TABLE our_trip ALTER COLUMN Trip_Type TYPE VARCHAR(50);     -- הרחבה בהתאם לגיבוי שלהן (triptype VARCHAR(50))

-- [בשלב זה יש להריץ את הגיבוי של הקבוצה השנייה שיוצר את הטבלאות שלהן:
-- participant, trip, location, guide, "GROUP", event, eventregistration, participantgroup, grouptrip]

-- =================================================================
-- שלב 3: העתקת הנתונים שלהן לטבלאות שלנו עם היסט (Offset) של 1,000,000
-- =================================================================

-- 1. העתקת משתתפים (עם פתרון ייחודיות אימייל ע"י הוספת סיומת _peer)
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
  NULL, -- אין להן תאריך לידה
  age
FROM participant;

-- 2. העתקת מיקומים
INSERT INTO our_location (LocationID, LocationName, Region, Address, Description)
SELECT 
  locationid + 1000000, 
  locationname, 
  region, 
  address, 
  description
FROM location;

-- 3. העתקת טיולים (העתקת triptype שלהן ל-Trip_Type שלנו)
INSERT INTO our_trip (TripID, TripName, StartDate, EndDate, GroupSize, Trip_Type, GuideId)
SELECT 
  tripid + 1000000, 
  tripname, 
  startdate, 
  enddate, 
  1,        -- ערך ברירת מחדל
  triptype, -- סוג הטיול מהטבלה שלהן
  guideid
FROM trip;

-- =================================================================
-- שלב 4: מחיקת טבלאות המקור הכפולות שלהן (CASCADE יסיר את אילוצי ה-FK הישנים)
-- =================================================================

DROP TABLE IF EXISTS participant CASCADE;
DROP TABLE IF EXISTS trip CASCADE;
DROP TABLE IF EXISTS location CASCADE;

-- =================================================================
-- שלב 5: עדכון מפתחות זרים בטבלאות הבנות שלהן בהתאם להזחה של 1,000,000
-- =================================================================

-- 1. עדכון טבלת אירועים (event)
UPDATE event SET tripid = tripid + 1000000 WHERE tripid IS NOT NULL;
UPDATE event SET locationid = locationid + 1000000;

-- 2. עדכון טבלת קשר משתתפים בקבוצה (participantgroup)
UPDATE participantgroup SET participantid = participantid + 1000000;

-- 3. עדכון טבלת קשר קבוצות בטיול (grouptrip)
UPDATE grouptrip SET tripid = tripid + 1000000;

-- =================================================================
-- שלב 6: יצירה מחדש של קשרי המפתח הזר (Foreign Keys) לטבלאות הממוזגות שלנו
-- =================================================================

-- 1. קישור אירועים (event) לטיול ולמיקום הממוזגים
ALTER TABLE event ADD CONSTRAINT fk_event_our_trip FOREIGN KEY (tripid) REFERENCES our_trip(TripID);
ALTER TABLE event ADD CONSTRAINT fk_event_our_location FOREIGN KEY (locationid) REFERENCES our_location(LocationID);

-- 2. קישור מפתחות זרים של participantgroup
ALTER TABLE participantgroup ADD CONSTRAINT fk_pg_our_participant FOREIGN KEY (participantid) REFERENCES our_participant(ParticipantID);
ALTER TABLE participantgroup ADD CONSTRAINT fk_pg_group FOREIGN KEY (groupid) REFERENCES "GROUP"(groupid);

-- 3. קישור מפתחות זרים של grouptrip
ALTER TABLE grouptrip ADD CONSTRAINT fk_gt_group FOREIGN KEY (groupid) REFERENCES "GROUP"(groupid);
ALTER TABLE grouptrip ADD CONSTRAINT fk_gt_trip FOREIGN KEY (tripid) REFERENCES our_trip(TripID);

-- 4. קישור הטיולים הממוזגים למדריכים
ALTER TABLE our_trip ADD CONSTRAINT fk_trip_guide FOREIGN KEY (GuideId) REFERENCES guide(guideid);

-- =================================================================
-- שלב 7: החזרת שמות הטבלאות המשותפות לשמות המקוריים שלהן
-- =================================================================

ALTER TABLE our_trip RENAME TO TRIP;
ALTER TABLE our_participant RENAME TO PARTICIPANT;
ALTER TABLE our_location RENAME TO LOCATION;

-- ==========================================
-- SELECT QUERIES
-- ==========================================

-- Query 1 (Way 1): מציאת משתתפים שנרשמו לטיולים שמתחילים בקיץ (יוני, יולי, אוגוסט) של שנת 2026.
-- שיטה 1: שימוש ב-JOIN. מנועי SQL מודרניים יודעים לייעל שאילתות אלו היטב.
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

-- Query 1 (Way 2): אותה שאילתה באמצעות תת-שאילתה עם IN.
-- הבדלי יעילות: תתי שאילתות עם IN עלולות להיות פחות יעילות במנועים ישנים כי לעיתים המנוע מריץ את תת-השאילתה עבור כל שורה בטבלה החיצונית.
-- בנוסף, בשיטה זו אי אפשר לשלוף עמודות מטבלת TRIP לתוצאה הסופית, ולכן התוצאה פחות עשירה במידע לתצוגה בממשק.
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


-- Query 2 (Way 1): רשימת כמות הציוד הכוללת שהוקצתה לכל טיול, רק לטיולים עם יותר מ-5 פריטים בסך הכל.
-- שיטה 1: JOIN ואחריו GROUP BY ו-HAVING.
SELECT T.TripName, 
       EXTRACT(YEAR FROM T.StartDate) AS TripYear, 
       SUM(TE.QuantityAllocated) AS TotalEquipment
FROM TRIP T
JOIN TRIP_EQUIPMENT TE ON T.TripID = TE.TripID
GROUP BY T.TripID, T.TripName, EXTRACT(YEAR FROM T.StartDate)
HAVING SUM(TE.QuantityAllocated) > 5
ORDER BY TotalEquipment DESC;

-- Query 2 (Way 2): אותה שאילתה באמצעות תת-שאילתה ב-FROM (Derived Table).
-- הבדלי יעילות: ביצוע הקיבוץ (GROUP BY) לפני ה-JOIN יכול להקטין משמעותית את כמות השורות שיש למזג (במידה וטבלת TRIP_EQUIPMENT ענקית),
-- מה שעשוי להיות מהיר יותר אם ה-HAVING מסנן הרבה שורות מראש.
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


-- Query 3 (Way 1): מציאת ספקים המספקים גם הסעות וגם ציוד, הצגת פרטי התקשרות להצגה בממשק מנהל.
-- שיטה 1: שימוש ב-EXISTS.
SELECT S.SupplierID, S.Company_Name, S.ContactPhone, S.Service_Type
FROM SUPPLIER S
WHERE EXISTS (
    SELECT 1 FROM TRANSPORTATION TR WHERE TR.SupplierID = S.SupplierID
)
AND EXISTS (
    SELECT 1 FROM EQUIPMENT EQ WHERE EQ.SupplierID = S.SupplierID
);

-- Query 3 (Way 2): אותה שאילתה באמצעות INTERSECT.
-- הבדלי יעילות: EXISTS מפסיק לחפש מיד כשהוא מוצא התאמה (Short-circuit), מה שהופך אותו למהיר מאוד.
-- לעומת זאת, INTERSECT דורש לעבור על כל השורות בשתי הטבלאות, למיין אותן או לבצע Hashing, ולמצוא חיתוך מלא, מה שלרוב דורש יותר משאבים.
SELECT S.SupplierID, S.Company_Name, S.ContactPhone, S.Service_Type
FROM SUPPLIER S
WHERE S.SupplierID IN (
    SELECT SupplierID FROM TRANSPORTATION
    INTERSECT
    SELECT SupplierID FROM EQUIPMENT
);


-- Query 4 (Way 1): פרטי הטיול עם מספר המשתתפים הרשומים הגדול ביותר.
-- שיטה 1: מיון ושימוש ב-LIMIT 1 (במנועים מסוימים כמו אורקל משתמשים ב-FETCH FIRST 1 ROWS ONLY או ROWNUM).
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

-- Query 4 (Way 2): אותה שאילתה באמצעות תת-שאילתה מקוננת עם ALL.
-- הבדלי יעילות: שימוש ב-ORDER BY ו-LIMIT הוא הרבה יותר מהיר כי הוא דורש רק מעבר אחד על הנתונים, קיבוץ ומיון.
-- לעומת זאת, שימוש בתנאי ALL יחד עם תת שאילתה, מצריך את חישוב הפונקציה COUNT פעמיים (פעם לשאילתה הראשית ופעם לפנימית), פעולה כבדה מאוד.
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


-- Query 5: הצגת מסלול הטיול (שם הטיול, שם המיקום, כתובת, סדר) עבור טיול מסוים, מסודר לפי סדר ההגעה אל המיקום.
-- שאילתה לא טריוויאלית המחברת 3 טבלאות.
SELECT T.TripName, L.LocationName, L.Region, L.Address, LT.Location_order,
       EXTRACT(DAY FROM T.StartDate) AS StartDay,
       EXTRACT(MONTH FROM T.StartDate) AS StartMonth,
       EXTRACT(YEAR FROM T.StartDate) AS StartYear
FROM TRIP T
JOIN Location_Trip LT ON T.TripID = LT.TripID
JOIN LOCATION L ON LT.LocationID = L.LocationID
WHERE T.Trip_Type = 'Adventure'
ORDER BY T.TripID, LT.Location_order;


-- Query 6: מציאת משתתפים מעל גיל 18 שטרם החזירו ציוד מטיול שכבר הסתיים (מיועד לדו"ח חובות ציוד בממשק).
-- חיבור של 5 טבלאות! ושימוש בתאריכים.
SELECT P.FirstName, P.LastName, P.Phone, T.TripName, EQ.ItemName, TE.Checkout_Date
FROM PARTICIPANT P
JOIN REGISTERS_TO R ON P.ParticipantID = R.ParticipantID
JOIN TRIP T ON R.TripID = T.TripID
JOIN TRIP_EQUIPMENT TE ON T.TripID = TE.TripID
JOIN EQUIPMENT EQ ON TE.EquipmentID = EQ.EquipmentID
WHERE EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM P.birthday) >= 18
  AND TE.Return_Date IS NULL
  AND T.EndDate < CURRENT_DATE;


-- Query 7: דו"ח חודשי של מערכת הטיולים - השנה, החודש, כמות הטיולים שמתחילים באותו חודש וממוצע גודל הקבוצה.
SELECT EXTRACT(YEAR FROM StartDate) AS TripYear,
       EXTRACT(MONTH FROM StartDate) AS TripMonth,
       COUNT(TripID) AS NumberOfTrips,
       ROUND(AVG(GroupSize), 2) AS AverageGroupSize
FROM TRIP
GROUP BY EXTRACT(YEAR FROM StartDate), EXTRACT(MONTH FROM StartDate)
ORDER BY TripYear DESC, TripMonth DESC;


-- Query 8: רשימת 3 המיקומים הפופולריים ביותר (לפי כמות טיולים המבקרים בהם) יחד עם סך כל המשתתפים הייחודיים שיבקרו בהם.
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

-- Update 1: עדכון תאריך חזרה של ציוד לתאריך הסיום של הטיול, עבור טיולים שהסתיימו ולציוד יש תאריך חזרה ריק (NULL).
-- שימוש בתת-שאילתה מורכבת.
UPDATE TRIP_EQUIPMENT
SET Return_Date = (SELECT EndDate FROM TRIP WHERE TRIP.TripID = TRIP_EQUIPMENT.TripID)
WHERE Return_Date IS NULL 
  AND EXISTS (
      SELECT 1 FROM TRIP 
      WHERE TRIP.TripID = TRIP_EQUIPMENT.TripID 
        AND EndDate < CURRENT_DATE
  );

-- Update 2: הגדלת גודל הקבוצה ב-10% עבור כל הטיולים שמתקיימים בחודש מאי 2026.
UPDATE TRIP
SET GroupSize = ROUND(GroupSize * 1.10)
WHERE EXTRACT(YEAR FROM StartDate) = 2026 
  AND EXTRACT(MONTH FROM StartDate) = 5;

-- Update 3: עדכון תיאור המיקומים באזור צפון (North) כך שיכלול את המילה ' - Popular' אם יש יותר מ-3 טיולים המבקרים שם.
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
-- DELETE QUERIES (עם שאילתות בדיקה לדו"ח)
-- ==========================================

-- Delete 1: מחיקת ציוד שהמלאי שלו קטן או שווה ל-15 ומעולם לא הוקצה לאף טיול.
-- (בדיקה 'לפני': תסמני רק את השורות הבאות ותריצי)
SELECT * FROM EQUIPMENT WHERE TotalInStock <= 15 AND EquipmentID NOT IN (SELECT EquipmentID FROM TRIP_EQUIPMENT);

-- (פעולת המחיקה: תסמני ותריצי)
DELETE FROM EQUIPMENT
WHERE TotalInStock <= 15 
  AND EquipmentID NOT IN (SELECT EquipmentID FROM TRIP_EQUIPMENT);

-- (בדיקה 'אחרי': תריצי שוב את ה-SELECT ותראי שהחלון ריק)


-- Delete 2: מחיקת רישומים לטיולים מסוג 'Extreme' שמתקיימים בשנת 2024.
-- (בדיקה 'לפני': תסמני רק את השורות הבאות ותריצי)
SELECT * FROM REGISTERS_TO WHERE TripID IN (SELECT TripID FROM TRIP WHERE Trip_Type = 'Extreme' AND EXTRACT(YEAR FROM StartDate) = 2024);

-- (פעולת המחיקה: תסמני ותריצי)
DELETE FROM REGISTERS_TO
WHERE TripID IN (
    SELECT TripID FROM TRIP 
    WHERE Trip_Type = 'Extreme' 
      AND EXTRACT(YEAR FROM StartDate) = 2024
);

-- (בדיקה 'אחרי': תריצי שוב את ה-SELECT ותראי שהחלון ריק)


-- Delete 3: מחיקת נתוני הסעות לטיולים שכבר התקיימו והסתיימו בעבר הרחוק.
-- (בדיקה 'לפני': תסמני רק את השורות הבאות ותריצי)
SELECT * FROM TRIP_TRANSPORTATION WHERE Arrival_Date_Time < CURRENT_TIMESTAMP;

-- (פעולת המחיקה: תסמני ותריצי)
DELETE FROM TRIP_TRANSPORTATION
WHERE Arrival_Date_Time < CURRENT_TIMESTAMP;

-- (בדיקה 'אחרי': תריצי שוב את ה-SELECT ותראי שהחלון ריק)

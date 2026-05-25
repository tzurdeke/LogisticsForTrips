-- ====================================================================
-- סקריפט יצירת מבטים (Views) ושאילתות על מבטים (Views.sql) - שלב ג'
-- ====================================================================

-- --------------------------------------------------------------------
-- מבט 1: Trip_Logistics_Summary (מנקודת המבט של האגף שלנו - לוגיסטיקה)
-- תיאור מילולי: מבט המרכז את סיכום המשאבים הלוגיסטיים עבור כל טיול.
-- המבט מציג את כמות פריטי הציוד הייחודיים שהוקצו, סך הכל כמות הציוד שהוקצתה,
-- כמות הרכבים הייחודיים שהוזמנו, וסך הכל קיבולת הנוסעים של הרכבים.
-- --------------------------------------------------------------------

CREATE OR REPLACE VIEW Trip_Logistics_Summary AS
SELECT 
    T.TripID,
    T.TripName,
    T.StartDate,
    T.EndDate,
    COUNT(DISTINCT TE.EquipmentID) AS Unique_Equipment_Items,
    COALESCE(SUM(TE.QuantityAllocated), 0) AS Total_Allocated_Equipment,
    COUNT(DISTINCT TT.TransportID) AS Unique_Vehicles,
    COALESCE(SUM(TR.Capacity), 0) AS Total_Vehicle_Capacity
FROM TRIP T
LEFT JOIN TRIP_EQUIPMENT TE ON T.TripID = TE.TripID
LEFT JOIN TRIP_TRANSPORTATION TT ON T.TripID = TT.TripID
LEFT JOIN TRANSPORTATION TR ON TT.TransportID = TR.TransportID
GROUP BY T.TripID, T.TripName, T.StartDate, T.EndDate;

-- --------------------------------------------------------------------
-- שאילתה 1 על מבט 1
-- תיאור מילולי: מציאת טיולים שבהם הוקצה ציוד כלשהו, אך לא הוזמן עבורם 
-- אף רכב הסעה (מצב הדורש תיאום תחבורה עבור הציוד/משתתפים).
-- --------------------------------------------------------------------
SELECT 
    TripID, 
    TripName, 
    StartDate, 
    Total_Allocated_Equipment, 
    Unique_Vehicles
FROM Trip_Logistics_Summary
WHERE Total_Allocated_Equipment > 0 AND Unique_Vehicles = 0
ORDER BY StartDate;

-- --------------------------------------------------------------------
-- שאילתה 2 על מבט 2
-- תיאור מילולי: איתור טיולים עתידיים שבהם סך קיבולת הרכבים שהוזמנו 
-- נמוכה מ-50 נוסעים, לצורך בקרה וזיהוי קבוצות שעלולות להזדקק להסעה נוספת.
-- --------------------------------------------------------------------
SELECT 
    TripID, 
    TripName, 
    StartDate, 
    Total_Vehicle_Capacity
FROM Trip_Logistics_Summary
WHERE StartDate >= CURRENT_DATE AND Total_Vehicle_Capacity < 50
ORDER BY Total_Vehicle_Capacity ASC;


-- ====================================================================
-- מבט 2: Guide_Performance_View (מנקודת המבט של האגף שקיבלנו - מדריכים ואירועים)
-- תיאור מילולי: מבט המציג נתונים סטטיסטיים וסיכום ביצועים עבור כל מדריך.
-- המבט מציג את מספר הקבוצות שהמדריך מנהל, מספר הטיולים שמשויכים אליו,
-- ומספר האירועים השונים בטיולים אלו שבהם הוא מעורב.
-- ====================================================================

CREATE OR REPLACE VIEW Guide_Performance_View AS
SELECT 
    G.guideid AS Guide_ID,
    G.GuideName AS Guide_Name,
    G.Specialization AS Guide_Specialization,
    G.ExperienceYears AS Experience_Years,
    COUNT(DISTINCT GP.groupid) AS Managed_Groups,
    COUNT(DISTINCT T.TripID) AS Assigned_Trips,
    COUNT(DISTINCT E.eventid) AS Related_Events
FROM guide G
LEFT JOIN "GROUP" GP ON G.guideid = GP.GuideId
LEFT JOIN TRIP T ON G.guideid = T.GuideId
LEFT JOIN event E ON T.TripID = E.tripid
GROUP BY G.guideid, G.GuideName, G.Specialization, G.ExperienceYears;

-- --------------------------------------------------------------------
-- שאילתה 1 על מבט 2
-- תיאור מילולי: מציאת מדריכים מנוסים (מעל 3 שנות ניסיון) שמנהלים לפחות 
-- קבוצה אחת, אך טרם שויך להם טיול פעיל בלוח הזמנים.
-- --------------------------------------------------------------------
SELECT 
    Guide_ID, 
    Guide_Name, 
    Experience_Years, 
    Managed_Groups, 
    Assigned_Trips
FROM Guide_Performance_View
WHERE Experience_Years > 3 AND Managed_Groups > 0 AND Assigned_Trips = 0
ORDER BY Experience_Years DESC;

-- --------------------------------------------------------------------
-- שאילתה 2 על מבט 2
-- תיאור מילולי: חישוב ממוצע הטיולים והאירועים המשויכים למדריכים 
-- לפי תחומי ההתמחות שלהם, כדי לבחון עומסים בין התמחויות שונות.
-- --------------------------------------------------------------------
SELECT 
    Guide_Specialization,
    COUNT(Guide_ID) AS Number_Of_Guides,
    ROUND(AVG(Assigned_Trips), 2) AS Avg_Assigned_Trips,
    ROUND(AVG(Related_Events), 2) AS Avg_Related_Events
FROM Guide_Performance_View
GROUP BY Guide_Specialization
ORDER BY Avg_Assigned_Trips DESC;

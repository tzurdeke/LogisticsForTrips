# Logistics Subsystem – Trip Management System

## 👩‍💻 מגישות:
- עטרה דניגר  
- אודיה צורדקר  

---

## 📌 מערכת:
מערכת לניהול טיולים קבוצתיים  

## 🔧 תת מערכת:
ניהול לוגיסטיקה – ציוד, הסעות, ספקים ומיקומים  

---

## 📑 תוכן עניינים
1. [🧠 מבוא](#מבוא)
2. [🖥️ מסכי המערכת (AI Studio)](#מסכי-המערכת)
3. [🔗 קישור למערכת](#קישור-למערכת)
4. [🧩 תרשים ERD](#תרשים-erd)
5. [🗄️ תרשים DSD](#תרשים-dsd)
6. [🗃️ SQL Scripts](#sql-scripts)
7. [📊 יצירת נתונים (CSV & Python)](#יצירת-נתונים)
8. [💾 גיבוי (Backup)](#גיבוי)
9. [🚀 שלב ב' - מסד הנתונים](#שלב-ב)
10. [🔮 שלב ג' - אינטגרציה](#אינטגרציה-עם-פרויקט-נוסף-שלב-ג)
11. [⚙️ שלב ד' - תכנות (PL/pgSQL)](#שלב-ד)
12. [🎨 שלב ה' - ממשק משתמש (GUI)](#שלב-ה)


---

## מבוא

🧠 המערכת מיועדת לניהול טיולים קבוצתיים תוך דגש על תת־מערכת הלוגיסטיקה.

המערכת שומרת נתונים על:
- טיולים (שם, תאריכים, סוג וגודל קבוצה)
- משתתפים
- ציוד ומלאי
- ספקים
- הסעות
- מיקומים

מטרת המערכת היא לאפשר תכנון וניהול יעיל של כלל המשאבים הנדרשים לטיול, כולל הקצאת ציוד, ניהול הסעות ותיאום מול ספקים.

המערכת מאפשרת:
- רישום משתתפים לטיולים  
- הקצאת ציוד לטיול עם מעקב אחר תאריכי השאלה והחזרה  
- ניהול הסעות לטיולים  
- שיוך מיקומים למסלול הטיול  
- ניהול ספקים המספקים ציוד ושירותים  

---

## מסכי המערכת

🖥️ להלן המסכים שנוצרו באמצעות Google AI Studio:

### 📝 הרשמה / רישום
<p align="center">
  <img src="https://github.com/user-attachments/assets/ca315efd-2ab2-4cb8-a3cb-059687bff98e" width="500">
  <br>
  <img src="https://github.com/user-attachments/assets/f37a5f77-9dd2-49da-9669-b5f96f3ebb48" width="500">
</p>

<p align="center">
  <i>מסכים אלו מאפשרים רישום משתמשים למערכת והזנת פרטים אישיים לצורך השתתפות בטיולים.</i>
</p>

---

### 📊 סיכום משלחת
<p align="center">
  <img src="https://github.com/user-attachments/assets/224a7745-0f22-4ac1-94a5-96cc17ffafd2" width="600">
</p>

<p align="center">
  <i>מסך המציג סיכום כולל של הטיול, כולל מידע לוגיסטי על ציוד, משתתפים והסעות.</i>
</p>

---

### 👥 רישום משתתפים לטיול
<p align="center">
  <img src="https://github.com/user-attachments/assets/8eab67e8-6da3-4b41-98c1-fc19e180888f" width="600">
</p>

<p align="center">
  <i>מסך לניהול ושיוך משתתפים לטיולים, כולל רישום ומעקב אחר המשתתפים בכל טיול.</i>
</p>

---

### 🎒 הקצאת ציוד לטיול
<p align="center">
  <img src="https://github.com/user-attachments/assets/e904c414-53f1-4a88-810c-0f1e9e920888" width="600">
</p>

<p align="center">
  <i>מסך לניהול הקצאת ציוד לטיולים, כולל כמות, תאריכי השאלה והחזרה.</i>
</p>

---

### 📦 ציוד
<p align="center">
  <img src="https://github.com/user-attachments/assets/ca15c3f1-8f1a-4e85-a2fc-b723eb37fd0a" width="400">
</p>

<p align="center">
  <i>מסך המציג את מלאי הציוד הקיים במערכת ואת זמינותו.</i>
</p>

---

### 🚌 ניהול הסעות לטיולים
<p align="center">
  <img src="https://github.com/user-attachments/assets/71dae489-cc1f-4429-8548-f5e6425ad46f" width="600">
</p>

<p align="center">
  <i>מסך לניהול הסעות, כולל פרטי רכב, ספקים וזמני יציאה והגעה.</i>
</p>

---

### 📍 מיקומים
<p align="center">
  <img src="https://github.com/user-attachments/assets/371cf170-509a-41e5-9a5f-73a20cd5ade2" width="600">
</p>

<p align="center">
  <i>מסך לניהול מיקומים בהם מתקיימים חלקים מהטיול, כולל כתובת ותיאור.</i>
</p>

---

### 🏢 ניהול ספקים
<p align="center">
  <img src="https://github.com/user-attachments/assets/a5b0c5d0-e3de-47ae-9e5f-8e9df9b3a47c" width="600">
</p>

<p align="center">
  <i>מסך לניהול ספקים המספקים ציוד ושירותים למערכת, כולל פרטי התקשרות וסוג השירות.</i>
</p>

---

### 🌍 תצוגה בתור תייר
<p align="center">
  <img src="https://github.com/user-attachments/assets/62788be4-9a87-4a3f-bac3-2e77acf3c67c" width="600">
</p>

<p align="center">
  <i>מסך המציג את המערכת מנקודת מבט של משתמש/תייר, כולל צפייה בפרטי הטיול והמידע הרלוונטי.</i>
</p>

---

## קישור למערכת

🔗 [לחצי כאן לצפייה ב-AI Studio](https://ai.studio/apps/ac7a70cb-44bf-4be7-aabf-8c0e0fec2f78)

---

## תרשים ERD

🧩 <br>
<p align="center">
  <img src="https://github.com/user-attachments/assets/9b3ae78e-b741-40fe-8c85-a5d7c61eee10" width="700">
</p>

---

## תרשים DSD

🗄️ <br>
<p align="center">
  <img src="https://github.com/user-attachments/assets/8709cdda-d57d-4b67-9aa8-9c6f369a9aa7" width="700">
</p>

---

## SQL Scripts

🗃️ <br>
<div dir="rtl">

- **סקריפט יצירת טבלאות**  
  [צפייה ב-createTables.sql](./DBProject/8578_3938/שלב%20א/createTables.sql)

- **סקריפט הכנסת נתונים**  
  [צפייה ב-insertTables.sql](./DBProject/8578_3938/שלב%20א/insertTables.sql)

- **סקריפט מחיקת טבלאות**  
  [צפייה ב-dropTables.sql](./DBProject/8578_3938/שלב%20א/dropTables.sql)

- **סקריפט שליפת כל הנתונים**  
  [צפייה ב-selectAll.sql](./DBProject/8578_3938/שלב%20א/selectAll.sql)

</div>

---

## יצירת נתונים

📊 לצורך בדיקות ואכלוס המערכת (מ-CSV / Python), יצרנו נתונים באמצעות מספר שיטות:

### 🔹 1. שימוש באתר Mockaroo
נוצר קובץ CSV המכיל נתונים רנדומליים עבור ישויות שונות במערכת (כגון משתתפים, ספקים וציוד).
[צפייה בקובץ הדוגמה PARTICIPANT.csv](./DBProject/8578_3938/שלב%20א/mockarooFiles/PARTICIPANT.csv)

<p align="center">
  <img src="https://github.com/user-attachments/assets/0d9447f8-1fde-43a5-971e-425a026c15c1" width="700">
</p>

---

### 🔹 2. שימוש בקובץ CSV
הנתונים שנוצרו נטענו לבסיס הנתונים באמצעות קובץ CSV.


<p align="center">
  <img src="https://github.com/user-attachments/assets/d0c5ec20-d77e-408f-9c06-7b34060539f7" width="700">
</p>
---

### 🔹 3. שימוש בסקריפט Python
נכתב סקריפט Python ליצירת נתונים באופן אוטומטי והפקת נתונים בפורמט מתאים להכנסה למערכת.

<p align="center">
  <img src="https://github.com/user-attachments/assets/792864ac-a6d7-41a7-bd45-0b0b85a2e8a5" width="400">
</p>

---

✔️ באמצעות שלוש שיטות אלו, הצלחנו לאכלס את המערכת בנתונים מגוונים וריאליסטיים.

---

## גיבוי
<p align="center">
  <img src="https://github.com/user-attachments/assets/94733773-2d83-43d1-b574-616753a11b53" width="600">
</p>


💾 **קישור לתיקיית הגיבויים:**  
[צפייה בתיקיית Backup](./DBProject/8578_3938/שלב%20א/Backup/)

---

<a name="שלב-ב"></a>
## 🚀 שלב ב' - בניית מסד הנתונים ושאילתות (SQL)

**תוכן עניינים פנימי - שלב ב':**
* [שאילתות אחזור נתונים (SELECT)](#שאילתות-אחזור-נתונים-select)
* [שאילתות עדכון (UPDATE)](#שאילתות-עדכון-update)
* [שאילתות מחיקה (DELETE)](#שאילתות-מחיקה-delete)
* [Rollback ו-Commit](#rollback-ו-commit)
* [אילוצים (Constraints)](#אילוצים-constraints)
* [אינדקסים (Indexes)](#אינדקסים-indexes)

---
### שאילתות אחזור נתונים (SELECT)

#### שאילתה 1: מציאת משתתפים שנרשמו לטיולי קיץ 2026
**תיאור השאילתה:** מציאת פרטי משתתפים שנרשמו לטיולים שמתחילים בקיץ (יוני, יולי, אוגוסט) של שנת 2026.
**הבדלי יעילות בין השיטות:** שיטה 1 (JOIN) לרוב תהיה יעילה יותר שכן מנועי SQL מודרניים מייעלים אותה היטב. לעומת זאת, תתי שאילתות עם IN (שיטה 2) עלולות להיות פחות יעילות במנועים מסוימים כי המנוע עשוי להריץ את תת-השאילתה עבור כל שורה בטבלה החיצונית. 
(הערה: כדי שההשוואה בין שתי השיטות תהיה אמינה והוגנת, שתיהן נכתבו כך שיחזירו בדיוק את אותן עמודות ואותן שורות. מכיוון ששימוש בתת שאילתה עם IN מגביל אותנו לשליפת עמודות ומיון על סמך הטבלה החיצונית בלבד, התאמנו את שתי השאילתות כך שיחזירו וימיינו רק לפי פרטי המשתתף).

**קוד השאילתה (שיטה 1 - JOIN):**
```sql
SELECT P.ParticipantID, P.FirstName, P.LastName, P.Email
FROM PARTICIPANT P
JOIN REGISTERS_TO R ON P.ParticipantID = R.ParticipantID
JOIN TRIP T ON R.TripID = T.TripID
WHERE EXTRACT(YEAR FROM T.StartDate) = 2026 
  AND EXTRACT(MONTH FROM T.StartDate) IN (6, 7, 8)
ORDER BY P.LastName;
```

**צילום הרצה ותוצאה (שיטה 1):**
<p align="center">
<img width="1431" height="412" alt="image" src="https://github.com/user-attachments/assets/a6961f69-6b8d-491b-9006-0c1aab16b973" />
</p>

**קוד השאילתה (שיטה 2 - תת שאילתה עם IN):**
```sql
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
```

**צילום הרצה ותוצאה (שיטה 2):**
<p align="center">
<img width="1431" height="412" alt="image" src="https://github.com/user-attachments/assets/a6961f69-6b8d-491b-9006-0c1aab16b973" />
</p>

#### שאילתה 2: רשימת כמות ציוד שהוקצתה לטיולים
**תיאור השאילתה:** מחשבת את סך כל כמות הציוד שהוקצתה לכל טיול, וזאת רק עבור טיולים שהוקצו להם בסך הכל יותר מ-5 פריטים.
**הבדלי יעילות בין השיטות:** ביצוע הקיבוץ (GROUP BY) מראש בתוך תת-השאילתה (שיטה 2) יכול להקטין משמעותית את כמות השורות שיש למזג ב-JOIN, מה שעשוי להיות מהיר יותר לעומת שיטה 1 (המבצעת קודם JOIN ואז מקבצת) אם ה-HAVING מסנן הרבה שורות.

**קוד השאילתה (שיטה 1 - ע"י HAVING):**
```sql
SELECT T.TripName, 
       EXTRACT(YEAR FROM T.StartDate) AS TripYear, 
       SUM(TE.QuantityAllocated) AS TotalEquipment
FROM TRIP T
JOIN TRIP_EQUIPMENT TE ON T.TripID = TE.TripID
GROUP BY T.TripID, T.TripName, EXTRACT(YEAR FROM T.StartDate)
HAVING SUM(TE.QuantityAllocated) > 5
ORDER BY TotalEquipment DESC;
```

**צילום הרצה ותוצאה (שיטה 1):**
<p align="center">
<img width="576" height="323" alt="image" src="https://github.com/user-attachments/assets/93ec3a8b-d606-4ba4-bf5a-fdfdf0887e6d" />
</p>

**קוד השאילתה (שיטה 2 - תת-שאילתה ב-FROM):**
```sql
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
```

**צילום הרצה ותוצאה (שיטה 2):**
<p align="center">
<img width="576" height="323" alt="image" src="https://github.com/user-attachments/assets/93ec3a8b-d606-4ba4-bf5a-fdfdf0887e6d" />
</p>


#### שאילתה 3: מציאת ספקים משולבים (הסעות וציוד)
**תיאור השאילתה:** איתור ספקים במערכת שמספקים גם שירותי הסעות וגם פריטי ציוד, והצגת פרטי ההתקשרות איתם.
**הבדלי יעילות בין השיטות:** פקודת EXISTS (שיטה 1) לרוב מהירה מאוד כי היא מפסיקה לחפש ברגע שנמצאת התאמה (Short-circuit). פקודת INTERSECT (שיטה 2) דורשת לעבור על כל השורות בשתי הטבלאות ולמצוא חיתוך מלא, מה שיכול לדרוש יותר משאבים.

**קוד השאילתה (שיטה 1 - שימוש ב-EXISTS):**
```sql
SELECT S.SupplierID, S.Company_Name, S.ContactPhone, S.Service_Type
FROM SUPPLIER S
WHERE EXISTS (
    SELECT 1 FROM TRANSPORTATION TR WHERE TR.SupplierID = S.SupplierID
)
AND EXISTS (
    SELECT 1 FROM EQUIPMENT EQ WHERE EQ.SupplierID = S.SupplierID
);
```

**צילום הרצה ותוצאה (שיטה 1):**
<p align="center">
<img width="895" height="328" alt="image" src="https://github.com/user-attachments/assets/6994027c-66ac-439b-9aa7-9206e301a595" />
</p>

**קוד השאילתה (שיטה 2 - שימוש ב-INTERSECT):**
```sql
SELECT S.SupplierID, S.Company_Name, S.ContactPhone, S.Service_Type
FROM SUPPLIER S
WHERE S.SupplierID IN (
    SELECT SupplierID FROM TRANSPORTATION
    INTERSECT
    SELECT SupplierID FROM EQUIPMENT
);
```

**צילום הרצה ותוצאה (שיטה 2):**
<p align="center">
<img width="895" height="328" alt="image" src="https://github.com/user-attachments/assets/6994027c-66ac-439b-9aa7-9206e301a595" />
</p>

#### שאילתה 4: הטיול העמוס ביותר במשתתפים
**תיאור השאילתה:** הצגת פרטי הטיול (שם, תאריך מפוצל, סוג) שאליו נרשמה כמות המשתתפים הגדולה ביותר במערכת.
**הבדלי יעילות בין השיטות:** שימוש ב-ORDER BY ו-LIMIT (שיטה 1) הרבה יותר מהיר כי הוא דורש רק מעבר אחד למיון ושליפה. שימוש בתנאי ALL יחד עם תת שאילתה (שיטה 2) מצריך לחשב את פונקציית COUNT פעמיים עבור כל קבוצה, מה שהופך את השאילתה להרבה יותר כבדה.

**קוד השאילתה (שיטה 1 - מיון ו-LIMIT):**
```sql
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
```

**צילום הרצה ותוצאה (שיטה 1):**
<p align="center">
<img width="1060" height="247" alt="image" src="https://github.com/user-attachments/assets/af7d1206-4035-44d9-9c1a-2c351981028b" />
</p>

**קוד השאילתה (שיטה 2 - תת שאילתה עם ALL):**
```sql
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
```

**צילום הרצה ותוצאה (שיטה 2):**
<p align="center">
<img width="1060" height="247" alt="image" src="https://github.com/user-attachments/assets/af7d1206-4035-44d9-9c1a-2c351981028b" />
</p>

#### שאילתה 5: מסלול טיול מלא (טיולי הרפתקאות)
**תיאור השאילתה:** הצגת מסלול הטיול, כולל סדר הגעה למיקומים, שם המיקום, האזור ופרטי הטיול, מסודר לפי סדר ההגעה למיקומים.

**קוד השאילתה:**
```sql
SELECT T.TripName, L.LocationName, L.Region, L.Address, LT.Location_order,
       EXTRACT(DAY FROM T.StartDate) AS StartDay,
       EXTRACT(MONTH FROM T.StartDate) AS StartMonth,
       EXTRACT(YEAR FROM T.StartDate) AS StartYear
FROM TRIP T
JOIN Location_Trip LT ON T.TripID = LT.TripID
JOIN LOCATION L ON LT.LocationID = L.LocationID
WHERE T.Trip_Type = 'Adventure'
ORDER BY T.TripID, LT.Location_order;
```

**צילום הרצה ותוצאה:**
<p align="center">
<img width="1423" height="297" alt="image" src="https://github.com/user-attachments/assets/547d02df-b741-4546-99f7-2412ed9734cc" />
</p>

#### שאילתה 6: דו"ח חובות ציוד
**תיאור השאילתה:** מציאת משתתפים מעל גיל 18 שטרם החזירו ציוד שהושאל לטיולים שכבר הסתיימו. מיועד להצגה במסך מעקב החובות של האדמין.

**קוד השאילתה:**
```sql
SELECT P.FirstName, P.LastName, P.Phone, T.TripName, EQ.ItemName, TE.Checkout_Date
FROM PARTICIPANT P
JOIN REGISTERS_TO R ON P.ParticipantID = R.ParticipantID
JOIN TRIP T ON R.TripID = T.TripID
JOIN TRIP_EQUIPMENT TE ON T.TripID = TE.TripID
JOIN EQUIPMENT EQ ON TE.EquipmentID = EQ.EquipmentID
WHERE EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM P.birthday) >= 18
  AND TE.Return_Date IS NULL
  AND T.EndDate < CURRENT_DATE;
```

**צילום הרצה ותוצאה:**
<p align="center">
<img width="1342" height="299" alt="image" src="https://github.com/user-attachments/assets/ca04e1bd-ee01-4870-b74d-5aa16e2c2d77" />
</p>


#### שאילתה 7: דו"ח טיולים חודשי מרוכז
**תיאור השאילתה:** מציגה נתונים מרוכזים לפי שנה וחודש - כמה טיולים מתחילים באותו חודש ומה ממוצע גודל הקבוצה שלהם.

**קוד השאילתה:**
```sql
SELECT EXTRACT(YEAR FROM StartDate) AS TripYear,
       EXTRACT(MONTH FROM StartDate) AS TripMonth,
       COUNT(TripID) AS NumberOfTrips,
       ROUND(AVG(GroupSize), 2) AS AverageGroupSize
FROM TRIP
GROUP BY EXTRACT(YEAR FROM StartDate), EXTRACT(MONTH FROM StartDate)
ORDER BY TripYear DESC, TripMonth DESC;
```

**צילום הרצה ותוצאה:**
<p align="center">
<img width="656" height="348" alt="image" src="https://github.com/user-attachments/assets/3dcbf101-560e-4326-a35e-413740c2bf7b" />
</p>


#### שאילתה 8: המיקומים הפופולריים ביותר בטיולים
**תיאור השאילתה:** רשימת 3 המיקומים המתוירים ביותר לפי כמות הטיולים שיבקרו בהם, כולל ספירת כמות המשתתפים הייחודיים הכוללת שעתידים לבקר בהם.

**קוד השאילתה:**
```sql
SELECT L.LocationName, L.Region, 
       COUNT(DISTINCT LT.TripID) AS TripsVisiting,
       COUNT(DISTINCT R.ParticipantID) AS TotalParticipants
FROM LOCATION L
JOIN Location_Trip LT ON L.LocationID = LT.LocationID
JOIN REGISTERS_TO R ON LT.TripID = R.TripID
GROUP BY L.LocationID, L.LocationName, L.Region
ORDER BY TripsVisiting DESC, TotalParticipants DESC
LIMIT 3;
```

**צילום הרצה ותוצאה:**
<p align="center">
<img width="819" height="225" alt="image" src="https://github.com/user-attachments/assets/014109b6-efe3-4810-aaa4-41fdce9b0792" />
</p>

### שאילתות עדכון (UPDATE)

#### שאילתת עדכון 1
**תיאור השאילתה:** עדכון אוטומטי של תאריך חזרת ציוד (Return_Date) כך שיהיה זהה לתאריך סיום הטיול, עבור טיולים שכבר הסתיימו אך הציוד בהם סומן כטרם הוחזר.

**קוד השאילתה:**
```sql
UPDATE TRIP_EQUIPMENT
SET Return_Date = (SELECT EndDate FROM TRIP WHERE TRIP.TripID = TRIP_EQUIPMENT.TripID)
WHERE Return_Date IS NULL 
  AND EXISTS (
      SELECT 1 FROM TRIP 
      WHERE TRIP.TripID = TRIP_EQUIPMENT.TripID 
        AND EndDate < CURRENT_DATE
        AND EndDate >= '2025-01-01'
  );
```

**קוד שאילתת הבדיקה (אותה מריצים לפני ואחרי העדכון כדי לראות את השינוי):**
```sql
SELECT * FROM TRIP_EQUIPMENT 
WHERE Return_Date IS NULL 
  AND EXISTS (
      SELECT 1 FROM TRIP 
      WHERE TRIP.TripID = TRIP_EQUIPMENT.TripID 
        AND EndDate < CURRENT_DATE
        AND EndDate >= '2025-01-01'
  );
```

**צילום מצב בסיס הנתונים לפני העדכון:** 
<p align="center">
<img src="https://github.com/user-attachments/assets/fd24645b-27c7-4be8-903e-22e194ea022a" width="600">
</p>

**צילום הרצת פקודת העדכון + צילום מצב אחרי:** 
*(הערה: צילום המסך של ה"אחרי" מציג טבלה ריקה מכיוון שזוהי תוצאת הרצת שאילתת הבדיקה (המחפשת `Return_Date IS NULL`) לאחר ביצוע העדכון. העובדה שהשאילתה לא מחזירה אף רשומה מהווה את ההוכחה לכך שפקודת ה-UPDATE עבדה, ואין יותר ציוד שטרם הוחזר בטיולי העבר).*
<p align="center">
<img src="https://github.com/user-attachments/assets/da1dbf48-6914-4bdc-8adf-5bb03e399189" width="600">
</p>


#### שאילתת עדכון 2
**תיאור השאילתה:** הגדלת גודל הקבוצה (GroupSize) ב-10% עבור כל הטיולים המתוכננים לחודש מאי 2026, עקב צפי לעלייה בביקוש בעונת האביב.

**קוד השאילתה:**
```sql
UPDATE TRIP
SET GroupSize = ROUND(GroupSize * 1.10)
WHERE EXTRACT(YEAR FROM StartDate) = 2026 
  AND EXTRACT(MONTH FROM StartDate) = 5;
```

**צילום מצב בסיס הנתונים לפני העדכון:**
<p align="center">
<img width="1018" height="245" alt="image" src="https://github.com/user-attachments/assets/b89329d0-6d86-43af-8dd4-71082694947a" />
</p>

**צילום הרצת פקודת העדכון + צילום מצב אחרי:**
<p align="center">
<img width="1009" height="250" alt="image" src="https://github.com/user-attachments/assets/d8cc38ee-4a7f-4958-9f2f-aee9e02b775e" />
</p>


#### שאילתת עדכון 3
**תיאור השאילתה:** הוספת המילה ' - Popular' לתיאור של מיקומים באזור הצפון שזוכים לפופולריות רבה (כאלו שיש אליהם יותר מ-3 טיולים מתוכננים).

**קוד השאילתה:**
```sql
UPDATE LOCATION
SET Description = CONCAT(COALESCE(Description, ''), ' - Popular')
WHERE Region = 'North' 
  AND LocationID IN (
      SELECT LocationID 
      FROM Location_Trip 
      GROUP BY LocationID 
      HAVING COUNT(TripID) > 3
  );
```

**צילום מצב בסיס הנתונים לפני העדכון:**
<p align="center">
<img width="1126" height="192" alt="image" src="https://github.com/user-attachments/assets/5bbbeeaa-b240-41a7-8b19-103aa60395de" />
</p>

**צילום הרצת פקודת העדכון + צילום מצב אחרי:**
<p align="center">
<img width="1116" height="186" alt="image" src="https://github.com/user-attachments/assets/0c8bd4ac-821b-4194-b216-8734b4cc63e6" />
</p>

### שאילתות מחיקה (DELETE)

#### שאילתת מחיקה 1
**תיאור השאילתה:** מחיקת פריטי ציוד שהמלאי שלהם קטן או שווה ל-15 ושמעולם לא הוקצו לאף טיול (ציוד מיותר או לא פעיל).

**קוד השאילתה:**
```sql
DELETE FROM EQUIPMENT
WHERE TotalInStock <= 15 
  AND EquipmentID NOT IN (SELECT EquipmentID FROM TRIP_EQUIPMENT);
```

**צילום מצב בסיס הנתונים לפני המחיקה:**
<p align="center">
<img width="805" height="344" alt="image" src="https://github.com/user-attachments/assets/76ee0c97-d55f-4a71-a0d5-3ce5fba11f8e" />
</p>


**צילום הרצת פקודת המחיקה + צילום מצב אחרי:**
<p align="center">
<img width="811" height="236" alt="image" src="https://github.com/user-attachments/assets/9ec22bcc-d3d2-423d-ba37-54bc07103df8" />
</p>

#### שאילתת מחיקה 2
**תיאור השאילתה:** מחיקת כל הרישומים (משתתפים) מטיולים מסוג 'Extreme' שהתקיימו בשנת 2024 (לצורך ניקוי היסטוריה ישנה של סוג טיול ספציפי).

**קוד השאילתה:**
```sql
DELETE FROM REGISTERS_TO
WHERE TripID IN (
    SELECT TripID FROM TRIP 
    WHERE Trip_Type = 'Extreme' 
      AND EXTRACT(YEAR FROM StartDate) = 2024
);
```

**צילום מצב בסיס הנתונים לפני המחיקה:**
<p align="center">
<img width="313" height="212" alt="image (7)" src="https://github.com/user-attachments/assets/ffac75eb-6d32-42c7-81d5-7bac3fffd25a" />
</p>

**צילום הרצת פקודת המחיקה + צילום מצב אחרי:**
<p align="center">
<img width="412" height="264" alt="image" src="https://github.com/user-attachments/assets/df2c1134-f54a-4fe7-a7b6-7fe8f8885db5" />
</p>


#### שאילתת מחיקה 3
**תיאור השאילתה:** מחיקת נתוני הסעות לטיולים שכבר התקיימו והסתיימו בעבר, משום שאין צורך לשמור את היסטוריית זמני ההגעה והיציאה של הסעות ישנות.

**קוד השאילתה:**
```sql
DELETE FROM TRIP_TRANSPORTATION
WHERE Arrival_Date_Time < CURRENT_TIMESTAMP;
```

**צילום מצב בסיס הנתונים לפני המחיקה:**
<p align="center">
<img width="1021" height="293" alt="image" src="https://github.com/user-attachments/assets/c4b4ef8d-246f-477c-990b-a9d43e3e5dc4" />
</p>

**צילום הרצת פקודת המחיקה + צילום מצב אחרי:**
<p align="center">
<img width="1069" height="286" alt="image" src="https://github.com/user-attachments/assets/f36ff431-91f3-4dd1-b8c5-76d501ecabb9" />
</p>

---

## Rollback ו-Commit

### תהליך Rollback (ביטול טרנזקציה)
בתהליך זה נדגים כיצד ניתן לבטל פעולת מחיקה שבוצעה בטעות, בעזרת טרנזקציה וביצוע `ROLLBACK`.

**1. הנתונים לפני המחיקה:**
<p align="center">
<img width="444" height="453" alt="image" src="https://github.com/user-attachments/assets/64325d0d-6b39-4e35-89ea-c57cf7964a72" />
</p>


**2. הנתונים אחרי פקודת ה-DELETE (בתוך הטרנזקציה):**
<p align="center">
<img width="448" height="459" alt="image" src="https://github.com/user-attachments/assets/655e05ee-51d2-4726-9b4a-40a48fb422e6" />

<br>
<img width="448" height="448" alt="image" src="https://github.com/user-attachments/assets/e400a585-910b-4fb8-9dc3-414391241e0d" />

</p>


**3. הנתונים לאחר ביצוע ROLLBACK:**
<p align="center">
<img width="448" height="453" alt="image" src="https://github.com/user-attachments/assets/1ec3e720-6775-4a5c-a197-e18fd69325a0" />

</p>

---

### תהליך Commit (שמירת טרנזקציה)
בתהליך זה נדגים כיצד לשמור פעולת עדכון באופן קבוע למסד הנתונים בעזרת `COMMIT`.

**1. הנתונים לפני העדכון:**
<p align="center">
<img width="1141" height="406" alt="image" src="https://github.com/user-attachments/assets/95d3c450-05aa-4853-859f-43c24de92a7b" />

</p>


**2. הנתונים אחרי העדכון (בתוך הטרנזקציה):**
<p align="center">
<img width="1159" height="325" alt="image" src="https://github.com/user-attachments/assets/9cad6ffc-78fb-4745-af1d-04f5ac771f25" />
<br>
<img width="581" height="177" alt="image" src="https://github.com/user-attachments/assets/73dc24c7-dd11-4308-afbd-2ad7c34eb185" />
</p>

**3. הנתונים לאחר ביצוע COMMIT:**
<p align="center">
<img width="1164" height="329" alt="image" src="https://github.com/user-attachments/assets/8a514468-370d-45ba-8efd-0d41d2c51f70" />
<br>
<img width="751" height="145" alt="image" src="https://github.com/user-attachments/assets/c3df6282-8178-439a-8965-5689f92064cf" />
</p>

---

## אילוצים (Constraints)
במסגרת שלב זה הוספנו 3 אילוצים חדשים לבסיס הנתונים כדי לשמור על שלמות ואמינות המידע.

### אילוץ 1: אורך מינימלי לכתובת
**תיאור:** הוספנו אילוץ `CHECK` על טבלת `LOCATION` שמוודא ששדה הכתובת (`Address`) מכיל לפחות 5 תווים.
**מוטיבציה ותועלת:** מניעת הכנסת נתוני "זבל" או כתובות חסרות משמעות (כמו "א" או "12") על ידי המשתמשים, מה שמשפר את איכות הנתונים במערכת הלוגיסטית.

**פקודת ה-ALTER TABLE:**
```sql
ALTER TABLE LOCATION ADD CONSTRAINT chk_address_length CHECK (LENGTH(Address) >= 5);
```

**צילום מסך של שגיאת המערכת בעת ניסיון להפר את האילוץ:**
<p align="center">
<img width="761" height="279" alt="image" src="https://github.com/user-attachments/assets/a3efcd43-5d7a-458c-8d99-8b7f8f280bac" />
<br>

</p>
<img width="1230" height="287" alt="image" src="https://github.com/user-attachments/assets/0a8075c1-1cec-4a34-80f6-b758274da563" />


### אילוץ 2: ייחודיות שם פריט ציוד
**תיאור:** הוספנו אילוץ `UNIQUE` על עמודת `ItemName` בטבלת `EQUIPMENT`.
**מוטיבציה ותועלת:** מניעת כפילויות במלאי. אנו רוצים לוודא שאין שני פריטי ציוד עם שם זהה, כדי למנוע בלבול בעת הקצאת ציוד לטיולים והזמנת ציוד מספקים.

**פקודת ה-ALTER TABLE:**
```sql
ALTER TABLE EQUIPMENT ADD CONSTRAINT unq_itemname UNIQUE (ItemName);
```

**צילום מסך של שגיאת המערכת בעת ניסיון להפר את האילוץ:**
<p align="center">
<img width="731" height="228" alt="image" src="https://github.com/user-attachments/assets/536cc2e8-3db5-47cb-8194-456860445f8a" />

<br>
<img width="1007" height="319" alt="image" src="https://github.com/user-attachments/assets/a4ee74bf-a02d-4a2d-9ebb-0874631a5364" />
</p>

### אילוץ 3: פורמט כתובת אימייל
**תיאור:** הוספנו אילוץ `CHECK` על טבלת `PARTICIPANT` המוודא ששדה האימייל (`Email`) מכיל את התו `@`.
**מוטיבציה ותועלת:** וידוא בסיסי של תקינות כתובות הדואר האלקטרוני של המשתתפים, כך שנוכל ליצור איתם קשר במידת הצורך ולשלוח להם קבלות או עדכונים.

**פקודת ה-ALTER TABLE:**
```sql
ALTER TABLE PARTICIPANT ADD CONSTRAINT chk_email_format CHECK (Email LIKE '%@%');
```

**צילום מסך של שגיאת המערכת בעת ניסיון להפר את האילוץ:**
<p align="center">
<img width="720" height="233" alt="image" src="https://github.com/user-attachments/assets/bdd1e5d1-95e0-485d-9cba-3e1844fa2ff1" />
<br>
  
<img width="1161" height="214" alt="image" src="https://github.com/user-attachments/assets/2d84d988-7183-4c4c-a2d9-a313eef4231a" />
</p>

---

## אינדקסים (Indexes)
בשלב זה הוספנו 3 אינדקסים לטבלאות כדי לייעל משמעותית את זמני הריצה של השאילתות הנפוצות במערכת שלנו.

### אינדקס 1: חיפוש טיולים לפי אזור (Region)
**תיאור:** אינדקס על עמודת `Region` בטבלת המיקומים (`LOCATION`).
**מוטיבציה ותועלת:** המערכת שלנו מבצעת חיפושים רבים של מיקומים לפי אזור גיאוגרפי (כמו "צפון" או "דרום") כדי לתכנן מסלולים ולהקצות ספקים רלוונטיים מאותו אזור. האינדקס מונע סריקה של כל הטבלה ומאיץ את השליפות.

**פקודת היצירה:**
```sql
CREATE INDEX idx_location_region ON LOCATION(Region);
```

**זמני ריצה עבור חיפוש מיקומים באזור הצפון:**
* תמונת זמן הריצה **לפני** יצירת האינדקס:
<p align="center">
<img width="772" height="665" alt="image" src="https://github.com/user-attachments/assets/db0b273e-a21a-4f7f-ac5a-561cdaa90b6f" />
</p>

* תמונת זמן הריצה **אחרי** יצירת האינדקס (צפוי להיות מהיר יותר):
<p align="center">
<img width="709" height="546" alt="image" src="https://github.com/user-attachments/assets/fe380ced-bd03-4022-b6e2-d07b139924cd" />
<br>
<img width="692" height="260" alt="image" src="https://github.com/user-attachments/assets/63e84279-adb3-4464-87ae-94112a438361" />
</p>


### אינדקס 2: חיפוש משתתפים לפי שם משפחה
**תיאור:** אינדקס על עמודת `LastName` בטבלת המשתתפים (`PARTICIPANT`).
**מוטיבציה ותועלת:** מנהלי המערכת צריכים לעיתים קרובות לחפש משתתפים ספציפיים (לצורך בירורים, תשלומים או עדכונים) לפי שם המשפחה שלהם, בעזרת חיפושים כמו `LIKE`. אינדקס B-Tree על עמודת טקסט מייעל משמעותית שאילתות חיפוש אלו.

**פקודת היצירה:**
```sql
CREATE INDEX idx_participant_lastname ON PARTICIPANT(LastName);
```

**זמני ריצה עבור חיפוש משתתפים ששם משפחתם מתחיל באות 'S':**
* תמונת זמן הריצה **לפני** יצירת האינדקס:
<p align="center">
<img width="603" height="618" alt="image" src="https://github.com/user-attachments/assets/0740d548-fcee-4bb4-ac5d-5111b09ef126" />
</p>

* תמונת זמן הריצה **אחרי** יצירת האינדקס:
<p align="center">
<img width="639" height="577" alt="image" src="https://github.com/user-attachments/assets/5cf79126-caaf-424e-b984-8faefae282f9" />
<br>
<img width="659" height="176" alt="image" src="https://github.com/user-attachments/assets/70503422-f057-44f1-97fb-4ea1c596a989" />
</p>


### אינדקס 3: חיפוש טיולים לפי תאריך התחלה
**תיאור:** אינדקס על עמודת תאריך ההתחלה (`StartDate`) בטבלת הטיולים (`TRIP`).
**מוטיבציה ותועלת:** שליפת טיולים לפי טווח תאריכים (למשל, כל הטיולים בקיץ 2026) היא פעולה קריטית להפקת דו"חות חודשיים והערכת הכנסות צפויות. אינדקס על תאריכים מקצר משמעותית את זמן השליפה של טווחי זמן.

**פקודת היצירה:**
```sql
CREATE INDEX idx_trip_startdate ON TRIP(StartDate);
```

**זמני ריצה עבור חיפוש טיולים בשנת 2025:**
* תמונת זמן הריצה **לפני** יצירת האינדקס:
<p align="center">
<img width="583" height="63" alt="image" src="https://github.com/user-attachments/assets/5a1bb265-69f4-4365-83cd-e119c6b1946e" />
</p>

* תמונת זמן הריצה **אחרי** יצירת האינדקס:
<p align="center">
<img width="599" height="67" alt="image" src="https://github.com/user-attachments/assets/ca107158-6674-45ce-a657-4099d76d991c" />
<br>
<img width="683" height="134" alt="image" src="https://github.com/user-attachments/assets/be9bfcf3-6652-4146-a11e-40d0da9e293b" />
</p>

---

<a name="אינטגרציה-עם-פרויקט-נוסף-שלב-ג"></a>
## 🔮 שלב ג' - אינטגרציה ומבטים

במסגרת שלב זה שילבנו את מודל הנתונים שלנו עם פרויקט נוסף. יצרנו סכמה מאוחדת המשלבת את שני מודלי הנתונים בצורה חלקה ויעילה.

**תוכן עניינים פנימי - שלב ג':**
* [תרשימי ERD ו-DSD של האגף החדש והמודל המאוחד](#1-תרשימי-erd-ו-dsd-של-האגף-החדש-והמודל-המאוחד)
* [החלטות שנעשו בשלב האינטגרציה](#2-החלטות-שנעשו-בשלב-האינטגרציה)
* [תיעוד שלבי ביצוע ריצת סקריפט האינטגרציה (Integrate.sql)](#3-תיעוד-שלבי-ביצוע-ריצת-סקריפט-האינטגרציה-integratesql)
* [פקודות ליצירת המבטים והשאילתות (Views.sql)](#4-פקודות-ליצירת-המבטים-והשאילתות-viewssql)
* [קובץ גיבוי מעודכן (Backup3)](#5-קובץ-גיבוי-מעודכן-backup3)

---

<a name="1-תרשימי-erd-ו-dsd-של-האגף-החדש-והמודל-המאוחד"></a>
### 📊 1. תרשימי ERD ו-DSD של האגף החדש והמודל המאוחד

#### 🔹 תרשים ERD - אגף חדש (הפרויקט השני)
<img width="1707" height="897" alt="image" src="https://github.com/user-attachments/assets/d34ce6ec-ea9b-4dd6-af10-899fd4d90cac" />

#### 🔹 תרשים DSD - אגף חדש (הפרויקט השני)
<img width="1005" height="1188" alt="Untitled" src="https://github.com/user-attachments/assets/a7ac90ee-7380-4a07-829f-4d8889e6c12b" />

#### 🔹 תרשים ERD משותף (Combined ERD)
<img width="5664" height="2478" alt="erdplus (3)" src="https://github.com/user-attachments/assets/7761bfc6-d4c8-4842-b924-f7a2dfab021c" />


#### 🔹 תרשים DSD לאחר אינטגרציה (Combined DSD)
<img width="1989" height="1247" alt="Untitled (1)" src="https://github.com/user-attachments/assets/dd3c938d-5173-4626-91b6-b3c7e034f692" />


---

<a name="2-החלטות-שנעשו-בשלב-האינטגרציה"></a>
### 🧠 2. החלטות שנעשו בשלב האינטגרציה

1. **שמירה על מבנה שתי המערכות**: כלל הטבלאות המקוריות משני הפרויקטים נשמרו כדי למנוע פגיעה בפונקציונליות הקיימת.
2. **מניעת התנגשויות מפתחות ראשיים (Primary Keys)**: הוחלט להוסיף הזחה (Offset) של `1,000,000` לכל המזהים (`ID`) המיובאים מהקבוצה השנייה בטבלאות המשותפות שמוזגו (`PARTICIPANT`, `TRIP`, `LOCATION`).
3. **מיזוג ישויות חופפות והתאמת מבנה**:
   * **טבלת `TRIP` המאוחדת**: התווספה עמודת `GuideId` לקשר בין הטיולים המאוחדים למדריכים מהפרויקט השני.
   * **טבלת `PARTICIPANT` המאוחדת**: התווספה עמודת `Age` עבור המטיילים מהפרויקט השני, תוך שמירה על עמודת `birthday` למטיילים שלנו.
4. **טיפול באי-תאימות אילוצים (Constraints Nullability)**:
   * העמודות `birthday` ו-`Phone` בטבלת `PARTICIPANT` המאוחדת שונו ל-`NULL` (ביטול אילוץ `NOT NULL`), מכיוון שבנתוני הקבוצה השנייה שדות אלו אינם קיימים או שהם אופציונליים.
   * העמודה `Trip_Type` בטבלת `TRIP` המאוחדת שונתה גם היא ל-`NULL` מאותה סיבה.
5. **פתרון התנגשות אילוצי ייחודיות (Unique Constraints)**:
   * למניעת כשל בייבוא עקב אימיילים כפולים (שכן קיים אילוץ `UNIQUE` על שדה ה-`Email` בטבלת המשתתפים), הוחלט להוסיף סיומת `_peer` לכתובות האימייל המיובאות מהקבוצה השנייה.
6. **הרחבת טיפוסים (Data Types)**:
   * שדה ה-`Email` הורחב ל-`VARCHAR(100)` ושדה `Trip_Type` הורחב ל-`VARCHAR(50)` כדי להתאים לאורכי הנתונים של הקבוצה השנייה ולמנוע שגיאות חריגת אורך.
7. **שיוך מחדש של קשרים בטבלאות הבנות**:
   * עדכון מזהי הטיולים והמיקומים בטבלאות האירועים וההרשמות של הקבוצה השנייה (`event`, `participantgroup`, `grouptrip`) בהתאם להזחה של ה-`1,000,000`, וקישורן מחדש לטבלאות הממוזגות באמצעות מפתחות זרים (`Foreign Keys`).

---

<a name="3-תיעוד-שלבי-ביצוע-ריצת-סקריפט-האינטגרציה-integratesql"></a>
### 🛠️ 3. תיעוד שלבי ביצוע ריצת סקריפט האינטגרציה (Integrate.sql)

להלן תיעוד מפורט של שלבי הרצת סקריפט האינטגרציה (`Integrate.sql`) ב-**pgAdmin** למטרת מיזוג הנתונים ושילוב בסיסי הנתונים בצורה חלקה וחסינת שגיאות:

#### 📍 שלב 1: שינוי זמני של שמות הטבלאות המשותפות שלנו
מטרת השלב היא מניעת התנגשויות שמות במערכת כאשר נטען את הגיבוי והטבלאות של הקבוצה השנייה.
```sql
ALTER TABLE IF EXISTS PARTICIPANT RENAME TO our_participant;
ALTER TABLE IF EXISTS TRIP RENAME TO our_trip;
ALTER TABLE IF EXISTS LOCATION RENAME TO our_location;
```
*צילום מסך של הצלחת הרצת שלב 1 ב-pgAdmin:*
<p align="center">
  <img width="1919" height="831" alt="Screenshot 2026-05-24 104550" src="https://github.com/user-attachments/assets/519e653a-8d09-4dc7-aea2-f32b8907fb4a" />
</p>

#### 📍 שלב 2: התאמת המבנה של הטבלאות המקוריות שלנו
הוספת שדות חסרים (כגון גיל ומפתח למדריך), הרחבת אורכי VARCHAR וביטול אילוצים (`NOT NULL`) המונעים שגיאות קליטה עקב הבדלים במותאמים במודלים של שתי הקבוצות:
```sql
-- 1. התאמת PARTICIPANT
ALTER TABLE our_participant ADD COLUMN IF NOT EXISTS Age INT CHECK (Age > 0);
ALTER TABLE our_participant ALTER COLUMN birthday DROP NOT NULL;
ALTER TABLE our_participant ALTER COLUMN Phone DROP NOT NULL;
ALTER TABLE our_participant ALTER COLUMN Email TYPE VARCHAR(100);

-- 2. התאמת TRIP
ALTER TABLE our_trip ADD COLUMN IF NOT EXISTS GuideId INT;
ALTER TABLE our_trip ALTER COLUMN Trip_Type DROP NOT NULL;
ALTER TABLE our_trip ALTER COLUMN Trip_Type TYPE VARCHAR(50);
```
*צילום מסך של הצלחת הרצת שלב 2 ב-pgAdmin:*
<p align="center">
  <img width="1919" height="833" alt="Screenshot 2026-05-24 105208" src="https://github.com/user-attachments/assets/4877db92-06c6-42e8-a05b-830ccaf5ca4a" />
  <br>
  <img width="1914" height="837" alt="Screenshot 2026-05-24 105321" src="https://github.com/user-attachments/assets/81160e44-b720-4ee1-a0a8-c98d0ddda1cc" />
</p>

#### 📍 שלב 2.5: הרצת קובץ הגיבוי ויצירת הטבלאות של הקבוצה השנייה
בשלב זה מריצים את הגיבוי של הקבוצה השנייה המייצר את הטבלאות שלהן בבסיס הנתונים.
*צילום מסך של הרצת הגיבוי וטעינת הנתונים ב-pgAdmin:*
<img width="367" height="534" alt="image" src="https://github.com/user-attachments/assets/3fdadf9c-cc2c-467f-8457-3843fea59090" />

#### 📍 שלב 3: העתקת הנתונים שלהן לטבלאות שלנו עם היסט (Offset) של 1,000,000
העתקת המשתתפים (תוך פתרון ייחודיות אימייל ע"י הוספת סיומת `_peer`), המיקומים והטיולים לתוך הטבלאות המורחבות שלנו:
```sql
-- 1. העתקת משתתפים
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
  NULL,
  age
FROM participant;
```
<p align="center">
  <img width="1436" height="385" alt="Screenshot 2026-05-24 105501" src="https://github.com/user-attachments/assets/a2a2f46b-2550-4d65-a3c6-540790db293c" />
</p>

```sql
-- 2. העתקת מיקומים
INSERT INTO our_location (LocationID, LocationName, Region, Address, Description)
SELECT 
  locationid + 1000000, 
  locationname, 
  region, 
  address, 
  description
FROM location;
```
<p align="center">
  <img width="1917" height="841" alt="Screenshot 2026-05-24 105532" src="https://github.com/user-attachments/assets/7b2af42b-e61f-4483-a267-b43b8a6db748" />
</p>

```sql
-- 3. העתקת טיולים
INSERT INTO our_trip (TripID, TripName, StartDate, EndDate, GroupSize, Trip_Type, GuideId)
SELECT 
  tripid + 1000000, 
  tripname, 
  startdate, 
  enddate, 
  1,
  triptype,
  guideid
FROM trip;
```
<p align="center">
  <img width="1919" height="826" alt="Screenshot 2026-05-24 105649" src="https://github.com/user-attachments/assets/3b79bd32-6c57-4ef5-b56e-3c6710d6388c" />
</p>

#### 📍 שלב 4: מחיקת טבלאות המקור הכפולות שלהן
שימוש ב-`CASCADE` מאפשר להסיר את טבלאות המקור הכפולות שלהן שסיימנו להעתיק, ומסיר את אילוצי המפתח הזר הישנים שלהן כדי שנוכל לקשר אותן בצורה חדשה וממוזגת:
```sql
DROP TABLE IF EXISTS participant CASCADE;
DROP TABLE IF EXISTS trip CASCADE;
DROP TABLE IF EXISTS location CASCADE;
```
*צילום מסך של הצלחת הרצת שלב 4 ב-pgAdmin:*
<p align="center">
  <img width="1919" height="834" alt="Screenshot 2026-05-24 105721" src="https://github.com/user-attachments/assets/932dbec0-05e5-4a7c-9139-b2cbce34baaa" />
</p>

#### 📍 שלב 5: עדכון מפתחות זרים בטבלאות הבנות שלהן בהתאמה מלאה להיסט של ה-`1,000,000`
```sql
-- 1. עדכון טבלת אירועים (event)
UPDATE event SET tripid = tripid + 1000000 WHERE tripid IS NOT NULL;
UPDATE event SET locationid = locationid + 1000000;
```
<p align="center">
  <img width="1919" height="843" alt="Screenshot 2026-05-24 105833" src="https://github.com/user-attachments/assets/90dc2abd-3890-4533-91a5-6152cb220cba" />
</p>

```sql
-- 2. עדכון טבלת קשר משתתפים בקבוצה (participantgroup)
UPDATE participantgroup SET participantid = participantid + 1000000;
```
<p align="center">
  <img width="1919" height="787" alt="Screenshot 2026-05-24 110305" src="https://github.com/user-attachments/assets/458bf00e-4afd-432d-9e49-044035fa46ac" />
</p>

```sql
-- 3. עדכון טבלת קשר קבוצות בטיול (grouptrip)
UPDATE grouptrip SET tripid = tripid + 1000000;
```
<p align="center">
  <img width="1919" height="831" alt="Screenshot 2026-05-24 110335" src="https://github.com/user-attachments/assets/29514ee4-287e-41df-a9b2-a79705b57966" />
</p>

#### 📍 שלב 6: יצירה מחדש של קשרי מפתח זר לטבלאות הממוזגות שלנו
```sql
-- 1. קישור אירועים (event) לטיול ולמיקום הממוזגים
ALTER TABLE event ADD CONSTRAINT fk_event_our_trip FOREIGN KEY (tripid) REFERENCES our_trip(TripID);
ALTER TABLE event ADD CONSTRAINT fk_event_our_location FOREIGN KEY (locationid) REFERENCES our_location(LocationID);
```
<p align="center">
  <img width="1913" height="835" alt="Screenshot 2026-05-24 110755" src="https://github.com/user-attachments/assets/06554914-d501-4ffb-80ee-637fa12afb81" />
</p>

```sql
-- 2. קישור מפתחות זרים של participantgroup
ALTER TABLE participantgroup ADD CONSTRAINT fk_pg_our_participant FOREIGN KEY (participantid) REFERENCES our_participant(ParticipantID);
ALTER TABLE participantgroup ADD CONSTRAINT fk_pg_group FOREIGN KEY (groupid) REFERENCES "GROUP"(groupid);
```
<p align="center">
  <img width="1919" height="834" alt="Screenshot 2026-05-24 110829" src="https://github.com/user-attachments/assets/1859a070-2d98-46d3-8fca-afe3cb85b195" />
</p>

```sql
-- 3. קישור מפתחות זרים של grouptrip
ALTER TABLE grouptrip ADD CONSTRAINT fk_gt_group FOREIGN KEY (groupid) REFERENCES "GROUP"(groupid);
ALTER TABLE grouptrip ADD CONSTRAINT fk_gt_trip FOREIGN KEY (tripid) REFERENCES our_trip(TripID);
```
<p align="center">
  <img width="1919" height="820" alt="Screenshot 2026-05-24 110857" src="https://github.com/user-attachments/assets/03d9ce7a-9bff-4467-9bbc-69cb4186e0a6" />
</p>

```sql
-- 4. קישור הטיולים הממוזגים למדריכים
ALTER TABLE our_trip ADD CONSTRAINT fk_trip_guide FOREIGN KEY (GuideId) REFERENCES guide(guideid);
```
<p align="center">
  <img width="1916" height="832" alt="Screenshot 2026-05-24 110948" src="https://github.com/user-attachments/assets/40730dec-c690-4492-8b11-65e2c37edd92" />
</p>

#### 📍 שלב 7: החזרת שמות הטבלאות המשותפות לשמות המקוריים
```sql
ALTER TABLE our_trip RENAME TO TRIP;
ALTER TABLE our_participant RENAME TO PARTICIPANT;
ALTER TABLE our_location RENAME TO LOCATION;
```
*צילום מסך של הצלחת הרצת שלב 7 ב-pgAdmin:*
<p align="center">
  <img width="1919" height="830" alt="Screenshot 2026-05-24 111017" src="https://github.com/user-attachments/assets/35d390cf-ed32-49ff-b2bc-88588c05835a" />
</p>

#### 📊 תמונת מצב סופית (Tables List)
*צילום מסך של רשימת הטבלאות הסופית (16 טבלאות) הממוזגות והנקיות ב-pgAdmin:*
<p align="center">
  <img width="444" height="623" alt="image" src="https://github.com/user-attachments/assets/059a3189-8268-4e12-9acb-2cb84ccfab90" />
</p>


---

<a name="4-פקודות-ליצירת-המבטים-והשאילתות-viewssql"></a>
### 👁️ 4. פקודות ליצירת המבטים והשאילתות (Views.sql)

בשלב זה יצרנו שני מבטים (Views) המציגים מידע לוגיסטי ותפעולי מורכב המשלב מספר טבלאות. עבור כל מבט נכתבו שתי שאילתות משמעותיות לצורך ניתוח ובקרה.

קובץ ה-SQL המלא המכיל את הגדרות המבטים והשאילתות:  
🔗 [צפייה ב-Views.sql](./DBProject/8578_3938/שלב%20ג/Views.sql)

---

#### 🔹 מבט 1: `Trip_Logistics_Summary` (מנקודת המבט של אגף הלוגיסטיקה)
**תיאור מילולי:** מבט המרכז ומסכם את המשאבים הלוגיסטיים שהוקצו לכל טיול. הוא מציג את כמות פריטי הציוד הייחודיים, סך כמות הציוד המצטבר שהוקצה, מספר הרכבים הייחודיים שהוזמנו, וסך קיבולת הנוסעים של כל הרכבים בטיול. המבט משלב את הטבלאות `TRIP`, `TRIP_EQUIPMENT`, `TRIP_TRANSPORTATION` ו-`TRANSPORTATION`.

**קוד יצירת המבט (SQL):**
```sql
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
```

<p align="center">
  <img src="https://github.com/user-attachments/assets/ea1817b9-2d16-42c6-9ebc-e02b392aeaa9" alt="פלט שליפת נתונים ממבט 1" width="700">
</p>

##### ❓ שאילתות על מבט 1:
* **שאילתה 1.1:** מציאת טיולים שבהם הוקצה ציוד כלשהו, אך לא הוזמן עבורם אף רכב הסעה (מצב הדורש תיאום תחבורה מיידי לציוד או למשתתפים).
  
  **קוד השאילתה:**
  ```sql
  SELECT 
      TripID, 
      TripName, 
      StartDate, 
      Total_Allocated_Equipment, 
      Unique_Vehicles
  FROM Trip_Logistics_Summary
  WHERE Total_Allocated_Equipment > 0 AND Unique_Vehicles = 0
  ORDER BY StartDate;
  ```
  
  **צילום פלט השאילתה:**
  <p align="center">
    <img src="https://github.com/user-attachments/assets/d7f34e4c-f829-495e-a584-f17ae550640f" alt="פלט שאילתה 1.1" width="700">
  </p>

* **שאילתה 1.2:** איתור טיולים עתידיים שבהם סך קיבולת הרכבים שהוזמנו נמוכה מ-50 נוסעים, לצורך בקרה וזיהוי קבוצות שעלולות להזדקק להסעה נוספת.
  
  **קוד השאילתה:**
  ```sql
  SELECT 
      TripID, 
      TripName, 
      StartDate, 
      Total_Vehicle_Capacity
  FROM Trip_Logistics_Summary
  WHERE StartDate >= CURRENT_DATE AND Total_Vehicle_Capacity < 50
  ORDER BY Total_Vehicle_Capacity;
  ```
  
  **צילום פלט השאילתה:**
  <p align="center">
    <img src="https://github.com/user-attachments/assets/eeea8dd1-d5c1-4da6-b5af-a2523085774a" alt="פלט שאילתה 1.2" width="700">
  </p>

---

#### 🔹 מבט 2: `Guide_Performance_View` (מנקודת המבט של אגף מדריכים ואירועים)
**תיאור מילולי:** מבט המציג נתונים סטטיסטיים וסיכום ביצועים עבור כל מדריך. המבט מציג את מספר הקבוצות שהמדריך מנהל באופן פעיל, מספר הטיולים השונים שמשויכים אליו, ומספר האירועים השונים בטיולים אלו שבהם הוא מעורב. המבט משלב את הטבלאות `guide`, `"GROUP"`, `TRIP` ו-`event`.

**קוד יצירת המבט (SQL):**
```sql
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
```

<p align="center">
  <img src="https://github.com/user-attachments/assets/de0a966a-f85d-475c-b35d-477d773936d7" alt="פלט שליפת נתונים ממבט 2" width="700">
</p>

##### ❓ שאילתות על מבט 2:
* **שאילתה 2.1:** מציאת מדריכים מנוסים (מעל 3 שנות ניסיון) שמנהלים לפחות קבוצה אחת, אך טרם שויך להם טיול פעיל בלוח הזמנים.
  
  **קוד השאילתה:**
  ```sql
  SELECT 
      Guide_ID, 
      Guide_Name, 
      Experience_Years, 
      Managed_Groups, 
      Assigned_Trips
  FROM Guide_Performance_View
  WHERE Experience_Years > 3 AND Managed_Groups > 0 AND Assigned_Trips = 0
  ORDER BY Experience_Years DESC;
  ```
  
  **צילום פלט השאילתה:**
  <p align="center">
    <img src="https://github.com/user-attachments/assets/c58537fe-7e40-4c39-b3f0-ab1975084947" alt="פלט שאילתה 2.1" width="700">
  </p>

* **שאילתה 2.2:** חישוב ממוצע הטיולים והאירועים המשויכים למדריכים לפי תחומי ההתמחות שלהם, כדי לבחון עומסים בין התמחויות שונות.
  
  **קוד השאילתה:**
  ```sql
  SELECT 
      Guide_Specialization,
      COUNT(Guide_ID) AS Number_Of_Guides,
      ROUND(AVG(Assigned_Trips), 2) AS Avg_Assigned_Trips,
      ROUND(AVG(Related_Events), 2) AS Avg_Related_Events
  FROM Guide_Performance_View
  GROUP BY Guide_Specialization
  ORDER BY Avg_Assigned_Trips DESC;
  ```
  
  **צילום פלט השאילתה:**
  <p align="center">
    <img src="https://github.com/user-attachments/assets/20424bc9-9eac-46ce-a3d5-102cb7aad973" alt="פלט שאילתה 2.2" width="700">
  </p>


---

<a name="5-קובץ-גיבוי-מעודכן-backup3"></a>
### 💾 5. קובץ גיבוי מעודכן (Backup3)

קובץ הגיבוי המעודכן המכיל את כלל הישויות, קשרי הגומלין והנתונים לאחר תהליך האינטגרציה הכללית:
* [צפייה בקובץ הגיבוי Backup3](./DBProject/8578_3938/שלב%20ג/Backup3)

---

<a name="שלב-ד"></a>
## ⚙️ שלב ד' - תכנות ובדיקות (PL/pgSQL)

בשלב זה כתבנו תוכניות לא טריוויאליות בשפת **PL/pgSQL** המורצות ישירות מעל בסיס הנתונים המשולב והמורחב של המערכת. התוכניות עושות שימוש בכלל האלמנטים המורכבים הנדרשים: סמנים (Cursors) מפורשים ומשתנים, לולאות, תנאים והסתעפויות, פקודות DML, טיפול מובנה בחריגות (Exceptions) ושימוש ברשומות דינמיות ומבוססות טבלה `%ROWTYPE`.

**תוכן עניינים פנימי - שלב ד':**
* [1. שינויים במבנה הטבלאות (AlterTable.sql)](#1-שינויים-במבנה-הטבלאות-altertablesql)
* [2. פונקציות (Functions)](#2-פונקציות-functions)
* [3. פרוצדורות (Procedures)](#3-פרוצדורות-procedures)
* [4. טריגרים (Triggers)](#4-טריגרים-triggers)
* [5. תוכניות ראשיות ובדיקות (Main Programs)](#5-תוכניות-ראשיות-ובדיקות-main-programs)
* [6. קובץ גיבוי מעודכן (backup4)](#6-קובץ-גיבוי-מעודכן-backup4)

---

### 1. שינויים במבנה הטבלאות (AlterTable.sql)

כדי לאפשר מעקב והתראות לוגיסטיות שנוצרות בזמן אמת עקב עדכונים בבסיס הנתונים, יצרנו טבלה חדשה בשם `logistics_warnings` שבה נרשמות התראות אוטומטיות.

* **קוד הסקריפט:** [AlterTable.sql](./DBProject/8578_3938/שלב%20ד/AlterTable.sql)
```sql
CREATE TABLE IF NOT EXISTS logistics_warnings (
    WarningID SERIAL PRIMARY KEY,
    TripID INT,
    WarningType VARCHAR(50) NOT NULL,
    Message TEXT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (TripID) REFERENCES TRIP(TripID) ON DELETE CASCADE
);
```

#### 📸 הוכחת הרצה:
הרצת הסקריפט עברה בהצלחה מול בסיס הנתונים:
`CREATE TABLE`
<!-- צילום מסך של יצירת הטבלה -->

---

### 2. פונקציות (Functions)

#### 🔹 א. פונקציה 1: `get_available_equipment_report`
* **תיאור מילולי:** פונקציה זו מקבלת מזהה ספק (`p_supplier_id`). היא בודקת תחילה אם הספק קיים במערכת (אם לא, נזרקת חריגה). לאחר מכן, היא פותחת ומחזירה **Ref Cursor** מפורש המכיל את רשימת פריטי הציוד המשויכים לספק, תוך חישוב של סך המלאי הקיים, הכמות המשוריינת כעת לטיולים פעילים (שטרם הוחזרו), והמלאי הנטו הזמין להשאלה מיידית.
* **קוד הפונקציה:** [get_available_equipment_report.sql](./DBProject/8578_3938/שלב%20ד/get_available_equipment_report.sql)
```sql
CREATE OR REPLACE FUNCTION get_available_equipment_report(p_supplier_id INT)
RETURNS REFCURSOR AS $$
DECLARE
    v_supplier_name VARCHAR(50);
    ref_cursor REFCURSOR := 'equipment_cursor';
BEGIN
    SELECT Company_Name INTO v_supplier_name FROM SUPPLIER WHERE SupplierID = p_supplier_id;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Supplier with ID % not found', p_supplier_id;
    END IF;
    
    OPEN ref_cursor FOR
        SELECT 
            E.EquipmentID,
            E.ItemName,
            E.TotalInStock,
            COALESCE(SUM(TE.QuantityAllocated), 0) AS TotalAllocated,
            E.TotalInStock - COALESCE(SUM(TE.QuantityAllocated), 0) AS NetAvailable
        FROM EQUIPMENT E
        LEFT JOIN TRIP_EQUIPMENT TE ON E.EquipmentID = TE.EquipmentID AND TE.Return_Date IS NULL
        WHERE E.SupplierID = p_supplier_id
        GROUP BY E.EquipmentID, E.ItemName, E.TotalInStock;
        
    RETURN ref_cursor;
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error in get_available_equipment_report: %', SQLERRM;
        RAISE;
END;
$$ LANGUAGE plpgsql;



```
<img width="512" height="260" alt="image" src="https://github.com/user-attachments/assets/bfeaed7f-3934-413d-b8a8-b460a350b220" />

#### 🔹 ב. פונקציה 2: `check_trip_transport_capacity`
* **תיאור מילולי:** פונקציה זו מקבלת מזהה טיול (`p_trip_id`). היא טוענת את רשומת הטיול לתוך משתנה רשומה מסוג `%ROWTYPE`. היא סופרת את כמות המשתתפים הרשומים לטיול, ואז משתמשת ב**סמן מפורש ובלולאה** כדי לעבור על כל כלי התחבורה שהוקצו לטיול ולסכם את קיבולת הנוסעים הכוללת שלהם. בסיום, היא משתמשת בהסתעפות כדי להחזיר הודעת סטטוס מפורטת: האם יש מספיק מקומות ישיבה, האם יש חוסר (וכמה מושבים חסרים), או שמא לא הוקצו הסעות בכלל.
* **קוד הפונקציה:** [check_trip_transport_capacity.sql](./DBProject/8578_3938/שלב%20ד/check_trip_transport_capacity.sql)
```sql
CREATE OR REPLACE FUNCTION check_trip_transport_capacity(p_trip_id INT)
RETURNS VARCHAR AS $$
DECLARE
    v_trip_record TRIP%ROWTYPE;
    v_participant_count INT;
    v_total_capacity INT := 0;
    v_transport_rec RECORD;
    v_result VARCHAR(200);
    
    v_transport_cursor CURSOR FOR 
        SELECT TR.Capacity 
        FROM TRIP_TRANSPORTATION TT
        JOIN TRANSPORTATION TR ON TT.TransportID = TR.TransportID
        WHERE TT.TripID = p_trip_id;
BEGIN
    SELECT * INTO v_trip_record FROM TRIP WHERE TripID = p_trip_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Trip with ID % not found', p_trip_id;
    END IF;
    
    SELECT COUNT(*) INTO v_participant_count FROM REGISTERS_TO WHERE TripID = p_trip_id;
    
    OPEN v_transport_cursor;
    LOOP
        FETCH v_transport_cursor INTO v_transport_rec;
        EXIT WHEN NOT FOUND;
        v_total_capacity := v_total_capacity + v_transport_rec.Capacity;
    END LOOP;
    CLOSE v_transport_cursor;
    
    IF v_total_capacity = 0 THEN
        v_result := 'WARNING: No transportation allocated for trip: ' || v_trip_record.TripName;
    ELSIF v_total_capacity < v_participant_count THEN
        v_result := 'INSUFFICIENT CAPACITY: ' || (v_participant_count - v_total_capacity) || ' participants lack seats.';
    ELSE
        v_result := 'SUFFICIENT: Total capacity (' || v_total_capacity || ') meets or exceeds registered participants (' || v_participant_count || ').';
    END IF;
    
    RETURN v_result;
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error in check_trip_transport_capacity: %', SQLERRM;
        RAISE;
END;
$$ LANGUAGE plpgsql;



```
<img width="512" height="262" alt="image" src="https://github.com/user-attachments/assets/52fb6fca-990b-4419-9aab-25733195cb20" />

---

### 3. פרוצדורות (Procedures)

#### 🔹 א. פרוצדורה 1: `allocate_equipment_to_trip`
* **תיאור מילולי:** פרוצדורה זו מקבלת מזהה טיול, מזהה ציוד וכמות להקצאה. היא מבצעת ולידציות: האם הטיול והציוד קיימים, והאם הכמות המבוקשת חיובית ונמצאת במלאי. אם הכל תקין, היא מבצעת **פקודות DML**: במידה וכבר קיימת הקצאה לטיול היא מעדכנת אותה (`UPDATE`), ובמידה ולא - היא מוסיפה שורה חדשה (`INSERT`).
* **קוד הפרוצדורה:** [allocate_equipment_to_trip.sql](./DBProject/8578_3938/שלב%20ד/allocate_equipment_to_trip.sql)
```sql
CREATE OR REPLACE PROCEDURE allocate_equipment_to_trip(
    p_trip_id INT,
    p_equipment_id INT,
    p_quantity INT
) AS $$
DECLARE
    v_trip_start DATE;
    v_available_stock INT;
    v_current_allocated INT;
BEGIN
    SELECT StartDate INTO v_trip_start FROM TRIP WHERE TripID = p_trip_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Trip with ID % not found', p_trip_id;
    END IF;
    
    SELECT TotalInStock INTO v_available_stock FROM EQUIPMENT WHERE EquipmentID = p_equipment_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Equipment with ID % not found', p_equipment_id;
    END IF;
    
    IF p_quantity <= 0 THEN
        RAISE EXCEPTION 'Allocation quantity must be greater than zero. Provided: %', p_quantity;
    END IF;

    IF v_available_stock < p_quantity THEN
        RAISE EXCEPTION 'Insufficient stock. Equipment ID: %, Available: %, Requested: %', 
            p_equipment_id, v_available_stock, p_quantity;
    END IF;
    
    SELECT QuantityAllocated INTO v_current_allocated 
    FROM TRIP_EQUIPMENT 
    WHERE TripID = p_trip_id AND EquipmentID = p_equipment_id;
    
    IF FOUND THEN
        UPDATE TRIP_EQUIPMENT
        SET QuantityAllocated = QuantityAllocated + p_quantity,
            Checkout_Date = v_trip_start
        WHERE TripID = p_trip_id AND EquipmentID = p_equipment_id;
        
        RAISE NOTICE 'Updated existing allocation. Added % units of Equipment % to Trip %.', 
            p_quantity, p_equipment_id, p_trip_id;
    ELSE
        INSERT INTO TRIP_EQUIPMENT (TripID, EquipmentID, QuantityAllocated, Checkout_Date)
        VALUES (p_trip_id, p_equipment_id, p_quantity, v_trip_start);
        
        RAISE NOTICE 'Created new allocation of % units of Equipment % to Trip %.', 
            p_quantity, p_equipment_id, p_trip_id;
    END IF;
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Transaction aborted due to error in allocate_equipment_to_trip: %', SQLERRM;
        RAISE;
END;
$$ LANGUAGE plpgsql;


```
<img width="512" height="251" alt="image" src="https://github.com/user-attachments/assets/8f4b4a5e-be8f-4cce-8627-bb5368e62b09" />

#### 🔹 ב. פרוצדורה 2: `register_participant_for_trip_secure`
* **תיאור מילולי:** פרוצדורה המיועדת לרישום מאובטח ותקין של משתתף לטיול. היא מוודאת שהמשתתף והטיול קיימים, שהטיול מתוכנן לעתיד (ולא התחיל או הסתיים בעבר), ושיש מקום פנוי בקבוצה (סך הרשומים קטן מ-`GroupSize`). במידה והבדיקות עוברות, מבוצעת פקודת DML מסוג `INSERT` לטבלת `registers_to`.
* **קוד הפרוצדורה:** [register_participant_for_trip_secure.sql](./DBProject/8578_3938/שלב%20ד/register_participant_for_trip_secure.sql)
```sql
CREATE OR REPLACE PROCEDURE register_participant_for_trip_secure(
    p_participant_id INT,
    p_trip_id INT
) AS $$
DECLARE
    v_trip_name VARCHAR(50);
    v_trip_start DATE;
    v_group_size INT;
    v_current_registrations INT;
    v_part_exists INT;
BEGIN
    SELECT 1 INTO v_part_exists FROM PARTICIPANT WHERE ParticipantID = p_participant_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Participant with ID % does not exist', p_participant_id;
    END IF;
    
    SELECT TripName, StartDate, GroupSize INTO v_trip_name, v_trip_start, v_group_size 
    FROM TRIP WHERE TripID = p_trip_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Trip with ID % does not exist', p_trip_id;
    END IF;
    
    IF v_trip_start < CURRENT_DATE THEN
        RAISE EXCEPTION 'Cannot register for a trip that has already started or ended. Start Date: %', v_trip_start;
    END IF;
    
    SELECT COUNT(*) INTO v_current_registrations FROM REGISTERS_TO WHERE TripID = p_trip_id;
    
    IF v_current_registrations >= v_group_size THEN
        RAISE EXCEPTION 'Trip % has reached maximum capacity of % participants', v_trip_name, v_group_size;
    END IF;
    
    INSERT INTO REGISTERS_TO (ParticipantID, TripID)
    VALUES (p_participant_id, p_trip_id);
    
    RAISE NOTICE 'Successfully registered Participant % for Trip % (%)', 
        p_participant_id, p_trip_id, v_trip_name;
        
EXCEPTION
    WHEN unique_violation THEN
        RAISE NOTICE 'Participant % is already registered for Trip % (Unique violation caught)', p_participant_id, p_trip_id;
    WHEN OTHERS THEN
        RAISE NOTICE 'Error in register_participant_for_trip_secure: %', SQLERRM;
        RAISE;
END;
$$ LANGUAGE plpgsql;

```
<img width="512" height="255" alt="image" src="https://github.com/user-attachments/assets/3dfc4092-255c-4d09-aa94-67da7116dd01" />
---

### 4. טריגרים (Triggers)

#### 🔹 א. טריגר 1 (BEFORE INSERT OR UPDATE): `trg_check_equipment_stock`
* **תיאור מילולי:** מופעל לפני עדכון או הוספת רשומה בטבלת הקצאות הציוד `trip_equipment`. הטריגר מונע מצב של רישום הקצאת ציוד הגבוהה מהמלאי הפיזי הזמין. הוא מחשב את סך ההקצאות הפעילות הקיימות (שטרם הוחזרו - `Return_Date IS NULL`) ומוודא שההקצאה החדשה לא תביא לחריגה מהמלאי הכולל שבטבלת `equipment`. במקרה של חריגה, נזרקת שגיאה שמכשילה את עסקת ה-DML.
* **קוד הטריגר:** [trg_check_equipment_stock.sql](./DBProject/8578_3938/שלב%20ד/trg_check_equipment_stock.sql)
```sql
CREATE OR REPLACE FUNCTION check_equipment_stock_trigger()
RETURNS TRIGGER AS $$
DECLARE
    v_total_stock INT;
    v_allocated_active INT;
BEGIN
    SELECT TotalInStock INTO v_total_stock FROM EQUIPMENT WHERE EquipmentID = NEW.EquipmentID;
    
    SELECT COALESCE(SUM(QuantityAllocated), 0) INTO v_allocated_active
    FROM TRIP_EQUIPMENT
    WHERE EquipmentID = NEW.EquipmentID 
      AND Return_Date IS NULL
      AND TripID != NEW.TripID;
      
    IF NEW.Return_Date IS NULL THEN
        v_allocated_active := v_allocated_active + NEW.QuantityAllocated;
    END IF;
    
    IF v_allocated_active > v_total_stock THEN
        RAISE EXCEPTION 'Cannot allocate % units of Equipment ID %. Total stock is %, while active allocations would reach %.', 
            NEW.QuantityAllocated, NEW.EquipmentID, v_total_stock, v_allocated_active;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_check_equipment_stock ON TRIP_EQUIPMENT;
CREATE TRIGGER trg_check_equipment_stock
BEFORE INSERT OR UPDATE ON TRIP_EQUIPMENT
FOR EACH ROW
EXECUTE FUNCTION check_equipment_stock_trigger();
```

##### 📸 הוכחת הרצה וזריקת שגיאה:
כאשר ניסינו לעדכן הקצאת ציוד מסוג ID 2 (שיש ממנו במלאי 16 יחידות והכול כבר מוקצה) ל-11 יחידות, הטריגר זרק את השגיאה הבאה ומנע את העדכון:
```
ERROR:  Cannot allocate 11 units of Equipment ID 2. Total stock is 16, while active allocations would reach 17.
CONTEXT:  PL/pgSQL function check_equipment_stock_trigger() line 23 at RAISE
```
<img width="512" height="169" alt="image" src="https://github.com/user-attachments/assets/f138d9dd-252d-4658-b9da-3fcb0f7eac86" />


---

#### 🔹 ב. טריגר 2 (AFTER UPDATE): `trg_audit_trip_changes`
* **תיאור מילולי:** מופעל לאחר עדכון שורות בטבלת הטיולים `trip`. הטריגר מיועד לבקרה לוגיסטית: במידה וגודל הקבוצה (`GroupSize`) עודכן כלפי מעלה, הוא בודק האם קיבולת ההסעות המשויכת לטיול עדיין מספקת. במידה ולא, הטריגר רושם אוטומטית התראה לוגיסטית חדשה (באמצעות פקודת `INSERT`) בטבלה החדשה `logistics_warnings`.
* **קוד הטריגר:** [trg_audit_trip_changes.sql](./DBProject/8578_3938/שלב%20ד/trg_audit_trip_changes.sql)
```sql
CREATE OR REPLACE FUNCTION audit_trip_changes_trigger()
RETURNS TRIGGER AS $$
DECLARE
    v_total_capacity INT := 0;
BEGIN
    IF NEW.GroupSize > OLD.GroupSize THEN
        SELECT COALESCE(SUM(TR.Capacity), 0) INTO v_total_capacity
        FROM TRIP_TRANSPORTATION TT
        JOIN TRANSPORTATION TR ON TT.TransportID = TR.TransportID
        WHERE TT.TripID = NEW.TripID;
        
        IF v_total_capacity < NEW.GroupSize THEN
            INSERT INTO logistics_warnings (TripID, WarningType, Message)
            VALUES (
                NEW.TripID, 
                'TRANSPORT_UNDER_CAPACITY',
                'Trip group size increased from ' || OLD.GroupSize || ' to ' || NEW.GroupSize || 
                ', which exceeds current allocated transportation capacity of ' || v_total_capacity || ' seats.'
            );
            RAISE NOTICE 'AUDIT: Logistics warning logged for Trip % (GroupSize % exceeds transport capacity %)', 
                NEW.TripID, NEW.GroupSize, v_total_capacity;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_audit_trip_changes ON TRIP;
CREATE TRIGGER trg_audit_trip_changes
AFTER UPDATE ON TRIP
FOR EACH ROW
EXECUTE FUNCTION audit_trip_changes_trigger();
```

##### 📸 הוכחת הרצה ועדכון בסיס הנתונים:
כאשר הרצנו עדכון המגדיל את גודל קבוצת טיול ID 1 ל-100 משתתפים (כאשר קיבולת הרכבים שהוזמנו היא 75), פלט הריצה הראה על רישום מוצלח של ההתראה:
```
NOTICE:  AUDIT: Logistics warning logged for Trip 1 (GroupSize 100 exceeds transport capacity 75)
UPDATE 1
```
שאילתת `SELECT * FROM logistics_warnings;` מוכיחה שהנתונים אכן התעדכנו בבסיס הנתונים:
```
 warningid | tripid |       warningtype        |                                                    message                                                     |         createdat          
-----------+--------+--------------------------+----------------------------------------------------------------------------------------------------------------+----------------------------
         1 |      1 | TRANSPORT_UNDER_CAPACITY | Trip group size increased from 16 to 100, which exceeds current allocated transportation capacity of 75 seats. | 2026-06-07 16:00:19.705711
(1 row)
```
<img width="512" height="124" alt="image" src="https://github.com/user-attachments/assets/2d6eaf10-3ded-4d05-8454-c3cb5b6d3252" />

---

### 5. תוכניות ראשיות ובדיקות (Main Programs)

#### 🔹 א. תוכנית ראשית 1 (`Main1.sql`)
* **תיאור מילולי:** תוכנית ראשית המזמנת את פונקציה 2 (`check_trip_transport_capacity`) לקבלת סטטוס ההסעות של טיול, ואת פרוצדורה 1 (`allocate_equipment_to_trip`) להקצאה תקינה של ציוד. בנוסף, היא מדגימה טיפול בחריגות על ידי ניסיון הקצאה של כמות גדולה מהמלאי תוך לכידת השגיאה והדפסתה.
* **קוד התוכנית:** [Main1.sql](./DBProject/8578_3938/שלב%20ד/Main1.sql)
```sql
DO $$
DECLARE
    v_status VARCHAR(200);
    v_trip_id INT := 1;        -- מזהה טיול קיים
    v_equip_id INT := 2;       -- מזהה פריט ציוד קיים
    v_quantity INT := 5;       -- כמות להקצאה
BEGIN
    RAISE NOTICE '==================================================';
    RAISE NOTICE 'התחלת תוכנית ראשית 1: בדיקת הסעות והקצאת ציוד';
    RAISE NOTICE '==================================================';
    
    RAISE NOTICE 'שלב א: בדיקת התאמת קיבולת ההסעות לטיול ID %...', v_trip_id;
    v_status := check_trip_transport_capacity(v_trip_id);
    RAISE NOTICE 'סטטוס קיבולת הסעות: %', v_status;
    
    RAISE NOTICE 'שלב ב: הקצאת % יחידות מפריט ציוד ID % לטיול ID %...', v_quantity, v_equip_id, v_trip_id;
    CALL allocate_equipment_to_trip(v_trip_id, v_equip_id, v_quantity);
    
    BEGIN
        RAISE NOTICE 'שלב ג: ניסיון הקצאה של כמות מוגזמת (999999 יח) כדי להדגים שגיאה...';
        CALL allocate_equipment_to_trip(v_trip_id, v_equip_id, 999999);
    EXCEPTION
        WHEN OTHERS THEN
            RAISE NOTICE 'נלכדה חריגה צפויה בהקצאת ציוד: %', SQLERRM;
    END;

    RAISE NOTICE '==================================================';
    RAISE NOTICE 'תוכנית ראשית 1 הסתיימה בהצלחה!';
    RAISE NOTICE '==================================================';
END $$;
```

##### 📸 פלט הרצה מלא (Messages):
<img width="512" height="258" alt="image" src="https://github.com/user-attachments/assets/f928ad56-6c0a-4ad3-ad52-0136101777c4" />

---

#### 🔹 ב. תוכנית ראשית 2 (`Main2.sql`)
* **תיאור מילולי:** תוכנית ראשית המזמנת את פונקציה 1 (`get_available_equipment_report`) המייצרת Ref Cursor. התוכנית פותחת את הסמן, עוברת בלולאה על כל שורות התוצאה ומדפיסה את פרטי הציוד והמלאי הקיים והזמין של הספק. לאחר מכן, היא מזמנת את פרוצדורה 2 (`register_participant_for_trip_secure`) לצורך רישום תקין של משתתף לטיול עתידי, ומדגימה טיפול בחריגות על ידי ניסיון רישום של מזהה משתתף שלילי שאינו קיים.
* **קוד התוכנית:** [Main2.sql](./DBProject/8578_3938/שלב%20ד/Main2.sql)
```sql
DO $$
DECLARE
    v_cursor REFCURSOR;
    v_equip_id INT;
    v_item_name VARCHAR(50);
    v_total_stock INT;
    v_allocated INT;
    v_net_available INT;
    
    v_supplier_id INT := 1;      -- מזהה ספק קיים
    v_participant_id INT := 5;   -- מזהה משתתף קיים
    v_trip_id INT := 3;          -- מזהה טיול קיים בעתיד (למשל Trip 3 מתחיל באוקטובר 2026)
BEGIN
    RAISE NOTICE '==================================================';
    RAISE NOTICE 'התחלת תוכנית ראשית 2: קריאת סמנים ורישום משתתף';
    RAISE NOTICE '==================================================';
    
    RAISE NOTICE 'שלב א: שליפת דוח ציוד עבור ספק ID %...', v_supplier_id;
    v_cursor := get_available_equipment_report(v_supplier_id);
    
    RAISE NOTICE 'הדפסת פריטי הציוד של הספק מתוך ה-Cursor:';
    LOOP
        FETCH v_cursor INTO v_equip_id, v_item_name, v_total_stock, v_allocated, v_net_available;
        EXIT WHEN NOT FOUND;
        RAISE NOTICE '  * קוד ציוד: %, שם: %, מלאי כללי: %, הוקצה: %, זמין נטו: %',
            v_equip_id, v_item_name, v_total_stock, v_allocated, v_net_available;
    END LOOP;
    CLOSE v_cursor;
    
    RAISE NOTICE 'שלב ב: רישום משתתף ID % לטיול ID %...', v_participant_id, v_trip_id;
    CALL register_participant_for_trip_secure(v_participant_id, v_trip_id);
    
    BEGIN
        RAISE NOTICE 'שלב ג: ניסיון רישום משתתף לא קיים כדי להדגים שגיאה...';
        CALL register_participant_for_trip_secure(-9999, v_trip_id);
    EXCEPTION
        WHEN OTHERS THEN
            RAISE NOTICE 'נלכדה חריגה צפויה ברישום משתתף: %', SQLERRM;
    END;
    
    RAISE NOTICE '==================================================';
    RAISE NOTICE 'תוכנית ראשית 2 הסתיימה בהצלחה!';
    RAISE NOTICE '==================================================';
END $$;
```

##### 📸 פלט הרצה מלא (Messages):
<img width="512" height="331" alt="image" src="https://github.com/user-attachments/assets/892eb061-f9ec-4e6a-b63c-923496a9e588" />

---

### 6. קובץ גיבוי מעודכן (backup4)

קובץ הגיבוי המעודכן המכיל את כלל הישויות, קשרי הגומלין, הנתונים, הפונקציות, הפרוצדורות והטריגרים לאחר סיום שלב ד':
* [צפייה בקובץ הגיבוי backup4](./DBProject/8578_3938/שלב%20ד/backup4)

---

<a name="שלב-ה"></a>
## 🎨 שלב ה' - ממשק משתמש (GUI)

בשלב זה לקחנו את מסד הנתונים שיצרנו בשלבים קודמים ובנינו עבורו ממשק משתמש גרפי המאפשר לבצע את כל הפעולות הנדרשות בצורה קלה, ידידותית ואינטואיטיבית, ללא צורך בידיעת SQL.

**תוכן עניינים פנימי - שלב ה':**
* [הוראות הפעלה](#הוראות-הפעלה)
* [ארכיטקטורה וכלים (דרך העבודה)](#ארכיטקטורה-וכלים-דרך-העבודה)
* [מימוש דרישות הפרויקט](#מימוש-דרישות-הפרויקט)
* [תמונות מסך של הפעלת האפליקציה](#תמונות-מסך-של-הפעלת-האפליקציה)

---

### הוראות הפעלה

האפליקציה נכתבה בשפת Python בסביבת Flask.
כדי להריץ אותה באופן מקומי, יש לבצע את השלבים הבאים:

1. פתחו Terminal / PowerShell וניווטו לתיקיית שלב ה':
   ```powershell
   cd "DBProject\8578_3938\שלב ה"
   ```
2. התקינו את התלויות הדרושות באמצעות מנהל החבילות:
   ```powershell
   pip install -r requirements.txt
   ```
3. הפעילו את השרת:
   ```powershell
   cd app
   python app.py
   ```
4. פתחו דפדפן וגשו לכתובת:
   [http://localhost:5000](http://localhost:5000)

*(הערה: יש לוודא ששרת ה-PostgreSQL פועל ברקע ושפרטי החיבור המוגדרים בקובץ `app/config.py` תואמים לפרטים במחשבכם).*

---

### ארכיטקטורה וכלים (דרך העבודה)

כדי לשמור על קוד מסודר ומקצועי, חילקנו את האפליקציה למספר שכבות לפי מודל ה-MVC (Model-View-Controller):

1. **שכבת התצוגה (Frontend / View):** 
   נכתבה באמצעות HTML, CSS מודרני, וג'אווה סקריפט בסיסי. עשינו שימוש במנוע התבניות **Jinja2** (שמובנה ב-Flask) כדי להזריק נתונים דינמיים מתוך מסד הנתונים ישירות לתוך טבלאות ה-HTML. בנינו עיצוב נקי ("תצוגה ידידותית למשתמש") הכולל תפריט ניווט עליון מרכזי המאפשר גישה לכל מסכי המערכת.

2. **שכבת השרת והניתוב (Backend / Controller):**
   נכתבה ב-**Python** עם ספריית **Flask**. השרת מוגדר בקובץ `app.py` שתפקידו לנתב בקשות URL למסכים המתאימים, לקבל את הטפסים שנשלחים מהדפדפן, ולהעביר אותם הלאה לשכבת מסד הנתונים.

3. **שכבת מסד הנתונים (Model):**
   נכתבה בקובץ `db.py` ומתחברת ל-PostgreSQL באמצעות ספריית `psycopg2`. שכבה זו מכילה את כל שאילתות ה-SQL של המערכת, מקבלת את הנתונים משכבת השרת, ומבצעת את פקודות ה-CRUD בפועל. השתמשנו בסמן מסוג `RealDictCursor` שמחזיר נתונים בפורמט נוח לשימוש (Dictionary) כדי להקל על הצגתם ב-HTML.

---

### מימוש דרישות הפרויקט

האפליקציה מממשת את כל הדרישות שהוגדרו:

* **תמיכה בכלל הטבלאות:** יצרנו מסכים נפרדים לניהול טיולים, משתתפים, ספקים, מיקומים, ציוד והסעות, וכן לטבלאות הקשר (כגון שיוך ציוד לטיול).
* **4 פעולות CRUD לכל טבלה:** כל מסך כולל טבלת הצגת נתונים (Read), כפתור למחיקת רשומה (Delete), וטופס עליון המשמש גם להוספה (Create) וגם לעריכה ועדכון נתונים קיימים (Update).
* **עדכון לפי מפתח:** בלחיצה על כפתור "ערוך" בשורת טבלה מסוימת, המערכת מזהה את המפתח (ID), מושכת את כל נתוני הרשומה מבסיס הנתונים, וממלאת את הטופס אוטומטית לעריכה נוחה.
* **תצוגת שמות במקום מזהים:** במסכים השונים (גם בטבלאות התצוגה וגם בטפסי ההוספה) דאגנו לבצע פקודות `JOIN` כדי להציג ערכים בעלי משמעות במקום מזהים מספריים. למשל, במקום מספר מזהה של טיול, מוצג שם הטיול; במקום מזהה ספק, מוצגת שם החברה המספקת. השליחות חזרה לשרת מתבצעות כמובן עם מזהי ה-ID התקינים באמצעות תגיות `<select>` קבועות.
* **הפעלת שאילתות (שלב ב'):** יצרנו מסך "שאילתות" (`/queries`) שמאפשר למשתמש להפעיל שאילתות נבחרות ולצפות בתוצאותיהן בזמן אמת.
* **הפעלת פונקציות ופרוצדורות (שלב ד'):** יצרנו מסך "תתי תוכניות" (`/subprograms`) ממנו ניתן להפעיל פרוצדורות (כגון הקצאת ציוד עם ולידציית מלאי, תוך הדפסת שגיאות צפויות) ופונקציות (כגון בדיקת עומס וקיבולת של הסעות בטיול) ולקבל משוב מיידי בממשק.

---

### תמונות מסך של הפעלת האפליקציה

#### 🏠 מסך הבית וניהול נתונים (CRUD)

<p align="center">
  <img src="https://github.com/user-attachments/assets/0a87ac60-91ce-408a-b07a-d92f78f0d339" width="700">
  <br>
  <i>מסך הבית (Dashboard) המציג סטטיסטיקות כלליות מתוך בסיס הנתונים</i>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/2c5cd928-52c8-4b51-bb75-c4d9e331e7a9" width="700">
  <br>
  <i>ממשק ניהול נתונים - הצגת הרשומות בטבלה לצד טופס להוספת רשומה חדשה</i>
</p>

---

#### ✏️ עדכון נתונים במערכת

<p align="center">
  <img src="https://github.com/user-attachments/assets/c762c731-4c9e-425c-a7f7-61d744fd7ff6" width="700">
  <br>
  <i>בחירת רשומה לעריכה וטעינת הנתונים הקיימים לתוך הטופס העליון</i>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/b1ca146c-3f24-41cf-afd7-7b436dee0767" width="700">
  <br>
  <i>עדכון השדות ושמירת השינויים מול שרת ה-Flask</i>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/cc51deb6-f2bb-4ae1-b0bc-f686a908e1e2" width="500">
  <br>
  <i>הודעת הצלחה ירוקה (Flash Message) המאשרת כי העדכון בוצע בהצלחה</i>
</p>

---

#### 🗑️ מחיקת נתונים במערכת

<p align="center">
  <img src="https://github.com/user-attachments/assets/47d92bcd-8c00-4e3f-9569-f4976c095181" width="700">
  <br>
  <i>הקפצת חלון אישור (Confirm Modal) לפני ביצוע מחיקה</i>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/a759b86d-16b8-46d8-b52a-cd94321e70fa" width="700">
  <br>
  <i>אישור המחיקה והצגת הודעת הצלחה זמנית</i>
</p>

---

#### 🔍 הרצת שאילתות (שלב ב')

<p align="center">
  <img src="https://github.com/user-attachments/assets/b3f01bc1-566b-4aec-8a3b-d109ec911b51" width="700">
  <br>
  <i>מסך השאילתות הראשי המאפשר בחירת שאילתה להרצה</i>
</p>

##### 🔹 שאילתה 1: מציאת משתתפים שנרשמו לטיולי קיץ 2026
<p align="center">
  <img src="https://github.com/user-attachments/assets/8e0af548-12cd-411b-9ea9-74dbf1cf0edc" width="700">
</p>

##### 🔹 שאילתה 2: רשימת כמות ציוד שהוקצתה לטיולים
<p align="center">
  <img src="https://github.com/user-attachments/assets/65cdb8cc-5510-44f8-a252-8558caafd4a9" width="700">
</p>

##### 🔹 שאילתה 3: מציאת ספקים משולבים (הסעות וציוד)
<p align="center">
  <img src="https://github.com/user-attachments/assets/f88a93a5-5dad-4779-a47c-05252c9479b9" width="700">
</p>

##### 🔹 שאילתה 4: הטיול העמוס ביותר במשתתפים
<p align="center">
  <img src="https://github.com/user-attachments/assets/37132798-88f6-438d-802a-3770c6465db5" width="700">
</p>

---

#### ⚙️ הרצת תתי-תוכניות (שלב ד')

##### 🔹 פונקציה 1: בדיקת קיבולת הסעות לטיול (`check_trip_transport_capacity`)
<p align="center">
  <img src="https://github.com/user-attachments/assets/bd11b05e-27e8-4de8-b9b1-c53f01568487" width="700">
</p>

##### 🔹 פונקציה 2: הפקת דו"ח ציוד זמין מספק (`get_available_equipment_report`)
<p align="center">
  <img src="https://github.com/user-attachments/assets/fa0c23a8-d85f-4b25-965b-f52ddfbd6378" width="700">
</p>

##### 🔹 פרוצדורה 1: הקצאת ציוד לטיול (`allocate_equipment_to_trip`)
<p align="center">
  <img src="https://github.com/user-attachments/assets/392fbcdb-e3c3-45dc-a73f-be8fd31cca89" width="700">
</p>

##### 🔹 פרוצדורה 2: רישום משתתף לטיול באופן מאובטח (`register_participant_for_trip_secure`)
<p align="center">
  <!-- כאן ניתן להעלות את תמונת הרצת פרוצדורה 2 -->
  <i>פרוצדורה זו מופעלת באופן מאובטח ומבצעת את בדיקות התקינות מול ה-DB</i>
</p>

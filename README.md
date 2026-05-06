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

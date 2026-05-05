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

בחלק זה יפורטו שאילתות מורכבות שנכתבו למערכת, תוך דגש על יעילות (Performance), אילוצים, טרנזקציות ועדכונים.

### 🔹 1. שאילתות כפולות (השוואת יעילות)

#### 📝 שאילתה 1: פרטי משתתפים בטיולי קיץ 2026
**תיאור:** שליפת פרטי המשתתפים שנרשמו לטיולים בקיץ (יוני-אוגוסט) 2026.

<details>
<summary><b>לחצי לצפייה בקוד (דרך 1 - JOIN מול דרך 2 - IN)</b></summary>

**דרך 1 (JOIN):**
```sql
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
```

**דרך 2 (IN):**
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
</details>

> 💡 **הסבר יעילות:** ברוב מסדי הנתונים המודרניים, שימוש ב-`JOIN` (דרך 1) נחשב ליעיל יותר. הוא מאפשר ל-Optimizer גמישות בבחירת סדר חיבור הטבלאות, בעוד ש-`IN` עלול לאלץ יצירת טבלת ביניים וסינון כפילויות לפני החיבור.

<p align="center">
  <img src="https://github.com/user-attachments/assets/a6961f69-6b8d-491b-9006-0c1aab16b973" width="700">
</p>

---

#### 📝 שאילתה 2: טיולים עם כמות ציוד גדולה
**תיאור:** החזרת שמות הטיולים ושנת קיומם, עבור טיולים שהוקצו להם מעל 5 פריטי ציוד.

<details>
<summary><b>לחצי לצפייה בקוד (דרך 1 - GROUP BY מול דרך 2 - Derived Table)</b></summary>

**דרך 1 (קיבוץ לאחר JOIN):**
```sql
SELECT T.TripName, EXTRACT(YEAR FROM T.StartDate) AS TripYear, SUM(TE.QuantityAllocated) AS TotalEquipment
FROM TRIP T JOIN TRIP_EQUIPMENT TE ON T.TripID = TE.TripID
GROUP BY T.TripID, T.TripName, EXTRACT(YEAR FROM T.StartDate)
HAVING SUM(TE.QuantityAllocated) > 5
ORDER BY TotalEquipment DESC;
```

**דרך 2 (Derived Table):**
```sql
SELECT T.TripName, EXTRACT(YEAR FROM T.StartDate) AS TripYear, AggTE.TotalEquipment
FROM TRIP T JOIN (
    SELECT TripID, SUM(QuantityAllocated) AS TotalEquipment
    FROM TRIP_EQUIPMENT GROUP BY TripID HAVING SUM(QuantityAllocated) > 5
) AggTE ON T.TripID = AggTE.TripID
ORDER BY TotalEquipment DESC;
```
</details>

> 💡 **הסבר יעילות:** דרך 2 (Derived Table) יעילה משמעותית. במקום לבצע `JOIN` על כל הטבלאות ואז לקבץ (מה שדורש זיכרון רב), אנו מצמצמים קודם כל את טבלת הציוד בעזרת הקיבוץ, ורק אז מחברים אותה לטבלת הטיולים.

<p align="center">
  <img src="https://github.com/user-attachments/assets/93ec3a8b-d606-4ba4-bf5a-fdfdf0887e6d" width="600">
</p>

---

#### 📝 שאילתה 3: ספקים המספקים גם ציוד וגם הסעות
**תיאור:** איתור ספקים ייחודיים שנותנים שירותים כפולים (ציוד והסעות).

<details>
<summary><b>לחצי לצפייה בקוד (דרך 1 - EXISTS מול דרך 2 - INTERSECT)</b></summary>

**דרך 1 (EXISTS):**
```sql
SELECT S.SupplierID, S.Company_Name, S.ContactPhone, S.Service_Type
FROM SUPPLIER S
WHERE EXISTS (SELECT 1 FROM TRANSPORTATION TR WHERE TR.SupplierID = S.SupplierID)
  AND EXISTS (SELECT 1 FROM EQUIPMENT EQ WHERE EQ.SupplierID = S.SupplierID);
```

**דרך 2 (INTERSECT):**
```sql
SELECT S.SupplierID, S.Company_Name, S.ContactPhone, S.Service_Type
FROM SUPPLIER S
WHERE S.SupplierID IN (
    SELECT SupplierID FROM TRANSPORTATION
    INTERSECT
    SELECT SupplierID FROM EQUIPMENT
);
```
</details>

> 💡 **הסבר יעילות:** דרך 1 (`EXISTS`) יעילה בהרבה בזכות ה-"קצר החשמלי" (Short-circuiting) – המערכת עוצרת ברגע שהיא מוצאת התאמה אחת. ב-`INTERSECT` המערכת נאלצת לסרוק ולמיין את שתי הטבלאות במלואן רק כדי למצוא חיתוך.

<p align="center">
  <img src="https://github.com/user-attachments/assets/6994027c-66ac-439b-9aa7-9206e301a595" width="700">
</p>

---

#### 📝 שאילתה 4: הטיול המבוקש ביותר
**תיאור:** מציאת הטיול היחיד עם כמות המשתתפים הגדולה ביותר.

<details>
<summary><b>לחצי לצפייה בקוד (דרך 1 - LIMIT מול דרך 2 - ALL)</b></summary>

**דרך 1 (LIMIT):**
```sql
SELECT T.TripName, T.Trip_Type, EXTRACT(DAY FROM T.StartDate) AS StartDay, EXTRACT(MONTH FROM T.StartDate) AS StartMonth, EXTRACT(YEAR FROM T.StartDate) AS StartYear, COUNT(R.ParticipantID) AS NumParticipants
FROM TRIP T JOIN REGISTERS_TO R ON T.TripID = R.TripID
GROUP BY T.TripID, T.TripName, T.Trip_Type, T.StartDate
ORDER BY NumParticipants DESC LIMIT 1;
```

**דרך 2 (ALL):**
```sql
SELECT T.TripName, T.Trip_Type, EXTRACT(DAY FROM T.StartDate) AS StartDay, EXTRACT(MONTH FROM T.StartDate) AS StartMonth, EXTRACT(YEAR FROM T.StartDate) AS StartYear, COUNT(R.ParticipantID) AS NumParticipants
FROM TRIP T JOIN REGISTERS_TO R ON T.TripID = R.TripID
GROUP BY T.TripID, T.TripName, T.Trip_Type, T.StartDate
HAVING COUNT(R.ParticipantID) >= ALL (SELECT COUNT(ParticipantID) FROM REGISTERS_TO GROUP BY TripID);
```
</details>

> 💡 **הסבר יעילות:** שימוש ב-`LIMIT 1` יעיל פי כמה כי הוא מצריך רק קיבוץ אחד וסידור. שימוש ב-`>= ALL` מכריח את מסד הנתונים לספור ולקבץ את כל הרשומות פעמיים.

<p align="center">
  <img src="https://github.com/user-attachments/assets/af7d1206-4035-44d9-9c1a-2c351981028b" width="700">
</p>

---

### 🔹 2. שאילתות בודדות (מורכבות)

#### 📝 שאילתה 5: מסלול מיקומים לטיולי הרפתקאות
**תיאור:** שליפת מסלול המיקומים (`Location_order`) של טיולי 'Adventure'.

<details>
<summary><b>לחצי לצפייה בקוד</b></summary>

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
</details>

<p align="center">
  <img src="https://github.com/user-attachments/assets/547d02df-b741-4546-99f7-2412ed9734cc" width="700">
</p>

---

#### 📝 שאילתה 6: התראות ציוד שלא הוחזר (משתתפים בוגרים)
**תיאור:** איתור משתתפים (18+) בטיולים שהסתיימו, שהציוד שהוקצה עבורם טרם הוחזר.

<details>
<summary><b>לחצי לצפייה בקוד</b></summary>

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
</details>

<p align="center">
  <img src="https://github.com/user-attachments/assets/ca04e1bd-ee01-4870-b74d-5aa16e2c2d77" width="700">
</p>

---

#### 📝 שאילתה 7: סטטיסטיקה חודשית לטיולים
**תיאור:** הפקת דו"ח המקבץ את הטיולים לפי חודש ושנה, ומציג את כמות הטיולים הכללית ואת גודל הקבוצה הממוצע.

<details>
<summary><b>לחצי לצפייה בקוד</b></summary>

```sql
SELECT EXTRACT(YEAR FROM StartDate) AS TripYear,
       EXTRACT(MONTH FROM StartDate) AS TripMonth,
       COUNT(TripID) AS NumberOfTrips,
       ROUND(AVG(GroupSize), 2) AS AverageGroupSize
FROM TRIP
GROUP BY EXTRACT(YEAR FROM StartDate), EXTRACT(MONTH FROM StartDate)
ORDER BY TripYear DESC, TripMonth DESC;
```
</details>

<p align="center">
  <img src="https://github.com/user-attachments/assets/3dcbf101-560e-4326-a35e-413740c2bf7b" width="600">
</p>

---

#### 📝 שאילתה 8: שלושת המיקומים העמוסים ביותר
**תיאור:** זיהוי 3 המיקומים הפופולריים ביותר על פי ספירת הטיולים והמשתתפים המבקרים בהם.

<details>
<summary><b>לחצי לצפייה בקוד</b></summary>

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
</details>

<p align="center">
  <img src="https://github.com/user-attachments/assets/014109b6-efe3-4810-aaa4-41fdce9b0792" width="700">
</p>

---

### 🔹 3. פעולות עדכון (UPDATE)
פעולות לעדכון נתונים במערכת.

#### עדכון 1:
<p align="center">
  <b>לפני העדכון:</b><br>
  <img src="https://github.com/user-attachments/assets/fd24645b-27c7-4be8-903e-22e194ea022a" width="600"><br>
  <b>אחרי העדכון:</b><br>
  <img src="https://github.com/user-attachments/assets/da1dbf48-6914-4bdc-8adf-5bb03e399189" width="600">
</p>

#### עדכון 2:
<p align="center">
  <b>לפני העדכון:</b><br>
  <img src="https://github.com/user-attachments/assets/b89329d0-6d86-43af-8dd4-71082694947a" width="600"><br>
  <b>אחרי העדכון:</b><br>
  <img src="https://github.com/user-attachments/assets/d8cc38ee-4a7f-4958-9f2f-aee9e02b775e" width="600">
</p>

#### עדכון 3:
<p align="center">
  <b>לפני העדכון:</b><br>
  <img src="https://github.com/user-attachments/assets/5bbbeeaa-b240-41a7-8b19-103aa60395de" width="600"><br>
  <b>אחרי העדכון:</b><br>
  <img src="https://github.com/user-attachments/assets/0c8bd4ac-821b-4194-b216-8734b4cc63e6" width="600">
</p>

---

### 🔹 4. פעולות מחיקה (DELETE)

#### מחיקה 1:
<p align="center">
  <b>לפני המחיקה:</b><br>
  <img src="https://github.com/user-attachments/assets/907a0311-7cd7-4814-bc14-255deb40bf51" width="500">
</p>

#### מחיקה 2:
<p align="center">
  <b>לפני המחיקה:</b><br>
  <img src="https://github.com/user-attachments/assets/ffac75eb-6d32-42c7-81d5-7bac3fffd25a" width="400"><br>
  <b>אחרי המחיקה:</b><br>
  <img src="https://github.com/user-attachments/assets/df2c1134-f54a-4fe7-a7b6-7fe8f8885db5" width="400">
</p>

#### מחיקה 3:
<p align="center">
  <b>לפני המחיקה:</b><br>
  <img src="https://github.com/user-attachments/assets/c4b4ef8d-246f-477c-990b-a9d43e3e5dc4" width="600"><br>
  <b>אחרי המחיקה:</b><br>
  <img src="https://github.com/user-attachments/assets/f36ff431-91f3-4dd1-b8c5-76d501ecabb9" width="600">
</p>

---

### 🔹 5. טרנזקציות (ROLLBACK & COMMIT)

#### ROLLBACK (ביטול פעולת מחיקה):
<p align="center">
  <b>לפני המחיקה:</b><br>
  <img src="https://github.com/user-attachments/assets/f5446365-8115-4e6f-a41a-d8af5bff5366" width="500"><br>
  <b>המחיקה (בתוך BEGIN):</b><br>
  <img src="https://github.com/user-attachments/assets/40154fdb-ff62-4fe5-8a00-215c7934f7b4" width="500"><br>
  <b>פעולת ה-ROLLBACK:</b><br>
  <img src="https://github.com/user-attachments/assets/16bb32be-039c-44cb-979b-3334ea12525f" width="500"><br>
  <b>הנתונים חזרו:</b><br>
  <img src="https://github.com/user-attachments/assets/4d7ce6d6-4661-4e19-9d5e-d0ccc4028915" width="500">
</p>

#### COMMIT (שמירת עדכון):
<p align="center">
  <b>לפני העדכון:</b><br>
  <img src="https://github.com/user-attachments/assets/5a9cdff3-f0be-439a-89b1-4cf50e7d1c92" width="500"><br>
  <b>ביצוע העדכון (בתוך BEGIN):</b><br>
  <img src="https://github.com/user-attachments/assets/39d51241-0bc1-4c52-b3be-f1a16710ff9b" width="500"><br>
  <b>פעולת ה-COMMIT:</b><br>
  <img src="https://github.com/user-attachments/assets/0a5b849a-65fc-410e-a214-eafc60eed0ca" width="500"><br>
  <b>הנתונים נשמרו:</b><br>
  <img src="https://github.com/user-attachments/assets/b38a0cfb-40eb-4cf8-82c9-cbb7d56b0fbf" width="500"><br>
  <img src="https://github.com/user-attachments/assets/2a800e43-3325-459e-8dbe-02fbdd4997e5" width="500">
</p>

---

### 🔹 6. אילוצים (Constraints)

#### אילוץ 1:
<p align="center">
  <img src="https://github.com/user-attachments/assets/a3efcd43-5d7a-458c-8d99-8b7f8f280bac" width="500"><br>
  <img src="https://github.com/user-attachments/assets/ef86d042-1677-464f-b698-1d430187e2a6" width="500">
</p>

#### אילוץ 2:
<p align="center">
  <img src="https://github.com/user-attachments/assets/a4ee74bf-a02d-4a2d-9ebb-0874631a5364" width="500"><br>
  <img src="https://github.com/user-attachments/assets/536cc2e8-3db5-47cb-8194-456860445f8a" width="500">
</p>

#### אילוץ 3:
<p align="center">
  <img src="https://github.com/user-attachments/assets/2d84d988-7183-4c4c-a2d9-a313eef4231a" width="500"><br>
  <img src="https://github.com/user-attachments/assets/bdd1e5d1-95e0-485d-9cba-3e1844fa2ff1" width="500">
</p>

---

### 🔹 7. אינדקסים (Indexes) לשיפור ביצועים

#### אינדקס 1:
<p align="center">
  <b>לפני ואחרי בניית האינדקס:</b><br>
  <img src="https://github.com/user-attachments/assets/db0b273e-a21a-4f7f-ac5a-561cdaa90b6f" width="500"><br>
  <img src="https://github.com/user-attachments/assets/fe380ced-bd03-4022-b6e2-d07b139924cd" width="500"><br>
  <img src="https://github.com/user-attachments/assets/63e84279-adb3-4464-87ae-94112a438361" width="500">
</p>

#### אינדקס 2:
<p align="center">
  <b>לפני ואחרי בניית האינדקס:</b><br>
  <img src="https://github.com/user-attachments/assets/0740d548-fcee-4bb4-ac5d-5111b09ef126" width="400"><br>
  <img src="https://github.com/user-attachments/assets/5cf79126-caaf-424e-b984-8faefae282f9" width="400"><br>
  <img src="https://github.com/user-attachments/assets/70503422-f057-44f1-97fb-4ea1c596a989" width="400">
</p>

#### אינדקס 3:
<p align="center">
  <b>לפני ואחרי בניית האינדקס:</b><br>
  <img src="https://github.com/user-attachments/assets/5a1bb265-69f4-4365-83cd-e119c6b1946e" width="500"><br>
  <img src="https://github.com/user-attachments/assets/ca107158-6674-45ce-a657-4099d76d991c" width="500"><br>
  <img src="https://github.com/user-attachments/assets/be9bfcf3-6652-4146-a11e-40d0da9e293b" width="500">
</p>

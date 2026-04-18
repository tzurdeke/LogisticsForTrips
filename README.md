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

💾 **קישור לתיקיית הגיבויים:**  
[צפייה בתיקיית Backup](./DBProject/8578_3938/שלב%20א/Backup/)

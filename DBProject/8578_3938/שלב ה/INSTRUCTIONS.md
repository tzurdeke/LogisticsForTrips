# הוראות התקנה והפעלה – מערכת ניהול לוגיסטיקה לטיולים (שלב ה')

## דרישות מוקדמות

1. **Python 3.9+** מותקן במחשב
2. **PostgreSQL** מותקן ופועל עם בסיס הנתונים `Integration_DB`
3. **pip** (מנהל חבילות Python)

---

## שלבי התקנה

### שלב 1 – כניסה לתיקיית הפרויקט

פתחו Terminal / PowerShell וניווטו לתיקייה:

```powershell
cd "DBProject\8578_3938\שלב ה"
```

### שלב 2 – התקנת תלויות

```powershell
pip install -r requirements.txt
```

### שלב 3 – הגדרת חיבור לבסיס הנתונים

פתחו את הקובץ `app/config.py` וודאו שהפרטים נכונים:

```python
DB_CONFIG = {
    "host": "localhost",
    "port": 5432,
    "database": "Integration_DB",
    "user": "atara",
    "password": "atara"
}
```

שנו בהתאם לפרטי ה-PostgreSQL שלכם אם נדרש.

### שלב 4 – הרצת האפליקציה

```powershell
cd app
python app.py
```

### שלב 5 – פתיחה בדפדפן

פתחו דפדפן וגשו לכתובת:

```
http://localhost:5000
```

---

## מבנה הקבצים

```
שלב ה/
├── app/
│   ├── app.py          ← Flask server ראשי
│   ├── db.py           ← גישה לבסיס הנתונים
│   ├── config.py       ← הגדרות חיבור
│   ├── templates/      ← דפי HTML (11 קבצים)
│   └── static/         ← CSS ו-JavaScript
├── requirements.txt    ← תלויות Python
└── INSTRUCTIONS.md     ← קובץ זה
```

---

## מסכי המערכת

| נתיב URL | תיאור |
|----------|-------|
| `/` | לוח בקרה עם סטטיסטיקות |
| `/trips` | ניהול טיולים (CRUD) |
| `/participants` | ניהול משתתפים (CRUD) |
| `/suppliers` | ניהול ספקים (CRUD) |
| `/equipment` | ניהול ציוד (CRUD) |
| `/transportation` | ניהול הסעות (CRUD) |
| `/locations` | ניהול מיקומים (CRUD) |
| `/registrations` | רישום משתתפים לטיולים |
| `/trip_equipment` | הקצאת ציוד לטיולים |
| `/trip_transportation` | שיוך הסעות לטיולים |
| `/location_trip` | מסלולי טיול |
| `/queries` | הרצת שאילתות מ-שלב ב' |
| `/subprograms` | הרצת פרוצדורות/פונקציות מ-שלב ד' |

---

## פתרון בעיות נפוצות

### שגיאת חיבור לבסיס הנתונים
- ודאי שה-PostgreSQL פועל (`pg_lsclusters` בלינוקס / Services ב-Windows)
- בדקי את פרטי החיבור ב-`config.py`

### שגיאת `Module not found`
```powershell
pip install flask psycopg2-binary
```

### שגיאת Port
אם 5000 תפוס, שנה את ה-port ב-`app.py`:
```python
app.run(debug=True, port=5001)
```

-- AlterTable.sql
-- שלב ד' - יצירת טבלת התראות לוגיסטיקה לצורך שימוש בטריגרים ותוכניות ה-PL/pgSQL

CREATE TABLE IF NOT EXISTS logistics_warnings (
    WarningID SERIAL PRIMARY KEY,
    TripID INT,
    WarningType VARCHAR(50) NOT NULL,
    Message TEXT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (TripID) REFERENCES TRIP(TripID) ON DELETE CASCADE
);

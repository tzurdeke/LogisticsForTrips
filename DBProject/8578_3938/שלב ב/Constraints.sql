-- ==============================================
-- PART 2: CONSTRAINTS (אילוצים)
-- ==============================================

-- אילוץ 1: אורך הכתובת של מיקום חייב להיות לפחות 5 תווים (כדי למנוע הזנת זבל)
ALTER TABLE LOCATION ADD CONSTRAINT chk_address_length CHECK (LENGTH(Address) >= 5);

-- (צילום מסך לשגיאה 1) ניסיון להכניס מיקום עם כתובת באורך 2 תווים:
INSERT INTO LOCATION (LocationID, LocationName, Region, Address, Description) VALUES (999, 'Test Loc', 'North', 'A1', 'Short address');


-- אילוץ 2: שם הציוד חייב להיות ייחודי במערכת
ALTER TABLE EQUIPMENT ADD CONSTRAINT unq_itemname UNIQUE (ItemName);

-- (צילום מסך לשגיאה 2) ניסיון להכניס ציוד עם שם שכבר קיים (Gear 1):
INSERT INTO EQUIPMENT (EquipmentID, ItemName, TotalInStock, SupplierID) VALUES (999, 'Gear 1', 10, 39);


-- אילוץ 3: אימייל של משתתף חייב להכיל את התו @ 
ALTER TABLE PARTICIPANT ADD CONSTRAINT chk_email_format CHECK (Email LIKE '%@%');

-- (צילום מסך לשגיאה 3) ניסיון להכניס משתתף עם אימייל לא חוקי:
INSERT INTO PARTICIPANT (ParticipantID, FirstName, LastName, Phone, Email, birthday) VALUES (999, 'Test', 'User', '0501234567', 'bademail.com', '2000-01-01');

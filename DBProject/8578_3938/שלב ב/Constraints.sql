-- ==============================================
-- PART 2: CONSTRAINTS
-- ==============================================

-- Constraint 1: Address length must be at least 5 characters to prevent junk data.
ALTER TABLE LOCATION ADD CONSTRAINT chk_address_length CHECK (LENGTH(Address) >= 5);

-- Test 1: Attempt to insert a location with a 2-character address.
INSERT INTO LOCATION (LocationID, LocationName, Region, Address, Description) VALUES (999, 'Test Loc', 'North', 'A1', 'Short address');


-- Constraint 2: Equipment ItemName must be unique in the system.
ALTER TABLE EQUIPMENT ADD CONSTRAINT unq_itemname UNIQUE (ItemName);

-- Test 2: Attempt to insert equipment with an existing name (PyGear 1).
INSERT INTO EQUIPMENT (EquipmentID, ItemName, TotalInStock, SupplierID) VALUES (999, 'PyGear 1', 10, 39);


-- Constraint 3: Participant Email must contain the '@' character.
ALTER TABLE PARTICIPANT ADD CONSTRAINT chk_email_format CHECK (Email LIKE '%@%');

-- Test 3: Attempt to insert a participant with an invalid email.
INSERT INTO PARTICIPANT (ParticipantID, FirstName, LastName, Phone, Email, birthday) VALUES (999, 'Test', 'User', '0501234567', 'bademail.com', '2000-01-01');

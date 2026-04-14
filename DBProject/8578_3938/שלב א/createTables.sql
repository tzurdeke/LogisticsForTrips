
CREATE TABLE TRIP
(
  TripID INT NOT NULL,
  TripName VARCHAR(50) NOT NULL,
  StartDate DATE NOT NULL,
  EndDate DATE NOT NULL,
  GroupSize INT NOT NULL DEFAULT 1,
  Trip_Type VARCHAR(30) NOT NULL,
  
  PRIMARY KEY (TripID),
  CHECK (EndDate >= StartDate),
  CHECK (GroupSize > 0)
);


CREATE TABLE LOCATION
(
  LocationID INT NOT NULL,
  LocationName VARCHAR(50) NOT NULL,
  Region VARCHAR(50) NOT NULL,
  Address VARCHAR(100) NOT NULL,
  Description VARCHAR(255),

  PRIMARY KEY (LocationID)
);


CREATE TABLE PARTICIPANT
(
  ParticipantID INT NOT NULL,
  FirstName VARCHAR(20) NOT NULL,
  LastName VARCHAR(20) NOT NULL,
  Phone VARCHAR(15) NOT NULL,
  Email VARCHAR(50) NOT NULL,
  birthday DATE NOT NULL,

  PRIMARY KEY (ParticipantID),
  UNIQUE (Email)
);


CREATE TABLE SUPPLIER
(
  SupplierID INT NOT NULL,
  Company_Name VARCHAR(50) NOT NULL,
  Service_Type VARCHAR(30) NOT NULL,
  ContactPhone VARCHAR(15) NOT NULL,

  PRIMARY KEY (SupplierID),
  UNIQUE (Company_Name, ContactPhone)
);


CREATE TABLE TRANSPORTATION
(
  TransportID INT NOT NULL,
  Vehicle_Type VARCHAR(20) NOT NULL,
  Capacity INT NOT NULL,
  SupplierID INT NOT NULL,

  PRIMARY KEY (TransportID),
  FOREIGN KEY (SupplierID) REFERENCES SUPPLIER(SupplierID),

  CHECK (Capacity > 0)
);


CREATE TABLE EQUIPMENT
(
  EquipmentID INT NOT NULL,
  ItemName VARCHAR(50) NOT NULL,
  TotalInStock INT NOT NULL DEFAULT 0,
  SupplierID INT NOT NULL,

  PRIMARY KEY (EquipmentID),
  FOREIGN KEY (SupplierID) REFERENCES SUPPLIER(SupplierID),

  CHECK (TotalInStock >= 0)
);


CREATE TABLE REGISTERS_TO
(
  ParticipantID INT NOT NULL,
  TripID INT NOT NULL,

  PRIMARY KEY (ParticipantID, TripID),
  FOREIGN KEY (ParticipantID) REFERENCES PARTICIPANT(ParticipantID),
  FOREIGN KEY (TripID) REFERENCES TRIP(TripID)
);

CREATE TABLE TRIP_EQUIPMENT
(
  QuantityAllocated INT NOT NULL DEFAULT 1,
  Checkout_Date DATE NOT NULL,
  Return_Date DATE,
  TripID INT NOT NULL,
  EquipmentID INT NOT NULL,

  PRIMARY KEY (TripID, EquipmentID),
  FOREIGN KEY (TripID) REFERENCES TRIP(TripID),
  FOREIGN KEY (EquipmentID) REFERENCES EQUIPMENT(EquipmentID),

  CHECK (QuantityAllocated > 0),
  CHECK (Return_Date IS NULL OR Return_Date >= Checkout_Date)
);

CREATE TABLE Location_Trip
(
  Location_order INT NOT NULL,
  TripID INT NOT NULL,
  LocationID INT NOT NULL,

  PRIMARY KEY (TripID, LocationID),
  FOREIGN KEY (TripID) REFERENCES TRIP(TripID),
  FOREIGN KEY (LocationID) REFERENCES LOCATION(LocationID),

  CHECK (Location_order > 0),
  UNIQUE (TripID, Location_order)
);

CREATE TABLE TRIP_TRANSPORTATION
(
  Departure_Date_Time TIMESTAMP NOT NULL,
  Arrival_Date_Time TIMESTAMP NOT NULL,
  TransportID INT NOT NULL,
  TripID INT NOT NULL,

  PRIMARY KEY (TransportID, TripID),
  FOREIGN KEY (TransportID) REFERENCES TRANSPORTATION(TransportID),
  FOREIGN KEY (TripID) REFERENCES TRIP(TripID),

  CHECK (Arrival_Date_Time > Departure_Date_Time)
);
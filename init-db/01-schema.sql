-- ==============================================================================
-- Table: TRIP
-- Description: Stores information about the logistics trips, including names, dates, group size and type.
-- Attributes:
--   TripID (INT): Unique identifier for the trip (PK)
--   TripName (VARCHAR): Name or description of the trip
--   StartDate (DATE): When the trip begins
--   EndDate (DATE): When the trip ends
--   GroupSize (INT): Expected number of participants
--   Trip_Type (VARCHAR): Category of the trip (e.g., Nature, City, Extreme)
-- ==============================================================================
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

-- ==============================================================================
-- Table: LOCATION
-- Description: Stores the various physical locations or sites visited during the trips.
-- Attributes:
--   LocationID (INT): Unique identifier for the location (PK)
--   LocationName (VARCHAR): Name of the site or business
--   Region (VARCHAR): Geographical region (e.g., North, South, Center)
--   Address (VARCHAR): Full physical address
--   Description (VARCHAR): Optional text description
-- ==============================================================================
CREATE TABLE LOCATION
(
  LocationID INT NOT NULL,
  LocationName VARCHAR(50) NOT NULL,
  Region VARCHAR(50) NOT NULL,
  Address VARCHAR(100) NOT NULL,
  Description VARCHAR(255),

  PRIMARY KEY (LocationID),
  UNIQUE (LocationName, Address)
);

-- ==============================================================================
-- Table: PARTICIPANT
-- Description: Stores personal details of individuals signing up for trips.
-- Attributes:
--   ParticipantID (INT): Unique identifier for the person (PK)
--   FirstName (VARCHAR): Person's first name
--   LastName (VARCHAR): Person's last name
--   Phone (VARCHAR): Contact phone number
--   Email (VARCHAR): Unique email contact
--   birthday (DATE): Date of birth of the participant
-- ==============================================================================
CREATE TABLE PARTICIPANT
(
  ParticipantID INT NOT NULL,
  FirstName VARCHAR(20) NOT NULL,
  LastName VARCHAR(20) NOT NULL,
  Phone VARCHAR(15) NOT NULL,
  Email VARCHAR(50) NOT NULL,
  birthday DATE NOT NULL,

  PRIMARY KEY (ParticipantID),
  UNIQUE (Email),
  CHECK (birthday < CURRENT_DATE)
);

-- ==============================================================================
-- Table: SUPPLIER
-- Description: External companies that provide logistics services (buses, food, gear).
-- Attributes:
--   SupplierID (INT): Unique identifier (PK)
--   Company_Name (VARCHAR): Official name of the supplier
--   Service_Type (VARCHAR): Type of service provided
--   ContactPhone (VARCHAR): Main contact number
-- ==============================================================================
CREATE TABLE SUPPLIER
(
  SupplierID INT NOT NULL,
  Company_Name VARCHAR(50) NOT NULL,
  Service_Type VARCHAR(30) NOT NULL,
  ContactPhone VARCHAR(15) NOT NULL,

  PRIMARY KEY (SupplierID),
  UNIQUE (Company_Name, ContactPhone)
);

-- ==============================================================================
-- Table: TRANSPORTATION
-- Description: Vehicles provided by suppliers for specific trips.
-- Attributes:
--   TransportID (INT): Unique vehicle ID (PK)
--   Vehicle_Type (VARCHAR): Type of vehicle (e.g., Bus, Minibus)
--   Capacity (INT): Max number of passengers
--   SupplierID (INT): Link to the supplier providing the vehicle (FK)
-- ==============================================================================
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

-- ==============================================================================
-- Table: EQUIPMENT
-- Description: Items/gear provided by suppliers for use in trips.
-- Attributes:
--   EquipmentID (INT): Unique item ID (PK)
--   ItemName (VARCHAR): Name of the gear
--   TotalInStock (INT): Total number available generally
--   SupplierID (INT): Link to the supplier (FK)
-- ==============================================================================
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

-- ==============================================================================
-- Table: REGISTERS_TO
-- Description: Association table linking Participants to Trips (Many-to-Many).
-- Attributes:
--   ParticipantID (INT): Link to the participant (PK/FK)
--   TripID (INT): Link to the trip (PK/FK)
-- ==============================================================================
CREATE TABLE REGISTERS_TO
(
  ParticipantID INT NOT NULL,
  TripID INT NOT NULL,

  PRIMARY KEY (ParticipantID, TripID),
  FOREIGN KEY (ParticipantID) REFERENCES PARTICIPANT(ParticipantID),
  FOREIGN KEY (TripID) REFERENCES TRIP(TripID)
);

-- ==============================================================================
-- Table: TRIP_EQUIPMENT
-- Description: Association table tracking which equipment is allocated to which trip.
-- Attributes:
--   TripID (INT): Link to trip (PK/FK)
--   EquipmentID (INT): Link to item (PK/FK)
--   QuantityAllocated (INT): Amount of items checked out
--   Checkout_Date (DATE): When it was taken
--   Return_Date (DATE): When it was returned (nullable)
-- ==============================================================================
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

-- ==============================================================================
-- Table: RELATIONSHIP
-- Description: Schedule association table tracking the order of locations in a trip.
-- Attributes:
--   TripID (INT): Link to trip (PK/FK)
--   LocationID (INT): Link to location (PK/FK)
--   Location_order (INT): Sequence integer mapping route progression
-- ==============================================================================
CREATE TABLE RELATIONSHIP
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

-- ==============================================================================
-- Table: TRIP_TRANSPORTATION
-- Description: Schedule association table mapping vehicles to trips by departure times.
-- Attributes:
--   TransportID (INT): Link to vehicle (PK/FK)
--   TripID (INT): Link to trip (PK/FK)
--   Departure_Date_Time (TIMESTAMP): Start travel time
--   Arrival_Date_Time (TIMESTAMP): End travel time
-- ==============================================================================
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
import psycopg2
from psycopg2.extras import execute_values
import random
import datetime

# התחברות ישירה למסד הנתונים כפי שדרשה המרצה
DB_HOST = 'localhost'
DB_PORT = '5432'
DB_NAME = 'logDB'
DB_USER = 'odeya'
DB_PASSWORD = 'odeya'

def get_random_date(start_year, end_year):
    start = datetime.date(start_year, 1, 1)
    end = datetime.date(end_year, 12, 31)
    return start + datetime.timedelta(days=random.randint(0, (end - start).days))

print("Connecting to the database...")
try:
    conn = psycopg2.connect(
        host=DB_HOST, port=DB_PORT, dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD
    )
    cursor = conn.cursor()
    print("Successfully connected to the database!")
    print("Starting massive native insertion (this will take a few seconds...)")

    # ניצור מזהים גבוהים (מעל 2000) כדי למנוע התנגשויות בהרצה פשוטה על מסד קיים
    OFFSET = 3000
    
    # 1. TRIP (500)
    print("Inserting 500 into TRIP...")
    trips = []
    types = ['Nature', 'City', 'Extreme']
    for i in range(1, 501):
        sd = get_random_date(2024, 2026)
        ed = sd + datetime.timedelta(days=random.randint(1, 10))
        trips.append((OFFSET + i, f'PyTrip {i}', sd, ed, random.randint(5, 50), random.choice(types)))
    execute_values(cursor, "INSERT INTO TRIP (TripID, TripName, StartDate, EndDate, GroupSize, Trip_Type) VALUES %s", trips)

    # 2. LOCATION (500)
    print("Inserting 500 into LOCATION...")
    locs = []
    regions = ['North', 'South', 'Center']
    for i in range(1, 501):
        locs.append((OFFSET + i, f'PyLoc {i}', random.choice(regions), f'PyStreet {i}', f'PyDesc {i}'))
    execute_values(cursor, "INSERT INTO LOCATION (LocationID, LocationName, Region, Address, Description) VALUES %s", locs)

    # 3. PARTICIPANT (500)
    print("Inserting 500 into PARTICIPANT...")
    parts = []
    for i in range(1, 501):
        dob = get_random_date(1970, 2010)
        phone = f'050-{random.randint(1000000,9999999)}'
        parts.append((OFFSET + i, f'PyFName{i}', f'PyLName{i}', phone, f'pyuser{OFFSET+i}@test.com', dob))
    execute_values(cursor, "INSERT INTO PARTICIPANT (ParticipantID, FirstName, LastName, Phone, Email, birthday) VALUES %s", parts)

    # 4. SUPPLIER (500)
    print("Inserting 500 into SUPPLIER...")
    sups = []
    stypes = ['Bus', 'Food', 'Gear']
    for i in range(1, 501):
        phone = f'03-{random.randint(1000000,9999999)}'
        sups.append((OFFSET + i, f'PySupplier {OFFSET+i}', random.choice(stypes), phone))
    execute_values(cursor, "INSERT INTO SUPPLIER (SupplierID, Company_Name, Service_Type, ContactPhone) VALUES %s", sups)

    # 5. TRANSPORTATION (500)
    print("Inserting 500 into TRANSPORTATION...")
    trans = []
    vtypes = ['Bus', 'Minibus', 'Jeep']
    for i in range(1, 501):
        trans.append((OFFSET + i, random.choice(vtypes), random.choice([20, 50, 55]), OFFSET + random.randint(1, 500)))
    execute_values(cursor, "INSERT INTO TRANSPORTATION (TransportID, Vehicle_Type, Capacity, SupplierID) VALUES %s", trans)

    # 6. EQUIPMENT (500)
    print("Inserting 500 into EQUIPMENT...")
    eqs = []
    for i in range(1, 501):
        eqs.append((OFFSET + i, f'PyGear {i}', random.randint(10, 100), OFFSET + random.randint(1, 500)))
    execute_values(cursor, "INSERT INTO EQUIPMENT (EquipmentID, ItemName, TotalInStock, SupplierID) VALUES %s", eqs)

    # 7. REGISTERS_TO (25,000)
    print("Inserting 25,000 into REGISTERS_TO...")
    regs = set()
    while len(regs) < 25000:
        regs.add((OFFSET + random.randint(1, 500), OFFSET + random.randint(1, 500)))
    execute_values(cursor, "INSERT INTO REGISTERS_TO (ParticipantID, TripID) VALUES %s", list(regs))

    # 8. TRIP_EQUIPMENT (500)
    print("Inserting 500 into TRIP_EQUIPMENT...")
    teqs = set()
    while len(teqs) < 500:
        teqs.add((OFFSET + random.randint(1, 500), OFFSET + random.randint(1, 500)))
    teq_data = [(2, '2025-01-01', None, t, e) for t, e in teqs]
    execute_values(cursor, "INSERT INTO TRIP_EQUIPMENT (QuantityAllocated, Checkout_Date, Return_Date, TripID, EquipmentID) VALUES %s", teq_data)

    # 9. Location_Trip (25,000)
    print("Inserting 25,000 into Location_Trip...")
    lt_data = []
    for t in range(1, 501):
        locs = random.sample(range(1, 501), 50)
        for order, l in enumerate(locs):
            lt_data.append((order+1, OFFSET + t, OFFSET + l))
    execute_values(cursor, "INSERT INTO Location_Trip (Location_order, TripID, LocationID) VALUES %s", lt_data)

    # 10. TRIP_TRANSPORTATION (500)
    print("Inserting 500 into TRIP_TRANSPORTATION...")
    tt_data = []
    for i in range(1, 501):
        t = OFFSET + random.randint(1, 500)
        tr = OFFSET + random.randint(1, 500)
        tt_data.append(('2025-01-01 08:00:00', '2025-01-01 18:00:00', tr, t))
    # ON CONFLICT DO NOTHING to simply avoid primary key collisions among random choices
    execute_values(cursor, "INSERT INTO TRIP_TRANSPORTATION (Departure_Date_Time, Arrival_Date_Time, TransportID, TripID) VALUES %s ON CONFLICT DO NOTHING", tt_data)

    conn.commit()
    print("WOW! The database has been fully populated natively using Python!")

except Exception as e:
    print("Error connecting or writing to database:", e)
finally:
    if 'conn' in locals():
        cursor.close()
        conn.close()
        print("Connection closed.")

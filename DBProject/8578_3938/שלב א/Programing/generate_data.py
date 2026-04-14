import random
import datetime

out_path = "insertTablesPython.sql"

def get_random_date(start_year, end_year):
    start_date = datetime.date(start_year, 1, 1)
    end_date = datetime.date(end_year, 12, 31)
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    return start_date + datetime.timedelta(days=random.randrange(days_between_dates))

print("Script running to generate data...")

with open(out_path, "w", encoding="utf-8") as f:
    f.write("-- insertTables.sql generated script\n\n")

    # 1. TRIP - 1000 records
    f.write("-- TRIP\n")
    trip_types = ['Nature', 'City', 'Extreme', 'Relaxing', 'Historical']
    for i in range(1, 1001):
        sd = get_random_date(2024, 2026)
        ed = sd + datetime.timedelta(days=random.randint(1, 14))
        gs = random.randint(10, 50)
        tt = random.choice(trip_types)
        f.write(f"INSERT INTO TRIP (TripID, TripName, StartDate, EndDate, GroupSize, Trip_Type) VALUES ({i}, 'Trip {i}', '{sd}', '{ed}', {gs}, '{tt}');\n")

    # 2. LOCATION - 1000 records
    f.write("-- LOCATION\n")
    regions = ['North', 'South', 'Center', 'Jerusalem', 'Eilat']
    for i in range(1, 1001):
        reg = random.choice(regions)
        f.write(f"INSERT INTO LOCATION (LocationID, LocationName, Region, Address, Description) VALUES ({i}, 'Location {i}', '{reg}', 'Address {i}', 'Description {i}');\n")

    # 3. PARTICIPANT - 2000 records
    f.write("-- PARTICIPANT\n")
    for i in range(1, 2001):
        bd = get_random_date(1970, 2010)
        email = f"partic{i}_{random.randint(100,999)}@gmail.com"
        f.write(f"INSERT INTO PARTICIPANT (ParticipantID, FirstName, LastName, Phone, Email, birthday) VALUES ({i}, 'First{i}', 'Last{i}', '05{random.randint(10000000,99999999)}', '{email}', '{bd}');\n")

    # 4. SUPPLIER - 500 records
    f.write("-- SUPPLIER\n")
    srv_types = ['Transport', 'Food', 'Gear', 'Guide', 'Accommodation']
    for i in range(1, 501):
        st = random.choice(srv_types)
        phone = f"0{random.randint(100000000,999999999)}"
        f.write(f"INSERT INTO SUPPLIER (SupplierID, Company_Name, Service_Type, ContactPhone) VALUES ({i}, 'SupplierCo {i}', '{st}', '{phone}');\n")

    # 5. TRANSPORTATION - 600 records
    f.write("-- TRANSPORTATION\n")
    v_types = ['Bus', 'Minibus', 'Van', 'Jeep']
    for i in range(1, 601):
        vt = random.choice(v_types)
        cap = random.randint(10, 60)
        sid = random.randint(1, 500)
        f.write(f"INSERT INTO TRANSPORTATION (TransportID, Vehicle_Type, Capacity, SupplierID) VALUES ({i}, '{vt}', {cap}, {sid});\n")

    # 6. EQUIPMENT - 600 records
    f.write("-- EQUIPMENT\n")
    for i in range(1, 601):
        tis = random.randint(0, 100)
        sid = random.randint(1, 500)
        f.write(f"INSERT INTO EQUIPMENT (EquipmentID, ItemName, TotalInStock, SupplierID) VALUES ({i}, 'GearItem {i}', {tis}, {sid});\n")

    # 7. REGISTERS_TO - 25000 records! (מעל ה-20 אלף)
    f.write("-- REGISTERS_TO\n")
    regs = set()
    rows = []
    while len(regs) < 25000:
        p = random.randint(1, 2000)
        t = random.randint(1, 1000)
        if (p, t) not in regs:
            regs.add((p, t))
            rows.append(f"INSERT INTO REGISTERS_TO (ParticipantID, TripID) VALUES ({p}, {t});")
    f.write('\n'.join(rows) + '\n')

    # 8. TRIP_EQUIPMENT - 500 records
    f.write("-- TRIP_EQUIPMENT\n")
    te_set = set()
    rows = []
    while len(te_set) < 500:
        t = random.randint(1, 1000)
        e = random.randint(1, 600)
        if (t, e) not in te_set:
            te_set.add((t, e))
            rows.append(f"INSERT INTO TRIP_EQUIPMENT (QuantityAllocated, Checkout_Date, Return_Date, TripID, EquipmentID) VALUES (1, '2025-01-01', NULL, {t}, {e});")
    f.write('\n'.join(rows) + '\n')

    # 9. Location_Trip - 25000 records! (מעל ה-20 אלף)
    f.write("-- Location_Trip\n")
    rows = []
    for t in range(1, 1001):
        locs = random.sample(range(1, 1001), 25)
        for order, loc in enumerate(locs, start=1):
            rows.append(f"INSERT INTO Location_Trip (Location_order, TripID, LocationID) VALUES ({order}, {t}, {loc});")
    f.write('\n'.join(rows) + '\n')

    # 10. TRIP_TRANSPORTATION - 500 records
    f.write("-- TRIP_TRANSPORTATION\n")
    tt_set = set()
    rows = []
    while len(tt_set) < 500:
        tr = random.randint(1, 600)
        t = random.randint(1, 1000)
        if (tr, t) not in tt_set:
            tt_set.add((tr, t))
            rows.append(f"INSERT INTO TRIP_TRANSPORTATION (Departure_Date_Time, Arrival_Date_Time, TransportID, TripID) VALUES ('2025-01-01 08:00:00', '2025-01-01 12:00:00', {tr}, {t});")
    f.write('\n'.join(rows) + '\n')

print("Done! insertTables.sql has been created with all requested data.")

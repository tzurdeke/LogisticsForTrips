# db.py – שכבת גישה לבסיס הנתונים
import psycopg2
import psycopg2.extras
from config import DB_CONFIG


def get_connection():
    return psycopg2.connect(**DB_CONFIG)


def fetch_all(query, params=None):
    with get_connection() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(query, params)
            return cur.fetchall()


def execute(query, params=None):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(query, params)
        conn.commit()


def fetch_one(query, params=None):
    with get_connection() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(query, params)
            return cur.fetchone()


# ─────────────────────────────────────────────
#  TRIPS
# ─────────────────────────────────────────────
def get_all_trips():
    return fetch_all("""
        SELECT t.tripid, t.tripname, t.startdate, t.enddate,
               t.groupsize, t.trip_type,
               g.guidename AS guide_name
        FROM trip t
        LEFT JOIN guide g ON t.guideid = g.guideid
        ORDER BY t.startdate DESC
    """)


def get_trip_by_id(trip_id):
    return fetch_one("""
        SELECT t.*, g.guidename AS guide_name
        FROM trip t
        LEFT JOIN guide g ON t.guideid = g.guideid
        WHERE t.tripid = %s
    """, (trip_id,))


def insert_trip(tripname, startdate, enddate, groupsize, trip_type, guideid=None):
    execute("""
        INSERT INTO trip (tripid, tripname, startdate, enddate, groupsize, trip_type, guideid)
        VALUES ((SELECT COALESCE(MAX(tripid),0)+1 FROM trip), %s, %s, %s, %s, %s, %s)
    """, (tripname, startdate, enddate, groupsize, trip_type, guideid or None))


def update_trip(trip_id, tripname, startdate, enddate, groupsize, trip_type, guideid=None):
    execute("""
        UPDATE trip SET tripname=%s, startdate=%s, enddate=%s,
               groupsize=%s, trip_type=%s, guideid=%s
        WHERE tripid=%s
    """, (tripname, startdate, enddate, groupsize, trip_type, guideid or None, trip_id))


def delete_trip(trip_id):
    execute("DELETE FROM trip WHERE tripid=%s", (trip_id,))


# ─────────────────────────────────────────────
#  PARTICIPANTS
# ─────────────────────────────────────────────
def get_all_participants():
    return fetch_all("""
        SELECT participantid, firstname, lastname, phone, email,
               birthday,
               EXTRACT(YEAR FROM AGE(birthday))::INT AS age
        FROM participant ORDER BY lastname, firstname
    """)


def get_participant_by_id(pid):
    return fetch_one("SELECT * FROM participant WHERE participantid=%s", (pid,))


def insert_participant(firstname, lastname, phone, email, birthday):
    execute("""
        INSERT INTO participant (participantid, firstname, lastname, phone, email, birthday)
        VALUES ((SELECT COALESCE(MAX(participantid),0)+1 FROM participant), %s, %s, %s, %s, %s)
    """, (firstname, lastname, phone, email, birthday))


def update_participant(pid, firstname, lastname, phone, email, birthday):
    execute("""
        UPDATE participant SET firstname=%s, lastname=%s, phone=%s, email=%s, birthday=%s
        WHERE participantid=%s
    """, (firstname, lastname, phone, email, birthday, pid))


def delete_participant(pid):
    execute("DELETE FROM participant WHERE participantid=%s", (pid,))


# ─────────────────────────────────────────────
#  SUPPLIERS
# ─────────────────────────────────────────────
def get_all_suppliers():
    return fetch_all("SELECT * FROM supplier ORDER BY company_name")


def get_supplier_by_id(sid):
    return fetch_one("SELECT * FROM supplier WHERE supplierid=%s", (sid,))


def insert_supplier(company_name, service_type, contactphone):
    execute("""
        INSERT INTO supplier (supplierid, company_name, service_type, contactphone)
        VALUES ((SELECT COALESCE(MAX(supplierid),0)+1 FROM supplier), %s, %s, %s)
    """, (company_name, service_type, contactphone))


def update_supplier(sid, company_name, service_type, contactphone):
    execute("""
        UPDATE supplier SET company_name=%s, service_type=%s, contactphone=%s
        WHERE supplierid=%s
    """, (company_name, service_type, contactphone, sid))


def delete_supplier(sid):
    execute("DELETE FROM supplier WHERE supplierid=%s", (sid,))


# ─────────────────────────────────────────────
#  EQUIPMENT
# ─────────────────────────────────────────────
def get_all_equipment():
    return fetch_all("""
        SELECT e.equipmentid, e.itemname, e.totalinstock,
               s.company_name AS supplier_name
        FROM equipment e
        JOIN supplier s ON e.supplierid = s.supplierid
        ORDER BY e.itemname
    """)


def get_equipment_by_id(eid):
    return fetch_one("""
        SELECT e.*, s.company_name AS supplier_name
        FROM equipment e JOIN supplier s ON e.supplierid=s.supplierid
        WHERE e.equipmentid=%s
    """, (eid,))


def insert_equipment(itemname, totalinstock, supplierid):
    execute("""
        INSERT INTO equipment (equipmentid, itemname, totalinstock, supplierid)
        VALUES ((SELECT COALESCE(MAX(equipmentid),0)+1 FROM equipment), %s, %s, %s)
    """, (itemname, totalinstock, supplierid))


def update_equipment(eid, itemname, totalinstock, supplierid):
    execute("""
        UPDATE equipment SET itemname=%s, totalinstock=%s, supplierid=%s
        WHERE equipmentid=%s
    """, (itemname, totalinstock, supplierid, eid))


def delete_equipment(eid):
    execute("DELETE FROM equipment WHERE equipmentid=%s", (eid,))


# ─────────────────────────────────────────────
#  TRANSPORTATION
# ─────────────────────────────────────────────
def get_all_transportation():
    return fetch_all("""
        SELECT tr.transportid, tr.vehicle_type, tr.capacity,
               s.company_name AS supplier_name
        FROM transportation tr
        JOIN supplier s ON tr.supplierid = s.supplierid
        ORDER BY s.company_name, tr.vehicle_type
    """)


def get_transport_by_id(tid):
    return fetch_one("""
        SELECT tr.*, s.company_name AS supplier_name
        FROM transportation tr JOIN supplier s ON tr.supplierid=s.supplierid
        WHERE tr.transportid=%s
    """, (tid,))


def insert_transportation(vehicle_type, capacity, supplierid):
    execute("""
        INSERT INTO transportation (transportid, vehicle_type, capacity, supplierid)
        VALUES ((SELECT COALESCE(MAX(transportid),0)+1 FROM transportation), %s, %s, %s)
    """, (vehicle_type, capacity, supplierid))


def update_transportation(tid, vehicle_type, capacity, supplierid):
    execute("""
        UPDATE transportation SET vehicle_type=%s, capacity=%s, supplierid=%s
        WHERE transportid=%s
    """, (vehicle_type, capacity, supplierid, tid))


def delete_transportation(tid):
    execute("DELETE FROM transportation WHERE transportid=%s", (tid,))


# ─────────────────────────────────────────────
#  LOCATIONS
# ─────────────────────────────────────────────
def get_all_locations():
    return fetch_all("SELECT * FROM location ORDER BY locationname")


def get_location_by_id(lid):
    return fetch_one("SELECT * FROM location WHERE locationid=%s", (lid,))


def insert_location(locationname, region, address, description):
    execute("""
        INSERT INTO location (locationid, locationname, region, address, description)
        VALUES ((SELECT COALESCE(MAX(locationid),0)+1 FROM location), %s, %s, %s, %s)
    """, (locationname, region, address, description))


def update_location(lid, locationname, region, address, description):
    execute("""
        UPDATE location SET locationname=%s, region=%s, address=%s, description=%s
        WHERE locationid=%s
    """, (locationname, region, address, description, lid))


def delete_location(lid):
    execute("DELETE FROM location WHERE locationid=%s", (lid,))


# ─────────────────────────────────────────────
#  REGISTERS_TO
# ─────────────────────────────────────────────
def get_all_registrations():
    return fetch_all("""
        SELECT p.firstname || ' ' || p.lastname AS participant_name,
               t.tripname,
               r.participantid, r.tripid
        FROM registers_to r
        JOIN participant p ON r.participantid = p.participantid
        JOIN trip t ON r.tripid = t.tripid
        ORDER BY t.tripname, p.lastname
    """)


def insert_registration(participantid, tripid):
    execute("""
        INSERT INTO registers_to (participantid, tripid) VALUES (%s, %s)
    """, (participantid, tripid))


def delete_registration(participantid, tripid):
    execute("DELETE FROM registers_to WHERE participantid=%s AND tripid=%s", (participantid, tripid))


# ─────────────────────────────────────────────
#  TRIP_EQUIPMENT
# ─────────────────────────────────────────────
def get_all_trip_equipment():
    return fetch_all("""
        SELECT t.tripname, e.itemname,
               te.quantityallocated, te.checkout_date, te.return_date,
               te.tripid, te.equipmentid
        FROM trip_equipment te
        JOIN trip t ON te.tripid = t.tripid
        JOIN equipment e ON te.equipmentid = e.equipmentid
        ORDER BY t.tripname, e.itemname
    """)


def insert_trip_equipment(tripid, equipmentid, qty, checkout_date):
    execute("""
        INSERT INTO trip_equipment (tripid, equipmentid, quantityallocated, checkout_date)
        VALUES (%s, %s, %s, %s)
    """, (tripid, equipmentid, qty, checkout_date))


def update_trip_equipment(tripid, equipmentid, qty, return_date):
    execute("""
        UPDATE trip_equipment SET quantityallocated=%s, return_date=%s
        WHERE tripid=%s AND equipmentid=%s
    """, (qty, return_date or None, tripid, equipmentid))


def delete_trip_equipment(tripid, equipmentid):
    execute("DELETE FROM trip_equipment WHERE tripid=%s AND equipmentid=%s", (tripid, equipmentid))


# ─────────────────────────────────────────────
#  TRIP_TRANSPORTATION
# ─────────────────────────────────────────────
def get_all_trip_transportation():
    return fetch_all("""
        SELECT t.tripname, tr.vehicle_type, s.company_name AS supplier_name,
               tt.departure_date_time, tt.arrival_date_time,
               tt.tripid, tt.transportid
        FROM trip_transportation tt
        JOIN trip t ON tt.tripid = t.tripid
        JOIN transportation tr ON tt.transportid = tr.transportid
        JOIN supplier s ON tr.supplierid = s.supplierid
        ORDER BY t.tripname
    """)


def insert_trip_transportation(tripid, transportid, departure, arrival):
    execute("""
        INSERT INTO trip_transportation (tripid, transportid, departure_date_time, arrival_date_time)
        VALUES (%s, %s, %s, %s)
    """, (tripid, transportid, departure, arrival))


def delete_trip_transportation(tripid, transportid):
    execute("DELETE FROM trip_transportation WHERE tripid=%s AND transportid=%s", (tripid, transportid))


# ─────────────────────────────────────────────
#  LOCATION_TRIP
# ─────────────────────────────────────────────
def get_all_location_trip():
    return fetch_all("""
        SELECT t.tripname, l.locationname, l.region,
               lt.location_order, lt.tripid, lt.locationid
        FROM location_trip lt
        JOIN trip t ON lt.tripid = t.tripid
        JOIN location l ON lt.locationid = l.locationid
        ORDER BY t.tripname, lt.location_order
    """)


def insert_location_trip(tripid, locationid, location_order):
    execute("""
        INSERT INTO location_trip (tripid, locationid, location_order)
        VALUES (%s, %s, %s)
    """, (tripid, locationid, location_order))


def delete_location_trip(tripid, locationid):
    execute("DELETE FROM location_trip WHERE tripid=%s AND locationid=%s", (tripid, locationid))


# ─────────────────────────────────────────────
#  QUERIES (שלב ב')
# ─────────────────────────────────────────────
def query_summer_participants(year=2026):
    return fetch_all("""
        SELECT DISTINCT p.firstname, p.lastname, p.email, p.phone, t.tripname,
               t.startdate
        FROM participant p
        JOIN registers_to r ON p.participantid = r.participantid
        JOIN trip t ON r.tripid = t.tripid
        WHERE EXTRACT(YEAR FROM t.startdate) = %s
          AND EXTRACT(MONTH FROM t.startdate) IN (6, 7, 8)
        ORDER BY p.lastname
    """, (year,))


def query_monthly_report():
    return fetch_all("""
        SELECT EXTRACT(YEAR FROM startdate)::INT AS tripyear,
               EXTRACT(MONTH FROM startdate)::INT AS tripmonth,
               COUNT(tripid) AS numberoftrips,
               ROUND(AVG(groupsize), 2) AS averagegroupsize
        FROM trip
        GROUP BY EXTRACT(YEAR FROM startdate), EXTRACT(MONTH FROM startdate)
        ORDER BY tripyear DESC, tripmonth DESC
    """)


def query_equipment_debt():
    return fetch_all("""
        SELECT p.firstname, p.lastname, p.phone, t.tripname,
               eq.itemname, te.checkout_date
        FROM participant p
        JOIN registers_to r ON p.participantid = r.participantid
        JOIN trip t ON r.tripid = t.tripid
        JOIN trip_equipment te ON t.tripid = te.tripid
        JOIN equipment eq ON te.equipmentid = eq.equipmentid
        WHERE EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM p.birthday) >= 18
          AND te.return_date IS NULL
          AND t.enddate < CURRENT_DATE
        ORDER BY p.lastname
    """)


def query_popular_locations():
    return fetch_all("""
        SELECT l.locationname, l.region,
               COUNT(DISTINCT lt.tripid) AS tripsvisiting,
               COUNT(DISTINCT r.participantid) AS totalparticipants
        FROM location l
        JOIN location_trip lt ON l.locationid = lt.locationid
        JOIN registers_to r ON lt.tripid = r.tripid
        GROUP BY l.locationid, l.locationname, l.region
        ORDER BY tripsvisiting DESC, totalparticipants DESC
        LIMIT 3
    """)


# ─────────────────────────────────────────────
#  SUB-PROGRAMS (שלב ד')
# ─────────────────────────────────────────────
def run_check_transport_capacity(trip_id):
    """Function: check_trip_transport_capacity"""
    result = fetch_one("SELECT check_trip_transport_capacity(%s) AS result", (trip_id,))
    return result['result'] if result else "No result"


def run_get_equipment_report(supplier_id):
    """Function: get_available_equipment_report (REFCURSOR)"""
    with get_connection() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute("BEGIN")
            cur.execute("SELECT get_available_equipment_report(%s)", (supplier_id,))
            cur.execute('FETCH ALL FROM "equipment_cursor"')
            rows = cur.fetchall()
            conn.commit()
            return rows


def run_allocate_equipment(trip_id, equipment_id, quantity):
    """Procedure: allocate_equipment_to_trip"""
    msg = ""
    try:
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "CALL allocate_equipment_to_trip(%s, %s, %s)",
                    (trip_id, equipment_id, quantity)
                )
            conn.commit()
        msg = "✅ הקצאת הציוד בוצעה בהצלחה!"
    except Exception as e:
        msg = f"❌ שגיאה: {e}"
    return msg


def run_register_participant(participant_id, trip_id):
    """Procedure: register_participant_for_trip_secure"""
    msg = ""
    try:
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "CALL register_participant_for_trip_secure(%s, %s)",
                    (participant_id, trip_id)
                )
            conn.commit()
        msg = "✅ המשתתף נרשם לטיול בהצלחה!"
    except Exception as e:
        msg = f"❌ שגיאה: {e}"
    return msg


# ─────────────────────────────────────────────
#  HELPERS – dropdown lists
# ─────────────────────────────────────────────
def get_trips_list():
    return fetch_all("SELECT tripid, tripname FROM trip ORDER BY tripname")


def get_participants_list():
    return fetch_all("""
        SELECT participantid, firstname || ' ' || lastname AS fullname
        FROM participant ORDER BY lastname
    """)


def get_suppliers_list():
    return fetch_all("SELECT supplierid, company_name FROM supplier ORDER BY company_name")


def get_equipment_list():
    return fetch_all("SELECT equipmentid, itemname FROM equipment ORDER BY itemname")


def get_transportation_list():
    return fetch_all("""
        SELECT tr.transportid,
               tr.vehicle_type || ' (' || s.company_name || ')' AS label
        FROM transportation tr JOIN supplier s ON tr.supplierid=s.supplierid
        ORDER BY s.company_name
    """)


def get_locations_list():
    return fetch_all("SELECT locationid, locationname FROM location ORDER BY locationname")


def get_guides_list():
    """Returns guide list if guide table exists"""
    try:
        return fetch_all("SELECT guideid, guidename FROM guide ORDER BY guidename")
    except Exception:
        return []


def get_dashboard_stats():
    stats = {}
    for key, q in [
        ("trips", "SELECT COUNT(*) AS cnt FROM trip"),
        ("participants", "SELECT COUNT(*) AS cnt FROM participant"),
        ("equipment", "SELECT COUNT(*) AS cnt FROM equipment"),
        ("suppliers", "SELECT COUNT(*) AS cnt FROM supplier"),
    ]:
        r = fetch_one(q)
        stats[key] = r['cnt'] if r else 0
    return stats

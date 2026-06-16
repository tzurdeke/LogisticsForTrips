# app.py – Flask Web Application
# מערכת ניהול לוגיסטיקה לטיולים – שלב ה'

from flask import Flask, render_template, request, redirect, url_for, flash, session
import db

app = Flask(__name__)
app.secret_key = "logistics_trips_secret_2026"


# ──────────────────────────────────────────────────────
#  ENTRANCE PAGE
# ──────────────────────────────────────────────────────
@app.route("/")
def index():
    return render_template("login.html")


# ──────────────────────────────────────────────────────
#  DASHBOARD
# ──────────────────────────────────────────────────────
@app.route("/dashboard")
def dashboard():
    try:
        stats = db.get_dashboard_stats()
    except Exception as e:
        stats = {"trips": "?", "participants": "?", "equipment": "?", "suppliers": "?"}
        flash(f"שגיאת חיבור לבסיס הנתונים: {e}", "error")
    return render_template("index.html", stats=stats)


# ──────────────────────────────────────────────────────
#  TRIPS
# ──────────────────────────────────────────────────────
@app.route("/trips")
def trips():
    rows = db.get_all_trips()
    guides = db.get_guides_list()
    return render_template("trips.html", rows=rows, guides=guides)


@app.route("/trips/add", methods=["POST"])
def trips_add():
    f = request.form
    try:
        db.insert_trip(
            f["tripname"], f["startdate"], f["enddate"],
            int(f["groupsize"]), f["trip_type"],
            f.get("guideid") or None
        )
        flash("הטיול נוסף בהצלחה! ✅", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("trips"))


@app.route("/trips/load/<int:trip_id>")
def trips_load(trip_id):
    row = db.get_trip_by_id(trip_id)
    rows = db.get_all_trips()
    guides = db.get_guides_list()
    return render_template("trips.html", rows=rows, edit=row, guides=guides)


@app.route("/trips/update", methods=["POST"])
def trips_update():
    f = request.form
    try:
        db.update_trip(
            int(f["tripid"]), f["tripname"], f["startdate"], f["enddate"],
            int(f["groupsize"]), f["trip_type"],
            f.get("guideid") or None
        )
        flash("הטיול עודכן בהצלחה! ✅", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("trips"))


@app.route("/trips/delete/<int:trip_id>")
def trips_delete(trip_id):
    try:
        db.delete_trip(trip_id)
        flash("הטיול נמחק בהצלחה! 🗑️", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("trips"))


# ──────────────────────────────────────────────────────
#  PARTICIPANTS
# ──────────────────────────────────────────────────────
@app.route("/participants")
def participants():
    rows = db.get_all_participants()
    return render_template("participants.html", rows=rows)


@app.route("/participants/add", methods=["POST"])
def participants_add():
    f = request.form
    try:
        db.insert_participant(f["firstname"], f["lastname"], f["phone"], f["email"], f["birthday"])
        flash("המשתתף נוסף בהצלחה! ✅", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("participants"))


@app.route("/participants/load/<int:pid>")
def participants_load(pid):
    row = db.get_participant_by_id(pid)
    rows = db.get_all_participants()
    return render_template("participants.html", rows=rows, edit=row)


@app.route("/participants/update", methods=["POST"])
def participants_update():
    f = request.form
    try:
        db.update_participant(int(f["participantid"]), f["firstname"], f["lastname"],
                              f["phone"], f["email"], f["birthday"])
        flash("המשתתף עודכן בהצלחה! ✅", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("participants"))


@app.route("/participants/delete/<int:pid>")
def participants_delete(pid):
    try:
        db.delete_participant(pid)
        flash("המשתתף נמחק בהצלחה! 🗑️", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("participants"))


# ──────────────────────────────────────────────────────
#  SUPPLIERS
# ──────────────────────────────────────────────────────
@app.route("/suppliers")
def suppliers():
    rows = db.get_all_suppliers()
    return render_template("suppliers.html", rows=rows)


@app.route("/suppliers/add", methods=["POST"])
def suppliers_add():
    f = request.form
    try:
        db.insert_supplier(f["company_name"], f["service_type"], f["contactphone"])
        flash("הספק נוסף בהצלחה! ✅", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("suppliers"))


@app.route("/suppliers/load/<int:sid>")
def suppliers_load(sid):
    row = db.get_supplier_by_id(sid)
    rows = db.get_all_suppliers()
    return render_template("suppliers.html", rows=rows, edit=row)


@app.route("/suppliers/update", methods=["POST"])
def suppliers_update():
    f = request.form
    try:
        db.update_supplier(int(f["supplierid"]), f["company_name"], f["service_type"], f["contactphone"])
        flash("הספק עודכן בהצלחה! ✅", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("suppliers"))


@app.route("/suppliers/delete/<int:sid>")
def suppliers_delete(sid):
    try:
        db.delete_supplier(sid)
        flash("הספק נמחק בהצלחה! 🗑️", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("suppliers"))


# ──────────────────────────────────────────────────────
#  EQUIPMENT
# ──────────────────────────────────────────────────────
@app.route("/equipment")
def equipment():
    rows = db.get_all_equipment()
    suppliers = db.get_suppliers_list()
    return render_template("equipment.html", rows=rows, suppliers=suppliers)


@app.route("/equipment/add", methods=["POST"])
def equipment_add():
    f = request.form
    try:
        db.insert_equipment(f["itemname"], int(f["totalinstock"]), int(f["supplierid"]))
        flash("פריט הציוד נוסף בהצלחה! ✅", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("equipment"))


@app.route("/equipment/load/<int:eid>")
def equipment_load(eid):
    row = db.get_equipment_by_id(eid)
    rows = db.get_all_equipment()
    suppliers = db.get_suppliers_list()
    return render_template("equipment.html", rows=rows, edit=row, suppliers=suppliers)


@app.route("/equipment/update", methods=["POST"])
def equipment_update():
    f = request.form
    try:
        db.update_equipment(int(f["equipmentid"]), f["itemname"],
                            int(f["totalinstock"]), int(f["supplierid"]))
        flash("הציוד עודכן בהצלחה! ✅", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("equipment"))


@app.route("/equipment/delete/<int:eid>")
def equipment_delete(eid):
    try:
        db.delete_equipment(eid)
        flash("פריט הציוד נמחק בהצלחה! 🗑️", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("equipment"))


# ──────────────────────────────────────────────────────
#  TRANSPORTATION
# ──────────────────────────────────────────────────────
@app.route("/transportation")
def transportation():
    rows = db.get_all_transportation()
    suppliers = db.get_suppliers_list()
    return render_template("transportation.html", rows=rows, suppliers=suppliers)


@app.route("/transportation/add", methods=["POST"])
def transportation_add():
    f = request.form
    try:
        db.insert_transportation(f["vehicle_type"], int(f["capacity"]), int(f["supplierid"]))
        flash("ההסעה נוספה בהצלחה! ✅", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("transportation"))


@app.route("/transportation/load/<int:tid>")
def transportation_load(tid):
    row = db.get_transport_by_id(tid)
    rows = db.get_all_transportation()
    suppliers = db.get_suppliers_list()
    return render_template("transportation.html", rows=rows, edit=row, suppliers=suppliers)


@app.route("/transportation/update", methods=["POST"])
def transportation_update():
    f = request.form
    try:
        db.update_transportation(int(f["transportid"]), f["vehicle_type"],
                                 int(f["capacity"]), int(f["supplierid"]))
        flash("ההסעה עודכנה בהצלחה! ✅", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("transportation"))


@app.route("/transportation/delete/<int:tid>")
def transportation_delete(tid):
    try:
        db.delete_transportation(tid)
        flash("ההסעה נמחקה בהצלחה! 🗑️", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("transportation"))


# ──────────────────────────────────────────────────────
#  LOCATIONS
# ──────────────────────────────────────────────────────
@app.route("/locations")
def locations():
    rows = db.get_all_locations()
    return render_template("locations.html", rows=rows)


@app.route("/locations/add", methods=["POST"])
def locations_add():
    f = request.form
    try:
        db.insert_location(f["locationname"], f["region"], f["address"], f.get("description", ""))
        flash("המיקום נוסף בהצלחה! ✅", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("locations"))


@app.route("/locations/load/<int:lid>")
def locations_load(lid):
    row = db.get_location_by_id(lid)
    rows = db.get_all_locations()
    return render_template("locations.html", rows=rows, edit=row)


@app.route("/locations/update", methods=["POST"])
def locations_update():
    f = request.form
    try:
        db.update_location(int(f["locationid"]), f["locationname"], f["region"],
                           f["address"], f.get("description", ""))
        flash("המיקום עודכן בהצלחה! ✅", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("locations"))


@app.route("/locations/delete/<int:lid>")
def locations_delete(lid):
    try:
        db.delete_location(lid)
        flash("המיקום נמחק בהצלחה! 🗑️", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("locations"))


# ──────────────────────────────────────────────────────
#  REGISTRATIONS
# ──────────────────────────────────────────────────────
@app.route("/registrations")
def registrations():
    rows = db.get_all_registrations()
    participants_list = db.get_participants_list()
    trips_list = db.get_trips_list()
    return render_template("registrations.html", rows=rows,
                           participants_list=participants_list, trips_list=trips_list)


@app.route("/registrations/add", methods=["POST"])
def registrations_add():
    f = request.form
    try:
        db.insert_registration(int(f["participantid"]), int(f["tripid"]))
        flash("הרישום נוסף בהצלחה! ✅", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("registrations"))


@app.route("/registrations/delete/<int:pid>/<int:tid>")
def registrations_delete(pid, tid):
    try:
        db.delete_registration(pid, tid)
        flash("הרישום נמחק בהצלחה! 🗑️", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("registrations"))


# ──────────────────────────────────────────────────────
#  TRIP EQUIPMENT
# ──────────────────────────────────────────────────────
@app.route("/trip_equipment")
def trip_equipment():
    rows = db.get_all_trip_equipment()
    trips_list = db.get_trips_list()
    equipment_list = db.get_equipment_list()
    return render_template("trip_equipment.html", rows=rows,
                           trips_list=trips_list, equipment_list=equipment_list)


@app.route("/trip_equipment/add", methods=["POST"])
def trip_equipment_add():
    f = request.form
    try:
        db.insert_trip_equipment(int(f["tripid"]), int(f["equipmentid"]),
                                 int(f["quantityallocated"]), f["checkout_date"])
        flash("הציוד הוקצה לטיול בהצלחה! ✅", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("trip_equipment"))


@app.route("/trip_equipment/update", methods=["POST"])
def trip_equipment_update():
    f = request.form
    try:
        db.update_trip_equipment(int(f["tripid"]), int(f["equipmentid"]),
                                 int(f["quantityallocated"]), f.get("return_date") or None)
        flash("הקצאת הציוד עודכנה בהצלחה! ✅", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("trip_equipment"))


@app.route("/trip_equipment/delete/<int:tid>/<int:eid>")
def trip_equipment_delete(tid, eid):
    try:
        db.delete_trip_equipment(tid, eid)
        flash("הקצאת הציוד נמחקה! 🗑️", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("trip_equipment"))


# ──────────────────────────────────────────────────────
#  TRIP TRANSPORTATION
# ──────────────────────────────────────────────────────
@app.route("/trip_transportation")
def trip_transportation():
    rows = db.get_all_trip_transportation()
    trips_list = db.get_trips_list()
    transport_list = db.get_transportation_list()
    return render_template("trip_transportation.html", rows=rows,
                           trips_list=trips_list, transport_list=transport_list)


@app.route("/trip_transportation/add", methods=["POST"])
def trip_transportation_add():
    f = request.form
    try:
        db.insert_trip_transportation(int(f["tripid"]), int(f["transportid"]),
                                      f["departure_date_time"], f["arrival_date_time"])
        flash("ההסעה שויכה לטיול בהצלחה! ✅", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("trip_transportation"))


@app.route("/trip_transportation/delete/<int:tid>/<int:trid>")
def trip_transportation_delete(tid, trid):
    try:
        db.delete_trip_transportation(tid, trid)
        flash("שיוך ההסעה נמחק! 🗑️", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("trip_transportation"))


# ──────────────────────────────────────────────────────
#  LOCATION TRIP
# ──────────────────────────────────────────────────────
@app.route("/location_trip")
def location_trip():
    rows = db.get_all_location_trip()
    trips_list = db.get_trips_list()
    locations_list = db.get_locations_list()
    return render_template("location_trip.html", rows=rows,
                           trips_list=trips_list, locations_list=locations_list)


@app.route("/location_trip/add", methods=["POST"])
def location_trip_add():
    f = request.form
    try:
        db.insert_location_trip(int(f["tripid"]), int(f["locationid"]), int(f["location_order"]))
        flash("המיקום שויך לטיול בהצלחה! ✅", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("location_trip"))


@app.route("/location_trip/delete/<int:tid>/<int:lid>")
def location_trip_delete(tid, lid):
    try:
        db.delete_location_trip(tid, lid)
        flash("שיוך המיקום נמחק! 🗑️", "success")
    except Exception as e:
        flash(f"שגיאה: {e}", "error")
    return redirect(url_for("location_trip"))


# ──────────────────────────────────────────────────────
#  QUERIES (שלב ב')
# ──────────────────────────────────────────────────────
@app.route("/queries", methods=["GET", "POST"])
def queries():
    results = None
    query_name = None
    error = None
    if request.method == "POST":
        query_name = request.form.get("query_name")
        try:
            if query_name == "summer_participants":
                year = int(request.form.get("year", 2026))
                results = db.query_summer_participants(year)
            elif query_name == "monthly_report":
                results = db.query_monthly_report()
            elif query_name == "equipment_debt":
                results = db.query_equipment_debt()
            elif query_name == "popular_locations":
                results = db.query_popular_locations()
        except Exception as e:
            error = str(e)
    return render_template("queries.html", results=results,
                           query_name=query_name, error=error)


# ──────────────────────────────────────────────────────
#  SUB-PROGRAMS (שלב ד')
# ──────────────────────────────────────────────────────
@app.route("/subprograms", methods=["GET", "POST"])
def subprograms():
    result = None
    prog_name = None
    error = None
    trips_list = db.get_trips_list()
    suppliers_list = db.get_suppliers_list()
    equipment_list = db.get_equipment_list()
    participants_list = db.get_participants_list()

    if request.method == "POST":
        prog_name = request.form.get("prog_name")
        try:
            if prog_name == "check_capacity":
                trip_id = int(request.form.get("trip_id"))
                result = db.run_check_transport_capacity(trip_id)
            elif prog_name == "equipment_report":
                supplier_id = int(request.form.get("supplier_id"))
                result = db.run_get_equipment_report(supplier_id)
            elif prog_name == "allocate_equipment":
                result = db.run_allocate_equipment(
                    int(request.form.get("trip_id")),
                    int(request.form.get("equipment_id")),
                    int(request.form.get("quantity"))
                )
            elif prog_name == "register_participant":
                result = db.run_register_participant(
                    int(request.form.get("participant_id")),
                    int(request.form.get("trip_id"))
                )
        except Exception as e:
            error = str(e)

    return render_template("subprograms.html",
                           result=result, prog_name=prog_name, error=error,
                           trips_list=trips_list, suppliers_list=suppliers_list,
                           equipment_list=equipment_list, participants_list=participants_list)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)

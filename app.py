from flask import Flask, render_template
from socketio import Server, WSGIApp
import sqlite3

sio = Server()
app = Flask(__name__)
app.wsgi_app = WSGIApp(sio, app.wsgi_app)
con = sqlite3.connect(":memory:")
cur = con.cursor()


@app.route("/")
def root():
    return render_template("index.html")


@sio.on("update_status")
def us(sid, data):
    cur.execute(
        "INSERT INTO ballstatus VALUES(:timestamp, :ball_pos, :x_axis, :y_axis );",
        {
            "timestamp": data["timestamp"],
            "ball_pos": data["ball_pos"],
            "x_axis": data["x_axis"],
            "y_axis": data["y_axis"],
        },
    )


@sio.on("get_status")
def gs(sid, data):
    cur.execute(
        "SELECT * FROM ballstatus ORDER BY timestamp DESC LIMIT :stamp ;",
        {"stamp": data["count"]},
    )
    sio.emit("update_status", cur.fetchmany(), to=sid)


@sio.on("update_movement")
def um(sid, data):
    pass


@sio.on("set_profile")
def sp(sid, data):
    cur.execute(
        "INSERT INTO client VAULES(:sid, :type);", {"sid": sid, "type": data["type"]}
    )


if __name__ == "__main__":
    cur.execute(
        "CREATE TABLE ballstatus (timestamp REAL, ball_pos INTEGER, x_axis INTEGER, y_axis INTEGER);"
    )
    cur.execute("CREATE TABLE client (sid INTEGER, type TEXT);")
    app.run(host="0.0.0.0")

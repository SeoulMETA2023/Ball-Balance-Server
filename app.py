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


# @sio.on("get_status")
# def gs() :


# sio.emit("update_status", data, to = sid)

if __name__ == "__main__":
    cur.execute(
        "CREATE TABLE ballstatus (timestamp INTEGER, ball_pos INTEGER, x_axis INTEGER, y_axis INTEGER);"
    )
    app.run(host="0.0.0.0")

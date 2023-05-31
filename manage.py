from flask import Flask, render_template
import random

app = Flask(__name__)

@app.route("/")
def homepage():
    return render_template("homepage.html")

@app.route("/divisaoregressao")
def divisaoregressoes():
    return render_template("divisaoregressao.html")

@app.route("/gerarduplas")
def gerarduplas():
    return render_template("gerarduplas.html")

if __name__ == "__main__":
    app.run(debug=True)
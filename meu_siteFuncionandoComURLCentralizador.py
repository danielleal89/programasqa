from flask import Flask, render_template
import json
import requests

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


@app.route("/centralizador")
def check_website_status():
    website_url = "https://mobileteste.hm.bb.com.br/mov-centralizador/servico/ServicoVersaoCentralizador/versaoDaAplicacaoWeb"
    try:
        response = requests.get(website_url)
        if response.status_code == 200:
            is_online = True
            response_content = response.text
            json_data = json.loads(response_content)
        else:
            is_online = False
            response_content = None
            json_data = json.loads(response_content)
    except requests.exceptions.RequestException:
        is_online = False
        response_content = None
        json_data = json.loads(response_content)
    return render_template('centralizador.html', is_online=is_online, response_content=response_content, json_data=json_data)


if __name__ == "__main__":
    app.run(debug=True)
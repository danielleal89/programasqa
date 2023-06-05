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
    websites = [
        {"name": "Centralizador PF HM Teste", "url": "https://mobileteste.hm.bb.com.br/mov-centralizador/servico/ServicoVersaoCentralizador/versaoDaAplicacaoWeb"},
        {"name": "Centralizador PF HM Comum", "url": "https://mob.hm.bb.com.br/mov-centralizador/servico/ServicoVersaoCentralizador/versaoDaAplicacaoWeb"},
        {"name": "Centralizador PJ HM Teste", "url": "https://mobipjteste.hm.bb.com.br/mov-centralizador-pj/servico/ServicoVersaoCentralizador/versaoDaAplicacaoWeb"},
        {"name": "Centralizador PJ HM Comum", "url": "https://mobipj.hm.bb.com.br/mov-centralizador-pj/servico/ServicoVersaoCentralizador/versaoDaAplicacaoWeb"}
    ]

    results = []

    for website in websites:
        try:
            response = requests.get(website["url"])
            if response.status_code == 200:
                response_content = response.text
                try:
                    json_data = json.loads(response_content)
                    is_online = True
                    results.append({
                        "name": website["name"],
                        "site": website["url"],
                        "is_online": is_online,
                        "response_content": response_content,
                        "json_data": json_data
                    })
                except:
                    is_online = False
                    results.append({
                        "name": website["name"],
                        "site": website["url"],
                        "is_online": is_online,
                        "response_content": response_content
                    })
            else:
                is_online = False
                results.append({
                    "name": website["name"],
                    "site": website["url"],
                    "is_online": is_online,
                    "response_content": response_content
                })

        except requests.exceptions.RequestException:
            is_online = False
            results.append({
                "name": website["name"],
                "site": website["url"],
                "is_online": is_online,
                "response_content": response_content
            })

    return render_template('centralizador.html', results=results)


if __name__ == "__main__":
    app.run(debug=True)
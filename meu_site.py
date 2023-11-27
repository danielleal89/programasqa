from flask import Flask, render_template, session, redirect, request
import json
import requests

app = Flask(__name__)
app.secret_key = "supersecretkey"  # Chave secreta para a sessão (deve ser mantida em segredo)

# Usuário e senha válidos
valid_username = "admin"
valid_password = "senha1234"

@app.route("/")
def root():
    return redirect("/home")

@app.route("/home")
def homepage():
    if not is_user_authenticated():
        return redirect("/login")
    return render_template("homepage.html")

@app.route("/android")
def android():
    if not is_user_authenticated():
        return redirect("/login")
    return render_template("android.html")

@app.route("/ios")
def ios():
    if not is_user_authenticated():
        return redirect("/login")
    return render_template("ios.html")

@app.route("/manual")
def manual():
    if not is_user_authenticated():
        return redirect("/login")
    return render_template("manual.html")

@app.route("/divisaoregressao")
def divisaoregressoes():
    if not is_user_authenticated():
        return redirect("/login")
    return render_template("divisaoregressao.html")

@app.route("/gerarduplas")
def gerarduplas():
    if not is_user_authenticated():
        return redirect("/login")
    return render_template("gerarduplas.html")

@app.route("/centralizador")
def check_website_status():
    if not is_user_authenticated():
        return redirect("/login")
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
            response_content = response.text
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
                "is_online": is_online
            })
    return render_template('centralizador.html', results=results)

@app.route("/login", methods=["GET", "POST"])
def login():
    if is_user_authenticated():
        return redirect("/")

    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        if username == valid_username and password == valid_password:
            # Autenticar o usuário
            session["username"] = username
            return redirect("/")
        else:
            # Credenciais inválidas, exibir mensagem de erro
            error_message = "Credenciais inválidas. Tente novamente."
            return render_template("login.html", error_message=error_message)
    else:
        # Exibir formulário de login
        return render_template("login.html")

def is_user_authenticated():
    # Verificar se o usuário está autenticado
    return "username" in session

@app.route("/logout")
def logout():
    session.clear() #Limpa informações de autenticação do usuário
    return redirect("/login")

if __name__ == "__main__":
    app.run(debug=True)

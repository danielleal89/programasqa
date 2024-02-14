from flask import Flask, render_template, session, redirect, request, jsonify
import json
import requests
import base64
import cv2
import os

app = Flask(__name__)
app.secret_key = "supersecretkey"  # Chave secreta para a sessão (deve ser mantida em segredo)

# Usuário e senha válidos
valid_username = "admin"
valid_password = "senha1234"

def encontrar_botao(imagem_grande, imagem_botao):
    img_grande = cv2.imread(imagem_grande)
    img_botao = cv2.imread(imagem_botao)

    # Verifique se as imagens foram carregadas corretamente
    if img_grande is None or img_botao is None:
        return False, None, None, None, None, None, None

    # Obtem dimensões da imagem do botão
    altura, largura, _ = img_botao.shape

    # Aplica correspondência de template
    resultado = cv2.matchTemplate(img_grande, img_botao, cv2.TM_CCOEFF_NORMED)
    _, _, _, max_loc = cv2.minMaxLoc(resultado)

    # Define um limite de confiança
    limite_confianca = 0.6

    # Verificar se o valor máximo excede o limite de confiança
    if cv2.minMaxLoc(resultado)[1] > limite_confianca:
        # Extrai as coordenadas x e y do canto superior esquerdo
        x_inicial, y_inicial = max_loc

        # Calcula as coordenadas x e y do centro da imagem
        altura, largura, _ = img_botao.shape
        x_centro = x_inicial + largura // 2
        y_centro = y_inicial + altura // 2
        return True, x_centro, y_centro, x_inicial, y_inicial, altura, largura
    else:
        return False, None, None, None, None, None, None

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

@app.route("/flags", methods=['GET', 'POST'])
def flags():
    request.method = "POST"
    results = []
    if request.method == 'POST':
        payload = {
            "cc_pf": {
                "agencia": 5517,
                "conta": 51519,
                "senha": "88888888",
                "titularidade": 1
            }
        }
        url = "https://mobileteste.hm.bb.com.br/cfe-mov/api/v1/parametros/MOV_PESSOA_FISICA_AGENCIA_CONTA/todos"

        response = requests.post(url, json=payload)

        response_content = response.text
        json_data = json.loads(response_content)

        results.append({
            "json_data": json_data,
            "response": response.status_code
        })

    return render_template('flags.html', results=results)

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

@app.route("/liberaPF")
def liberaPF():
    if not is_user_authenticated():
        return redirect("/login")
    return render_template("liberaPF.html")

@app.route("/qmassaPF", methods=['GET', 'POST'])
def qmassaPF():
    if not is_user_authenticated():
        return redirect("/login")
    else:
        try:
            agencia = request.args.get('agencia', type=int)
            conta = request.args.get('conta', type=int)

            request.method = "POST"
            results = []
            if request.method == 'POST':
                payload = {
                    "agencia": agencia,
                    "conta": conta
                }
                url = "https://qualidade-massa-de-dados-api.ath.servicos.bb.com.br/v2/sr018/liberar-celular-pf?ambiente=HM"

                headers = {
                    'x-qualidade-projeto-online': 'mobile-pj-ios',
                    'x-qualidade-script-online': 'script-ato',
                    'x-qualidade-uor-online': '514417',
                    'qmassa-token': '/ra0nEfWjJ496NUEChQKUsI0tuo6dcNEKZSr/WmPgzSetadB5JOz8VR4oDPsh0uQzih+wwor22164dsSl9TttFcUyKBFGcYEV79u51stTxOgvIzJERAPebZ9EZblOMkuSe3lMgcKaHvocJIMDWK9dMbp2tSXtrjml99+kc0OnVbvL/2vVKb6/J04SKnjlqFcb3SLm/XK17njFHK0vT0SyTcBG6Mc2rWS6oDscCvhtztYo1eJZt60JXsBnLKNMft6XhEP6W47pzzFPzw/KZuhKP+QDWpjq+B014n3AdYzZCk='
                }

                response = requests.post(url, json=payload, headers=headers)
                results = []

                response_content = response.text
                json_data = json.loads(response_content)

                results.append({
                    "json_data": json_data,
                    "response": response.status_code
                })
        except:
            results = []
            results.append({
                "response": 100
            })

    return render_template('qmassaPF.html', results=results)

@app.route("/liberaPJ")
def liberaPJ():
    if not is_user_authenticated():
        return redirect("/login")
    return render_template("liberaPJ.html")

@app.route("/qmassaPJ", methods=['GET', 'POST'])
def qmassaPJ():
    if not is_user_authenticated():
        return redirect("/login")
    else:
        try:
            chave = request.args.get('chave')

            request.method = "POST"
            results = []
            if request.method == 'POST':
                payload = {
                    "chaveJ": chave
                }
                url = "https://qualidade-massa-de-dados-api.ath.servicos.bb.com.br/v2/sr023/liberar-mobile-pj?ambiente=HM"

                headers = {
                    'x-qualidade-projeto-online': 'mobile-pj-ios',
                    'x-qualidade-script-online': 'script-ato',
                    'x-qualidade-uor-online': '514417',
                    'qmassa-token': '/ra0nEfWjJ496NUEChQKUsI0tuo6dcNEKZSr/WmPgzSetadB5JOz8VR4oDPsh0uQzih+wwor22164dsSl9TttFcUyKBFGcYEV79u51stTxOgvIzJERAPebZ9EZblOMkuSe3lMgcKaHvocJIMDWK9dMbp2tSXtrjml99+kc0OnVbvL/2vVKb6/J04SKnjlqFcb3SLm/XK17njFHK0vT0SyTcBG6Mc2rWS6oDscCvhtztYo1eJZt60JXsBnLKNMft6XhEP6W47pzzFPzw/KZuhKP+QDWpjq+B014n3AdYzZCk='
                }

                response = requests.post(url, json=payload, headers=headers)
                results = []

                response_content = response.text
                json_data = json.loads(response_content)

                results.append({
                    "json_data": json_data,
                    "response": response.status_code
                })
        except:
            results = []
            results.append({
                "response": 100
            })

    return render_template('qmassaPJ.html', results=results)

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

@app.route('/comparar_imagens', methods=['POST'])
def comparar_imagens():
    # Recebe os dados base64 das imagens
    imagem1_base64 = request.json.get('imagem1')
    imagem2_base64 = request.json.get('imagem2')

    # Decodifica as imagens base64
    imagem1_data = base64.b64decode(imagem1_base64)
    imagem2_data = base64.b64decode(imagem2_base64)

    # Salva as imagens em um diretório específico
    with open('imagem1.png', 'wb') as f1, open('imagem2.png', 'wb') as f2:
        f1.write(imagem1_data)
        f2.write(imagem2_data)

    # Realiza a análise das imagens
    botao_encontrado, x_centro, y_centro, x_inicial, y_inicial, altura, largura = encontrar_botao('imagem1.png', 'imagem2.png')

    # Retorna os resultados em formato JSON
    if botao_encontrado:
        os.remove('imagem1.png')
        os.remove('imagem2.png')
        return jsonify({
            "status": True,
            "x_centro": x_centro,
            "y_centro": y_centro,
            "x_inicial": x_inicial,
            "y_inicial": y_inicial,
            "altura": altura,
            "largura": largura
        })
    else:
        os.remove('imagem1.png')
        os.remove('imagem2.png')
        return jsonify({"status": False})

if __name__ == "__main__":
    app.run(debug=True)

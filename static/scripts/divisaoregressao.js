function selecionarTodos() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var selecionar = true;

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].id !== 'regressaoApp' && checkboxes[i].id !== 'centralizadorPF' && checkboxes[i].id !== 'centralizadorPJ' && !checkboxes[i].checked) {
            selecionar = false;
            break;
        }
    }

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].id !== 'regressaoApp' && checkboxes[i].id !== 'centralizadorPF' && checkboxes[i].id !== 'centralizadorPJ') {
            checkboxes[i].checked = !selecionar;
        }
    }
}

analistasAndroid = {"Andréia": 10, "Any": 20, "Alexandre": 30, "Juliana": 40, "Radamés": 50};
analistasIOS = {"Aline": 10, "Daniel": 20, "Guilherme": 30, "Lorena": 40, "Magdiel": 50};

listaRegressaoApp = {10: "Menu Parte 1 + Logins/Logins PJ + Onboarding abrir conta",
                     20: "Menu Parte 2 + Menu PJ + Instalação/Atualização",
                     30: "Menu Parte 3 + Home PJ + Perfil PJ",
                     40: "Menu Parte 4 + Área não logada sem conta cadastrada + Área não logada com conta cadastrada + Área não logada PJ",
                     50: "Home + Perfil + Link inteligente/leitor de PDF"};

listaRegressaoCentralizadorPF = {10: "Menu Parte 1 + Área não logada sem conta cadastrada",
                                 20: "Menu Parte 2 + Onboarding abrir conta",
                                 30: "Menu Parte 3 + Área não logada com conta cadastrada",
                                 40: "Menu Parte 4 + Perfil",
                                 50: "Home Parte 1 + Instalação/atualização",
                                 60: "Home Parte 2 + Logins + Link inteligente/leitor de PDF + Notificações"};

listaRegressaoCentralizadorPJ = {10: "Login",
                                 20: "Área não logada",
                                 30: "Home",
                                 40: "Perfil",
                                 50: "Menu Parte 1",
                                 60: "Menu Parte 2"};

listaAtivosAndroid = [];
listaAtivosIOS = [];
listaFuturaAndroid = {};
listaFuturaIOS = {};
listaCompletaAndroid = {};
listaCompletaIOS = {};
listaCompletaCentralizadorAndroid = {};
listaCompletaCentralizadorIOS = {};

function gerarApp() {
    var contAndroid = 0;
    var contIOS = 0;
    for (var valor in listaRegressaoApp) {
        for (var nome in analistasAndroid) {
            if (String(valor) === String(analistasAndroid[nome])) {
                if (listaAtivosAndroid.includes(nome)) {
                    listaCompletaAndroid[nome] = listaRegressaoApp[valor];
                } else {
                    if (contAndroid == 0) {
                        listaCompletaAndroid['?????'.padEnd(contAndroid, ' ')] = listaRegressaoApp[valor];
                        contAndroid += 1;
                    } else if (contAndroid == 1) {
                        listaCompletaAndroid[' ?????'.padEnd(contAndroid, ' ')] = listaRegressaoApp[valor];
                        contAndroid +=1;
                    } else if (contAndroid == 2) {
                        listaCompletaAndroid['  ?????'.padEnd(contAndroid, ' ')] = listaRegressaoApp[valor];
                        contAndroid +=1;
                    } else if (contAndroid == 3) {
                        listaCompletaAndroid['   ?????'.padEnd(contAndroid, ' ')] = listaRegressaoApp[valor];
                        contAndroid +=1;
                    } else if (contAndroid == 4) {
                        listaCompletaAndroid['    ?????'.padEnd(contAndroid, ' ')] = listaRegressaoApp[valor];
                        contAndroid +=1;
                    }
                }
                if (parseInt(analistasAndroid[nome]) === 50) {
                    listaFuturaAndroid[nome] = 10;
                } else {
                    listaFuturaAndroid[nome] = parseInt(analistasAndroid[nome]) + 10;
                }
            }
        }

        for (var nome in analistasIOS) {
            if (String(valor) === String(analistasIOS[nome])) {
                if (listaAtivosIOS.includes(nome)) {
                    listaCompletaIOS[nome] = listaRegressaoApp[valor];
                } else {
                    if (contIOS == 0) {
                        listaCompletaIOS['?????'.padEnd(contIOS, ' ')] = listaRegressaoApp[valor];
                        contIOS += 1;
                    } else if (contIOS == 1) {
                        listaCompletaIOS[' ?????'.padEnd(contIOS, ' ')] = listaRegressaoApp[valor];
                        contIOS += 1;
                    } else if (contIOS == 2) {
                        listaCompletaIOS['  ?????'.padEnd(contIOS, ' ')] = listaRegressaoApp[valor];
                        contIOS += 1;
                    } else if (contIOS == 3) {
                        listaCompletaIOS['   ?????'.padEnd(contIOS, ' ')] = listaRegressaoApp[valor];
                        contIOS += 1;
                    } else if (contIOS == 4) {
                        listaCompletaIOS['    ?????'.padEnd(contIOS, ' ')] = listaRegressaoApp[valor];
                        contIOS += 1;
                    }
                }
                if (parseInt(analistasIOS[nome]) === 50) {
                    listaFuturaIOS[nome] = 10;
                } else {
                    listaFuturaIOS[nome] = parseInt(analistasIOS[nome]) + 10;
                }
            }
        }
    }
    var ulElement = document.querySelector('.half-screen ul');

    var h3android = document.createElement('h3');
    h3android.innerText = 'Android';
    ulElement.appendChild(h3android);
    for (var nome in listaCompletaAndroid) {
        var li = document.createElement('li');
        li.innerText = nome + ": " + listaCompletaAndroid[nome];
        ulElement.appendChild(li);
    }
    analistasAndroid = listaFuturaAndroid;
    listaFuturaAndroid = {};
    listaCompletaAndroid = {};


    var h3ios = document.createElement('h3');
    h3ios.innerText = 'iOS';
    ulElement.appendChild(h3ios);
    for (var nome in listaCompletaIOS) {
        var li = document.createElement('li');
        li.innerText = nome + ": " + listaCompletaIOS[nome];
        ulElement.appendChild(li);
    }
    analistasIOS = listaFuturaIOS;
    listaFuturaIOS = {};
    listaCompletaIOS = {};

    var h4android = document.createElement('h4');
    h4android.innerText = 'Aline e Lorena: Notificações - Android e iOS';
    ulElement.appendChild(h4android);
}

function gerarCentralizador() {
    var contCentralizadorAndroid = 0;
    var contCentralizadorIOS = 0;
    for (var valor in listaRegressaoCentralizadorPF) {
        for (var nome in analistasAndroid) {
            if (String(valor) === String(analistasAndroid[nome])) {
                if (listaAtivosAndroid.includes(nome)) {
                    listaCompletaCentralizadorAndroid[nome] = listaRegressaoCentralizadorPF[valor];
                } else {
                    if (contCentralizadorAndroid == 0) {
                        listaCompletaCentralizadorAndroid['?????'.padEnd(contCentralizadorAndroid, ' ')] = listaRegressaoCentralizadorPF[valor];
                        contCentralizadorAndroid += 1;
                    } else if (contCentralizadorAndroid == 1) {
                        listaCompletaCentralizadorAndroid[' ?????'.padEnd(contCentralizadorAndroid, ' ')] = listaRegressaoCentralizadorPF[valor];
                        contCentralizadorAndroid +=1;
                    } else if (contCentralizadorAndroid == 2) {
                        listaCompletaCentralizadorAndroid['  ?????'.padEnd(contCentralizadorAndroid, ' ')] = listaRegressaoCentralizadorPF[valor];
                        contCentralizadorAndroid +=1;
                    } else if (contCentralizadorAndroid == 3) {
                        listaCompletaCentralizadorAndroid['   ?????'.padEnd(contCentralizadorAndroid, ' ')] = listaRegressaoCentralizadorPF[valor];
                        contCentralizadorAndroid +=1;
                    } else if (contCentralizadorAndroid == 4) {
                        listaCompletaCentralizadorAndroid['    ?????'.padEnd(contCentralizadorAndroid, ' ')] = listaRegressaoCentralizadorPF[valor];
                        contCentralizadorAndroid +=1;
                    } else if (contCentralizadorAndroid == 5) {
                        listaCompletaCentralizadorAndroid['     ?????'.padEnd(contCentralizadorAndroid, ' ')] = listaRegressaoCentralizadorPF[valor];
                        contCentralizadorAndroid +=1;
                    }
                }
                if (parseInt(analistasAndroid[nome]) === 60) {
                    listaFuturaAndroid[nome] = 10;
                } else {
                    listaFuturaAndroid[nome] = parseInt(analistasAndroid[nome]) + 10;
                }
            }
        }

        for (var nome in analistasIOS) {
            if (String(valor) === String(analistasIOS[nome])) {
                if (listaAtivosIOS.includes(nome)) {
                    listaCompletaCentralizadorIOS[nome] = listaRegressaoCentralizadorPF[valor];
                } else {
                    if (contCentralizadorIOS == 0) {
                        listaCompletaCentralizadorIOS['?????'.padEnd(contCentralizadorIOS, ' ')] = listaRegressaoCentralizadorPF[valor];
                        contCentralizadorIOS += 1;
                    } else if (contCentralizadorIOS == 1) {
                        listaCompletaCentralizadorIOS[' ?????'.padEnd(contCentralizadorIOS, ' ')] = listaRegressaoCentralizadorPF[valor];
                        contCentralizadorIOS += 1;
                    } else if (contCentralizadorIOS == 2) {
                        listaCompletaCentralizadorIOS['  ?????'.padEnd(contCentralizadorIOS, ' ')] = listaRegressaoCentralizadorPF[valor];
                        contCentralizadorIOS += 1;
                    } else if (contCentralizadorIOS == 3) {
                        listaCompletaCentralizadorIOS['   ?????'.padEnd(contCentralizadorIOS, ' ')] = listaRegressaoCentralizadorPF[valor];
                        contCentralizadorIOS += 1;
                    } else if (contCentralizadorIOS == 4) {
                        listaCompletaCentralizadorIOS['    ?????'.padEnd(contCentralizadorIOS, ' ')] = listaRegressaoCentralizadorPF[valor];
                        contCentralizadorIOS += 1;
                    } else if (contCentralizadorIOS == 5) {
                        listaCompletaCentralizadorIOS['     ?????'.padEnd(contCentralizadorIOS, ' ')] = listaRegressaoCentralizadorPF[valor];
                        contCentralizadorIOS += 1;
                    }
                }
                if (parseInt(analistasIOS[nome]) === 60) {
                    listaFuturaIOS[nome] = 10;
                } else {
                    listaFuturaIOS[nome] = parseInt(analistasIOS[nome]) + 10;
                }
            }
        }
    }
    var ulElementD = document.querySelector('.half-screen ul');

    var h4android = document.createElement('h3');
    h4android.innerText = 'Android';
    ulElementD.appendChild(h4android);
    for (var nome in listaCompletaCentralizadorAndroid) {
        var liD = document.createElement('li');
        liD.innerText = nome + ": " + listaCompletaCentralizadorAndroid[nome];
        ulElementD.appendChild(liD);
    }
    analistasAndroid = listaFuturaAndroid;
    listaFuturaAndroid = {};
    listaCompletaCentralizadorAndroid = {};

    var h4ios = document.createElement('h3');
    h4ios.innerText = 'iOS';
    ulElementD.appendChild(h4ios);
    for (var nome in listaCompletaCentralizadorIOS) {
        var liD = document.createElement('li');
        liD.innerText = nome + ": " + listaCompletaCentralizadorIOS[nome];
        ulElementD.appendChild(liD);
    }
    analistasIOS = listaFuturaIOS;
    listaFuturaIOS = {};
    listaCompletaCentralizadorIOS = {};
}

function gerarCentralizadorPJ() {
    var contCentralizadorAndroid = 0;
    var contCentralizadorIOS = 0;
    for (var valor in listaRegressaoCentralizadorPJ) {
        for (var nome in analistasAndroid) {
            if (String(valor) === String(analistasAndroid[nome])) {
                if (listaAtivosAndroid.includes(nome)) {
                    listaCompletaCentralizadorAndroid[nome] = listaRegressaoCentralizadorPJ[valor];
                } else {
                    if (contCentralizadorAndroid == 0) {
                        listaCompletaCentralizadorAndroid['?????'.padEnd(contCentralizadorAndroid, ' ')] = listaRegressaoCentralizadorPJ[valor];
                        contCentralizadorAndroid += 1;
                    } else if (contCentralizadorAndroid == 1) {
                        listaCompletaCentralizadorAndroid[' ?????'.padEnd(contCentralizadorAndroid, ' ')] = listaRegressaoCentralizadorPJ[valor];
                        contCentralizadorAndroid +=1;
                    } else if (contCentralizadorAndroid == 2) {
                        listaCompletaCentralizadorAndroid['  ?????'.padEnd(contCentralizadorAndroid, ' ')] = listaRegressaoCentralizadorPJ[valor];
                        contCentralizadorAndroid +=1;
                    } else if (contCentralizadorAndroid == 3) {
                        listaCompletaCentralizadorAndroid['   ?????'.padEnd(contCentralizadorAndroid, ' ')] = listaRegressaoCentralizadorPJ[valor];
                        contCentralizadorAndroid +=1;
                    } else if (contCentralizadorAndroid == 4) {
                        listaCompletaCentralizadorAndroid['    ?????'.padEnd(contCentralizadorAndroid, ' ')] = listaRegressaoCentralizadorPJ[valor];
                        contCentralizadorAndroid +=1;
                    } else if (contCentralizadorAndroid == 5) {
                        listaCompletaCentralizadorAndroid['     ?????'.padEnd(contCentralizadorAndroid, ' ')] = listaRegressaoCentralizadorPJ[valor];
                        contCentralizadorAndroid +=1;
                    }
                }
                if (parseInt(analistasAndroid[nome]) === 60) {
                    listaFuturaAndroid[nome] = 10;
                } else {
                    listaFuturaAndroid[nome] = parseInt(analistasAndroid[nome]) + 10;
                }
            }
        }

        for (var nome in analistasIOS) {
            if (String(valor) === String(analistasIOS[nome])) {
                if (listaAtivosIOS.includes(nome)) {
                    listaCompletaCentralizadorIOS[nome] = listaRegressaoCentralizadorPJ[valor];
                } else {
                    if (contCentralizadorIOS == 0) {
                        listaCompletaCentralizadorIOS['?????'.padEnd(contCentralizadorIOS, ' ')] = listaRegressaoCentralizadorPJ[valor];
                        contCentralizadorIOS += 1;
                    } else if (contCentralizadorIOS == 1) {
                        listaCompletaCentralizadorIOS[' ?????'.padEnd(contCentralizadorIOS, ' ')] = listaRegressaoCentralizadorPJ[valor];
                        contCentralizadorIOS += 1;
                    } else if (contCentralizadorIOS == 2) {
                        listaCompletaCentralizadorIOS['  ?????'.padEnd(contCentralizadorIOS, ' ')] = listaRegressaoCentralizadorPJ[valor];
                        contCentralizadorIOS += 1;
                    } else if (contCentralizadorIOS == 3) {
                        listaCompletaCentralizadorIOS['   ?????'.padEnd(contCentralizadorIOS, ' ')] = listaRegressaoCentralizadorPJ[valor];
                        contCentralizadorIOS += 1;
                    } else if (contCentralizadorIOS == 4) {
                        listaCompletaCentralizadorIOS['    ?????'.padEnd(contCentralizadorIOS, ' ')] = listaRegressaoCentralizadorPJ[valor];
                        contCentralizadorIOS += 1;
                    } else if (contCentralizadorIOS == 5) {
                        listaCompletaCentralizadorIOS['     ?????'.padEnd(contCentralizadorIOS, ' ')] = listaRegressaoCentralizadorPJ[valor];
                        contCentralizadorIOS += 1;
                    }
                }
                if (parseInt(analistasIOS[nome]) === 60) {
                    listaFuturaIOS[nome] = 10;
                } else {
                    listaFuturaIOS[nome] = parseInt(analistasIOS[nome]) + 10;
                }
            }
        }
    }
    var ulElementD = document.querySelector('.half-screen ul');

    var h4android = document.createElement('h3');
    h4android.innerText = 'Android';
    ulElementD.appendChild(h4android);
    for (var nome in listaCompletaCentralizadorAndroid) {
        var liD = document.createElement('li');
        liD.innerText = nome + ": " + listaCompletaCentralizadorAndroid[nome];
        ulElementD.appendChild(liD);
    }
    analistasAndroid = listaFuturaAndroid;
    listaFuturaAndroid = {};
    listaCompletaCentralizadorAndroid = {};

    var h4ios = document.createElement('h3');
    h4ios.innerText = 'iOS';
    ulElementD.appendChild(h4ios);
    for (var nome in listaCompletaCentralizadorIOS) {
        var liD = document.createElement('li');
        liD.innerText = nome + ": " + listaCompletaCentralizadorIOS[nome];
        ulElementD.appendChild(liD);
    }
    analistasIOS = listaFuturaIOS;
    listaFuturaIOS = {};
    listaCompletaCentralizadorIOS = {};
}

function limparUl() {
    var halfScreenDiv = document.getElementById('halfScreenDiv');
    halfScreenDiv.innerHTML = '';
}

function rodarRegressaoApp() {
    var contador = 1;
    var ulElement = document.querySelector('.half-screen ul');
    var h1Element = document.createElement('h3');
    var h2Element = document.createElement('h3');
    var h3Element = document.createElement('h3');
    var h4Element = document.createElement('h3');
    var h5Element = document.createElement('h3');
    var h7Element = document.createElement('h3');

    var rodada = 'º Rodada - Regressão App\n\nRegressão Completa do App\n\nVersão do App: iOS x.xx.x.x e Android x.xx.x.x\n\nRegistrar no Qase:\nLink: https://app.qase.io/runPF\nUsuário: regressaopf@gmail.com\nSenha: l@b123321\n\nRL da carga: A definir\nPrazo: A definir';
    h1Element.innerText = contador + rodada;
    ulElement.appendChild(h1Element);
    gerarApp();
    contador += 1;
    h2Element.innerText = contador + rodada;
    ulElement.appendChild(h2Element);
    gerarApp();
    contador += 1;
    h3Element.innerText = contador + rodada;
    ulElement.appendChild(h3Element);
    gerarApp();
    contador += 1;
    h4Element.innerText = contador + rodada;
    ulElement.appendChild(h4Element);
    gerarApp();
    contador += 1;
    h5Element.innerText = contador + rodada;
    ulElement.appendChild(h5Element);
    gerarApp();
}

function rodarCentralizadorPF() {
    var contadorD = 1;
    var ulElementD = document.querySelector('.half-screen ul');
    var h1ElementD = document.createElement('h3');
    var h2ElementD = document.createElement('h3');
    var h3ElementD = document.createElement('h3');
    var h4ElementD = document.createElement('h3');
    var h5ElementD = document.createElement('h3');
    var h6ElementD = document.createElement('h3');

    h1ElementD.innerText = contadorD + 'º Rodada - Regressão Centralizador PF';
    ulElementD.appendChild(h1ElementD);
    gerarCentralizador();
    contadorD += 1;
    h2ElementD.innerText = contadorD + 'º Rodada - Regressão Centralizador PF';
    ulElementD.appendChild(h2ElementD);
    gerarCentralizador();
    contadorD += 1;
    h3ElementD.innerText = contadorD + 'º Rodada - Regressão Centralizador PF';
    ulElementD.appendChild(h3ElementD);
    gerarCentralizador();
    contadorD += 1;
    h4ElementD.innerText = contadorD + 'º Rodada - Regressão Centralizador PF';
    ulElementD.appendChild(h4ElementD);
    gerarCentralizador();
    contadorD += 1;
    h5ElementD.innerText = contadorD + 'º Rodada - Regressão Centralizador PF';
    ulElementD.appendChild(h5ElementD);
    gerarCentralizador();
    contadorD += 1;
    h6ElementD.innerText = contadorD + 'º Rodada - Regressão Centralizador PF';
    ulElementD.appendChild(h6ElementD);
    gerarCentralizador();
}

function rodarCentralizadorPJ() {
    var contadorPJ = 1;
    var ulElementPJ = document.querySelector('.half-screen ul');
    var h1ElementPJ = document.createElement('h3');
    var h2ElementPJ = document.createElement('h3');
    var h3ElementPJ = document.createElement('h3');
    var h4ElementPJ = document.createElement('h3');
    var h5ElementPJ = document.createElement('h3');
    var h6ElementPJ = document.createElement('h3');

    h1ElementPJ.innerText = contadorPJ + 'º Rodada - Regressão Centralizador PJ';
    ulElementPJ.appendChild(h1ElementPJ);
    gerarCentralizadorPJ();
    contadorPJ += 1;
    h2ElementPJ.innerText = contadorPJ + 'º Rodada - Regressão Centralizador PJ';
    ulElementPJ.appendChild(h2ElementPJ);
    gerarCentralizadorPJ();
    contadorPJ += 1;
    h3ElementPJ.innerText = contadorPJ + 'º Rodada - Regressão Centralizador PJ';
    ulElementPJ.appendChild(h3ElementPJ);
    gerarCentralizadorPJ();
    contadorPJ += 1;
    h4ElementPJ.innerText = contadorPJ + 'º Rodada - Regressão Centralizador PJ';
    ulElementPJ.appendChild(h4ElementPJ);
    gerarCentralizadorPJ();
    contadorPJ += 1;
    h5ElementPJ.innerText = contadorPJ + 'º Rodada - Regressão Centralizador PJ';
    ulElementPJ.appendChild(h5ElementPJ);
    gerarCentralizadorPJ();
    contadorPJ += 1;
    h6ElementPJ.innerText = contadorPJ + 'º Rodada - Regressão Centralizador PJ';
    ulElementPJ.appendChild(h6ElementPJ);
    gerarCentralizadorPJ();
}

function executar() {
    limparUl();
    var regressaoApp = document.getElementById('regressaoApp');
    var centralizadorPF = document.getElementById('centralizadorPF');
    var centralizadorPJ = document.getElementById('centralizadorPJ');

    if ((regressaoApp.checked && centralizadorPF.checked) ||
        (regressaoApp.checked && centralizadorPJ.checked) ||
        (centralizadorPF.checked && centralizadorPJ.checked)) {
        alert('Selecione apenas uma opção!!');
    } else if (!regressaoApp.checked && !centralizadorPF.checked && !centralizadorPJ.checked) {
        alert('Selecione uma opção!!');
    } else {
        listaAtivosAndroid = [];
        listaAtivosIOS = [];
        if (andreia.checked) { listaAtivosAndroid.push("Andréia") }
        if (ani.checked) { listaAtivosAndroid.push("Any") }
        if (alexandre.checked) { listaAtivosAndroid.push("Alexandre") }
        if (juliana.checked) { listaAtivosAndroid.push("Juliana") }
        if (radames.checked) { listaAtivosAndroid.push("Radamés") }
        if (aline.checked) { listaAtivosIOS.push("Aline") }
        if (daniel.checked) { listaAtivosIOS.push("Daniel") }
        if (guilherme.checked) { listaAtivosIOS.push("Guilherme") }
        if (lorena.checked) { listaAtivosIOS.push("Lorena") }
        if (magdiel.checked) { listaAtivosIOS.push("Magdiel") }

        if (regressaoApp.checked) {
            rodarRegressaoApp();
        }
//        if (centralizadorPF.checked) {
//            rodarCentralizadorPF();
//        }
//        if (centralizadorPJ.checked) {
//            rodarCentralizadorPJ();
//        }
    }
}
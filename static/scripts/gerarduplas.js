function gerarDuplas() {
    var nomes = ['Andréia', 'Aline', 'Any', 'Alexandre', 'Daniel', 'Guilherme', 'Iury', 'Juliana', 'Magdiel', 'Paula', 'Radamés', 'Rayssa'];
    var nomes2 = ['Andréia', 'Aline', 'Any', 'Alexandre', 'Daniel', 'Guilherme', 'Iury', 'Juliana', 'Magdiel', 'Paula', 'Radamés', 'Rayssa'];
    var listaFinal = [];

    var preantepenultimoE = '';
    var preantepenultimoD = '';
    var antepenultimoE = '';
    var antepenultimoD = '';
    var penultimoE = '';
    var penultimoD = '';
    var ultimoE = '';
    var ultimoD = '';
    var cont = 0;

    while (cont < 35) {
        var nomeE = nomes[Math.floor(Math.random() * nomes.length)];
        var nomeD = nomes2[Math.floor(Math.random() * nomes2.length)];
        var analistas = `${nomeE}/${nomeD}`;
        var analistasInvertidos = `${nomeD}/${nomeE}`;

        if (analistas !== 'Andréia/Juliana' && analistas !== 'Juliana/Andréia' &&
            analistas !== 'Any/Iury' && analistas !== 'Iury/Any') {
            if (!listaFinal.includes(analistas)) {
                if (nomeE !== nomeD) {
                    if ((ultimoE !== nomeE && penultimoE !== nomeE && antepenultimoE !== nomeE && preantepenultimoE !== nomeE) &&
                        (ultimoD !== nomeD && penultimoD !== nomeD && antepenultimoD !== nomeD && preantepenultimoD !== nomeD) &&
                        (ultimoD !== nomeE && penultimoD !== nomeE && antepenultimoD !== nomeE) &&
                        (ultimoE !== nomeD && penultimoE !== nomeD && antepenultimoE !== nomeD)){
                        cont++;

                        preantepenultimoE = antepenultimoE;
                        preantepenultimoD = antepenultimoD;

                        antepenultimoE = penultimoE;
                        antepenultimoD = penultimoD;

                        penultimoE = ultimoE;
                        penultimoD = ultimoD;

                        ultimoE = nomeE;
                        ultimoD = nomeD;
                        listaFinal.push(analistas);
                        listaFinal.push(analistasInvertidos);
                    }
                }
            }
        }
    }

    var ulElements = document.querySelectorAll('.half-screen ul');
    ulElements.forEach(function (ul) {
        ul.innerHTML = ''; // Limpa o conteúdo atual das <ul>

        // Adiciona as novas duplas geradas na <ul>
        listaFinal.forEach(function (dupla, index) {
            var li = document.createElement('li');
            li.innerText = dupla;
            ul.appendChild(li);

            if ((index + 1) % 5 === 0) {
                var br = document.createElement('br');
                ul.appendChild(br);
            }
        });
    });
}

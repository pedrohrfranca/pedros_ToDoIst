// DATA TOPO
var dataHojeElement = document.getElementById("data-hoje");

var dataAtual = new Date();

var options = { year: 'numeric', month: 'long', day: 'numeric' };

var dataFormatada = dataAtual.toLocaleDateString('pt-BR', options);

dataHojeElement.textContent = dataFormatada;
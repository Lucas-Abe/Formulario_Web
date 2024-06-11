/*Função para mostrar campo de outros gêneros*/ 
function mostrarOutros(input) {
    let inserirOutro = document.getElementById('outro_genero');
    if (input.value == '1') {
        inserirOutro.style.display = 'block';
    } else {
        inserirOutro.style.display = 'none';
    }
}

/*Função de máscara para o CEP*/
function limpa_formulário_cep() {
    document.getElementById('rua').value = ("");
    document.getElementById('bairro').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('uf').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById('endereco').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('municipio').value = (conteudo.localidade);
        document.getElementById('estado').value = (conteudo.uf);
    }
    else {
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisarCep(valor) {
    var cep = valor.replace(/\D/g, '');

    if (cep != "") {

        var validacep = /^[0-9]{8}$/;

        if (validacep.test(cep)) {

            document.getElementById('cep').value = cep.substring(0, 5)
                + "-"
                + cep.substring(5);

            document.getElementById('endereco').value = "Procurando...";
            document.getElementById('bairro').value = "Procurando...";
            document.getElementById('municipio').value = "Procurando...";
            document.getElementById('estado').value = "Procurando...";

            var script = document.createElement('script');

            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            document.body.appendChild(script);

        }
        else {
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    }
    else {
        limpa_formulário_cep();
    }
};

/*Função de máscara para o telefone*/
function mascaraTelefone(masks, max, event) {
    var c = event.target;
    var v = c.value.replace(/\D/g, '');
    var m = c.value.length > max ? 1 : 0;
    VMasker(c).unMask();
    VMasker(c).maskPattern(masks[m]);
    c.value = VMasker.toPattern(v, masks[m]);
}

var telMask = ['+99 (99) 9999-99999', '+99 (99) 99999-9999'];
var tel = document.querySelector('input[attrname=telephone1]');
VMasker(tel).maskPattern(telMask[0]);
tel.addEventListener('input', mascaraTelefone.bind(undefined, telMask, 14), false);

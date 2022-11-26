let altura = document.querySelector('#altura');
let peso = document.querySelector('#peso');
let form = document.querySelector('.form');
let myImc = '';
let pl = eval(form.parentElement.clientHeight - form.clientHeight);

form.style.paddingTop= eval(pl/2)+'px';

function checkDate(){
    if(peso.value.length >= 2 && altura.value.length >= 1){
        return true;
    }

    return false; 
}

function anim(){
    
    if(checkDate()){
        document.querySelector('#loadBtn').style.background = '#2ecc71';
    }
}

function showResult(imc){
    form.reset();
    
    document.querySelector('#result').innerHTML = setInner(imc);

    document.querySelector('#result').style.display = 'block';

    document.querySelector('#loadBtn').style.background = '#000';

}

document.querySelector('#loadBtn').addEventListener('click', e=>{
    
    if(!checkDate()){ return; }

    e.preventDefault();
    
    let imc = calcImc(peso.value, altura.value);
    
    this.myImc = imc;

    showResult(imc);

    setTimeout(() => {

        document.querySelector('#result').style.display = 'none'; 
        document.querySelector('#loadBtn').style.background = '#000';

    }, 5500);
});

/** CALCULANDO IMC COM ENTRADAS 
 * IMC = PESO (ALTURA * ALTURA)
*/
function calcImc(peso, alt){
    let a = alt.toString();

    let b = parseFloat(a.substr(0, 1) +'.'+ a.substr(1));

    let num = parseInt(peso/(b*b));

    if(num <= 18.5){
        //a= Abaixo do peso
        return 1;
    } else if(num <= 24.9){
        //b= Peso normal
        return 2;
    } else if (num <= 29.9){
        //c= Excesso de peso
        return 3;
    } else if(num <= 34.9){
        //d= Obsidade I
        return 4;
    } else if(num <= 39.9){
        //e= Obsidade II
        return 5;
    } else if(num <= 49.9){
        //f= Obsidade III
        return 6;
    } else if(num >= 50){
        return 10;
    }


}

function setInner(imc){
    console.log('IMC Recebido no SetInner '+imc);
    switch(imc){
        case 1:
            return 'IMC= '+myImc+'| Abaixo do peso ideal. 👎';
        break;

        case 2:
            return 'IMC= '+myImc+'| Peso ideal para seu corpo. 🥳';
        break;

        case 3:
            return 'IMC= '+myImc+'| Início de excesso de peso. 😬';
        break;

        case 4:
            return 'IMC= '+myImc+'| Estado de obsidade I 🟡';
        break;

        case 5:
            return 'IMC= '+myImc+'| Estado de obsidade II 🟠';
        break;

        case 6:
            return 'IMC= '+myImc+'| Estado de obsidade III 🔴';
        break;

        case 10:
            return 'Sério isso? Eu sou uma aplicação séria! 🙄';
        break;

        default:
            return 'Não encontrei seu IMC na tabela, Você inseriu bem seus dados?';
    }
    
}

var form = document.querySelector(".form");
var currency = form.querySelector(".currency");
var s = form.querySelector(".sum_kredit");
var r = form.querySelector(".pircent_kredit");
var n = form.querySelector(".time_kredit");
var fields = form.querySelectorAll(".field");
var examples = form.querySelectorAll(".form_kredit");

const rates ={};

fetch('https://www.cbr-xml-daily.ru/daily_json.js').then(function(result){
    return result.json()
}).then(function(data){
    rates.RUB = 1;
    rates.USD = data.Valute.USD.Value;
    rates.EUR= data.Valute.EUR.Value;
    rates.AED= data.Valute.AED.Value;
    
    
})

var generateError = function(text){
    var error = document.createElement('div');
    error.className = 'error';
    error.style.color = 'red';
    error.innerHTML = text;
   
    return error;
}
var generate_form_kredit = function(text){
    var example = document.createElement('div');
    example.className = 'form_kredit';
    example.innerHTML = text;
   
    return example;
}

form.addEventListener("submit", function (event) {
    "use strict";
    event.preventDefault();
   
var errors = form.querySelectorAll(".error")
    for (let i = 0; i < errors.length; i++) {
        errors[i].remove();
    }
    for (let i = 0; i < fields.length; i++) {
        if (!fields[i].value) {
            var error = generateError('введите нужное значение');
            fields[i].parentElement.appendChild(error);
        }  
    }  
    if(error == null){
            var S = s.value;
            var R = r.value/100;
            var N = n.value;
            var P = (S*R/12)/(1-Math.pow((1+R/12),-N));
            var T = P*N;
            var current_valute = currency.value;
    
            

            if(true){
                var example_title = generate_form_kredit(' Результат(в RUB):');
                examples[4].parentElement.appendChild(example_title);

                var example_P = generate_form_kredit(' ежемесячный платеж:'+ Math.round(P*100*rates[current_valute])/100);
                examples[4].parentElement.appendChild(example_P);

                var example_T = generate_form_kredit(' итоговая стоимость кредита:'+ Math.round(T*100*rates[current_valute])/100);
                examples[4].parentElement.appendChild(example_T);

                var example_title = generate_form_kredit(' Результат(в '+ current_valute +'):');
                examples[4].parentElement.appendChild(example_title);

                var example_P = generate_form_kredit(' ежемесячный платеж:'+ Math.round(P*100)/100);
                examples[4].parentElement.appendChild(example_P);

                var example_T = generate_form_kredit(' итоговая стоимость кредита:'+ Math.round(T*100)/100);
                examples[4].parentElement.appendChild(example_T);

                var remove_examples = form.querySelectorAll(".form_kredit");
                if(remove_examples.length > 11){
                    for(var i=5; i < 11; i++){
                        remove_examples[i].remove();
                    }
                }    
            } 
            
    }
})

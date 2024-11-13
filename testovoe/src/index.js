const form = document.querySelector(".form");
const currency = form.querySelector(".currency");
const s = form.querySelector(".sum_kredit");
const r = form.querySelector(".pircent_kredit");
const n = form.querySelector(".time_kredit");
const fields = form.querySelectorAll(".field");
const examples = form.querySelectorAll(".form_kredit");

const rates ={};

fetch('https://www.cbr-xml-daily.ru/daily_json.js').then(function(result){
    return result.json()
}).then(function(data){
    rates.RUB = 1;
    rates.USD = data.Valute.USD.Value;
    rates.EUR= data.Valute.EUR.Value;
    rates.AED= data.Valute.AED.Value; 
})

const generateError = function(text){
    let error = document.createElement('div');
    error.className = 'error';
    error.style.color = 'red';
    error.innerHTML = text;
   
    return error;
}
const generateFormKredit = function(text){
    let example = document.createElement('div');
    example.className = 'form_kredit';
    example.innerHTML = text;
   
    return example;
}
form.addEventListener("submit", function (event) {
    "use strict";
    event.preventDefault();
    for (let i = 0; i < fields.length; i++) {
        if (!fields[i].value) {
            var error = generateError('введите нужное значение');
            fields[i].parentElement.appendChild(error);
        }  
    }  
    let errors = form.querySelectorAll(".error")
    for (let i = 0; i < errors.length; i++) {
        errors[i].remove();
    }

    if(error == null){
        const sumKredit = s.value;
        const pircentKredit = r.value/100;
        const timeKredit = n.value;
        const monthlyPayment = (sumKredit*pircentKredit/12)/(1-Math.pow((1+pircentKredit/12),-timeKredit));
        const totalCost = monthlyPayment*timeKredit;
        const currentValute = currency.value;

        let removeExamples = form.querySelectorAll(".form_kredit");

        if(removeExamples.length >= 11){
            for(let i=5; i < 11; i++){         //если пункт 5 про визуальное удаление, то i<=11               
                removeExamples[i].remove();                     
            }                                                                  
        } 
            let TitleRUB = generateFormKredit(' Результат(в RUB):');
                examples[4].parentElement.appendChild(TitleRUB);

            let MonthlyPaymentRUB = generateFormKredit(' ежемесячный платеж:'+ Math.round(monthlyPayment * 100 * rates[currentValute]) / 100);
                examples[4].parentElement.appendChild(MonthlyPaymentRUB);

            let TotalCostRUB = generateFormKredit(' итоговая стоимость кредита:'+ Math.round(totalCost * 100 * rates[currentValute]) / 100);
                examples[4].parentElement.appendChild(TotalCostRUB);

            let TitleValute = generateFormKredit(' Результат(в '+ currentValute +'):');
                examples[4].parentElement.appendChild(TitleValute);

            let MonthlyPaymentValute = generateFormKredit(' ежемесячный платеж:'+ Math.round(monthlyPayment * 100) / 100);
                examples[4].parentElement.appendChild(MonthlyPaymentValute);

            let TotalCostValute = generateFormKredit(' итоговая стоимость кредита:'+ Math.round(totalCost * 100) / 100);
                examples[4].parentElement.appendChild(TotalCostValute);             
    }
})

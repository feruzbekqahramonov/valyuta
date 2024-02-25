const fromCurrencyOptions = document.querySelector('.from-currensy select')
const toCurrencyOptions = document.querySelector('.to-currnesy select')
const fromAmount = document.querySelector('.from-amount input')
const fromResult = document.getElementById('from-result')
const toResult = document.getElementById('to-result')
const convertBtn = document.getElementById('convert-btn')
const cwapBtn = document.getElementById('swap-btn')

async function loadCountrySybols() {
    const result = await fetch(`https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8cbf1a5083msh89e153ff496a84dp10b875jsn3eebd88cad2b',
            'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
          }
    })
    const data = await result.json()
    let symbolsList = data.rates
    showData(symbolsList)
}
document.addEventListener('DOMContentLoaded', function() {

    loadCountrySybols()

})

function showData(symbols) {
    let symbolsOnly = Object.keys(symbols)
    let html = ''
    symbolsOnly.forEach(symbol => {
        html += `<option data-id = "${symbol}">${symbol}</option>`
    })
  
    fromCurrencyOptions.innerHTML = html
    fromCurrencyOptions.querySelectorAll('option').forEach(option => {
        if (option.dataset.id == 'USD') option.selected = 'selected'
    })

    toCurrencyOptions.innerHTML = html
    toCurrencyOptions.querySelectorAll('option').forEach(option => {
        if (option.dataset.id == 'EUR') option.selected = 'selected'
    })
}

fromAmount.addEventListener('keyup', function() {
    let amount = Number(this.value)
    if(!amount) fromAmount.style.borderColor = 'red';
    else fromAmount.style.borderColor = '#c6c7c9'
})

convertBtn.addEventListener('click', function() {
    let fromCurrency = fromCurrencyOptions.value;
    let toCurrency = toCurrencyOptions.value;
    let fromAmt = Number(fromAmount.value)
    if(fromAmt) getConvertedData(fromCurrency, toCurrency, fromAmt)
})

async function getConvertedData(from, to, amount) {
    const API_URL = `https://api.exchangerate.host/'.$endpoint.'?access_key='.$access_key.'&from='.${from}.'&to='.${to}.'&amount='.${amount}`
    const result = await fetch(API_URL)
    const data = await result.json()
    console.log(data);
}


// document.addEventListener('DOMContentLoaded', function(e) {
//     e.preventDefault();

    // fetch(`https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest`, {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': '8cbf1a5083msh89e153ff496a84dp10b875jsn3eebd88cad2b',
    //         'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
    //       }
    // })
//         .then(res => {
//             if(res.ok == true && res.status == 200) {
//                 return res.json()
//             }
//         })
//         .then(data => {
//             console.log(data);
//             if (data.length) {
//                 data.forEach(element => {
//                     const card = createSelects(element);
//                     // console.log(card);
//                     from.innerHTML += card;
//                 });
//             }
//         })
//         .catch(err => {
//             console.log(err);
//         })
// })



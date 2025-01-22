"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector('#search-form > form');
const input = document.querySelector('#input-localization');
const sectionTempoInfos = document.querySelector('#weather');
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !sectionTempoInfos)
        return;
    const localizacao = input.value;
    if (localizacao.length < 3) {
        alert("O local precisa ter pelo menos 3 letras");
        return;
    }
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(localizacao)) {
        alert("Por favor, insira apenas letras (incluindo acentos) e espaços.");
        return;
    }
    try {
        const resposta = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=0aa714c7e97bce0f79122d5d56b06112&lang=pt_br&units=metric`);
        if (!resposta.ok) {
            throw new Error("Local não encontrado. Verifique o nome e tente novamente.");
        }
        console.log(resposta);
        const dados = yield resposta.json();
        const infos = {
            temperatura: Math.round(dados.main.temp),
            local: dados.name,
            icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`
        };
        sectionTempoInfos.innerHTML = `
        <div class="weather-data">
            <h2>${infos.local}</h2>
            <span>${infos.temperatura}</span>
        </div>

        <img src="${infos.icone}" />
     `;
        input.value = '';
    }
    catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        }
        else {
            alert("Algo deu errado. Tente novamente");
        }
    }
}));

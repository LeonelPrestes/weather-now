const form = document.querySelector('#search-form > form');
const input: HTMLInputElement | null = document.querySelector('#input-localization');

const sectionTempoInfos = document.querySelector('#weather')

form?.addEventListener('submit', async (event) => {
    event.preventDefault();


    if (!input || !sectionTempoInfos) return;

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

        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=0aa714c7e97bce0f79122d5d56b06112&lang=pt_br&units=metric`)

        if (!resposta.ok) {
            throw new Error("Local não encontrado. Verifique o nome e tente novamente.");
        }
        console.log(resposta)

        const dados = await resposta.json()

        const infos = {
            temperatura: Math.round(dados.main.temp),
            local: dados.name,
            icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`
        }

        sectionTempoInfos.innerHTML = `
        <div class="weather-data">
            <h2>${infos.local}</h2>
            <span>${infos.temperatura}</span>
        </div>

        <img src="${infos.icone}" />
     `;

    input.value = ''
    } catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        } else {
            alert("Algo deu errado. Tente novamente");
        }
    }
});



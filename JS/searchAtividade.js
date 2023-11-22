// BUSCAR ATIVIDADE

function searchActivity() {
    const keyword = document.querySelector('.pesquisa').value.toLowerCase();
    const sections = [{
        title: "Atividades Atrasadas",
        list: document.querySelector('.atividades-atrasadas .lista-atividades')
    }, {
        title: "Fazer Hoje",
        list: document.querySelector('.atividades-hoje .lista-atividades')
    }, {
        title: "Em breve",
        list: document.querySelector('.atividades-embreve .lista-atividades')
    }];

    const results = [];
    const resultsEl = document.querySelector('.resultados-pesquisa');

    sections.forEach(section => {
        const items = section.list.children;
        for (let item of items) {
            const activityText = item.textContent.trim();
            if (activityText.toLowerCase().includes(keyword)) {
                results.push({ 
                    activity: activityText,
                    section: section.title
                });
            }
        }
    });

    if (keyword === "" || results.length === 0) {
        resultsEl.style.display = 'none';
        return;
    }

    displayResults(results);
    resultsEl.style.display = 'block'; 
}

function displayResults(results) {
    const resultsListEl = document.getElementById('searchResults');
    resultsListEl.innerHTML = ""; 

    results.forEach(result => {
        const li = document.createElement('li');
        li.textContent = `${result.activity} (na lista "${result.section}")`;
        resultsListEl.appendChild(li);
    });
}

document.querySelector('.pesquisa').addEventListener('input', searchActivity);

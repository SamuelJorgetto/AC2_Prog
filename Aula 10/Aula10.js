document.addEventListener('DOMContentLoaded', async function() {
    const setorUrl = 'https://aulalp2024.free.beeceptor.com/setor';
    const cargoUrl = 'https://aulalp2024.free.beeceptor.com/cargo';
    const convenioUrl = 'https://aulalp2024.free.beeceptor.com/convenio';
    const submitUrl = 'https://66266bc2052332d55322d1f0.mockapi.io/funcionario';

    try {
        const [setorData, cargoData, convenioData] = await Promise.all([
            fetch(setorUrl).then(response => response.json()),
            fetch(cargoUrl).then(response => response.json()),
            fetch(convenioUrl).then(response => response.json())
        ]);

        const setorSelect = document.getElementById('setor');
        const cargoSelect = document.getElementById('cargo');
        const convenioSelect = document.getElementById('convenio');

        setorData.forEach(setor => {
            const option = document.createElement('option');
            option.value = setor.sigla;
            option.textContent = setor.sigla;
            option.dataset.nome = setor.nome;
            setorSelect.appendChild(option);
        });

        cargoData.forEach(cargo => {
            const option = document.createElement('option');
            option.value = cargo.nome;
            option.textContent = cargo.nome;
            option.dataset.salario = cargo.salario;
            cargoSelect.appendChild(option);
        });

        convenioData.forEach(convenio => {
            const option = document.createElement('option');
            option.value = convenio.nome;
            option.textContent = convenio.nome;
            option.dataset.valorTitular = convenio.valorTitular;
            option.dataset.valorDependente = convenio.valorDependente;
            convenioSelect.appendChild(option);
        });

        setorSelect.addEventListener('change', function() {
            const selectedOption = setorSelect.options[setorSelect.selectedIndex];
            document.getElementById('nomeSetor').value = selectedOption.dataset.nome;
        });

        cargoSelect.addEventListener('change', function() {
            const selectedOption = cargoSelect.options[cargoSelect.selectedIndex];
            document.getElementById('salario').value = selectedOption.dataset.salario;
        });

        convenioSelect.addEventListener('change', function() {
            const selectedOption = convenioSelect.options[convenioSelect.selectedIndex];
            document.getElementById('valorTitular').value = selectedOption.dataset.valorTitular;
            document.getElementById('valorDependente').value = selectedOption.dataset.valorDependente;
        });

        const form = document.getElementById('cadastroFuncionario');
        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            const response = await fetch(submitUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Funcionário cadastrado com sucesso!');
                form.reset();
            } else {
                alert('Erro ao cadastrar funcionário.');
            }
        });
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
});

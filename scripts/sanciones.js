fetch('https://sheets.googleapis.com/v4/spreadsheets/1zaCd8es0pm2md9X8AJwJRm-0J22_7UxoRNAztGzpkmk/values/Sanciones!A101:B250?key=AIzaSyD1qXjPmgBaRtX0zJtH76nvU708Gvs3A-g')
    .then(response => response.json())
    .then(data => {
        const values = data.values;

        // Obtener el elemento de la tabla
        const tabla = document.getElementById('tabla');

        // Iterar a través de los valores y crear las filas de la tabla
        values.forEach(row => {
            const fila = document.createElement('tr');

            // Verificar si la fila tiene un elemento
            if (row.length === 1) {
                const celda = document.createElement('td');
                celda.colSpan = 2;
                celda.textContent = row[0];
                celda.classList.add('una'); // Agregar la clase 'nombre' a la celda
                if (row[0].toLowerCase().includes('regla')) {
                    celda.classList.add('rosa');
                }
                if (row[0].toLowerCase().includes('regla') && !row[0].toLowerCase().includes('.')) {
                    celda.classList.add('rosaOscuro');
                }
                if (row[0].toLowerCase().includes('sanción propuesta')) {
                    celda.classList.add('amarillo');
                }
                fila.appendChild(celda);
            } else {
                row.forEach(cellValue => {
                    const celda = document.createElement('td');

                    if (cellValue.toLowerCase().includes('cantidad') ||
                        (cellValue.toLowerCase().includes('sancion') && !cellValue.toLowerCase().includes('sanciones'))) {
                        celda.classList.add('rosa'); // Agregar la clase 'temporada' a la celda
                    }

                    if (cellValue.toLowerCase().includes('bobble')) {
                        celda.classList.add('cabezaDoble');
                    }

                    if (cellValue.toLowerCase().includes('pp')
                    || cellValue.toLowerCase().startsWith('-')) {
                        celda.classList.add('rojo');
                    }

                    if (cellValue.toLowerCase().includes('em. per. (1')
                        || cellValue.toLowerCase().includes('sanción propuesta')
                       ||cellValue.toLowerCase().includes('em. par. (1')
                       ||cellValue.toLowerCase().includes('+1 gol')) {
                        celda.classList.add('amarillo');
                    }

                    if (cellValue.toLowerCase().includes('em. per. (2')
                        || cellValue.toLowerCase().includes('regla 11.4')
                       ||cellValue.toLowerCase().includes('em. par. (2')
                       ||cellValue.toLowerCase().includes('+2 goles')) {
                        celda.classList.add('naranja');
                    }

                    if (cellValue.toLowerCase().includes('expulsi')) {
                        celda.classList.add('negro');
                    }

                    celda.textContent = cellValue;


                    fila.appendChild(celda);
                });

            }

            tabla.appendChild(fila);
        });
    })
    .catch(error => console.error(error));

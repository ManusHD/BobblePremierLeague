fetch('https://sheets.googleapis.com/v4/spreadsheets/1zaCd8es0pm2md9X8AJwJRm-0J22_7UxoRNAztGzpkmk/values/Records!A2:C?key=AIzaSyD1qXjPmgBaRtX0zJtH76nvU708Gvs3A-g')
  .then(response => response.json())
  .then(data => {
    const values = data.values;

    // Obtener el elemento de la tabla
    const tabla = document.getElementById('tabla1');

    // Iterar a través de los valores y crear las filas de la tabla
    values.forEach(row => {
      const fila = document.createElement('tr');

      // Crear celdas y asignar las clases
      row.forEach((cellValue, index) => {
        const celda = document.createElement('td');
        celda.textContent = cellValue;

        if (index === 0) {
          celda.classList.add('nombre');
        }

        fila.appendChild(celda);
      });

      tabla.appendChild(fila);
    });
  })
  .catch(error => console.error(error));

  fetch('https://sheets.googleapis.com/v4/spreadsheets/1zaCd8es0pm2md9X8AJwJRm-0J22_7UxoRNAztGzpkmk/values/Records!E2:E?key=AIzaSyD1qXjPmgBaRtX0zJtH76nvU708Gvs3A-g')
  .then(response => response.json())
  .then(data => {
    const values = data.values;

    const tabla = document.getElementById('tabla2');

    values.forEach((valor, index) => {
            const dato = document.createElement('p');
            dato.textContent = valor;
        if(index % 2 == 0){
            dato.classList.add('nombre');
        }else{
            dato.classList.add('jugador');
        }

        tabla.appendChild(dato);
    });
  })
  .catch(error => console.error(error));
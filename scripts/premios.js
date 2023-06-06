fetch('https://sheets.googleapis.com/v4/spreadsheets/1zaCd8es0pm2md9X8AJwJRm-0J22_7UxoRNAztGzpkmk/values/Premios!A1:B?key=AIzaSyD1qXjPmgBaRtX0zJtH76nvU708Gvs3A-g')
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
        if(row[0].toLowerCase().includes('premios')){
            celda.classList.add('cabezaUna');
        }
        fila.appendChild(celda);
      } else {
        row.forEach(cellValue => {
            const celda = document.createElement('td');
            
            if (cellValue.toLowerCase().includes('temporada') ||
                    cellValue.toLowerCase().includes('edición')) {
                celda.classList.add('temporada'); // Agregar la clase 'temporada' a la celda
            }

            if(cellValue.toLowerCase().includes('bobble')){
                celda.classList.add('cabezaDoble');
            }

            if (cellValue.length > 30) {
              const enlace = document.createElement('a');
              enlace.href = cellValue;
              enlace.textContent = cellValue;
              celda.appendChild(enlace);
            } else {
              celda.textContent = cellValue;
            }
            
            celda.classList.add('dos'); // Agregar otra clase a la celda
            fila.appendChild(celda);
          });
          
      }

      tabla.appendChild(fila);
    });
  })
  .catch(error => console.error(error));

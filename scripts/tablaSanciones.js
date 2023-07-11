const COLOR_DEFECTO = '#ff0000';
const COLORES_TABLA = {
  0: '#93c47d',
  1: '#fffee0',
  2: '#fffc9b',
  3: '#fffa4e',
  4: '#fff800',
  5: '#ffb500',
  6: '#ff8a00',
  7: '#ff6000',
  8: '#ff4000',
  9: '#ff2a00',
  10: '#ff0000'
}

fetch('https://sheets.googleapis.com/v4/spreadsheets/1zaCd8es0pm2md9X8AJwJRm-0J22_7UxoRNAztGzpkmk/values/Sanciones!C2:T17?key=AIzaSyD1qXjPmgBaRtX0zJtH76nvU708Gvs3A-g')
  .then(response => response.json())
  .then(data => {
    const values = data.values;

    // Obtener el elemento de la tabla
    const tabla = document.getElementById('tabla');

    // Iterar a través de los valores y crear las filas de la tabla
    values.forEach(row => {
      const fila = document.createElement('tr');

      row.forEach(cellValue => {
        const celda = document.createElement('td');
        celda.textContent = cellValue;

        if(cellValue.toLowerCase().includes('regla') || 
            cellValue.toLowerCase().includes('equipo') ||
            cellValue.toLowerCase().includes('total de')){
            celda.classList.add('reglas');
        }

        if(cellValue.toLowerCase().includes('sanción') || 
        (cellValue.toLowerCase().includes('sanciones') && !cellValue.toLowerCase().includes('total'))){
          celda.style.backgroundColor = COLORES_TABLA[cellValue[0]];
          if(cellValue[1] != ' '){
            celda.style.backgroundColor = COLOR_DEFECTO;
          }
        }

        fila.appendChild(celda);
      });

      tabla.appendChild(fila);
    });
  })
  .catch(error => console.error(error));

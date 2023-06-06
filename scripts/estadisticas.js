const API_KEY = 'AIzaSyD1qXjPmgBaRtX0zJtH76nvU708Gvs3A-g';

fetch('https://sheets.googleapis.com/v4/spreadsheets/1zaCd8es0pm2md9X8AJwJRm-0J22_7UxoRNAztGzpkmk/values/Estadisticas!A4:P?key=AIzaSyD1qXjPmgBaRtX0zJtH76nvU708Gvs3A-g')
.then(response => response.json())
  .then(data => {
    const values = data.values;
    const table = document.getElementById('tabla');

    // Agregar el título de la temporada
    const temporadaRow = values[0];
    const temporadaTitle = temporadaRow[0];
    const caption = table.querySelector('caption');
    caption.innerHTML = `<h1>${temporadaTitle}</h1>`;

    // Crear filas de la tabla
    values.slice(2).forEach((row, index) => {
      const tr = document.createElement('tr');

      row.forEach(cell => {
        const td = document.createElement('td');

        if (cell.toLowerCase().includes('temporada')) {
          const h1 = document.createElement('h1');
          h1.textContent = cell;
          td.appendChild(h1);
        } else if (!isNaN(cell) || cell === "" || index != 0  
        || cell.toLowerCase().includes("estadística") 
        || cell.toLowerCase().includes("total")) {
          td.textContent = cell;
          if(cell.toLowerCase().includes("comodines") && !cell.toLowerCase().includes("total")){
            td.textContent = cell;
            td.colSpan = 16;
            td.classList.add('comodines');
            
          }
        } else {
            const img = document.createElement('img');
            const imageName = cell.toLowerCase().replace(/\s+/g, '');
            img.src = `imagenes/${imageName}.png`;
            td.appendChild(img);
        }

        if(cell.toLowerCase().includes("estadística") 
        || cell.toLowerCase().includes("total") 
        || cell.toLowerCase().includes("comodines")){
          td.classList.add('cabeceras');
        }

        if(cell.toLowerCase().includes("goles") 
        || cell.toLowerCase().includes("amarilla") 
        || cell.toLowerCase().includes("rojas") 
        || cell.toLowerCase().includes("mocos") 
        || cell.toLowerCase().includes("muro") 
        || cell.toLowerCase().includes("turbo") 
        || cell.toLowerCase().includes("cabezon") 
        || cell.toLowerCase().includes("cambio") 
        || cell.toLowerCase().includes("playa") 
        || cell.toLowerCase().includes("fantasma") 
        || cell.toLowerCase().includes("rampa")
        || cell.toLowerCase().includes("diana")){
          td.classList.add('nombreEst');
        }

        tr.appendChild(td);
      });

      table.appendChild(tr);
    });
  })
  .catch(error => console.error(error));


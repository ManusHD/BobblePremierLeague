// obtener los datos del JSON
fetch('https://sheets.googleapis.com/v4/spreadsheets/1zaCd8es0pm2md9X8AJwJRm-0J22_7UxoRNAztGzpkmk/values/Partidos!A2:E?key=AIzaSyD1qXjPmgBaRtX0zJtH76nvU708Gvs3A-g')
  .then(response => response.json())
  .then(data => {
    const matches = data.values;

    // obtener el contenedor HTML donde se colocarán los partidos
    const container = document.querySelector('.container');

    // iterar a través de los partidos y crear el HTML
    matches.forEach(match => {
      // crear el HTML para las imagenes
      const imageSrc = `imagenes/${match[0].toLowerCase().replace(/\s+/g, '')}.png`;
      const imageSrc2 = `imagenes/${match[2].toLowerCase().replace(/\s+/g, '')}.png`;
      const imageHtml = `<img src="${imageSrc}" />`;
      const imageHtml2 = `<img src="${imageSrc2}" />`;

      // crear el HTML para el equipo de casa
      const teamHomeHtml = `
        <div class="team team--home">
          <div class="team-logo">${imageHtml}</div>
          <h2 class="team-name">${match[0]}</h2>
        </div>
      `;

      // crear el HTML para el equipo visitante
      const teamAwayHtml = `
        <div class="team team--away">
          <div class="team-logo">${imageHtml2}</div>
          <h2 class="team-name">${match[2]}</h2>
        </div>
      `;

      // crear el HTML para la fecha del partido
      const dateHtml = `<div class="match-date">${match[3]} - ${match[4]}</div>`;

      // crear el HTML para el marcador del partido
      const scoreHtml = `<div class="match-score">${match[1]}</div>`;

      // crear el HTML para el partido completo
      //En la clase match-tournament se podría si está jugado o no
      const matchHtml = `
      <br>
        <div class="match">
          <div class="match-header">
            <div class="match-tournament"></div>
          </div>
          <div class="match-content">
            <div class="column">${teamHomeHtml}</div>
            <div class="column vertical">${scoreHtml}${dateHtml}</div>
            <div class="column">${teamAwayHtml}</div>
          </div>
        </div>
      `;

      // agregar el partido al contenedor
      container.innerHTML += matchHtml;
    });
  })
  .catch(error => console.error(error));

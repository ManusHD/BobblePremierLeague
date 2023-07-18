const dias = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

fetch('https://sheets.googleapis.com/v4/spreadsheets/1zaCd8es0pm2md9X8AJwJRm-0J22_7UxoRNAztGzpkmk/values/Partidos!P2:T7?key=AIzaSyD1qXjPmgBaRtX0zJtH76nvU708Gvs3A-g')
.then(response => response.json())
  .then(data => {
    const matches = data.values;

    const container = document.querySelector('.partidos');
    const jornadas = [];

    matches.forEach((match, index) => {
      const imageSrc = `imagenes/${match[0].toLowerCase().replace(/\s+/g, '')}.png`;
      const imageSrc2 = `imagenes/${match[2].toLowerCase().replace(/\s+/g, '')}.png`;
      const imageHtml = `<img src="${imageSrc}" />`;
      const imageHtml2 = `<img src="${imageSrc2}" />`;

      const jornadaActual = Math.floor(index / 7) + 1;
      if (!jornadas[jornadaActual - 1]) {
        jornadas[jornadaActual - 1] = [];
      }

      var resultado = 'no';
      if(!isNaN(match[1][0])){
        resultado = 'jugado';
      }

      const mvp = match[6];
      var lmvpHtml = '';
      if(mvp === 'lmvp'){
        lmvpHtml = `<img src="imagenes/simbolo_mvpdorado.png" />`;
      }
      
      var vmvpHtml = '';
      if(mvp === 'vmvp'){
        vmvpHtml = `<img src="imagenes/simbolo_mvpdorado.png" />`;
      }

      const partidazo = match[7];
      if(mvp === 'lmvp' && partidazo === 'partidazo'){
        lmvpHtml = `<img src="imagenes/simbolo_mvp.png" />`;
      }

      if(mvp === 'vmvp' && partidazo === 'partidazo'){
        vmvpHtml = `<img src="imagenes/simbolo_mvp.png" />`;
      }

      if(partidazo === 'partidazo'){
        jornadas[jornadaActual - 1].push({
          partido: `
            <div class="partido partido-inv">
              <div class="partido-info">
                <div class="team-local elemento mvp">
                  <p>${lmvpHtml}</p>
                </div>
                <div class="team-local elemento">
                  <p>${match[0]}</p>
                </div>
                <div class="escudo elemento">
                  ${imageHtml}
                </div>
                <div class="resultado elemento ${resultado} jugado-inv">
                  <p>${match[1]}</p>
                </div>
                <div class="escudo elemento">
                  ${imageHtml2}
                </div>
                <div class="team-visitante elemento">
                  <p>${match[2]}</p>
                </div>
                <div class="team-local elemento mvp">
                  <p>${vmvpHtml}</p>
                </div>
              </div>
              <div class="fecha">
                <p>${obtenerFechaHora(match[3], match[4])}</p>
              </div>
            </div>
          `,
          fecha: `${match[3]}T${match[4]}`
        });
      }else{
        jornadas[jornadaActual - 1].push({
          partido: `
            <div class="partido">
              <div class="partido-info">
                <div class="team-local elemento mvp">
                  <p>${lmvpHtml}</p>
                </div>
                <div class="team-local elemento">
                  <p>${match[0]}</p>
                </div>
                <div class="escudo elemento">
                  ${imageHtml}
                </div>
                <div class="resultado elemento ${resultado}">
                  <p>${match[1]}</p>
                </div>
                <div class="escudo elemento">
                  ${imageHtml2}
                </div>
                <div class="team-visitante elemento">
                  <p>${match[2]}</p>
                </div>
                <div class="team-local elemento mvp">
                  <p>${vmvpHtml}</p>
                </div>
              </div>
              <div class="fecha">
                <p>${obtenerFechaHora(match[3], match[4])}</p>
              </div>
            </div>
          `,
          fecha: `${match[3]}T${match[4]}`
        });
      }
    });

    function obtenerFechaHora(fecha, hora) {
      if (!fecha || !hora) {
        return '';
      }

      const fechaPartido = new Date(`${fecha}T${hora}`);
      const numeroDia = fechaPartido.getDay();
      const diaSemana = dias[numeroDia];
      const dia = fechaPartido.getDate();
      const mes = fechaPartido.getMonth() + 1;
      const horaFormateada = fechaPartido.getHours();
      var minutoFormateado = fechaPartido.getMinutes();
      if (parseInt(minutoFormateado) < 10) {
        minutoFormateado = '0' + minutoFormateado;
      }

      return `${diaSemana}, ${dia}/${mes} - ${horaFormateada}:${minutoFormateado}`;
    }

    function compararFechas(partidoA, partidoB) {
      const fechaA = partidoA.fecha;
      const fechaB = partidoB.fecha;

      console.log(`Comparando el PartidoA: ${fechaA} con el PartidoB: ${fechaB}`);
    
      // Verificar si uno o ambos partidos no tienen fecha y hora
      if (fechaA == 'T' && fechaB == 'T' || fechaA == 'undefinedTundefined' && fechaB == 'undefinedTundefined'
          || fechaA == 'undefinedTundefined' && fechaB == 'T' || fechaA == 'T' && fechaB == 'undefinedTundefined') {
        return 0; // Ambos partidos están en blanco, no se cambia el orden
      } else if (fechaA === 'undefinedTundefined' || fechaA == 'T') {
        return 1; // Partido A está en blanco, se coloca después de partido B
      } else if (fechaB === 'undefinedTundefined' || fechaB == 'T' ) {
        return -1; // Partido B está en blanco, se coloca después de partido A
      }
    
      return new Date(fechaA) - new Date(fechaB);
    }
    

    jornadas.forEach((jornada, index) => {
      jornada.sort(compararFechas);
      jornada.forEach(partido => {
        container.innerHTML += partido.partido;
      });
    });
  })
  .catch(error => console.error(error));

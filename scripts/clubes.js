fetch('https://sheets.googleapis.com/v4/spreadsheets/1zaCd8es0pm2md9X8AJwJRm-0J22_7UxoRNAztGzpkmk/values/Jugadores!A1:C?key=AIzaSyD1qXjPmgBaRtX0zJtH76nvU708Gvs3A-g')
.then(response => response.json())
.then(data => {
    const equipos = data.values;

    const container = document.getElementById('contenedor');

    equipos.forEach((equipo, index) => {
        const nombre = equipo[0];
        const descripcion = equipo[1];
        const presidente = equipo[2];
        let equipoDiv = '';

        if(index%2 === 0){
            equipoDiv = `<div class="equipo">
            <div class="imagenes">
                <img class="escudo" src="imagenes/${nombre.toLowerCase().replace(/\s+/g, '')}.png">
                <img class="carta" src="imagenes/Carta${nombre.toLowerCase().replace(/\s+/g, '')}_T2.png">
            </div>
            <div class="descripcion">
                <h1>${nombre}</h1>
                <h1 class="presidente">Presidente (${presidente})</h1>
                <p>${descripcion}</p>	
            </div>
            </div>`;
        }else{
            equipoDiv = `<div class="equipo">
			<div class="descripcion">
				<h1>${nombre}</h1>
                <h1 class="presidente" >Presidente (${presidente})</h1>
                <p>${descripcion}</p>	
			</div>
			<div class="imagenes">
				<img class="escudo" src="imagenes/${nombre.toLowerCase().replace(/\s+/g, '')}.png">
                <img class="carta" src="imagenes/Carta${nombre.toLowerCase().replace(/\s+/g, '')}_T2.png">
            </div>
		    </div>`;
        }

        container.innerHTML += equipoDiv;
    });
})
.catch(error => console.error(error));

fetch('https://sheets.googleapis.com/v4/spreadsheets/1zaCd8es0pm2md9X8AJwJRm-0J22_7UxoRNAztGzpkmk/values/Reglas!A2:B81?key=AIzaSyD1qXjPmgBaRtX0zJtH76nvU708Gvs3A-g')
.then(response => response.json())
.then(data => {
  const val = data.values;

  const container = document.getElementById("container");

  val.forEach(element => {
    const nRegla = element[0];
    const nomRegla = element[1];


    if(nRegla.trim()){
      const h3 = document.createElement('h3');
      h3.textContent = nRegla + ". " + nomRegla; 
      container.appendChild(h3);
    }else{
      const firstChar = nomRegla.charAt(0); // Obtener el primer caracter de la cadena
      const startsWithNumber = !isNaN(parseInt(firstChar)); // Verificar si el primer caracter es un número
      if (startsWithNumber) {
        const p = document.createElement('p');
        p.textContent = nomRegla;
        container.appendChild(p);
      } else {
        const h1 = document.createElement('h1');
        h1.textContent = nomRegla;
        container.appendChild(h1);
      }
    }

  });

})
.catch(error => console.error(error));
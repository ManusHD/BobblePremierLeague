const API_KEY = 'AIzaSyD1qXjPmgBaRtX0zJtH76nvU708Gvs3A-g';

function getAndShowData(tabla, range) {
  fetch(`https://sheets.googleapis.com/v4/spreadsheets/1zaCd8es0pm2md9X8AJwJRm-0J22_7UxoRNAztGzpkmk/values/${range}?key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      const rows = data.values;

      const rowsWithData = rows.filter(row => {
        const pts = parseInt(row[8]);
        const dg = parseInt(row[7]);
        const gf = parseInt(row[5]);
        return !isNaN(pts) && !isNaN(dg) && !isNaN(gf);
      });

      sortData(rowsWithData);

      const tbody = document.getElementById(tabla);

      rowsWithData.forEach((rowData, index) => {
        const row = document.createElement('tr');

        const positionCell = document.createElement('td');
        positionCell.textContent = index + 1;
        row.appendChild(positionCell);

        rowData.forEach(cellData => {
          const cell = document.createElement('td');
          cell.textContent = cellData;
          row.appendChild(cell);
        });

        tbody.appendChild(row);

        if (index < 7) {
          switch (range) {
            case 'Clasificacion!B77:J96':
              if(index < 4){
                row.classList.add('destacado');
              }
              break;
            case 'Clasificacion!B46:J69':
              if(index < 5){
                row.classList.add('destacado');
              }
              break;
            case 'Clasificacion!B11:J38':
              if(index < 4){
                row.classList.add('destacado3');
              }
              if(index == 4 || index == 5){
                row.classList.add('destacado45');
              }
              break;
          }
        }

        if(index % 2 == 0){
          row.classList.add('par');
        }else{
          row.classList.add('impar');
        }

      });
    });
}

function sortData(rows) {
  rows.sort((a, b) => {
    const ptsA = parseInt(a[8]);
    const ptsB = parseInt(b[8]);
    const dgA = parseInt(a[7]);
    const dgB = parseInt(b[7]);
    const gfA = parseInt(a[5]);
    const gfB = parseInt(b[5]);

    if (ptsA === ptsB) {
      if (dgA === dgB) {
        return gfB - gfA;
      }
      return dgB - dgA;
    }

    return ptsB - ptsA;
  });
}

getAndShowData('tabla1', 'Clasificacion!B77:J96');
getAndShowData('tabla2', 'Clasificacion!B46:J69');
getAndShowData('tabla3', 'Clasificacion!B11:J38');



function showSlides(n) {
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");
  const slideIndex = (n > slides.length) ? 1 : (n < 1) ? slides.length : n;
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

const container = document.querySelector('.slideshow-container');
let startX, startY, dist, threshold = 150, allowedTime = 500, elapsedTime, startTime;

container.addEventListener('touchstart', function (e) {
  const touchObj = e.changedTouches[0];
  startX = touchObj.pageX;
  startY = touchObj.pageY;
  startTime = new Date().getTime();
  e.preventDefault();
});

container.addEventListener('touchmove', function (e) {
  e.preventDefault();
});

container.addEventListener('touchend', function (e) {
  const touchObj = e.changedTouches[0];
  dist = touchObj.pageX - startX;
  elapsedTime = new Date().getTime() - startTime;
  if (elapsedTime <= allowedTime && Math.abs(dist) >= threshold) {
    if (dist > 0) {
      plusSlides(-1);
    } else {
      plusSlides(1);
    }
  }
  e.preventDefault();
});

document.addEventListener('DOMContentLoaded', function () {
  showSlides(slideIndex);
});

let slideIndex = 3;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}
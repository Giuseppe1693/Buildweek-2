// Seleziona gli elementi HTML con l'ID specificato per usarli nel codice
const row = document.getElementById("row");
const row1 = document.getElementById("row1");
const exit = document.getElementById("exit");
const colonnaDestra = document.getElementById("colonna-destra");
const colonnaCentrale = document.getElementById("colonna-centrale");

// Funzione asincrona per ottenere gli album dalla API di Deezer
async function fetchAlbums(query) {
  const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`; // URL con la query per cercare gli album
  try {
    const response = await fetch(url); //  facciamo la chiamata API per ottenere i dati
    const data = await response.json(); // convertiamo la risposta in fomato json
    return data.data.map((track) => track.album); // estraiamo solo gli album dai dati ricevuti
  } catch (error) {
    console.error("Errore durante la chiamata API:", error);
  }
}

// Funzione per visualizzare gli album nella home page
function displayAlbums(albums) {
  row.innerHTML = "";
  const selectedAlbums = [];
  const usedIndexes = new Set(); // Set per tenere traccia degli indici già usati

  // Seleziona 5 album casuali senza duplicati
  while (selectedAlbums.length < 5 && selectedAlbums.length < albums.length) {
    let randomIndex = Math.floor(Math.random() * albums.length);
    if (!usedIndexes.has(randomIndex)) {
      // Controlla se l'indice è già stato usato la funzione has memorizza valori unici in modo tale che non troviamo album duplicati

      selectedAlbums.push(albums[randomIndex]); // Aggiungi l'album selezionato
      usedIndexes.add(randomIndex); // Aggiungi l'indice al set per evitare duplicati
    }
  }

  // Aggiungi ogni album selezionato alla pagina
  selectedAlbums.forEach((album) => {
    const col = document.createElement("div");
    col.classList.add("col-6", "col-sm-4", "col-md-3", "col-lg-2", "mb-2", "p-1");
    col.innerHTML = `
    <div class="card text-bg-dark" style="width: 100%; height: auto; margin: auto;"> 
      <a href="album.html?id=${album.id}"  target="_blank" style="text-decoration: none; color: inherit;">
        <img src="${album.cover_medium}" class="card-img-top" alt="${album.title}" 
          style="width: 100%; height: 100px; object-fit: cover;" />
        <div class="card-body p-1 text-center">
          <h5 class="card-title fs-7" style="font-size: 10px; margin-bottom: 2px;">${album.title}</h5>
        </div>
      </a>
    </div>
  `;
    row.appendChild(col);
  });
}

// funzione per visualizzare l altro set di album
function displayAlbums2(albums) {
  row1.innerHTML = "";

  // selezioniamo 6 album casuali senza duplicati come abbiamo fatto sopra
  const selectedAlbums = [];
  while (selectedAlbums.length < 6 && selectedAlbums.length < albums.length) {
    let randomIndex = Math.floor(Math.random() * albums.length);
    if (!selectedAlbums.includes(albums[randomIndex])) {
      // controlliamo se l'album è già stato selezionato
      selectedAlbums.push(albums[randomIndex]); // aggiungiamo l'album selezionato
    }
  }

  const firstRowAlbums = selectedAlbums.slice(0, 3);
  const secondRowAlbums = selectedAlbums.slice(3, 6);

  // Funzione per creare una riga di 3 card
  const createRow = (albums) => {
    const row = document.createElement("div");
    row.classList.add("row");
    albums.forEach((album) => {
      const col = document.createElement("div");
      col.classList.add("col-md-4", "mb-3");

      // creiamo la card per ogni album
      col.innerHTML = `
          <div class="card mb-3 bg-dark text-white">
            <a href="album.html?id=${album.id}" target="_blank" style="text-decoration: none; color: inherit;">
            <div class="row g-0">  <!-- Row per affiancare immagine e testo -->
              <div class="col-md-4">  <!-- Colonna per l'immagine -->
                <img src="${album.cover_medium}" class="img-fluid rounded-start " alt="${album.title}" />
              </div>
              <div class="col-md-8 d-flex align-items-center">  <!-- Colonna per il testo -->
                <div class="card-body p-0 ps-1">
                  <h5 class="card-title fs-6"><small>${album.title}</small></h5>
                </div>
              </div>
            </div>
            </a>
          </div>
        `;
      row.appendChild(col);
    });
    return row; // restituisce la riga creata
  };

  row1.appendChild(createRow(firstRowAlbums));

  row1.appendChild(createRow(secondRowAlbums));
}

// quando la pagina è pronta DOM completamente caricato, esegue la funzione
document.addEventListener("DOMContentLoaded", async () => {
  const albums = await fetchAlbums("queen"); // ottieniamo gli album di "queen" tramite API
  displayAlbums(albums);
  displayAlbums2(albums);
});

// selezionamo bottone per nascondere e mostrare la colonna di destra
const showRightColBtn = document.getElementById("show-right-col");

// aggiungiamo l'evento di clic all'icona della X
exit.addEventListener("click", function (event) {
  event.preventDefault();
  colonnaDestra.style.display = "none";
  colonnaCentrale.classList.add("expanded");
  showRightColBtn.classList.remove("d-none");
});

// Aggiungiamo l'evento di clic al bottone per mostrare di nuovo la colonna di destra
showRightColBtn.addEventListener("click", function () {
  colonnaDestra.style.display = "block";
  colonnaCentrale.classList.remove("expanded");
  showRightColBtn.classList.add("d-none");
});

// Gestiamo l'interazione con il range (slider)
const range = document.querySelector(".custom-range");

// Aggiungiamo l'evento di input per il range (slider)
range.addEventListener("input", function () {
  let value = ((this.value - this.min) / (this.max - this.min)) * 100; // Calcoliamo il valore in percentuale
  this.style.background = `linear-gradient(to right, #198754 ${value}%, #5454 ${value}%)`; // Cambiaamo il colore di sfondo del range
});

const playbtn = document.getElementById("playbtn");

playbtn.addEventListener("click", function () {
  if (playbtn.classList.contains("bi-play-circle-fill")) {
    // Change to pause icon
    playbtn.classList.remove("bi-play-circle-fill");
    playbtn.classList.add("bi-pause-circle-fill");
  } else {
    // Change back to play icon
    playbtn.classList.remove("bi-pause-circle-fill");
    playbtn.classList.add("bi-play-circle-fill");
  }
});

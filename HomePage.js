const row = document.getElementById("row");
const row1 = document.getElementById("row1");
const exit = document.getElementById("exit");
const colonnaDestra = document.getElementById("colonna-destra"); // Seleziona la colonna di destra
const colonnaCentrale = document.getElementById("colonna-centrale");

async function fetchAlbums(query) {
  const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`;
  try {
    const response = await fetch(url); // Chiamata API per ottenere i dati
    const data = await response.json(); // Converti la risposta in formato JSON
    return data.data.map((track) => track.album); // Estrai solo gli album dai dati
  } catch (error) {
    console.error("Errore durante la chiamata API:", error); // Gestisci errori
  }
}

function displayAlbums(albums) {
  row.innerHTML = ""; // Pulisci la riga prima di aggiungere nuove card
  const selectedAlbums = [];
  const usedIndexes = new Set();

  while (selectedAlbums.length < 5 && selectedAlbums.length < albums.length) {
    let randomIndex = Math.floor(Math.random() * albums.length);
    if (!usedIndexes.has(randomIndex)) {
      selectedAlbums.push(albums[randomIndex]);
      usedIndexes.add(randomIndex);
    }
  }

  selectedAlbums.forEach((album) => {
    const col = document.createElement("div");
    col.classList.add("col-6", "col-sm-4", "col-md-3", "col-lg-2", "mb-2", "p-1"); // Adatta le colonne in base alla dimensione dello schermo
    col.innerHTML = `
    <div class="card text-bg-dark" style="width: 100%; height: auto; margin: auto;"> 
      <a href="album.html?id=${album.id}" style="text-decoration: none; color: inherit;">
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

function displayAlbums2(albums) {
  row1.innerHTML = ""; // Pulisci la riga prima di aggiungere nuove card

  // Seleziona 6 album casuali senza duplicati
  const selectedAlbums = [];
  while (selectedAlbums.length < 6 && selectedAlbums.length < albums.length) {
    let randomIndex = Math.floor(Math.random() * albums.length);
    if (!selectedAlbums.includes(albums[randomIndex])) {
      selectedAlbums.push(albums[randomIndex]);
    }
  }

  // Dividi gli album selezionati in due gruppi da 3
  const firstRowAlbums = selectedAlbums.slice(0, 3);
  const secondRowAlbums = selectedAlbums.slice(3, 6);

  // Funzione per creare una riga di 3 card
  const createRow = (albums) => {
    const row = document.createElement("div");
    row.classList.add("row"); // La riga con le card
    albums.forEach((album) => {
      // Creiamo una colonna per ogni album
      const col = document.createElement("div");
      col.classList.add("col-md-4", "mb-3"); // Colonne affiancate (3 colonne per riga)

      col.innerHTML = `
          <div class="card mb-3 bg-dark text-white">
            <a href="album.html?id=${album.id}" style="text-decoration: none; color: inherit;">
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

      row.appendChild(col); // Aggiungi la colonna alla riga
    });
    return row; // Restituisce la riga creata
  };

  // Crea e aggiungi la prima riga con 3 card
  row1.appendChild(createRow(firstRowAlbums));

  // Crea e aggiungi la seconda riga con 3 card
  row1.appendChild(createRow(secondRowAlbums));
}

document.addEventListener("DOMContentLoaded", async () => {
  const albums = await fetchAlbums("queen"); // Cambia "queen" con un'altra query se vuoi
  displayAlbums(albums);
  displayAlbums2(albums);
});

// Aggiungi l'evento di clic all'icona della X
exit.addEventListener("click", function (event) {
  event.preventDefault(); // Previeni l'azione di link (poiché è un anchor tag)
  colonnaDestra.style.display = "none"; // Nascondi la colonna di destra
  colonnaCentrale.classList.add("expanded");
});

const row = document.getElementById("row");
const row1 = document.getElementById("row1");

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
  albums.slice(0, 5).forEach((album) => {
    // Creiamo una colonna per ogni album
    const col = document.createElement("div");
    col.classList.add("col-md-2", "mb-3"); // Colonne affiancate e margine per il layout
    col.innerHTML = `
        <div class="card text-bg-dark">
          <img src="${album.cover_medium}" class="card-img-top p-3" alt="${album.title}" />
          <div class="card-body p-3">
            <h5 class="card-title fs-6">${album.title}</h5>
            
          </div>
        </div>
      `;
    row.appendChild(col); // Aggiungi la colonna alla riga
  });
}

function displayAlbums2(albums) {
  row1.innerHTML = ""; // Pulisci la riga prima di aggiungere nuove card

  // Dividi gli album in due gruppi (3 sopra e 3 sotto)
  const firstRowAlbums = albums.slice(6, 9); // Album per la prima riga (3 album)
  const secondRowAlbums = albums.slice(9, 12); // Album per la seconda riga (3 album)

  // Funzione per creare una riga di 3 card
  const createRow = (albums) => {
    const row = document.createElement("div");
    row.classList.add("row"); // La riga con le card
    albums.forEach((album) => {
      // Creiamo una colonna per ogni album
      const col = document.createElement("div");
      col.classList.add("col-md-4", "mb-3"); // Colonne affiancate (3 colonne per riga)

      col.innerHTML = `
          <div class="card mb-3">
            <div class="row g-0">  <!-- Row per affiancare immagine e testo -->
              <div class="col-md-4">  <!-- Colonna per l'immagine -->
                <img src="${album.cover_medium}" class="img-fluid rounded-start" alt="${album.title}" />
              </div>
              <div class="col-md-8 d-flex align-items-center">  <!-- Colonna per il testo -->
                <div class="card-body p-0 ps-1">
                  <h5 class="card-title fs-6"><small>${album.title}</small></h5>
                 
                </div>
              </div>
            </div>
          </div>
        `;
      row.appendChild(col); // Aggiungi la colonna alla riga
    });
    return row; // Restituisce la riga creata
  };

  // Crea e aggiungi la prima riga con 3 card
  const firstRow = createRow(firstRowAlbums);
  row1.appendChild(firstRow);

  // Crea e aggiungi la seconda riga con 3 card
  const secondRow = createRow(secondRowAlbums);
  row1.appendChild(secondRow);
}

document.addEventListener("DOMContentLoaded", async () => {
  const albums = await fetchAlbums("queen"); // Cambia "queen" con un'altra query se vuoi
  displayAlbums(albums);
  displayAlbums2(albums);
});

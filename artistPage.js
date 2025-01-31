// Seleziona gli elementi del DOM usando i loro id
const colonnaDestra = document.getElementById("colonna-destra"); // Seleziona la colonna di destra
const colonnaCentrale = document.getElementById("colonna-centrale"); // Seleziona la colonna centrale

// Funzione asincrona per recuperare i dettagli dell'artista dato l'artistId
async function fetchArtistDetails(artistId) {
  // Costruisce l'URL per ottenere i dettagli dell'artista
  const url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`;

  try {
    // Effettua una richiesta GET per recuperare i dati dell'artista
    const response = await fetch(url);
    const artist = await response.json(); // Converte la risposta in formato JSON

    // Popola la pagina con i dettagli dell'artista
    document.getElementById("artist-name").textContent = artist.name; // Aggiunge il nome dell'artista
    document.getElementById("artist-picture").style.backgroundImage = `url(${artist.picture_big})`; // Aggiunge l'immagine di copertura
    document.getElementById("artist-picture").style.backgroundSize = "cover"; // Imposta la dimensione dell'immagine di copertura
    document.getElementById("artist-picture").style.backgroundPosition = "50% 25%"; // Imposta la posizione dell'immagine di copertura
    document.getElementById("artist-fans").textContent = `Ascoltatori mensili: ${artist.nb_fan}`; // Aggiunge il numero di ascoltatori mensili

    // Recupera le tracce più popolari dell'artista
    fetchArtistTracks(artistId); // Chiama la funzione per recuperare le tracce
  } catch (error) {
    // Gestisce eventuali errori nella richiesta
    console.error("Errore nel recupero dell'artista:", error);
  }
}

// Funzione asincrona per recuperare le tracce più popolari dell'artista
async function fetchArtistTracks(artistId) {
  // Costruisce l'URL per ottenere le tracce popolari dell'artista
  const url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=10`;

  try {
    // Effettua la richiesta per recuperare le tracce
    const response = await fetch(url);
    const data = await response.json(); // Converte la risposta in formato JSON
    const tracklistEl = document.getElementById("tracklist"); // Seleziona l'elemento della lista delle tracce
    tracklistEl.innerHTML = ""; // Pulisce la lista prima di aggiungere nuove tracce

    const listaDestra = document.getElementById("listaDestra"); // Seleziona l'elemento dove mostrare informazioni aggiuntive

    // Per ogni traccia nelle tracce più popolari
    data.data.forEach((track) => {
      const li = document.createElement("li"); // Crea un elemento <li> per la traccia
      li.classList.add("track-item"); // Aggiunge una classe "track-item" per la stilizzazione
      li.style.cursor = "pointer"; // Imposta il cursore su "pointer" per indicare che è cliccabile

      // Imposta il contenuto HTML per la traccia
      li.innerHTML = `
        <div class="col-12 mt-2 track" data-title="${track.title}" data-artist="${track.artist.name}" data-cover="${track.album.cover_medium}">
          <div class="row g-0">
            <div class="col-md-2 ">
              <img class="w-50 rounded img-fluid " src="${track.album.cover_medium}" alt="Album Cover">
            </div>
            <div class="col-md-8">
              <p class="fs-6"><small>${track.title}</small></p>
            </div>
            <div class="col-md-2">
              <p>${track.duration} sec</p>
            </div>
          </div>
        </div>`;

      // Aggiunge l'elemento della traccia alla lista delle tracce
      tracklistEl.appendChild(li);

      // Aggiunge un contenuto HTML a "listaDestra" con informazioni extra sulla traccia
      listaDestra.innerHTML = `
            <div class="text-center p-3">
              <div class="d-flex">
                <img src="${track.album.cover_medium}" alt="" class="img-fluid rounded-circle me-3" style="width: 50px; height: 50px;">
                <div class="card-body d-flex flex-column justify-content-center">
                  <h3 class="text-white mb-0" style="font-size: 14px; white-space: nowrap;">Hai Messo mi piace a 11 brani</h3>
                  <p class="card-title text-white mb-0" style="font-size: 12px; white-space: nowrap;"> Di ${track.artist.name}</p>
                </div>
              </div>
            </div>
          `;

      // Aggiunge un evento click per aggiornare la card con i dettagli della traccia
      li.addEventListener("click", () => updateTrackCard(track.title, track.artist.name, track.album.cover_medium));
    });
  } catch (error) {
    // Gestisce eventuali errori nel recupero delle tracce
    console.error("Errore nel recupero delle tracce dell'artista:", error);
  }
}

// Funzione per aggiornare la card con i dettagli della traccia selezionata
function updateTrackCard(title, artist, cover) {
  document.getElementById("track-image").src = cover; // Aggiunge l'immagine dell'album alla card
  document.getElementById("track-title").textContent = title; // Aggiunge il titolo della traccia
  document.getElementById("track-artist").textContent = artist; // Aggiunge il nome dell'artista
}

// Ottieni l'ID dell'artista dall'URL della pagina
const params = new URLSearchParams(window.location.search); // Estrae i parametri dalla query string
const artistId = params.get("id"); // Ottiene l'ID dell'artista

// Se l'ID dell'artista è presente nell'URL, recupera i dettagli dell'artista
if (artistId) {
  fetchArtistDetails(artistId);
} else {
  // Se non c'è un ID dell'artista nell'URL, mostra un errore
  console.error("Nessun ID artista trovato nell'URL");
}

// Seleziona il bottone per mostrare la colonna di destra
const showRightColBtn = document.getElementById("show-right-col");

// Aggiunge l'evento di clic all'icona della X per nascondere la colonna di destra
exit.addEventListener("click", function (event) {
  event.preventDefault(); // Impedisce l'azione di default del link
  colonnaDestra.style.display = "none"; // Nasconde la colonna di destra
  colonnaCentrale.classList.add("expanded"); // Espande la colonna centrale
  showRightColBtn.classList.remove("d-none"); // Mostra il bottone per riaprire la colonna di destra
});

// Aggiunge l'evento di clic per mostrare la colonna di destra
showRightColBtn.addEventListener("click", function () {
  colonnaDestra.style.display = "block"; // Mostra la colonna di destra
  colonnaCentrale.classList.remove("expanded"); // Ripristina la colonna centrale
  showRightColBtn.classList.add("d-none"); // Nasconde il bottone per non farlo più vedere
});

// Seleziona il range slider per l'interazione
const range = document.querySelector(".custom-range");

// Aggiunge un evento di input per aggiornare lo sfondo del range slider
range.addEventListener("input", function () {
  // Calcola la percentuale del valore attuale rispetto al range
  let value = ((this.value - this.min) / (this.max - this.min)) * 100;
  // Cambia lo sfondo del range slider in base al valore
  this.style.background = `linear-gradient(to right, #198754 ${value}%, #333 ${value}%)`;
});

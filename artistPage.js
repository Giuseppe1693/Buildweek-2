// Seleziona gli elementi del DOM
const colonnaDestra = document.getElementById("colonna-destra");
const colonnaCentrale = document.getElementById("colonna-centrale");

// Funzione asincrona per recuperare i dettagli dell'artista dato l'artistId
async function fetchArtistDetails(artistId) {
  // Costruisce l'URL per ottenere i dettagli dell'artista
  const url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`;

  try {
    // Effettua una richiesta GET per recuperare i dati dell'artista
    const response = await fetch(url);
    const artist = await response.json();

    // Popola la pagina con i dettagli dell'artista
    document.getElementById("artist-name").textContent = artist.name;
    document.getElementById("artist-picture").style.backgroundImage = `url(${artist.picture_big})`;
    document.getElementById("artist-picture").style.backgroundSize = "cover";
    document.getElementById("artist-picture").style.backgroundPosition = "50% 25%";
    document.getElementById("artist-fans").textContent = `Ascoltatori mensili: ${artist.nb_fan}`;

    // Recupera le tracce più popolari dell'artista
    fetchArtistTracks(artistId); // Chiama la funzione per recuperare le tracce
  } catch (error) {
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
    const data = await response.json();
    const tracklistEl = document.getElementById("tracklist");
    tracklistEl.innerHTML = "";

    const listaDestra = document.getElementById("listaDestra"); // Seleziona l'elemento dove mostrare informazioni aggiuntive

    // Per ogni traccia nelle tracce più popolari
    data.data.forEach((track) => {
      const li = document.createElement("li");
      li.classList.add("track-item");
      li.style.cursor = "pointer";

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
  document.getElementById("track-image").src = cover;
  document.getElementById("track-title").textContent = title;
  document.getElementById("track-artist").textContent = artist;
}

// Ottieni l'ID dell'artista dall'URL della pagina
const params = new URLSearchParams(window.location.search); // Estrae i parametri dalla query string
const artistId = params.get("id"); // Ottiene l'ID dell'artista

// Se l'ID dell'artista è presente nell'URL, recupera i dettagli dell'artista
if (artistId) {
  fetchArtistDetails(artistId);
} else {
  console.error("Nessun ID artista trovato nell'URL");
}

// Seleziona il bottone per mostrare la colonna di destra
const showRightColBtn = document.getElementById("show-right-col");

// Aggiunge l'evento di clic all'icona della X per nascondere la colonna di destra
exit.addEventListener("click", function (event) {
  event.preventDefault();
  colonnaDestra.style.display = "none";
  colonnaCentrale.classList.add("expanded");
  showRightColBtn.classList.remove("d-none");
});

// Aggiunge l'evento di clic per mostrare la colonna di destra
showRightColBtn.addEventListener("click", function () {
  colonnaDestra.style.display = "block";
  colonnaCentrale.classList.remove("expanded");
  showRightColBtn.classList.add("d-none");
});

// Seleziona il range slider per l'interazione
const range = document.querySelector(".custom-range");

// Aggiunge un evento di input per aggiornare lo sfondo del range slider
range.addEventListener("input", function () {
  let value = ((this.value - this.min) / (this.max - this.min)) * 100;

  this.style.background = `linear-gradient(to right, #198754 ${value}%, #333 ${value}%)`;
});

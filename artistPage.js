const colonnaDestra = document.getElementById("colonna-destra");

async function fetchArtistDetails(artistId) {
  const url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`;
  try {
    const response = await fetch(url);
    const artist = await response.json();

    // Popola la pagina con i dettagli dell'artista
    document.getElementById("artist-name").textContent = artist.name;
    document.getElementById("artist-picture").style.backgroundImage = `url(${artist.picture_big})`;
    document.getElementById("artist-picture").style.backgroundSize = "cover";
    document.getElementById("artist-picture").style.backgroundPosition = "50% 25%";
    document.getElementById("artist-fans").textContent = `Ascoltatori mensili: ${artist.nb_fan}`;

    // Recupera le tracce più popolari dell'artista
    fetchArtistTracks(artistId);
  } catch (error) {
    console.error("Errore nel recupero dell'artista:", error);
  }
}

async function fetchArtistTracks(artistId) {
  const url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=10`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const tracklistEl = document.getElementById("tracklist");
    tracklistEl.innerHTML = ""; // Puliamo la lista prima di aggiungere nuove tracce

    data.data.forEach((track) => {
      const li = document.createElement("li");
      li.classList.add("track-item");
      li.style.cursor = "pointer"; // Imposta il cursore su "pointer" per indicare che è cliccabile

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

      // Aggiungi evento click per aggiornare la card
      li.addEventListener("click", () => updateTrackCard(track.title, track.artist.name, track.album.cover_medium));

      tracklistEl.appendChild(li);
    });
  } catch (error) {
    console.error("Errore nel recupero delle tracce dell'artista:", error);
  }
}

// Funzione per aggiornare la card con i dettagli della traccia selezionata
function updateTrackCard(title, artist, cover) {
  document.getElementById("track-image").src = cover;
  document.getElementById("track-title").textContent = title;
  document.getElementById("track-artist").textContent = artist;
}

// Prendi l'ID dell'artista dall'URL
const params = new URLSearchParams(window.location.search);
const artistId = params.get("id");

if (artistId) {
  fetchArtistDetails(artistId);
} else {
  console.error("Nessun ID artista trovato nell'URL");
}

const showRightColBtn = document.getElementById("show-right-col");

// Aggiungi l'evento di clic all'icona della X
exit.addEventListener("click", function (event) {
  event.preventDefault(); // Previeni l'azione di link (poiché è un anchor tag)
  colonnaDestra.style.display = "none"; // Nascondi la colonna di destra
  colonnaCentrale.classList.add("expanded");
  showRightColBtn.classList.remove("d-none"); // Mostra il bottone
});

showRightColBtn.addEventListener("click", function () {
  colonnaDestra.style.display = "block";
  colonnaCentrale.classList.remove("expanded");
  showRightColBtn.classList.add("d-none"); // Nasconde di nuovo il bottone
});

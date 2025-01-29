async function fetchArtistDetails(artistId) {
  const url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`;
  try {
    const response = await fetch(url);
    const artist = await response.json();

    // Popola la pagina con i dettagli dell'artista
    document.getElementById("artist-name").textContent = artist.name;
    document.getElementById("artist-picture").style.backgroundImage = `url(${artist.picture_big})`;
    document.getElementById("artist-picture").style.backgroundSize = "cover";
    document.getElementById("artist-picture").style.backgroundPosition = "center";
    document.getElementById("artist-fans").textContent = `Fan: ${artist.nb_fan}`;
    document.getElementById("artist-albums").textContent = `Album totali: ${artist.nb_album}`;

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
    const listaDestra = document.getElementById("listaDestra");

    data.data.forEach((track) => {
      const li = document.createElement("li");
      li.innerHTML = `
          <div class="col-12 mt-2">
            <div class="row g-0 align-items-center">
              <div class="col-md-2">
                <img class="w-50" src="${track.album.cover_medium}" alt="Album Cover" class="img-fluid rounded">
              </div>
              <div class="col-md-8">
                <p class="fs-6"><small>${track.title}</small></p>
              </div>
              <div class="col-md-2">
                <p>${track.duration} sec</p>
              </div>
            </div>
          </div>`;

      tracklistEl.appendChild(li);
    });
  } catch (error) {
    console.error("Errore nel recupero delle tracce dell'artista:", error);
  }
}

// Prendi l'ID dall'URL
const params = new URLSearchParams(window.location.search);
const artistId = params.get("id");

if (artistId) {
  fetchArtistDetails(artistId);
} else {
  console.error("Nessun ID artista trovato nell'URL");
}

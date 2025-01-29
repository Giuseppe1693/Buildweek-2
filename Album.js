async function fetchAlbumDetails(albumId) {
  const url = `https://deezerdevs-deezer.p.rapidapi.com/album/${albumId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "TUO_API_KEY", // Sostituisci con la tua chiave API
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    });
    const album = await response.json();

    // Popola la pagina con i dettagli dell'album
    document.getElementById("album-title").textContent = album.title;
    document.getElementById("album-cover").src = album.cover_medium;
    document.getElementById("album-artist").textContent = `Artista: ${album.artist.name}`;

    const tracklistEl = document.getElementById("tracklist");
    album.tracks.data.forEach((track) => {
      const li = document.createElement("li");
      li.textContent = track.title;
      tracklistEl.appendChild(li);
    });
  } catch (error) {
    console.error("Errore nel recupero dell'album:", error);
  }
}

// Prendi l'ID dall'URL
const params = new URLSearchParams(window.location.search);
const albumId = params.get("id");

if (albumId) {
  fetchAlbumDetails(albumId);
} else {
  console.error("Nessun ID album trovato nell'URL");
}

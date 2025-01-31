const colonnaDestra = document.getElementById("colonna-destra");

async function fetchAlbumDetails(albumId) {
  const url = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "0cebcfc031msh0150ed44edad664p191aeejsnb989127e4040", // Sostituisci con la tua chiave API
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    });
    const album = await response.json();

    // Popola la pagina con i dettagli dell'album
    document.getElementById("album-title").textContent = album.title;
    document.getElementById("album-cover").src = album.cover_medium;
    document.getElementById("album-artist").textContent = `Artista: ${album.artist.name}`;

    const tracklistEl = document.getElementById("tracklist");
    tracklistEl.innerHTML = ""; // Puliamo la lista prima di aggiungere nuove tracce

    album.tracks.data.forEach((track) => {
      const li = document.createElement("li");
      li.classList.add("track-item"); // Aggiunge una classe per gestire lo stile
      li.innerHTML = `
        <div class="col-12 mt-4 track" data-title="${track.title}" data-artist="${album.artist.name}" data-cover="${album.cover_medium}">
          <div class="row g-0">
            <div class="col-md-8">
              <div class="card-body">
                <p class="card-title fs-6 pointer"><small>${track.title}</small></p>
                <a href="artistpage.html?id=${album.artist.id}"  target="_blank" style="text-decoration: none; color: inherit;">${album.artist.name}</a>
              </div>
            </div>
            <div class="col-3">
              <p>${track.rank}</p>
            </div>
            <div class="col-1">
              <p>${track.duration}</p>
            </div>
          </div>
        </div>`;

      // Aggiunge evento click per aggiornare la card
      li.addEventListener("click", () => updateTrackCard(track.title, album.artist.name, album.cover_medium));

      tracklistEl.appendChild(li);
    });
  } catch (error) {
    console.error("Errore nel recupero dell'album:", error);
  }
}

// Funzione per aggiornare la card con i dettagli della traccia selezionata
function updateTrackCard(title, artist, cover) {
  document.getElementById("track-title").textContent = title; // Nome traccia
  document.getElementById("track-artist").textContent = artist; // Nome artista
  document.getElementById("track-image").src = cover; // Copertina album
}

// Prendi l'ID dell'album dall'URL
const params = new URLSearchParams(window.location.search);
const albumId = params.get("id");

if (albumId) {
  fetchAlbumDetails(albumId);
} else {
  console.error("Nessun ID album trovato nell'URL");
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

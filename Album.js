// Selezioniamo gli elementi DOM
const colonnaDestra = document.getElementById("colonna-destra");
const colonnaCentrale = document.getElementById("colonna-centrale");

// Funzione asincrona per ottenere i dettagli di un album dato un albumId
async function fetchAlbumDetails(albumId) {
  // URL dell'API con l'albumId per ottenere i dettagli dell'album
  const url = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`;

  try {
    // effettuiamo la richiesta API per ottenere i dettagli dell'album
    const response = await fetch(url, {
      method: "GET", // Metodo GET per recuperare i dati
      headers: {
        // Le intestazioni della richiesta includono la chiave API e l'host
        "X-RapidAPI-Key": "0cebcfc031msh0150ed44edad664p191aeejsnb989127e4040",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    });

    // convertiamo la risposta in formato JSON
    const album = await response.json();

    // popoliamo la pagina con i dettagli dell'album ottenuti
    document.getElementById("album-title").textContent = album.title; // aggiungiamo il titolo dell'album
    document.getElementById("album-cover").src = album.cover_medium; // aggiungiamo l'immagine di copertura
    document.getElementById("album-artist").textContent = `Artista: ${album.artist.name}`; // aggiungiamo il nome dell'artista

    const tracklistEl = document.getElementById("tracklist"); // selezioniamo l'elemento in cui verranno inserite le tracce
    tracklistEl.innerHTML = "";

    // cicliamo su tutte le tracce dell'album e le aggiunge alla lista
    album.tracks.data.forEach((track) => {
      const li = document.createElement("li");
      li.classList.add("pointer"); // aggiungiamo una classe pointer per la stilizzazione

      // Crea il contenuto HTML per ogni traccia
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
              <p>${track.rank}</p>  // Aggiunge la posizione (rank) della traccia
            </div>
            <div class="col-1">
              <p>${track.duration}</p>  // Aggiunge la durata della traccia
            </div>
          </div>
        </div>`;

      // aggiungiamo un evento click alla traccia per aggiornare la card
      li.addEventListener("click", () => updateTrackCard(track.title, album.artist.name, album.cover_medium));

      tracklistEl.appendChild(li);
    });
  } catch (error) {
    console.error("Errore nel recupero dell'album:", error);
  }
}

// Funzione per aggiornare la card con i dettagli della traccia selezionata
function updateTrackCard(title, artist, cover) {
  document.getElementById("track-title").textContent = title;

  document.getElementById("track-artist").textContent = artist;

  document.getElementById("track-image").src = cover;
}

// Ottieniamo l'ID dell'album dall'URL (parametro "id")
const params = new URLSearchParams(window.location.search); // Analizza i parametri dell'URL
const albumId = params.get("id"); // estraiamo l'ID dell'album

// Se l'ID dell'album è presente nell'URL, esegue la funzione per recuperare i dettagli dell'album
if (albumId) {
  fetchAlbumDetails(albumId);
} else {
  // Se non c'è un ID nell'URL, mostra un errore
  console.error("Nessun ID album trovato nell'URL");
}

// selezioniamo il bottone per mostrare la colonna di destra
const showRightColBtn = document.getElementById("show-right-col");

// aggiungiamo un evento di clic per chiudere la colonna di destra (icona della X)
exit.addEventListener("click", function (event) {
  event.preventDefault(); // preveniamo l'azione di default del link
  colonnaDestra.style.display = "none"; // nascondiamo la colonna di destra
  colonnaCentrale.classList.add("expanded"); // espandiamo la colonna centrale
  showRightColBtn.classList.remove("d-none"); // mostriamo il bottone per riaprire la colonna di destra
});

// aggiungiamo un evento di clic per mostrare la colonna di destra
showRightColBtn.addEventListener("click", function () {
  colonnaDestra.style.display = "block"; // Mostra la colonna di destra
  colonnaCentrale.classList.remove("expanded"); // Ripristina la colonna centrale
  showRightColBtn.classList.add("d-none"); // Nasconde il bottone per non farlo più vedere
});

// Seleziona il range slider per l'interazione
const range = document.querySelector(".custom-range");

// aggiungiamo un evento di input per aggiornare il colore dello sfondo del range slider
range.addEventListener("input", function () {
  // Calcola la percentuale del valore attuale rispetto al range
  let value = ((this.value - this.min) / (this.max - this.min)) * 100;
  // Cambia lo sfondo del range slider in base al valore
  this.style.background = `linear-gradient(to right, #198754 ${value}%, #333 ${value}%)`;
});

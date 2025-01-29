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

    album.tracks.data.forEach((track) => {
      const li = document.createElement("li");
      li.innerHTML = `<div class="col-12 mt-4 ">
                  
                    <div class="row g-0">  <!-- Row per affiancare immagine e testo -->
                      
                      <div class="col-md-8">  <!-- Colonna per il testo -->
                        <div class="card-body">
                          <p class="card-title fs-6"><small>${track.title}</small></p>
                          <p>${album.artist.name}</p>
                          
                          
                         
                        </div>
                      </div>
                      <div class="col-1"><p>${track.duration}</p>
                      </div>
                    </div>
                    </div>`;
      tracklistEl.appendChild(li);
    });
  } catch (error) {
    console.error("Errore nel recupero dell'album:", error);
  }
}

// Prendi l'ID dall'URL
const params = new URLSearchParams(window.location.search);
const albumId = params.get("id");
console.log("Album ID trovato nell'URL:", albumId);

if (albumId) {
  fetchAlbumDetails(albumId);
} else {
  console.error("Nessun ID album trovato nell'URL");
}

document.addEventListener("DOMContentLoaded", () => {
  const movieGrid = document.getElementById("movieGrid");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const modal = new bootstrap.Modal(document.getElementById('movieModal'));
  const modalTitle = document.querySelector("#movieModal .modal-title");
  const modalVideo = document.querySelector("#movieModal video");

  // Movie data array
  const movies = [
    {
      title: "Batman",
      rating: "⭐️ 9.0/10",
      img: "images/bg10.png",
      video: "videos/batman.mp4"
    },
    {
      title: "Chainsaw man",
      rating: "⭐️ 8.8/10",
      img: "images/bg11.png",
      video: "videos/chainsawman2.mp4"
    },
    {
      title: "Jujutsu Kaisen",
      rating: "⭐️ 8.6/10",
      img: "images/bg7.png",
      video: "videos/chainsawman3.mp4"
    },
    {
      title: "Chainsaw man part 2",
      rating: "⭐️ 8.4/10",
      img: "images/bg12.png",
      video: "videos/chainsawman2.mp4"
    },
    {
      title: "Fight club",
      rating: "⭐️ 8.5/10",
      img: "images/bg6.png",
      video: "videos/fight club.mp4"
    },
    {
      title: "Parasite",
      rating: "⭐️ 8.6/10",
      img: "images/bg5.png",
      video: "videos/parasite.mp4"
    },
    {
      title: "Joker",
      rating: "⭐️ 8.8/10",
      img: "images/bg4.png",
      video: "videos/Joker.mp4"
    },
    {
      title: "avengers endgame",
      rating: "⭐️ 8.9/10",
      img: "images/bg3.png",
      video: "videos/avengers endgame.mp4"
    },
    {
      title: "interstellar",
      rating: "⭐️ 9.3/10",
      img: "images/bg2.png",
      video: "videos/interstellar.mp4"
    },
    {
      title: "Inception",
      rating: "⭐️ 9.2/10",
      img: "images/bg1.png",
      video: "videos/inception.mp4"
    }
  ];

  // Function to create movie cards
  function renderMovies(list) {
    movieGrid.innerHTML = ""; // clear grid
    list.forEach(movie => {
      const col = document.createElement("div");
      col.classList.add("col-md-4");
      col.innerHTML = `
        <div class="card bg-secondary text-light h-100" data-video="${movie.video}">
          <img src="${movie.img}" class="card-img-top" alt="${movie.title}">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">${movie.rating}</p>
            <button class="btn btn-outline-light watch-btn" data-bs-toggle="modal" data-bs-target="#movieModal">Watch</button>
          </div>
        </div>
      `;
      movieGrid.appendChild(col);
    });

    // Attach watch button events
    document.querySelectorAll('.watch-btn').forEach(button => {
      button.addEventListener('click', function () {
        const card = this.closest('.card');
        modalTitle.textContent = card.querySelector('.card-title').textContent;
        modalVideo.querySelector('source').src = card.getAttribute('data-video');
        modalVideo.load();
        modalVideo.play();
      });
    });
  }

  // Initial render
  renderMovies(movies);

  // SEARCH FUNCTIONALITY
  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = movies.filter(movie => movie.title.toLowerCase().includes(query));
    renderMovies(filtered);
  });

  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") searchBtn.click();
  });

  // Stop video when modal closes
  document.getElementById('movieModal').addEventListener('hidden.bs.modal', function () {
    modalVideo.pause();
    modalVideo.currentTime = 0;
  });

  // Handle URL query ?q=
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q") ? params.get("q").toLowerCase() : "";
  if (query) {
    const filtered = movies.filter(movie => movie.title.toLowerCase().includes(query));
    renderMovies(filtered);
  }
});

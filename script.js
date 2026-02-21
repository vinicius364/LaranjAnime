// Dados dos animes
const animes = [
    {
        id: 1,
        title: "Naruto Shippuden",
        description: "Naruto retorna à Vila Oculta da Folha após dois anos e meio de treinamento.",
        image: "https://images.unsplash.com/photo-1618335829737-2228915674e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        videoId: "22R0j8UKRzY", // ID do vídeo do YouTube (exemplo)
        episodes: 12
    },
    {
        id: 2,
        title: "Attack on Titan",
        description: "Em um mundo onde a humanidade vive dentro de cidades cercadas por enormes muralhas.",
        image: "https://images.unsplash.com/photo-1578632749014-ca77efd052eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        videoId: "MGRm4IzK1SQ",
        episodes: 25
    },
    {
        id: 3,
        title: "One Piece",
        description: "Monkey D. Luffy, um jovem que comeu uma fruta do diabo, ganha o poder de se tornar elástico.",
        image: "https://images.unsplash.com/photo-1618335829629-1b0aa7b2e5f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        videoId: "S8_YwFLCh4U",
        episodes: 15
    },
    {
        id: 4,
        title: "Demon Slayer",
        description: "Tanjiro Kamado luta para salvar sua irmã Nezuko e vingar sua família.",
        image: "https://images.unsplash.com/photo-1618335829784-63b9c4f5d3c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        videoId: "VQGCKyvzIM4",
        episodes: 26
    },
    {
        id: 5,
        title: "My Hero Academia",
        description: "Em um mundo onde 80% da população possui superpoderes, Izuku Midoriya sonha em se tornar um herói.",
        image: "https://images.unsplash.com/photo-1618335829710-7f8b5f3b3d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        videoId: "EPVkcwyRrBw",
        episodes: 13
    },
    {
        id: 6,
        title: "Jujutsu Kaisen",
        description: "Yuji Itadori se envolve em uma batalha contra maldições após comer um objeto amaldiçoado.",
        image: "https://images.unsplash.com/photo-1618335829735-7b3b7e8b5c5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        videoId: "pR7gNfZ6dXw",
        episodes: 24
    }
];

// Elementos DOM
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.querySelector('.close');
const loginForm = document.getElementById('loginForm');
const userInfo = document.getElementById('userInfo');
const userName = document.getElementById('userName');
const logoutBtn = document.getElementById('logoutBtn');
const animesGrid = document.getElementById('animesGrid');
const playerModal = document.getElementById('playerModal');
const closePlayer = document.querySelector('.close-player');
const videoPlayer = document.getElementById('videoPlayer');
const animeTitle = document.getElementById('animeTitle');
const animeDescription = document.getElementById('animeDescription');
const episodeSelect = document.getElementById('episodeSelect');

// Estado do usuário
let currentUser = null;

// Funções de autenticação
function checkAuth() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        currentUser = JSON.parse(user);
        updateUIForLoggedUser();
    }
}

function login(username, password) {
    if (username === 'demo' && password === '123456') {
        currentUser = { username, name: 'Usuário Demo' };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUIForLoggedUser();
        closeLoginModal();
        return true;
    }
    return false;
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUIForLoggedUser();
}

function updateUIForLoggedUser() {
    if (currentUser) {
        loginBtn.style.display = 'none';
        userInfo.classList.add('show');
        userName.textContent = currentUser.name || currentUser.username;
    } else {
        loginBtn.style.display = 'block';
        userInfo.classList.remove('show');
        userName.textContent = '';
    }
}

// Funções do modal
function openLoginModal() {
    loginModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openPlayerModal(anime) {
    animeTitle.textContent = anime.title;
    animeDescription.textContent = anime.description;
    
    // Atualiza o player com o vídeo
    updateVideoPlayer(anime.videoId, 1);
    
    // Atualiza o seletor de episódios
    episodeSelect.innerHTML = '';
    for (let i = 1; i <= anime.episodes; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Episódio ${i}`;
        episodeSelect.appendChild(option);
    }
    
    playerModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePlayerModal() {
    playerModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    videoPlayer.src = ''; // Para o vídeo
}

function updateVideoPlayer(videoId, episode) {
    // Usando embed do YouTube com boa qualidade
    videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&hd=1&vq=hd1080&ep=${episode}`;
}

// Renderizar animes
function renderAnimes() {
    animesGrid.innerHTML = '';
    animes.forEach(anime => {
        const card = document.createElement('div');
        card.className = 'anime-card';
        card.innerHTML = `
            <img src="${anime.image}" alt="${anime.title}">
            <div class="anime-info">
                <h3>${anime.title}</h3>
                <p>${anime.description.substring(0, 60)}...</p>
                <small>${anime.episodes} episódios</small>
            </div>
        `;
        
        card.addEventListener('click', () => {
            if (currentUser) {
                openPlayerModal(anime);
            } else {
                alert('Por favor, faça login para assistir aos animes!');
                openLoginModal();
            }
        });
        
        animesGrid.appendChild(card);
    });
}

// Event Listeners
loginBtn.addEventListener('click', openLoginModal);

closeModal.addEventListener('click', closeLoginModal);
closePlayer.addEventListener('click', closePlayerModal);

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        closeLoginModal();
    }
    if (e.target === playerModal) {
        closePlayerModal();
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (login(username, password)) {
        alert('Login realizado com sucesso!');
    } else {
        alert('Usuário ou senha inválidos!');
    }
});

logoutBtn.addEventListener('click', () => {
    logout();
    alert('Logout realizado com sucesso!');
});

episodeSelect.addEventListener('change', (e) => {
    const episode = e.target.value;
    const currentAnime = animes.find(a => a.title === animeTitle.textContent);
    if (currentAnime) {
        updateVideoPlayer(currentAnime.videoId, episode);
    }
});

// Inicialização
checkAuth();
renderAnimes();

// Dicas de vídeos de qualidade para demonstração
// Nota: Os IDs de vídeo são apenas exemplos. Em um site real, você usaria sua própria
// fonte de vídeos ou uma API de streaming de vídeos.
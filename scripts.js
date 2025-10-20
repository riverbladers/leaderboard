const loadData = (data) => {
        document.getElementById('leaderboard-header').style.display = 'block';
    const tags = {
        'HYDRA': 'bg-primary',
        'RIVER': 'bg-info',
        'T2': 'bg-success',
        'UPK': 'bg-danger',
        'KWYN': 'bg-green'
    };
    const leaderboardBody = document.getElementById('leaderboard-body');
    leaderboardBody.innerHTML = '';
    data.forEach((player, idx) => {
        if (idx > 19) return;
        const div = document.createElement('div');
        div.classList.add('animate__animated', 'row', 'd-flex', 'justify-content-between');
        let tagKey = Object.keys(tags).find(tag => player.name.toUpperCase().startsWith(tag));
        let badge = '-';
        if ([1, 2, 3].includes(player.rank)) {
            div.classList.add(`animate__delay-${(4-player.rank)*250}ms`, 'animate__lightSpeedInLeft', 'animate__faster');
        } else {
            div.classList.add('animate__fadeInDown');
        }
        if (tagKey) {
            badge = `<span class="badge rounded-pill ${tags[tagKey]}">${tagKey}</span>`
        }
        div.innerHTML = `
                        <div class="rank col-2 text-center">${player.rank === 1 ? '👑' : player.rank}</div>
                        <div class="blader-name col-6 text-truncate ${player.rank === 1 ? 'animate__flash animate__animated animate__infinite animate__slower' : ''}">${player.name}</div>
                        <div class="group col-2 text-center">${badge}</div>
                        <div class="wins col-2 text-center">${player.wins}</div>
                    `;
        leaderboardBody.appendChild(div);
    });
}

const data = [];

async function fetchData() {
    const response = await fetch("data/stats.json");
    const a = await response.json();
    data.push(...a['groupStage']);
    loadData(data);
}

setTimeout(() => {
    fetchData();
}, 1200);


window.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        var overlay = document.getElementById('loading-overlay');
        if (overlay) overlay.style.display = 'none';
    }, 1200);
    let valueNow = 0;
    let loader = setInterval(() => {
        var loadingBar = document.getElementById('loading-bar');
        loadingBar.style.width = valueNow + '%';
        valueNow += 1;
    }, 2);
    setTimeout(() => { clearInterval(loader); }, 800);
});

const emptyState = () => {
    document.getElementById('leaderboard-header').style.display = 'none';
    const leaderboardBody = document.getElementById('leaderboard-body');
    leaderboardBody.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `<div class="col-12 text-center mt-4 animate__animated animate__flash animate__infinite">No results found</div>`;
    leaderboardBody.appendChild(div);
}
document.getElementById('search-input').addEventListener('input', function () {
    const leaderboardBody = document.getElementById('leaderboard-body');
    leaderboardBody.innerHTML = '';
    filteredData = data.filter(player => player.name.toLowerCase().includes(this.value.toLowerCase()));
    filteredData.length !== 0 ? loadData(filteredData) : emptyState();
});



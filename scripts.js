fetch('data/stats.json')
    .then(response => response.json())
    .then(data => {
        const tags = {
            'hydra': 'bg-primary',
            'rivers': 'bg-info',
        };
        const tbody = document.getElementById('leaderboard-body');
        tbody.innerHTML = '';
        const sortedPlayers = data.groupStage.slice().sort((a, b) => {
            const diffA = a.wins - a.loses;
            const diffB = b.wins - b.loses;
            return diffB - diffA;
        });

        setTimeout(() => {
            sortedPlayers.forEach((player, idx) => {
            setTimeout(() => {
                const diff = player.wins - player.loses;
                const diffClass = diff > 0 ? 'text-success' : diff < 0 ? 'text-danger' : '';
                const tr = document.createElement('tr');
                if (idx % 2 === 0) tr.classList.add('table-active');
                tr.classList.add('animate__animated', 'animate__backInLeft');
                let tagKey = Object.keys(tags).find(tag => player.name.toLowerCase().includes(tag));
                let badge = '-';
                if (tagKey) {
                badge = `<span class="badge rounded-pill ${idx === 0 ? 'bg-dark' : `${tags[tagKey]}`}">${tagKey}</span>`
                }
                if (idx === 0) {
                tr.classList.add('table-primary');
                }
                tr.innerHTML = `
                    <th scope="row">${idx === 0 ? '👑' : idx + 1}</th>
                    <td>${badge}</td>
                    <td><h6 ${idx === 0 ? 'class="animate__animated animate__pulse animate__infinite"' : ''}>${player.name}</h6></td>
                    <td>${player.wins}</td>
                    <td>${player.loses}</td>
                    <td class="${diffClass}">${diff > 0 ? '+' : ''}${diff}</td>
                    `;
                tbody.appendChild(tr);
            }, idx * 100);
            });
        }, 2000);
    })
    .catch(error => {
        console.error('Error loading JSON:', error);
    });

window.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        var overlay = document.getElementById('loading-overlay');
        if (overlay) overlay.style.display = 'none';
    }, 2000);
});
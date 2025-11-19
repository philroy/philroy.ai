async function loadStatus() {
    try {
        const res = await fetch("https://api.mcstatus.io/v2/status/java/play.yourdomain.com");
        const data = await res.json();

        document.getElementById("status").innerText =
            data.online ? "🟢 Online" : "🔴 Offline";

        const playerDiv = document.getElementById("playerList");
        playerDiv.innerHTML = "";

        if (data.players && data.players.list) {
            data.players.list.forEach(p => {
                const skin = `https://mc-heads.net/avatar/${p.uuid}/64`;
                playerDiv.innerHTML += `
                    <div class="player">
                        <img src="${skin}">
                        <p>${p.name}</p>
                    </div>`;
            });
        }

    } catch (err) {
        document.getElementById("status").innerText = "Error fetching data";
    }
}

loadStatus();
setInterval(loadStatus, 15000);

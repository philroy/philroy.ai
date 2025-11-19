async function checkServer() {
    try {
        const res = await fetch("https://api.mcstatus.io/v2/status/java/play.yourdomain.com");
        const data = await res.json();

        document.getElementById("status").innerText =
            data.online ? "Online ✔" : "Offline ❌";

        document.getElementById("players").innerText =
            data.players.online + " / " + data.players.max;

    } catch (e) {
        document.getElementById("status").innerText = "Unable to fetch";
        document.getElementById("players").innerText = "N/A";
    }
}

checkServer();
setInterval(checkServer, 30000);

const clientLogos = [
    { name: "Spotify", logo: "assets/images/spotify.png" },
    { name: "Notion", logo: "assets/images/notion.png" },
    { name: "Slack", logo: "assets/images/slack.png" },
    { name: "Figma", logo: "assets/images/figma.svg" },
    { name: "Framer", logo: "assets/images/framer.png" },
    { name: "Webflow", logo: "assets/images/webflow.svg" },
    { name: "Adobe", logo: "assets/images/adobe.png" },
    { name: "Stripe", logo: "assets/images/stripe.png" }
];

const carousel = document.getElementById("clients-carousel");
const track = carousel?.querySelector(".clients-carousel-track");

let animationFrameId = null;
let offset = 0;
const speed = 0.4;

function createLogoItem(client) {
    const item = document.createElement("div");
    item.className = "clients-carousel-item";

    const img = document.createElement("img");
    img.src = client.logo;
    img.alt = client.name;
    img.loading = "lazy";

    item.appendChild(img);
    return item;
}

function renderCarousel() {
    if (!track) return;

    track.innerHTML = "";

    // render twice for seamless looping
    [...clientLogos, ...clientLogos].forEach((client) => {
        track.appendChild(createLogoItem(client));
    });
}

function getStepWidth() {
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "16");
    const firstItem = track.querySelector(".clients-carousel-item");

    if (!firstItem) return 0;
    return firstItem.offsetWidth + gap;
}

function animateCarousel() {
    if (!track) return;

    const singleSetWidth = getStepWidth() * clientLogos.length;
    if (!singleSetWidth) return;

    offset += speed;

    if (offset >= singleSetWidth) {
        offset = 0;
    }

    track.style.transform = `translateX(${-offset}px)`;
    animationFrameId = requestAnimationFrame(animateCarousel);
}

function initClientsCarousel() {
    if (!carousel || !track) return;

    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }

    offset = 0;
    renderCarousel();
    animateCarousel();
}

window.addEventListener("load", initClientsCarousel);
window.addEventListener("resize", initClientsCarousel);
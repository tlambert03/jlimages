/* ============================================================
   Joseph Lambert Images — Main JS
   ============================================================ */

// ---- Gallery Data ----
// Replace these placeholder entries with your real photos.
// Each item: { src: "images/filename.jpg", alt: "description", category: "architecture" }
// Categories: architecture, food, portrait, wedding, travel, golf

const GALLERY_DATA = [
  // Food & Drink
  { src: "images/JosephLambert9594909825.jpg",  alt: "Craft cocktail trio on the bar",                 category: "food" },
  { src: "images/JosephLambert95941283848.jpg",  alt: "Chocolate dessert with red wine pairing",       category: "food" },
  { src: "images/JosephLambert95941283866.jpg",  alt: "Lobster grilled cheese sandwich",               category: "food" },
  { src: "images/JosephLambert95941317843.jpg",  alt: "Tuna spring rolls with seaweed salad",          category: "food" },
  { src: "images/JosephLambert95942400915.jpg",  alt: "Paneer bites with fresh salsa",                 category: "food" },
  { src: "images/JosephLambert95942400923.jpg",  alt: "Pasta twirl on a fork",                         category: "food" },
  { src: "images/JosephLambert95942400925.jpg",  alt: "Sliced steak with roasted potatoes",            category: "food" },
  { src: "images/JosephLambert95942459076.jpg",  alt: "Spiced chicken in cast iron skillet",           category: "food" },

  // Architecture
  { src: "images/JosephLambert9594797928.jpg", alt: "Glass-roofed corridor with pendant lighting",     category: "architecture" },
  { src: "images/JosephLambert9594797929.jpg", alt: "French doors opening to lakeside view",           category: "architecture" },
  { src: "images/JosephLambert9594797930.jpg", alt: "New England shingle-style estate exterior",       category: "architecture" },
  { src: "images/JosephLambert9594797932.jpg", alt: "Bay windows overlooking pool and waterfront",     category: "architecture" },
  { src: "images/JosephLambert9594797938.jpg", alt: "Waterfront home from the dock",                   category: "architecture" },
  { src: "images/JosephLambert9594798000.jpg", alt: "Nautical wallpaper bathroom interior",            category: "architecture" },
  { src: "images/JosephLambert9594916639.jpg", alt: "Grand lobby with spiral staircase",               category: "architecture" },
  { src: "images/JosephLambert95941978728.jpg", alt: "Commercial interior with wood columns",          category: "architecture" },

  // Portraits
  { src: "images/JosephLambert95941128525.jpg", alt: "Studio portrait — natural light headshot",       category: "portrait" },
  { src: "images/JosephLambert95941128528.jpg", alt: "Studio portrait — fashion editorial",            category: "portrait" },

  // Commercial
  { src: "images/JosephLambert9594808098.jpg",  alt: "Custom chopper at motorcycle shop",              category: "portrait" },
  { src: "images/JosephLambert9594857981.jpg",  alt: "Surgeon at work — medical photography",          category: "portrait" },

  // Golf
  { src: "images/JosephLambert9594803285.jpg",  alt: "Oceanside golf hole with sand bunkers",          category: "golf" },
  { src: "images/JosephLambert9594803289.jpg",  alt: "Golf course with lake reflection at sunset",     category: "golf" },
  { src: "images/JosephLambert9594803298.jpg",  alt: "Aerial view — golf holes around lake",           category: "golf" },
  { src: "images/JosephLambert9594803299.jpg",  alt: "Aerial panorama of championship course",         category: "golf" },
];

// ---- DOM References ----
const gallery      = document.getElementById("gallery");
const lightbox     = document.getElementById("lightbox");
const lightboxImg  = document.getElementById("lightbox-img");
const lightboxCap  = document.getElementById("lightbox-caption");
const filterBtns   = document.querySelectorAll(".filter-btn");
const navbar       = document.getElementById("navbar");
const navToggle    = document.querySelector(".nav-toggle");
const navLinks     = document.querySelector(".nav-links");

let currentFilter  = "all";
let currentIndex   = 0;
let visibleItems   = [];

// ---- Build Gallery ----
function renderGallery(filter) {
  gallery.innerHTML = "";
  visibleItems = [];

  const items = filter === "all"
    ? GALLERY_DATA
    : GALLERY_DATA.filter(d => d.category === filter);

  items.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "gallery-item";
    div.style.animationDelay = `${i * 0.06}s`;

    if (item.src) {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.alt;
      img.loading = "lazy";
      div.appendChild(img);
    } else {
      // Placeholder when no image src is provided
      const placeholder = document.createElement("div");
      placeholder.style.cssText =
        "width:100%;height:100%;display:flex;align-items:center;" +
        "justify-content:center;font-size:0.75rem;color:#666;" +
        "text-align:center;padding:16px;text-transform:uppercase;" +
        "letter-spacing:0.08em;";
      placeholder.textContent = item.alt;
      div.appendChild(placeholder);
    }

    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.innerHTML = `<span class="overlay-text">${item.category}</span>`;
    div.appendChild(overlay);

    div.addEventListener("click", () => openLightbox(i));
    gallery.appendChild(div);
    visibleItems.push(item);
  });
}

// ---- Filter ----
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderGallery(currentFilter);
  });
});

// ---- Lightbox ----
function openLightbox(index) {
  const item = visibleItems[index];
  if (!item || !item.src) return;  // skip if no real image
  currentIndex = index;
  lightboxImg.src = item.src;
  lightboxImg.alt = item.alt;
  lightboxCap.textContent = item.alt;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function navigateLightbox(dir) {
  currentIndex = (currentIndex + dir + visibleItems.length) % visibleItems.length;
  // Skip items without real images
  let attempts = 0;
  while (!visibleItems[currentIndex].src && attempts < visibleItems.length) {
    currentIndex = (currentIndex + dir + visibleItems.length) % visibleItems.length;
    attempts++;
  }
  const item = visibleItems[currentIndex];
  if (!item.src) return;
  lightboxImg.src = item.src;
  lightboxImg.alt = item.alt;
  lightboxCap.textContent = item.alt;
}

document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
document.querySelector(".lightbox-prev").addEventListener("click", () => navigateLightbox(-1));
document.querySelector(".lightbox-next").addEventListener("click", () => navigateLightbox(1));

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape")      closeLightbox();
  if (e.key === "ArrowLeft")   navigateLightbox(-1);
  if (e.key === "ArrowRight")  navigateLightbox(1);
});

// ---- Navbar scroll effect ----
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// ---- Active nav link tracking ----
const sections = document.querySelectorAll("section[id]");
const navLinkEls = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkEls.forEach(a => a.classList.remove("active"));
        const id = entry.target.id;
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) link.classList.add("active");
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach(sec => observer.observe(sec));

// ---- Mobile nav toggle ----
navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => navLinks.classList.remove("open"));
});

// ---- Contact form ----
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: { Accept: "application/json" },
  }).then(res => {
    if (res.ok) {
      form.reset();
      alert("Thanks for your message! I'll be in touch soon.");
    } else {
      alert("Something went wrong. Please try again.");
    }
  }).catch(() => alert("Something went wrong. Please try again."));
});

// ---- Init ----
renderGallery("all");

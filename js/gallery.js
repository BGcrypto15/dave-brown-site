(function () {
  var images = [
    'assets/gallery/gallery-01.jpg',
    'assets/gallery/gallery-02.jpg',
    'assets/gallery/gallery-03.jpg',
    'assets/gallery/gallery-04.jpg',
    'assets/gallery/gallery-05.jpg',
    'assets/gallery/gallery-06.jpg',
    'assets/gallery/gallery-07.jpg',
    'assets/gallery/gallery-08.jpg',
    'assets/gallery/gallery-09.jpg',
    'assets/gallery/gallery-10.jpg',
    'assets/gallery/gallery-11.jpg',
    'assets/gallery/gallery-12.jpg',
    'assets/gallery/gallery-13.jpg',
    'assets/gallery/gallery-14.jpg',
    'assets/gallery/gallery-15.jpg',
    'assets/gallery/gallery-16.jpg',
    'assets/gallery/gallery-17.jpg',
    'assets/gallery/gallery-18.jpg',
    'assets/gallery/gallery-19.jpg',
    'assets/gallery/gallery-20.jpg',
    'assets/gallery/gallery-21.jpg',
    'assets/gallery/gallery-22.jpg',
    'assets/gallery/gallery-23.jpg',
    'assets/gallery/gallery-24.jpg',
    'assets/gallery/gallery-25.jpg',
    'assets/gallery/gallery-26.jpg',
    'assets/gallery/gallery-27.jpg',
    'assets/gallery/gallery-28.jpg',
    'assets/gallery/gallery-29.jpg',
    'assets/gallery/gallery-30.jpg',
    'assets/gallery/gallery-31.jpg',
    'assets/gallery/gallery-32.jpg'
  ];

  // Shuffle so each page load presents a different order (Fisher-Yates).
  for (var s = images.length - 1; s > 0; s--) {
    var j = Math.floor(Math.random() * (s + 1));
    var tmp = images[s];
    images[s] = images[j];
    images[j] = tmp;
  }

  var current = 0;
  var img = document.getElementById('galleryImg');
  var dotsWrap = document.getElementById('galleryDots');
  var prevBtn = document.getElementById('galleryPrev');
  var nextBtn = document.getElementById('galleryNext');
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  var lightboxPrev = document.getElementById('lightboxPrev');
  var lightboxNext = document.getElementById('lightboxNext');
  var timer = null;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!img || !dotsWrap || !prevBtn || !nextBtn) return;

  // First image was already baked into the HTML for a no-flash first paint;
  // now that the order is shuffled, sync it to whatever ended up first.
  img.src = images[0];
  img.alt = 'Dave Brown photo 1 of ' + images.length;

  images.forEach(function (src, i) {
    var dot = document.createElement('button');
    dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Go to photo ' + (i + 1));
    dot.addEventListener('click', function () {
      goTo(i);
      restart();
    });
    dotsWrap.appendChild(dot);
  });
  var dots = dotsWrap.querySelectorAll('.gallery-dot');

  function isLightboxOpen() {
    return lightbox && lightbox.classList.contains('open');
  }

  function goTo(i) {
    current = (i + images.length) % images.length;
    var alt = 'Dave Brown photo ' + (current + 1) + ' of ' + images.length;
    var apply = function () {
      img.src = images[current];
      img.alt = alt;
      img.style.opacity = 1;
    };
    if (reduceMotion) {
      apply();
    } else {
      img.style.opacity = 0;
      setTimeout(apply, 180);
    }
    if (isLightboxOpen()) {
      lightboxImg.src = images[current];
      lightboxImg.alt = alt;
    }
    dots.forEach(function (d, idx) {
      d.classList.toggle('active', idx === current);
    });
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function restart() {
    if (timer) clearInterval(timer);
    if (!reduceMotion && !isLightboxOpen()) timer = setInterval(next, 5000);
  }

  prevBtn.addEventListener('click', function () { prev(); restart(); });
  nextBtn.addEventListener('click', function () { next(); restart(); });
  if (lightboxPrev) lightboxPrev.addEventListener('click', prev);
  if (lightboxNext) lightboxNext.addEventListener('click', next);

  img.addEventListener('click', openLightbox);

  function openLightbox() {
    lightboxImg.src = images[current];
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    if (timer) clearInterval(timer);
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    restart();
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeLightbox(); return; }
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  restart();
})();

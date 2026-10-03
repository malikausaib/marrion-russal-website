/**
 * Subtle Scientific Molecular Network Canvas
 * Renders lightweight, ambient molecular nodes and bonds
 * Automatically pauses if prefers-reduced-motion is active
 */

export function initMolecularCanvas(canvasId = "hero-canvas") {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];
  let animationId = null;

  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
    createParticles();
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 20000), 45);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.2 + 1.2,
        isWine: Math.random() > 0.75,
        alpha: Math.random() * 0.4 + 0.25
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw bonds (connecting lines between close nodes)
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = particles[i].isWine || particles[j].isWine 
            ? `rgba(120, 24, 43, ${alpha})` 
            : `rgba(14, 29, 51, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.isWine 
        ? `rgba(120, 24, 43, ${p.alpha})` 
        : `rgba(14, 29, 51, ${p.alpha})`;
      ctx.fill();

      if (!isReducedMotion) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      }
    }

    if (!isReducedMotion) {
      animationId = requestAnimationFrame(draw);
    }
  }

  window.addEventListener("resize", resize);
  resize();
  draw();

  return () => {
    window.removeEventListener("resize", resize);
    if (animationId) cancelAnimationFrame(animationId);
  };
}

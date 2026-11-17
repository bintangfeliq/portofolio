(function() {
  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }
  function initKineticGrid(options) {
    const canvas = document.getElementById(options && options.canvasId ? options.canvasId : "kinetic-grid-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    const theme = (canvas.dataset.theme || (options && options.theme) || "default").toLowerCase();
    const colors = theme === "monochrome" ? {
      bg: "#0b0b0e",
      line: "rgba(255, 255, 255, 0.16)",
      dot: "rgba(255, 255, 255, 0.35)"
    } : {
      bg: "#0b0b0e",
      line: "rgba(45, 212, 191, 0.24)",
      dot: "rgba(94, 234, 212, 0.50)"
    };
    const config = {
      cellSize: 46,
      mouseRadius: 180,
      mouseStrength: 34,
      lerpSpeed: 0.1,
      dotRadius: 1.4
    };
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let targetMouse = { x: -1000, y: -1000, active: false };
    let currentMouse = { x: -1000, y: -1000 };
    let ripples = [];
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    function getWarpedPoint(x, y) {
      let wx = x;
      let wy = y;
      if (currentMouse.x > -500) {
        const dx = x - currentMouse.x;
        const dy = y - currentMouse.y;
        const distSq = dx * dx + dy * dy;
        const radiusSq = config.mouseRadius * config.mouseRadius;
        if (distSq < radiusSq && distSq > 0.001) {
          const dist = Math.sqrt(distSq);
          const force = Math.pow(1 - dist / config.mouseRadius, 2);
          const push = force * config.mouseStrength;
          wx += (dx / dist) * push;
          wy += (dy / dist) * push;
        }
      }
      for (let i = 0; i < ripples.length; i++) {
        const r = ripples[i];
        const rdx = x - r.x;
        const rdy = y - r.y;
        const rdistSq = rdx * rdx + rdy * rdy;
        const rdist = Math.sqrt(rdistSq);
        const diff = rdist - r.radius;
        if (Math.abs(diff) < r.wavelength && rdist > 0.001) {
          const wavePhase = (diff / r.wavelength) * Math.PI;
          const waveAmp = Math.sin(wavePhase) * r.amplitude;
          wx += (rdx / rdist) * waveAmp;
          wy += (rdy / rdist) * waveAmp;
        }
      }
      return { x: wx, y: wy };
    }
    function triggerRipple(x, y) {
      ripples.push({
        x: x,
        y: y,
        radius: 0,
        maxRadius: Math.max(width, height) * 1.3,
        speed: 8,
        amplitude: 24,
        wavelength: 50,
        decay: 0.982
      });
    }
    function handlePointerMove(e) {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
      targetMouse.active = true;
    }
    function handlePointerLeave() {
      targetMouse.active = false;
      targetMouse.x = -1000;
      targetMouse.y = -1000;
    }
    function handleClick(e) {
      triggerRipple(e.clientX, e.clientY);
    }
    function update() {
      if (targetMouse.active) {
        currentMouse.x = lerp(currentMouse.x, targetMouse.x, config.lerpSpeed);
        currentMouse.y = lerp(currentMouse.y, targetMouse.y, config.lerpSpeed);
      } else {
        currentMouse.x = lerp(currentMouse.x, -1000, 0.05);
        currentMouse.y = lerp(currentMouse.y, -1000, 0.05);
      }
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.amplitude *= r.decay;
        if (r.radius > r.maxRadius || r.amplitude < 0.2) {
          ripples.splice(i, 1);
        }
      }
    }
    function render() {
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, width, height);
      const cellSize = config.cellSize;
      const cols = Math.ceil(width / cellSize) + 2;
      const rows = Math.ceil(height / cellSize) + 2;
      const offsetX = ((width % cellSize) - cellSize) / 2;
      const offsetY = ((height % cellSize) - cellSize) / 2;
      const grid = new Array(rows + 1);
      for (let r = 0; r <= rows; r++) {
        const y = offsetY + r * cellSize;
        grid[r] = new Array(cols + 1);
        for (let c = 0; c <= cols; c++) {
          const x = offsetX + c * cellSize;
          grid[r][c] = getWarpedPoint(x, y);
        }
      }
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = colors.line;
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const pt = grid[r][c];
          if (c === 0) {
            ctx.moveTo(pt.x, pt.y);
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }
      }
      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          const pt = grid[r][c];
          if (r === 0) {
            ctx.moveTo(pt.x, pt.y);
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }
      }
      ctx.stroke();
      if (config.dotRadius > 0) {
        ctx.beginPath();
        ctx.fillStyle = colors.dot;
        const radius = config.dotRadius;
        for (let r = 0; r <= rows; r++) {
          for (let c = 0; c <= cols; c++) {
            const pt = grid[r][c];
            ctx.moveTo(pt.x + radius, pt.y);
            ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
          }
        }
        ctx.fill();
      }
    }
    let animationId;
    function loop() {
      update();
      render();
      animationId = requestAnimationFrame(loop);
    }
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });
    resize();
    loop();
    return {
      destroy: function() {
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", resize);
        window.removeEventListener("mousemove", handlePointerMove);
        window.removeEventListener("mouseleave", handlePointerLeave);
        window.removeEventListener("click", handleClick);
      },
      triggerRipple: triggerRipple
    };
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
      window.kineticGridInstance = initKineticGrid();
    });
  } else {
    window.kineticGridInstance = initKineticGrid();
  }
  window.initKineticGrid = initKineticGrid;
})();

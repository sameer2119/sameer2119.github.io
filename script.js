/**
 * SAMEER MUSHTAQ TANTRAY // BIOINFORMATICS HACKER ENGINE
 * Live Matrix Rain Canvas, Interactive CLI Terminal, Audio FX, and Telemetry
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Live Matrix Canvas (Genomic ATCG + Cyber Code Stream)
  // --------------------------------------------------------------------------
  let matrixRunning = true;
  let matrixInterval = null;

  function initMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Genomic Nucleotides & Hacker Characters
    const chars = 'ATCG01λμΩ∑π🧬⚡<>[]{}/\\=+*~#@!';
    const fontSize = 15;
    const columns = Math.floor(window.innerWidth / fontSize);
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100);
    }

    function draw() {
      if (!matrixRunning) return;

      // Translucent black overlay for trailing ghost effect
      ctx.fillStyle = 'rgba(5, 7, 10, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head character is luminous cyan/white, tail is matrix green
        if (Math.random() > 0.88) {
          ctx.fillStyle = '#00f3ff';
          ctx.shadowColor = '#00f3ff';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = '#00ff41';
          ctx.shadowColor = '#00ff41';
          ctx.shadowBlur = 3;
        }

        ctx.fillText(text, x, y);
        ctx.shadowBlur = 0;

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    if (matrixInterval) clearInterval(matrixInterval);
    matrixInterval = setInterval(draw, 33);

    // Matrix Toggle Button
    const matrixBtn = document.getElementById('btn-toggle-matrix');
    if (matrixBtn) {
      matrixBtn.classList.toggle('active', matrixRunning);
      matrixBtn.addEventListener('click', () => {
        matrixRunning = !matrixRunning;
        matrixBtn.classList.toggle('active', matrixRunning);
        if (!matrixRunning) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          showToast('MATRIX_STREAM: PAUSED', 'info');
        } else {
          showToast('MATRIX_STREAM: ACTIVE', 'info');
        }
        playCyberBeep(600, 0.05);
      });
    }
  }

  // --------------------------------------------------------------------------
  // 2. Web Audio Synthesizer (Retro Terminal Feedback)
  // --------------------------------------------------------------------------
  let soundEnabled = false;
  let audioCtx = null;

  function playCyberBeep(freq = 440, duration = 0.04) {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  function initHudControls() {
    // Photo Laser & Scanline Scanner Toggle (Restricted to photo avatar only)
    const scanBtn = document.getElementById('btn-toggle-crt');
    const hudImgContainer = document.querySelector('.hud-image-container');

    if (scanBtn) {
      scanBtn.classList.add('active');

      scanBtn.addEventListener('click', () => {
        const isCurrentlyActive = scanBtn.classList.toggle('active');
        if (hudImgContainer) {
          hudImgContainer.classList.toggle('photo-scan-disabled', !isCurrentlyActive);
        }

        showToast(`PHOTO SCANNER: ${isCurrentlyActive ? 'ENABLED' : 'DISABLED'}`, isCurrentlyActive ? 'success' : 'info');
        playCyberBeep(520, 0.05);
      });
    }

    // Audio FX Toggle
    const soundBtn = document.getElementById('btn-toggle-sound');
    if (soundBtn) {
      soundBtn.classList.toggle('active', soundEnabled);
      soundBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundBtn.classList.toggle('active', soundEnabled);
        if (soundEnabled) {
          playCyberBeep(880, 0.08);
          showToast('AUDIO_SYNTH: ENABLED', 'success');
        } else {
          showToast('AUDIO_SYNTH: MUTED', 'info');
        }
      });
    }

    // Attach subtle beep to buttons
    document.querySelectorAll('.cyber-btn, .cmd-pill, .nav-link').forEach((el) => {
      el.addEventListener('click', () => playCyberBeep(700, 0.03));
    });
  }

  // --------------------------------------------------------------------------
  // 3. Live Real-Time Telemetry Clock (True Internet Indian Standard Time - IST)
  // --------------------------------------------------------------------------
  function initLiveClock() {
    const clockEl = document.getElementById('sys-clock');
    if (!clockEl) return;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let internetUtcAnchorMs = Date.now();
    let perfAnchorMs = performance.now();

    function renderTrueIST() {
      const elapsedMs = performance.now() - perfAnchorMs;
      const currentUtcMs = internetUtcAnchorMs + elapsedMs;
      
      // Indian Standard Time is strictly UTC + 5 hours 30 minutes (19,800,000 ms)
      const istMs = currentUtcMs + 19800000;
      const istDate = new Date(istMs);
      
      // Date format: 29-Aug-26
      const day = istDate.getUTCDate();
      const dd = (day < 10 ? '0' : '') + day;
      const mon = months[istDate.getUTCMonth()];
      const yy = String(istDate.getUTCFullYear()).slice(-2);
      const dateStr = `${dd}-${mon}-${yy}`;

      // Time format: 10:34:44 AM IST
      let h = istDate.getUTCHours();
      const ap = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      const hh = String(h12).padStart(2, '0');
      const mm = String(istDate.getUTCMinutes()).padStart(2, '0');
      const ss = String(istDate.getUTCSeconds()).padStart(2, '0');
      const timeStr = `${hh}:${mm}:${ss} ${ap} IST`;
      
      clockEl.textContent = `${dateStr} ${timeStr}`;
    }

    function setAnchor(utcTimestampMs) {
      if (!utcTimestampMs || isNaN(utcTimestampMs)) return;
      internetUtcAnchorMs = utcTimestampMs;
      perfAnchorMs = performance.now();
      renderTrueIST();
    }

    window.__setISTAnchor = setAnchor;

    renderTrueIST();
    if (!window.__istInterval) {
      window.__istInterval = setInterval(renderTrueIST, 1000);
    }

    function syncInternetTime() {
      // 1. Fetch Atomic Time from GitHub Pages / Web Server Response Header
      fetch(window.location.href, { method: 'HEAD', cache: 'no-store' })
        .then((res) => {
          const sDate = res.headers.get('Date') || res.headers.get('date');
          if (sDate) {
            const sMs = new Date(sDate).getTime();
            if (!isNaN(sMs)) setAnchor(sMs);
          }
        })
        .catch(() => {});

      // 2. Fetch from GitHub API
      fetch('https://api.github.com/users/SameerMushtaq', { cache: 'no-store' })
        .then((res) => {
          const sDate = res.headers.get('Date') || res.headers.get('date');
          if (sDate) {
            const sMs = new Date(sDate).getTime();
            if (!isNaN(sMs)) setAnchor(sMs);
          }
        })
        .catch(() => {});

      // 3. Fetch TimeAPI.io (Asia/Kolkata)
      fetch('https://timeapi.io/api/time/current/zone?timeZone=Asia/Kolkata')
        .then((r) => r.json())
        .then((d) => {
          if (d && d.dateTime) {
            const sTime = new Date(d.dateTime + 'Z').getTime();
            if (!isNaN(sTime)) setAnchor(sTime);
          }
        })
        .catch(() => {
          fetch('https://worldtimeapi.org/api/timezone/Asia/Kolkata')
            .then((r) => r.json())
            .then((data) => {
              if (data && data.unixtime) {
                setAnchor(data.unixtime * 1000);
              }
            })
            .catch(() => {});
        });
    }

    syncInternetTime();
    window.addEventListener('focus', syncInternetTime);
    setInterval(syncInternetTime, 300000);
  }

  // --------------------------------------------------------------------------
  // 4. Hero Typing Command Sequence
  // --------------------------------------------------------------------------
  function initHeroTypewriter() {
    const target = document.getElementById('hero-typing-target');
    if (!target) return;

    const commands = [
      'python run_pipeline.py --mode "3D_Spatial_Genomics"',
      'torch.cuda.set_device(0) # Initializing CIRI ML Cluster',
      'hic_predictor --input sample.cool --model GNN_Transformer',
      'nextjs dev # Launching Academic Research Platform',
      'systemctl status hpc-cluster.service # 100% Online'
    ];

    let cmdIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let speed = 70;

    function typeLoop() {
      const current = commands[cmdIdx];

      if (isDeleting) {
        target.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        speed = 30;
      } else {
        target.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        speed = 65;
      }

      if (!isDeleting && charIdx === current.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        cmdIdx = (cmdIdx + 1) % commands.length;
        speed = 400;
      }

      setTimeout(typeLoop, speed);
    }

    setTimeout(typeLoop, 600);
  }

  // --------------------------------------------------------------------------
  // 5. Interactive Live CLI Terminal Sandbox
  // --------------------------------------------------------------------------
  const CLI_COMMANDS = {
    help: `[AVAILABLE SYSTEM COMMANDS]:
  help                 - Display this directory of available commands
  cat profile.txt      - Display Sameer's research background & trajectory
  tree skills          - Display technical capability matrix & disciplines
  ls services          - List all 6 specialized consulting & engineering services
  cat projects.json    - List active featured deployments & research pipelines
  status --cluster     - Check live HPC cluster node telemetry & resource loads
  contact              - Print direct transmission channels & email endpoints
  wget cv              - Trigger download for Sameer's official Curriculum Vitae (PDF)
  clear / cls          - Clear the terminal screen`,

    'cat profile.txt': `[RESEARCH_PROFILE // SAMEER MUSHTAQ TANTRAY]:
- Status: PhD Scholar in Computer Science @ University of Kashmir
- Lab: Project Research Scientist @ Chromatin & Epigenetics Lab (CIRI)
- Education: MCA (IUST), B.Sc. Computer Science (Univ. of Kashmir)
- Core Focus: Machine Learning & GNNs for 3D Spatial Genomics & Hi-C Modeling
- Systems: Root-level kernel tuning, storage recovery, HPC cluster orchestration`,

    bio: `[RESEARCH_PROFILE // SAMEER MUSHTAQ TANTRAY]:
- Status: PhD Scholar in Computer Science @ University of Kashmir
- Lab: Project Research Scientist @ Chromatin & Epigenetics Lab (CIRI)
- Education: MCA (IUST), B.Sc. Computer Science (Univ. of Kashmir)
- Core Focus: Machine Learning & GNNs for 3D Spatial Genomics & Hi-C Modeling
- Systems: Root-level kernel tuning, storage recovery, HPC cluster orchestration`,

    'tree skills': `[TECHNICAL_CAPABILITY_TREE]:
├── 01. Machine Learning & AI [PyTorch, GATs, CNNs, Attention Models, Sequence ML]
├── 02. 3D Spatial Genomics   [Hi-C / Micro-C Contact Matrices, Cool, Mcool, Pairs]
├── 03. High Performance Comp [Linux Kernel, SLURM, CUDA Multi-GPU Acceleration]
├── 04. Systems Engineering   [Lossless Disk Diagnostics, Data Recovery, Hardware]
└── 05. Full-Stack Dev        [Next.js, React, Node.js, PostgreSQL, Cloud APIs]`,

    skills: `[TECHNICAL_CAPABILITY_TREE]:
├── 01. Machine Learning & AI [PyTorch, GATs, CNNs, Attention Models, Sequence ML]
├── 02. 3D Spatial Genomics   [Hi-C / Micro-C Contact Matrices, Cool, Mcool, Pairs]
├── 03. High Performance Comp [Linux Kernel, SLURM, CUDA Multi-GPU Acceleration]
├── 04. Systems Engineering   [Lossless Disk Diagnostics, Data Recovery, Hardware]
└── 05. Full-Stack Dev        [Next.js, React, Node.js, PostgreSQL, Cloud APIs]`,

    'ls services': `[OFFICIAL SERVICES CATALOG]:
1. ML & Genomic Analysis     -> Hi-C modeling, TAD prediction, multi-omics AI
2. System Technician         -> OS install, kernel tuning, HPC config, recovery
3. Software Engineering      -> Toolchain builds, patched binaries, parallel compute
4. Web Development & Cloud   -> Next.js research portals, interactive visualizers
5. Graphics Designing        -> Scientific figures, vector abstracts, conference posters
6. Office Automation         -> Automated reporting, LaTeX compilation, macros`,

    services: `[OFFICIAL SERVICES CATALOG]:
1. ML & Genomic Analysis     -> Hi-C modeling, TAD prediction, multi-omics AI
2. System Technician         -> OS install, kernel tuning, HPC config, recovery
3. Software Engineering      -> Toolchain builds, patched binaries, parallel compute
4. Web Development & Cloud   -> Next.js research portals, interactive visualizers
5. Graphics Designing        -> Scientific figures, vector abstracts, conference posters
6. Office Automation         -> Automated reporting, LaTeX compilation, macros`,

    'cat projects.json': `[ACTIVE FEATURED DEPLOYMENTS]:
{
  "01": {
    "title": "Instrument Bookings System - CIRI",
    "role": "Lead Developer & System Architect",
    "url": "https://ablabinstruments.vercel.app",
    "stack": ["Next.js", "TailwindCSS", "PostgreSQL", "SchedulerEngine"]
  },
  "02": {
    "title": "Placement Management System - IUST",
    "role": "Lead Developer & System Architect",
    "access": "Internal University Platform",
    "stack": ["Node.js", "Automation", "DatabaseArchitecture", "Analytics"]
  },
  "03": {
    "title": "F2 Sports — E-Commerce Store",
    "role": "Full-Stack & E-Commerce Architect",
    "url": "https://f2sportsstore.vercel.app",
    "stack": ["Next.js", "TailwindCSS", "D2CCommerce", "CustomConfigurator"]
  },
  "04": {
    "title": "Hostel Management System",
    "role": "Lead Full-Stack Developer & Database Architect",
    "access": "Private Enterprise Platform",
    "stack": ["DatabaseArchitecture", "RoleBasedAccess", "ResidenceManagement", "Security"]
  }
}`,

    projects: `[ACTIVE FEATURED DEPLOYMENTS]:
1. Instrument Bookings System - CIRI (https://ablabinstruments.vercel.app)
2. Placement Management System - IUST (Internal University Portal)
3. F2 Sports — E-Commerce Store (https://f2sportsstore.vercel.app)
4. Hostel Management System (Private Enterprise Portal)`,

    'status --cluster': `[CIRI-HPC-CLUSTER STATUS TELEMETRY]:
- Node ID: CIRI-ML-NODE-01 (Ubuntu 22.04 LTS Kernel 6.8.0-HPC)
- GPU Load: 94.2% [NVIDIA RTX / A100 Tensor Cores Active]
- Memory Allocation: 48.6 GB / 128.0 GB Used
- Active Job: "Hi-C Enhancer-Promoter Attention Predictor [Job #4819]"
- Cluster Integrity: 100% Operational`,

    status: `[CIRI-HPC-CLUSTER STATUS TELEMETRY]:
- Node ID: CIRI-ML-NODE-01 (Ubuntu 22.04 LTS Kernel 6.8.0-HPC)
- GPU Load: 94.2% [NVIDIA RTX / A100 Tensor Cores Active]
- Memory Allocation: 48.6 GB / 128.0 GB Used
- Active Job: "Hi-C Enhancer-Promoter Attention Predictor [Job #4819]"
- Cluster Integrity: 100% Operational`,

    contact: `[TRANSMISSION ENDPOINTS]:
- Primary Email: Sameermushtaq48@gmail.com
- WhatsApp Hotline: +91 7006249954 (https://wa.me/917006249954)
- Telegram: @Sameer1921 (https://t.me/Sameer1921)
- GitHub: https://github.com/SameerMushtaq
- LinkedIn: https://www.linkedin.com/in/sameer-mushtaq-931068b2/
- Instagram: https://www.instagram.com/thephoenix1921/
- Facebook: https://www.facebook.com/DigitalNinjaOfficial/`,

    'wget cv': 'Triggering download: CV_Sameer.pdf ... [200 OK]'
  };

  window.executeTermCommand = function (cmdStr) {
    const output = document.getElementById('term-output');
    const input = document.getElementById('terminal-input');
    if (!output) return;

    const trimmed = cmdStr.trim().toLowerCase();

    // Create user prompt line
    const userLine = document.createElement('div');
    userLine.className = 'term-line';
    userLine.innerHTML = `<span class="text-green">sameer@research-node:~$</span> <span class="text-bright">${cmdStr}</span>`;
    output.appendChild(userLine);

    if (trimmed === 'clear' || trimmed === 'cls') {
      output.innerHTML = `
        <div class="term-line banner-line">
================================================================================
  SAMEER MUSHTAQ TANTRAY - BIOINFORMATICS & ML INTELLIGENCE TERMINAL v4.2
  Type 'help' for command directory | Click quick command buttons below
================================================================================
        </div>
      `;
      if (input) input.value = '';
      return;
    }

    if (trimmed === 'wget cv' || trimmed === 'wget cv.pdf' || trimmed === 'download cv') {
      const link = document.createElement('a');
      link.href = './CV_Sameer.pdf';
      link.download = 'CV_Sameer.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('CV_Sameer.pdf download initiated', 'success');
    }

    const response = CLI_COMMANDS[trimmed] || `bash: ${cmdStr}: command not found. Type 'help' to see all available commands.`;
    const respLine = document.createElement('div');
    respLine.className = 'term-line text-cyan';
    respLine.textContent = response;
    output.appendChild(respLine);

    output.scrollTop = output.scrollHeight;
    if (input) input.value = '';
    playCyberBeep(580, 0.04);
  };

  function initTerminalListeners() {
    const input = document.getElementById('terminal-input');
    const runBtn = document.getElementById('term-run-btn');

    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
          window.executeTermCommand(input.value);
        }
      });
    }

    if (runBtn && input) {
      runBtn.addEventListener('click', () => {
        if (input.value.trim()) {
          window.executeTermCommand(input.value);
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // 6. Service Specification Modals
  // --------------------------------------------------------------------------
  const SERVICE_ITEMS = {
    genomics: {
      title: "Machine Learning & Genomic Analysis",
      items: [
        "Deep Learning for Hi-C / Micro-C Modeling",
        "Chromatin Conformation & TAD Prediction",
        "Neural Network Architectures for Multi-Omics",
        "Whole Genome Sequencing (WGS) ML Pipelines",
        "RNA-Seq, ChIP-Seq & ATAC-Seq Predictive Analysis",
        "FastQ to Contact Map Automated Processing",
        "Pairs, Cool & Mcool High-Performance Parsing",
        "Graph Neural Networks for Genomic Topology",
        "Feature Engineering for Biological Sequences"
      ]
    },
    system: {
      title: "System Technician",
      items: [
        "OS Installation & Linux Kernel Optimization",
        "System Recovery & Deep Disk Diagnostics",
        "Password Recovery & Total Data Preservation",
        "HPC Cluster Setup & GPU Configuration",
        "NVMe/SSD/HDD Lossless Partition Recovery",
        "Driver & CUDA Toolchain Environment Config"
      ]
    },
    software: {
      title: "Software Engineering",
      items: [
        "Bioinformatics & ML Software Environment Setup",
        "PyTorch, TensorFlow & CUDA Installations",
        "Windows / macOS / Linux System Patches",
        "Binary Modification & Custom Packaging",
        "Application Deployment & Performance Profiling",
        "Custom Developer Environment Configuration"
      ]
    },
    web: {
      title: "Web Development & Cloud",
      items: [
        "Interactive Genomic & ML Dashboards",
        "Full-Stack Academic Portals & APIs",
        "Cloud Deployment (Vercel, AWS, Cloudflare)",
        "Data Visualization with D3 / Plotly / Canvas",
        "Frontend & Backend Integration",
        "Research Platform Optimization & Maintenance"
      ]
    },
    graphics: {
      title: "Graphics Designing",
      items: [
        "Publication Figures & Scientific Visualizations",
        "Conference Posters & High-Resolution Banners",
        "Vector Illustration (Illustrator, Corel, Inkscape)",
        "Academic Slide Decks & Graphical Abstracts",
        "Branding, Logos & Digital Ninja Media"
      ]
    },
    office: {
      title: "Office Automation",
      items: [
        "Automated Research Pipelines & Scripting",
        "LaTeX Document Preparation & Mendeley Sync",
        "Complex Statistical Excel Worksheets & Macros",
        "MS Word Academic Formatting & Journal Standards",
        "Relational Database Layouts & Queries"
      ]
    }
  };

  window.showServiceModal = function (key) {
    const modal = document.getElementById('service-modal');
    const title = document.getElementById('modal-title');
    const list = document.getElementById('modal-items-list');
    const data = SERVICE_ITEMS[key];

    if (!data || !modal || !title || !list) return;

    title.textContent = `[SPEC]: ${data.title.toUpperCase()}`;
    list.innerHTML = data.items.map((it) => `<div class="modal-item-pill">${it}</div>`).join('');

    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    playCyberBeep(750, 0.05);
  };

  window.closeServiceModal = function () {
    const modal = document.getElementById('service-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      playCyberBeep(400, 0.04);
    }
  };

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeServiceModal();
    }
  });

  const modal = document.getElementById('service-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) window.closeServiceModal();
    });
  }

  // --------------------------------------------------------------------------
  // 7. Navigation, ScrollSpy & Mobile Drawer
  // --------------------------------------------------------------------------
  function initNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.cyber-nav-links .nav-link');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-links');

    function highlightScroll() {
      const pos = (window.scrollY || window.pageYOffset) + 160;

      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (pos >= top && pos < top + height) {
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }

    window.addEventListener('scroll', highlightScroll, { passive: true });
    highlightScroll();

    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        playCyberBeep(600, 0.03);
      });

      document.querySelectorAll('.cyber-nav-links .nav-link').forEach((link) => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
        });
      });

      document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
          navMenu.classList.remove('active');
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // 8. Visitor Telemetry Counter
  // --------------------------------------------------------------------------
  function initCounters() {
    const totalEl = document.getElementById('total-visits');
    const uniqueEl = document.getElementById('unique-visitors');

    let visits = parseInt(localStorage.getItem('sameer_hacker_visits') || '1429', 10) + 1;
    localStorage.setItem('sameer_hacker_visits', visits);

    let uniques = parseInt(localStorage.getItem('sameer_hacker_uniques') || '790', 10);
    if (!localStorage.getItem('sameer_hacker_node_visited')) {
      uniques += 1;
      localStorage.setItem('sameer_hacker_uniques', uniques);
      localStorage.setItem('sameer_hacker_node_visited', 'true');
    }

    if (totalEl) totalEl.textContent = visits.toLocaleString();
    if (uniqueEl) uniqueEl.textContent = uniques.toLocaleString();
  }

  // --------------------------------------------------------------------------
  // 9. Toast Notification Engine
  // --------------------------------------------------------------------------
  function showToast(message, type = 'success', duration = 4000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let icon = 'fa-terminal';
    if (type === 'error') icon = 'fa-triangle-exclamation text-magenta';
    if (type === 'success') icon = 'fa-circle-check text-green';
    if (type === 'info') icon = 'fa-satellite-dish text-cyan';

    toast.innerHTML = `
      <i class="fas ${icon}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, duration);
  }

  // --------------------------------------------------------------------------
  // 10. Contact Form Dispatcher
  // --------------------------------------------------------------------------
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('btn-submit-form');
    if (!form || !submitBtn) return;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    const nameErr = document.getElementById('name-error');
    const emailErr = document.getElementById('email-error');
    const subjectErr = document.getElementById('subject-error');
    const messageErr = document.getElementById('message-error');

    function validateEmail(em) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
    }

    function clearErrors() {
      [nameInput, emailInput, subjectInput, messageInput].forEach((inp) => {
        if (inp) inp.classList.remove('invalid');
      });
      [nameErr, emailErr, subjectErr, messageErr].forEach((err) => {
        if (err) err.textContent = '';
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      let valid = true;

      if (!nameInput.value.trim()) {
        nameInput.classList.add('invalid');
        if (nameErr) nameErr.textContent = '! Please specify sender name';
        valid = false;
      }

      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        emailInput.classList.add('invalid');
        if (emailErr) emailErr.textContent = '! Valid email address required for return route';
        valid = false;
      }

      if (!subjectInput.value.trim()) {
        subjectInput.classList.add('invalid');
        if (subjectErr) subjectErr.textContent = '! Subject header required';
        valid = false;
      }

      if (!messageInput.value.trim()) {
        messageInput.classList.add('invalid');
        if (messageErr) messageErr.textContent = '! Payload message cannot be empty';
        valid = false;
      }

      if (!valid) {
        showToast('FORM_ERROR: Please correct highlighted fields', 'error');
        playCyberBeep(220, 0.1);
        return;
      }

      const origHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="text-green"><i class="fas fa-spinner fa-spin"></i> TRANSMITTING_PAYLOAD...</span>';
      playCyberBeep(880, 0.08);

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origHtml;

        const sender = nameInput.value.trim();
        showToast(`TRANSMISSION_ACK: Message received from ${sender}. Sameer will respond shortly.`, 'success', 6000);
        form.reset();
        playCyberBeep(980, 0.1);
      }, 1100);
    });
  }

  // --------------------------------------------------------------------------
  // 11. Glass Card Specular Corner Sparkles (Static Glass)
  // --------------------------------------------------------------------------
  function initGlassSparkles() {
    const cardSelectors = [
      '.hud-card',
      '.service-card',
      '.project-cyber-card',
      '.cyber-panel',
      '.disc-box',
      '.int-cell',
      '.cyber-terminal-card',
      '.direct-comm-card',
      '.contact-cyber-form-panel',
      '.affiliations-hud'
    ];

    const cards = document.querySelectorAll(cardSelectors.join(','));

    cards.forEach((card) => {
      // Clear any inline transform styles so CSS handles pure scale zoom
      card.style.transform = '';
      card.style.perspective = '';
      card.style.transition = '';

      // Inject specular corner star glints matching reference
      if (!card.querySelector('.glass-glint.top-left')) {
        const glintTL = document.createElement('div');
        glintTL.className = 'glass-glint top-left';
        card.appendChild(glintTL);
      }
      if (!card.querySelector('.glass-glint.top-right')) {
        const glintTR = document.createElement('div');
        glintTR.className = 'glass-glint top-right';
        card.appendChild(glintTR);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 12. Subtle 3D Genomics DNA Helix Watermark Generator (Low Visibility)
  // --------------------------------------------------------------------------
  function initDnaWatermarks() {
    const cardSelectors = [
      '.hud-card',
      '.affiliations-hud',
      '.cyber-terminal-card',
      '.cyber-stat-card',
      '.research-card',
      '.pub-card',
      '.project-card',
      '.stack-category-card',
      '.timeline-node',
      '.cyber-contact-card',
      '.direct-comm-card',
      '.contact-cyber-form-panel',
      '.service-card',
      '.project-cyber-card',
      '.cyber-panel',
      '.disc-box',
      '.int-cell'
    ];

    const cards = document.querySelectorAll(cardSelectors.join(','));

    // Clean up any old water droplet layers
    document.querySelectorAll('.water-droplets-layer, .water-drop').forEach((el) => el.remove());

    const dnaSvgContent = `
      <svg class="card-dna-watermark" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M25 10 Q50 35 75 60 Q50 85 25 110 Q50 135 75 160 Q50 185 25 195" stroke="#00f3ff" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M75 10 Q50 35 25 60 Q50 85 75 110 Q50 135 25 160 Q50 185 75 195" stroke="#00ff41" stroke-width="1.8" stroke-linecap="round"/>
        <line x1="28" y1="20" x2="72" y2="20" stroke="#00f3ff" stroke-width="1" stroke-dasharray="2 3"/>
        <line x1="42" y1="40" x2="58" y2="40" stroke="#a855f7" stroke-width="1.2"/>
        <line x1="28" y1="60" x2="72" y2="60" stroke="#00ff41" stroke-width="1" stroke-dasharray="2 3"/>
        <line x1="42" y1="80" x2="58" y2="80" stroke="#a855f7" stroke-width="1.2"/>
        <line x1="28" y1="100" x2="72" y2="100" stroke="#00f3ff" stroke-width="1" stroke-dasharray="2 3"/>
        <line x1="42" y1="120" x2="58" y2="120" stroke="#a855f7" stroke-width="1.2"/>
        <line x1="28" y1="140" x2="72" y2="140" stroke="#00ff41" stroke-width="1" stroke-dasharray="2 3"/>
        <line x1="42" y1="160" x2="58" y2="160" stroke="#a855f7" stroke-width="1.2"/>
        <line x1="28" y1="180" x2="72" y2="180" stroke="#00f3ff" stroke-width="1" stroke-dasharray="2 3"/>
        <circle cx="25" cy="10" r="2.2" fill="#00f3ff"/>
        <circle cx="75" cy="10" r="2.2" fill="#00ff41"/>
        <circle cx="75" cy="60" r="2.2" fill="#00f3ff"/>
        <circle cx="25" cy="60" r="2.2" fill="#00ff41"/>
        <circle cx="25" cy="110" r="2.2" fill="#00f3ff"/>
        <circle cx="75" cy="110" r="2.2" fill="#00ff41"/>
        <circle cx="75" cy="160" r="2.2" fill="#00f3ff"/>
        <circle cx="25" cy="160" r="2.2" fill="#00ff41"/>
      </svg>
    `;

    cards.forEach((card) => {
      const currentPos = window.getComputedStyle(card).position;
      if (currentPos === 'static') {
        card.style.position = 'relative';
      }

      if (!card.querySelector('.card-dna-watermark')) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = dnaSvgContent.trim();
        const svgEl = tempDiv.firstChild;
        card.appendChild(svgEl);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 13. Initializer Bootstrap
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initMatrixRain();
    initHudControls();
    initLiveClock();
    initHeroTypewriter();
    initTerminalListeners();
    initNavigation();
    initCounters();
    initContactForm();
    initGlassSparkles();
    initDnaWatermarks();
  });

  if (document.readyState !== 'loading') {
    initMatrixRain();
    initHudControls();
    initLiveClock();
    initHeroTypewriter();
    initTerminalListeners();
    initNavigation();
    initCounters();
    initContactForm();
    initGlassSparkles();
    initDnaWatermarks();
  }
})();
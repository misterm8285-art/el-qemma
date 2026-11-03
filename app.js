(function () {
  const LETTERS = ["أ", "ب", "ج", "د"];
  const PROFILE_KEY = "qemma_profile_v3";
  const PASS_MARK = 50;
  const SYSTEMS = {
    thanaweya: { id: "thanaweya", label: "ثانوية عامة (عام)" },
    baccalaureate: { id: "baccalaureate", label: "بكالوريا مصرية" }
  };
  const PATHS = {
    medicine: { id: "medicine", label: "طب وعلوم الحياة", icon: "🧬" },
    engineering: { id: "engineering", label: "هندسة وعلوم الحاسب", icon: "💻" },
    business: { id: "business", label: "الأعمال", icon: "💼" },
    arts: { id: "arts", label: "الآداب والفنون", icon: "📜" }
  };
  const SUB_KEY = "qemma_sub_v2";

  let profile = loadProfile();
  let subscribed = loadSub();
  let serverState = { attempts: [], customQuestions: [] };
  let activeExam = null;
  let selectedSubjectId = null;
  let payStage = null;
  let currentSummary = null;
  const DB_KEY = "qemma_db_v1";

  function rel(url) {
    if (!url) return url;
    if (/^https?:\/\//i.test(url)) return url;
    return String(url).replace(/^\//, "");
  }
  function loadLocalDb() {
    try {
      return JSON.parse(localStorage.getItem(DB_KEY) || '{"attempts":[],"customQuestions":[]}');
    } catch (e) {
      return { attempts: [], customQuestions: [] };
    }
  }
  function saveLocalDb(db) {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  }
  async function apiGetState() {
    try {
      const res = await fetch(rel("api/state"));
      if (res.ok) return await res.json();
    } catch (e) {}
    return loadLocalDb();
  }
  async function apiPost(path, payload) {
    try {
      const res = await fetch(rel(path), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    const db = loadLocalDb();
    if (path.indexOf("attempts") !== -1) {
      db.attempts = db.attempts || [];
      db.attempts.unshift({
        id: "att-" + Date.now(),
        studentName: payload.studentName,
        examId: payload.examId,
        examTitle: payload.examTitle,
        score: payload.score,
        total: payload.total,
        percent: payload.percent,
        durationSec: payload.durationSec,
        date: new Date().toLocaleString("ar-EG")
      });
      db.attempts = db.attempts.slice(0, 50);
      saveLocalDb(db);
      return { ok: true };
    }
    if (path.indexOf("questions") !== -1) {
      db.customQuestions = db.customQuestions || [];
      db.customQuestions.push({
        id: "cq-" + Date.now(),
        examId: payload.examId,
        text: payload.text,
        options: payload.options,
        correct: payload.correct || 0,
        explanation: payload.explanation
      });
      saveLocalDb(db);
      return { ok: true };
    }
    if (path.indexOf("subscribe") !== -1) {
      return { ok: true, plan: payload.plan };
    }
    return { ok: false };
  }

  function loadProfile() {
    try {
      return JSON.parse(localStorage.getItem(PROFILE_KEY) || "null");
    } catch (e) {
      return null;
    }
  }
  function saveProfile() {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }
  function loadSub() {
    try {
      return JSON.parse(localStorage.getItem(SUB_KEY) || "null");
    } catch (e) {
      return null;
    }
  }
  function saveSub() {
    if (subscribed) localStorage.setItem(SUB_KEY, JSON.stringify(subscribed));
    else localStorage.removeItem(SUB_KEY);
  }
  function isSubscribed() {
    if (!subscribed || !profile) return false;
    if (profile.stage === "g3") return subscribed.plan === "g3" || subscribed.plan === "all";
    return subscribed.plan === "g12" || subscribed.plan === "g1" || subscribed.plan === "g2" || subscribed.plan === "all";
  }

  function uniqById(arr) {
    const map = new Map();
    (arr || []).forEach(item => {
      if (item && item.id && !map.has(item.id)) map.set(item.id, item);
    });
    return [...map.values()];
  }
  function allSummaries() {
    return uniqById([
      ...((window.QEMMA_BANK && window.QEMMA_BANK.summaries) || []),
      ...(window.QEMMA_DATA.summaries || []),
      ...((window.QEMMA_EXTRA && window.QEMMA_EXTRA.summaries) || [])
    ]);
  }
  function allExams() {
    return uniqById([
      ...((window.QEMMA_BANK && window.QEMMA_BANK.exams) || []),
      ...(window.QEMMA_DATA.exams || []),
      ...((window.QEMMA_EXTRA && window.QEMMA_EXTRA.exams) || [])
    ]);
  }
  function getSummary(id) {
    return allSummaries().find(s => s.id === id);
  }
  function getExam(id) {
    return allExams().find(e => e.id === id);
  }
  function allSubjects() {
    if (window.QEMMA_BANK && window.QEMMA_BANK.subjects && window.QEMMA_BANK.subjects.length) {
      return window.QEMMA_BANK.subjects;
    }
    return window.QEMMA_SUBJECTS || [];
  }
  function subjectsForProfile() {
    if (!profile) return [];
    return allSubjects().filter(s => {
      if (s.stage !== profile.stage) return false;
      const sys = s.system || "thanaweya";
      if (profile.system === "baccalaureate") {
        if (sys !== "baccalaureate" && sys !== "both") return false;
        if (s.paths && s.paths.length && profile.path && s.paths.indexOf(profile.path) === -1) return false;
        return true;
      }
      if (sys === "baccalaureate") return false;
      if (profile.stage === "g1") return true;
      return (s.tracks || []).indexOf(profile.track) !== -1;
    });
  }
  function getMergedQuestions(exam) {
    const extras = (serverState.customQuestions || []).filter(q => q.examId === exam.id);
    return [...exam.questions, ...extras];
  }
  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function lessonReady(lesson) {
    const s = getSummary(lesson.summaryId);
    return s && !s.comingSoon;
  }

  function stageLabel() {
    return window.QEMMA_CATALOG.stages[profile.stage].label;
  }
  function trackLabel() {
    if (profile.system === "baccalaureate" && profile.path && PATHS[profile.path]) {
      return "بكالوريا • " + PATHS[profile.path].label;
    }
    if (profile.system === "thanaweya") {
      const t = window.QEMMA_CATALOG.tracks[profile.track];
      return "عام" + (t ? " • " + t.label : "");
    }
    const t = window.QEMMA_CATALOG.tracks[profile.track];
    return t ? t.label : "";
  }
  function priceFor(stage) {
    return window.QEMMA_CATALOG.stages[stage].price;
  }

  window.openGate = function (force) {
    const gate = document.getElementById("gate");
    if (!force && profileReady(profile)) {
      gate.style.display = "none";
      bootApp();
      return;
    }
    gate.style.display = "flex";
    document.getElementById("app-header").style.display = "none";
    document.getElementById("app-main").style.display = "none";
    document.getElementById("app-footer").style.display = "none";
    document.getElementById("gate-title").textContent = "اختار مرحلتك الدراسية";
    document.getElementById("gate-sub").textContent = "أولى وتانية: عام أو بكالوريا — تالتة: شعبة الثانوية";
    hideGatePanels();
    const stages = document.getElementById("gate-stages");
    stages.style.display = "grid";
    stages.innerHTML = Object.values(window.QEMMA_CATALOG.stages)
      .map(
        st => `
      <button class="gate-card" onclick="pickStage('${st.id}')">
        <strong>${st.label}</strong>
        <span>طباعة الشروحات باشتراك ${st.price} جنيه / السنة</span>
      </button>`
      )
      .join("");
    const gn = document.getElementById("gate-name");
    if (gn && profile && profile.studentName) gn.value = profile.studentName;
  };

  function hideGatePanels() {
    ["gate-stages", "gate-system", "gate-paths", "gate-tracks"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = "none";
    });
  }
  function profileReady(p) {
    if (!p || !p.stage || !p.system || !p.studentName) return false;
    if (p.system === "baccalaureate") return !!p.path;
    if (p.stage === "g1") return true;
    return !!p.track;
  }
  function readGateName() {
    const el = document.getElementById("gate-name");
    const n = ((el && el.value) || (profile && profile.studentName) || "").trim();
    return n;
  }

  function finishGate() {
    const n = readGateName();
    if (!n) {
      alert("اكتب اسمك الثلاثي فوق قبل ما تدخل.");
      const el = document.getElementById("gate-name");
      if (el) el.focus();
      return;
    }
    profile.studentName = n;
    if (!profile.track) profile.track = "science";
    saveProfile();
    logVisit();
    document.getElementById("gate").style.display = "none";
    selectedSubjectId = null;
    bootApp();
  }

  const VISIT_KEY = "qemma_visit_log_v1";
  const VISIT_TOPIC = "elqemma-mohab-visitors-k7p2";
  const FOUNDER_PIN = "MOHAB2027";
  let founderOk = sessionStorage.getItem("qemma_founder") === "1";

  function logVisit() {
    if (sessionStorage.getItem("qemma_visit_sent") === "1") return;
    const rec = {
      name: (profile && profile.studentName) || "بدون اسم",
      stage: (profile && profile.stage) || "",
      system: (profile && profile.system) || "",
      path: (profile && profile.path) || "",
      track: (profile && profile.track) || "",
      at: new Date().toLocaleString("ar-EG"),
      screen: (window.screen && screen.width + "×" + screen.height) || "",
    };
    try {
      const arr = JSON.parse(localStorage.getItem(VISIT_KEY) || "[]");
      arr.unshift(rec);
      localStorage.setItem(VISIT_KEY, JSON.stringify(arr.slice(0, 300)));
    } catch (e) {}
    sessionStorage.setItem("qemma_visit_sent", "1");
    const line =
      rec.name +
      " | " +
      rec.stage +
      " | " +
      rec.system +
      " | " +
      (rec.path || rec.track || "-") +
      " | " +
      rec.at;
    fetch("https://ntfy.sh/" + VISIT_TOPIC, { method: "POST", body: line }).catch(function () {});
    fetch("https://api.ipify.org?format=json")
      .then(function (r) {
        return r.json();
      })
      .then(function (d) {
        rec.ip = d.ip;
        const arr2 = JSON.parse(localStorage.getItem(VISIT_KEY) || "[]");
        if (arr2[0] && arr2[0].at === rec.at) arr2[0].ip = d.ip;
        localStorage.setItem(VISIT_KEY, JSON.stringify(arr2));
        fetch("https://ntfy.sh/" + VISIT_TOPIC, {
          method: "POST",
          body: line + " | IP " + d.ip,
        }).catch(function () {});
      })
      .catch(function () {});
  }

  window.unlockVisits = function () {
    const pin = (document.getElementById("founder-pin").value || "").trim();
    const msg = document.getElementById("visits-lock-msg");
    if (pin !== FOUNDER_PIN) {
      if (msg) {
        msg.style.color = "#f87171";
        msg.textContent = "الكود غلط.";
      }
      return;
    }
    founderOk = true;
    sessionStorage.setItem("qemma_founder", "1");
    document.getElementById("visits-lock").style.display = "none";
    document.getElementById("visits-box").style.display = "block";
    renderVisits();
  };

  window.renderVisits = function () {
    const box = document.getElementById("visits-list");
    if (!box) return;
    let arr = [];
    try {
      arr = JSON.parse(localStorage.getItem(VISIT_KEY) || "[]");
    } catch (e) {}
    if (!arr.length) {
      box.innerHTML =
        "<p>لسه مفيش زيارات على الجهاز ده. أي حد يدخل من لينك تاني هيظهر عندك في تطبيق ntfy على الموبايل.</p>";
      return;
    }
    box.innerHTML = arr
      .map(function (v) {
        return (
          '<div class="visit-row"><strong>' +
          escapeHtml(v.name) +
          "</strong><div style=\"font-size:13px;color:#94a3b8\">" +
          escapeHtml(v.stage + " • " + v.system + " • " + (v.path || v.track || "")) +
          (v.ip ? " • " + v.ip : "") +
          "<br>" +
          escapeHtml(v.at) +
          "</div></div>"
        );
      })
      .join("");
  };

  window.pickStage = function (stageId) {
    const n = readGateName();
    if (!n) {
      alert("اكتب اسمك الثلاثي أولاً.");
      const el = document.getElementById("gate-name");
      if (el) el.focus();
      return;
    }
    profile = profile || {};
    profile.studentName = n;
    profile.stage = stageId;
    profile.system = null;
    profile.path = null;
    profile.track = null;
    hideGatePanels();
    document.getElementById("gate-title").textContent = "اختار النظام الدراسي";
    document.getElementById("gate-sub").textContent = window.QEMMA_CATALOG.stages[stageId].label + " — عام ولا بكالوريا؟";
    const box = document.getElementById("gate-system");
    box.style.display = "grid";
    box.innerHTML = `
      <button class="gate-card" onclick="pickSystem('thanaweya')">
        <strong>ثانوية عامة (عام)</strong>
        <span>علمي علوم / علمي رياضة / أدبي</span>
      </button>
      <button class="gate-card" onclick="pickSystem('baccalaureate')">
        <strong>بكالوريا مصرية</strong>
        <span>طب • هندسة وحاسبات • أعمال • آداب</span>
      </button>`;
  };

  window.pickSystem = function (sys) {
    profile.system = sys;
    hideGatePanels();
    if (sys === "baccalaureate") {
      document.getElementById("gate-title").textContent = "اختار مسارك";
      document.getElementById("gate-sub").textContent = "البكالوريا المصرية 2027";
      const box = document.getElementById("gate-paths");
      box.style.display = "grid";
      box.innerHTML = Object.values(PATHS)
        .map(
          p => `
        <button class="gate-card" onclick="pickPath('${p.id}')">
          <strong>${p.icon} ${p.label}</strong>
          <span>منهج المسار حسب تعديلات الوزارة</span>
        </button>`
        )
        .join("");
      return;
    }
    if (profile.stage === "g1") {
      finishGate();
      return;
    }
    showTracks(profile.stage === "g3" ? "اختار شعبتك — ثانوية عامة" : "اختار شعبتك (ثانوية عامة)");
  };

  window.pickPath = function (pathId) {
    profile.path = pathId;
    finishGate();
  };

  function showTracks(title) {
    document.getElementById("gate-title").textContent = title;
    document.getElementById("gate-sub").textContent = window.QEMMA_CATALOG.stages[profile.stage].label;
    const tracks = document.getElementById("gate-tracks");
    tracks.style.display = "grid";
    tracks.innerHTML = Object.values(window.QEMMA_CATALOG.tracks)
      .map(
        t => `
      <button class="gate-card" onclick="pickTrack('${t.id}')">
        <strong>${t.icon} ${t.label}</strong>
        <span>هتشوف مواد ${t.label} بس</span>
      </button>`
      )
      .join("");
  }

  window.pickTrack = function (trackId) {
    profile.track = trackId;
    finishGate();
  };

  function bootApp() {
    document.getElementById("app-header").style.display = "block";
    document.getElementById("app-main").style.display = "block";
    document.getElementById("app-footer").style.display = "block";
    document.getElementById("header-context").textContent = stageLabel() + " • " + trackLabel();
    document.getElementById("hero-badge").textContent = stageLabel() + " — " + trackLabel();
    refreshSubChip();
    applyPrintLock();
    fetchState();
    renderHome();
    logVisit();
  }

  function refreshSubChip() {
    const chip = document.getElementById("sub-chip");
    if (isSubscribed()) {
      chip.textContent = "مشترك ✓";
      chip.classList.add("on");
    } else {
      chip.textContent = "غير مشترك";
      chip.classList.remove("on");
    }
  }

  function applyPrintLock() {
    document.body.classList.toggle("no-print", !isSubscribed());
    const bar = document.getElementById("readonly-bar");
    if (bar) bar.style.display = isSubscribed() ? "none" : "block";
  }

  async function fetchState() {
    try {
      serverState = await apiGetState();
    } catch (e) {
      serverState = loadLocalDb();
    }
    updateStats();
    renderExamsList();
    renderAttempts();
    populateFounderSelect();
  }

  function updateStats() {
    const subs = subjectsForProfile();
    let ready = 0;
    let exams = 0;
    subs.forEach(sub => {
      sub.units.forEach(u => {
        u.lessons.forEach(l => {
          if (lessonReady(l)) ready++;
          if (l.examId && getExam(l.examId)) exams++;
        });
        if (u.unitExamId && getExam(u.unitExamId)) exams++;
      });
    });
    document.getElementById("stat-subjects").textContent = subs.length;
    document.getElementById("stat-ready").textContent = ready;
    document.getElementById("stat-exams").textContent = exams;
    document.getElementById("stat-attempts").textContent = (serverState.attempts || []).length;
  }

  window.switchTab = function (tab) {
    if (tab === "founder" && !founderOk) {
      /* الزيارات تتفتح بالكود داخل الصفحة — الاستوديو ظاهر، السجل مقفول */
    }
    ["home", "exams", "leaderboard", "plans", "founder"].forEach(t => {
      const el = document.getElementById("tab-" + t);
      if (el) el.style.display = t === tab ? "block" : "none";
    });
    document.querySelectorAll(".nav-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tab);
    });
    if (tab === "exams" && !activeExam) {
      document.getElementById("exams-list-view").style.display = "block";
      document.getElementById("exam-active-view").style.display = "none";
      document.getElementById("exam-result-view").style.display = "none";
      renderExamsList();
    }
    if (tab === "leaderboard") renderAttempts();
    if (tab === "home") renderHome();
    if (tab === "founder" && founderOk) renderVisits();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.goHome = function () {
    selectedSubjectId = null;
    switchTab("home");
  };

  function renderHome() {
    const view = document.getElementById("home-view");
    const crumb = document.getElementById("crumb");
    const subs = subjectsForProfile();
    if (!selectedSubjectId) {
      crumb.innerHTML = "";
      view.innerHTML =
        `<div class="section-title" style="margin-bottom:14px;">مواد ${escapeHtml(trackLabel())}</div>` +
        `<div class="cards-grid">` +
        subs
          .map(sub => {
            const ready = sub.units.reduce(
              (n, u) => n + u.lessons.filter(lessonReady).length,
              0
            );
            return `
            <div class="item-card" style="border-top:3px solid ${sub.color};">
              <div>
                <div class="card-top"><span class="tag" style="color:${sub.color};background:${sub.color}22;">${sub.units.length} أبواب</span>
                <span class="card-meta">${ready} درس مشروح</span></div>
                <h3>${escapeHtml(sub.name)}</h3>
                <p>كل درس مشروح بالتفصيل + امتحان على الشرح + امتحان شامل على الباب.</p>
              </div>
              <button class="btn-primary" style="width:100%;" onclick="openSubject('${sub.id}')">افتح المادة</button>
            </div>`;
          })
          .join("") +
        `</div>`;
      return;
    }
    const sub = subs.find(s => s.id === selectedSubjectId);
    if (!sub) {
      selectedSubjectId = null;
      renderHome();
      return;
    }
    crumb.innerHTML = `<button class="crumb-btn" onclick="goHome()">المواد</button> / <b>${escapeHtml(sub.name)}</b>`;
    view.innerHTML = sub.units
      .map(unit => {
        const lessonsHtml = unit.lessons
          .map(lesson => {
            const s = getSummary(lesson.summaryId);
            const ready = lessonReady(lesson);
            const exam = lesson.examId ? getExam(lesson.examId) : null;
            const label = lesson.title || (s && s.title) || "الدرس";
            return `
            <div class="lesson-row">
              <div>
                <strong>${escapeHtml(label)}</strong>
                <div class="card-meta">${ready ? "شرح كامل + " + (exam ? exam.questions.length + " سؤال" : "امتحان") : "قريباً"}</div>
              </div>
              <div class="card-actions">
                ${
                  ready
                    ? `<button class="btn-sm btn-open" onclick="openSummary('${lesson.summaryId}')">شرح الدرس</button>`
                    : `<button class="btn-sm" disabled style="opacity:.45;">قريباً</button>`
                }
                ${
                  exam
                    ? `<button class="btn-sm btn-exam" onclick="startExamById('${exam.id}')">امتحان الدرس</button>`
                    : `<button class="btn-sm" disabled style="opacity:.45;">امتحان قريباً</button>`
                }
                ${
                  ready && s && s.pdfUrl
                    ? `<button class="btn-sm btn-pdf" onclick="tryPdf('${s.pdfUrl}')">📥 PDF</button>`
                    : ""
                }
              </div>
            </div>`;
          })
          .join("");
        const unitExam = unit.unitExamId ? getExam(unit.unitExamId) : null;
        return `
          <div class="unit-card">
            <div class="unit-head">
              <h3>${escapeHtml(unit.title)}</h3>
              ${
                unitExam
                  ? `<button class="btn-primary" onclick="startExamById('${unitExam.id}')">امتحان شامل على الباب</button>`
                  : `<span class="card-meta">الشامل على الباب قريباً</span>`
              }
            </div>
            ${lessonsHtml}
          </div>`;
      })
      .join("");
  }

  window.openSubject = function (id) {
    selectedSubjectId = id;
    renderHome();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.openSummary = function (id) {
    const s = getSummary(id);
    if (!s || s.comingSoon) return;
    currentSummary = s;
    document.getElementById("modal-title").textContent = s.title;
    const body = document.getElementById("modal-body");
    const newTab = document.getElementById("modal-newtab");
    if (s.htmlUrl) {
      const src = rel(s.htmlUrl);
      body.innerHTML = `<iframe src="${src}"></iframe>`;
      newTab.href = src;
      newTab.style.display = "inline-flex";
    } else {
      body.innerHTML = s.inlineHtml || "";
      newTab.style.display = "none";
    }
    applyPrintLock();
    document.getElementById("summary-modal").classList.add("open");
  };

  window.closeModal = function () {
    document.getElementById("summary-modal").classList.remove("open");
    document.getElementById("modal-body").innerHTML = "";
    currentSummary = null;
  };

  window.tryPrint = function () {
    if (!isSubscribed()) {
      alert("الطباعة للمشتركين فقط. تالتة ثانوي 500 جنيه / السنة — أولى وتانية 1000 جنيه / السنة.");
      switchTab("plans");
      closeModal();
      return;
    }
    window.print();
  };

  window.tryPdf = function (url) {
    if (!isSubscribed()) {
      alert("تحميل PDF للمشتركين فقط.");
      switchTab("plans");
      return;
    }
    window.open(rel(url), "_blank");
  };

  window.copyPayNumber = function () {
    const n = "01556766145";
    const msg = document.getElementById("pay-copy-msg");
    const done = function () {
      if (msg) msg.textContent = "اتنسخ: 01556766145 — حوّل فودافون كاش أو إنستاباي";
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(n).then(done).catch(function () {
        window.prompt("انسخ الرقم:", n);
        done();
      });
    } else {
      window.prompt("انسخ الرقم:", n);
      done();
    }
  };

  window.startSubscribe = function (stage) {
    payStage = stage === "g3" ? "g3" : "g12";
    document.getElementById("pay-box").style.display = "block";
    document.getElementById("pay-title").textContent =
      payStage === "g3" ? "اشتراك تالتة ثانوي — 500 جنيه" : "اشتراك أولى/تانية — 1000 جنيه";
    document.getElementById("pay-box").scrollIntoView({ behavior: "smooth" });
  };

  window.activateCode = async function () {
    const code = (document.getElementById("pay-code").value || "").trim().toUpperCase();
    const msg = document.getElementById("pay-msg");
    if (code !== "QEMMA2027") {
      msg.style.color = "#f87171";
      msg.textContent = "الكود غلط. للتجربة استخدم QEMMA2027 — بعد الإطلاق الكود بيوصل بعد التحويل.";
      return;
    }
    subscribed = {
      plan: payStage || (profile && profile.stage === "g3" ? "g3" : "g12"),
      at: Date.now()
    };
    saveSub();
    applyPrintLock();
    refreshSubChip();
    msg.style.color = "#34d399";
    msg.textContent = "تم تفعيل الاشتراك على الجهاز ده. الطباعة و PDF مفتوحين.";
    try {
      await apiPost("api/subscribe", { plan: subscribed.plan, code });
    } catch (e) {}
  };

  function examsForProfile() {
    const ids = new Set();
    const list = [];
    subjectsForProfile().forEach(sub => {
      sub.units.forEach(u => {
        u.lessons.forEach(l => {
          if (l.examId && getExam(l.examId) && !ids.has(l.examId)) {
            ids.add(l.examId);
            list.push({ exam: getExam(l.examId), kind: "امتحان على الملخص", unit: u.title, subject: sub.name });
          }
        });
        if (u.unitExamId && getExam(u.unitExamId) && !ids.has(u.unitExamId)) {
          ids.add(u.unitExamId);
          list.push({ exam: getExam(u.unitExamId), kind: "شامل على الباب", unit: u.title, subject: sub.name });
        } else if (u.unitExamId && ids.has(u.unitExamId)) {
          const found = list.find(x => x.exam.id === u.unitExamId);
          if (found) found.kind = "امتحان الملخص + شامل الباب";
        }
      });
    });
    return list;
  }

  function renderExamsList() {
    const grid = document.getElementById("exams-grid");
    if (!grid) return;
    const list = examsForProfile();
    if (!list.length) {
      grid.innerHTML = `<p style="color:var(--text-muted);">لسه مفيش امتحانات جاهزة للشعبة دي. الأبواب متقفّلة وهيظهر الامتحان مع الملخص.</p>`;
      return;
    }
    grid.innerHTML = list
      .map(({ exam, kind, unit, subject }) => {
        const qCount = getMergedQuestions(exam).length;
        return `
        <div class="item-card">
          <div>
            <div class="card-top">
              <span class="tag">${escapeHtml(kind)}</span>
              <span class="card-meta">⏱ ${exam.durationMin} د • ${qCount} أسئلة</span>
            </div>
            <h3>${escapeHtml(exam.title)}</h3>
            <p>${escapeHtml(subject)} — ${escapeHtml(unit)}</p>
          </div>
          <button class="btn-primary" style="width:100%;" onclick="startExamById('${exam.id}')">ابدأ الامتحان</button>
        </div>`;
      })
      .join("");
  }

  function shuffleOptions(question) {
    if (!question || question.type === "essay" || !question.options || !question.options.length) {
      return Object.assign({}, question, { type: question && question.type === "essay" ? "essay" : "mcq" });
    }
    const indexed = question.options.map((opt, idx) => ({
      text: opt,
      isCorrect: idx === question.correct
    }));
    for (let i = indexed.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
    }
    return {
      text: question.text,
      options: indexed.map(x => x.text),
      correct: indexed.findIndex(x => x.isCorrect),
      explanation: question.explanation
    };
  }

  window.startExamById = function (examId) {
    const rawExam = getExam(examId);
    if (!rawExam) return;
    window.switchTab("exams");
    const questions = getMergedQuestions(rawExam).map(q =>
      q && q.type === "essay" ? Object.assign({}, q, { type: "essay", options: [] }) : shuffleOptions(q)
    );
    if (activeExam && activeExam.timerId) clearInterval(activeExam.timerId);
    activeExam = {
      id: rawExam.id,
      title: rawExam.title,
      questions,
      answers: new Array(questions.length).fill(null),
      currentIndex: 0,
      remainingSec: rawExam.durationMin * 60,
      totalSec: rawExam.durationMin * 60,
      studentName: (profile && profile.studentName) || localStorage.getItem("qemma_student") || "مهاب محمد",
      timerId: null
    };
    document.getElementById("exams-list-view").style.display = "none";
    document.getElementById("exam-result-view").style.display = "none";
    document.getElementById("exam-active-view").style.display = "block";
    renderActiveExam();
    activeExam.timerId = setInterval(() => {
      if (!activeExam) return;
      activeExam.remainingSec--;
      const timerEl = document.getElementById("live-timer");
      if (timerEl) {
        const m = String(Math.floor(activeExam.remainingSec / 60)).padStart(2, "0");
        const s = String(activeExam.remainingSec % 60).padStart(2, "0");
        timerEl.textContent = `${m}:${s}`;
      }
      if (activeExam.remainingSec <= 0) submitExam(true);
    }, 1000);
  };

  function renderActiveExam() {
    if (!activeExam) return;
    const q = activeExam.questions[activeExam.currentIndex];
    const m = String(Math.floor(activeExam.remainingSec / 60)).padStart(2, "0");
    const s = String(activeExam.remainingSec % 60).padStart(2, "0");
    const answeredCount = activeExam.answers.filter(a => a !== null && a !== "").length;
    document.getElementById("exam-active-view").innerHTML = `
      <div class="exam-shell">
        <div class="exam-topbar">
          <div>
            <h3 style="color:#fbbf24;font-size:18px;">${escapeHtml(activeExam.title)}</h3>
            <div style="font-size:13px;color:var(--text-muted);">تمت الإجابة على <b>${answeredCount}</b> من <b>${activeExam.questions.length}</b></div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <input id="student-name-input" class="form-control" style="width:170px;padding:6px 10px;" value="${escapeHtml(activeExam.studentName)}" oninput="updateStudentName(this.value)" />
            <div class="timer-pill" id="live-timer">${m}:${s}</div>
            <button class="btn-secondary" style="padding:6px 12px;font-size:13px;" onclick="cancelExam()">خروج</button>
          </div>
        </div>
        <div class="anti-rush-banner">فرامل التسرع: اقرأ السؤال لآخر كلمة واتأكد إن الحرف اللي دوست عليه هو ناتج ورقتك.</div>
        <div class="q-palette">
          ${activeExam.questions
            .map(
              (_, idx) =>
                `<button class="q-dot ${idx === activeExam.currentIndex ? "current" : ""} ${
                  activeExam.answers[idx] !== null && activeExam.answers[idx] !== "" ? "answered" : ""
                }" onclick="jumpQuestion(${idx})">${idx + 1}</button>`
            )
            .join("")}
        </div>
        <div class="q-box">
          <div style="color:var(--gold);font-weight:800;font-size:14px;margin-bottom:6px;">السؤال (${activeExam.currentIndex + 1}) من (${activeExam.questions.length})</div>
          <div class="q-text">${escapeHtml(q.text)}</div>
          ${
            q.type === "essay"
              ? `<div style="color:#fbbf24;font-size:13px;font-weight:800;margin-bottom:8px;">سؤال مقالي — اكتب بإيدك</div>
                 <textarea class="form-control" rows="5" placeholder="اكتب الإجابة هنا..." oninput="saveEssay(this.value)">${escapeHtml(
                   activeExam.answers[activeExam.currentIndex] || ""
                 )}</textarea>`
              : `<div class="options-list">
            ${(q.options || [])
              .map(
                (opt, oIdx) => `
              <button class="opt-btn ${activeExam.answers[activeExam.currentIndex] === oIdx ? "selected" : ""}" onclick="selectOption(${oIdx})">
                <span class="opt-letter">${LETTERS[oIdx] || oIdx + 1}</span>
                <span>${escapeHtml(opt)}</span>
              </button>`
              )
              .join("")}
          </div>`
          }
        </div>
        <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;">
          <button class="btn-secondary" ${activeExam.currentIndex === 0 ? "disabled style='opacity:0.4'" : ""} onclick="jumpQuestion(${activeExam.currentIndex - 1})">→ السابق</button>
          ${
            activeExam.currentIndex < activeExam.questions.length - 1
              ? `<button class="btn-primary" onclick="jumpQuestion(${activeExam.currentIndex + 1})">التالي ←</button>`
              : `<button class="btn-primary" style="background:linear-gradient(135deg,#10b981,#059669);color:#fff;" onclick="submitExam(false)">تسليم الامتحان</button>`
          }
        </div>
      </div>`;
  }

  window.updateStudentName = function (val) {
    if (activeExam) {
      activeExam.studentName = val;
      if (profile) {
        profile.studentName = val;
        saveProfile();
      }
      localStorage.setItem("qemma_student", val);
    }
  };
  window.selectOption = function (oIdx) {
    if (!activeExam) return;
    activeExam.answers[activeExam.currentIndex] = oIdx;
    renderActiveExam();
  };
  window.saveEssay = function (val) {
    if (!activeExam) return;
    activeExam.answers[activeExam.currentIndex] = val;
  };

  function gradeQuestion(q, ans) {
    if (q.type === "essay") {
      const text = String(ans || "");
      if (text.trim().length < 12) return 0;
      const keys = q.keywords || [];
      if (!keys.length) return 1;
      const hit = keys.filter(k => k && text.indexOf(k) !== -1).length;
      return hit > 0 ? 1 : 0.5;
    }
    return ans === q.correct ? 1 : 0;
  }
  window.jumpQuestion = function (idx) {
    if (!activeExam || idx < 0 || idx >= activeExam.questions.length) return;
    activeExam.currentIndex = idx;
    renderActiveExam();
  };
  window.cancelExam = function () {
    if (activeExam && activeExam.timerId) clearInterval(activeExam.timerId);
    activeExam = null;
    window.switchTab("exams");
  };

  window.submitExam = async function (autoTimeUp) {
    if (!activeExam) return;
    const unanswered = activeExam.answers.filter(a => a === null || a === "").length;
    if (!autoTimeUp && unanswered > 0) {
      if (!confirm(`باقي ${unanswered} سؤال من غير إجابة. تسليم؟`)) return;
    }
    clearInterval(activeExam.timerId);
    const finished = activeExam;
    activeExam = null;
    let score = 0;
    finished.questions.forEach((q, idx) => {
      score += gradeQuestion(q, finished.answers[idx]);
    });
    const total = finished.questions.length;
    const percent = Math.round((score / total) * 100);
    const passed = percent >= PASS_MARK;
    const durationSec = Math.max(1, finished.totalSec - finished.remainingSec);
    try {
      await apiPost("api/attempts", {
        studentName: finished.studentName || "مهاب محمد",
        examId: finished.id,
        examTitle: finished.title,
        score,
        total,
        percent,
        durationSec
      });
      serverState = await apiGetState();
      updateStats();
    } catch (e) {}
    const minsUsed = Math.max(1, Math.round(durationSec / 60));
    document.getElementById("exam-active-view").style.display = "none";
    const resView = document.getElementById("exam-result-view");
    resView.style.display = "block";
    resView.innerHTML = `
      <div class="result-card">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
          <span class="pass-badge">${passed ? "ناجح — 50% فأكثر" : "راسب — أقل من 50%"}</span>
          <span style="color:var(--text-muted);font-size:14px;">${escapeHtml(finished.studentName)} • ${minsUsed} دقيقة</span>
        </div>
        <h2 style="margin-top:12px;font-size:24px;">${escapeHtml(finished.title)}</h2>
        <div style="display:flex;justify-content:space-between;margin-top:10px;font-weight:900;font-size:20px;">
          <span>النتيجة</span>
          <span style="color:#34d399;direction:ltr;">${percent}% (${score} / ${total})</span>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${percent}%;"></div></div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button class="btn-primary" onclick="startExamById('${finished.id}')">إعادة الامتحان</button>
          <button class="btn-secondary" onclick="switchTab('exams')">قائمة الامتحانات</button>
        </div>
      </div>
      <h3 style="margin-bottom:14px;">مراجعة الشرح</h3>
      ${finished.questions
        .map((q, idx) => {
          const userAns = finished.answers[idx];
          const got = gradeQuestion(q, userAns);
          const isRight = got >= 1;
          if (q.type === "essay") {
            return `
          <div class="review-item ${isRight ? "" : "wrong"}">
            <div style="font-weight:800;margin-bottom:8px;">${idx + 1}) [مقالي] ${escapeHtml(q.text)}</div>
            <div style="font-size:14.5px;">إجابتك: <b>${escapeHtml(userAns || "بدون إجابة")}</b></div>
            <div class="explain-box"><b>الإجابة النموذجية:</b> ${escapeHtml(q.model || q.explanation || "")}</div>
          </div>`;
          }
          return `
          <div class="review-item ${isRight ? "" : "wrong"}">
            <div style="font-weight:800;margin-bottom:8px;">${idx + 1}) ${escapeHtml(q.text)}</div>
            <div style="font-size:14.5px;">إجابتك: <b style="color:${isRight ? "#34d399" : "#f87171"};">${
              userAns !== null && userAns !== "" ? `(${LETTERS[userAns]}) ${escapeHtml((q.options || [])[userAns] || "")}` : "بدون إجابة"
            }</b> ${isRight ? "✓" : "✗"}</div>
            ${
              !isRight
                ? `<div style="font-size:14.5px;color:#34d399;">الصحيح: (${LETTERS[q.correct]}) ${escapeHtml(q.options[q.correct])}</div>`
                : ""
            }
            <div class="explain-box">${escapeHtml(q.explanation)}</div>
          </div>`;
        })
        .join("")}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function renderAttempts() {
    const box = document.getElementById("attempts-container");
    const list = serverState.attempts || [];
    if (!list.length) {
      box.innerHTML = `<p style="color:var(--text-muted);">مفيش محاولات لسه.</p>`;
      return;
    }
    box.innerHTML = list
      .map(
        a => `
      <div class="item-card" style="margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;">
          <div>
            <span class="pass-badge">${a.percent}%</span>
            <strong style="margin-right:8px;color:#fbbf24;">${escapeHtml(a.studentName)}</strong>
            <div style="color:var(--text-muted);font-size:14px;margin-top:4px;">${escapeHtml(a.examTitle)}</div>
          </div>
          <div style="text-align:left;">
            <div style="font-size:20px;font-weight:900;color:#34d399;direction:ltr;">${a.score} / ${a.total}</div>
            <div style="font-size:12.5px;color:var(--text-muted);">${escapeHtml(a.date)}</div>
          </div>
        </div>
      </div>`
      )
      .join("");
  }

  function populateFounderSelect() {
    const sel = document.getElementById("cq-exam");
    if (!sel) return;
    sel.innerHTML = allExams()
      .map(e => `<option value="${e.id}">${escapeHtml(e.title)}</option>`)
      .join("");
  }

  window.addCustomQuestion = async function () {
    const examId = document.getElementById("cq-exam").value;
    const text = document.getElementById("cq-text").value.trim();
    const opt0 = document.getElementById("cq-opt0").value.trim();
    const opt1 = document.getElementById("cq-opt1").value.trim();
    const opt2 = document.getElementById("cq-opt2").value.trim();
    const opt3 = document.getElementById("cq-opt3").value.trim();
    const explanation = document.getElementById("cq-exp").value.trim() || "سؤال من مؤسس المنصة م/ مهاب محمد.";
    const msg = document.getElementById("cq-msg");
    if (!text || !opt0 || !opt1) {
      msg.style.color = "#f87171";
      msg.textContent = "اكتب السؤال والإجابة الصحيحة واختيار غلط واحد على الأقل.";
      return;
    }
    const res = await apiPost("api/questions", {
      examId,
      text,
      options: [opt0, opt1, opt2, opt3].filter(Boolean),
      correct: 0,
      explanation
    });
    if (res && res.ok) {
      msg.style.color = "#34d399";
      msg.textContent = "اتحفظ. ادخل الامتحان وهتلاقيه.";
      ["cq-text", "cq-opt0", "cq-opt1", "cq-opt2", "cq-opt3", "cq-exp"].forEach(id => {
        document.getElementById(id).value = "";
      });
      await fetchState();
    } else {
      msg.style.color = "#f87171";
      msg.textContent = "حصل خطأ.";
    }
  };

  window.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "P")) {
      if (!isSubscribed()) {
        e.preventDefault();
        alert("الطباعة للمشتركين فقط.");
        switchTab("plans");
      }
    }
  });
  window.addEventListener("beforeprint", function (e) {
    if (!isSubscribed()) {
      e.preventDefault();
      alert("الطباعة للمشتركين فقط.");
    }
  });

  openGate(false);
})();

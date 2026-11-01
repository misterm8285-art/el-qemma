window.QEMMA_CATALOG = {
  stages: {
    g1: { id: "g1", label: "أولى ثانوي", price: 1000, hint: "اشتراك السنة كاملة 1000 جنيه" },
    g2: { id: "g2", label: "تانية ثانوي", price: 1000, hint: "اشتراك السنة كاملة 1000 جنيه" },
    g3: { id: "g3", label: "تالتة ثانوي", price: 500, hint: "اشتراك السنة كاملة 500 جنيه" }
  },
  tracks: {
    science: { id: "science", label: "علمي علوم", icon: "🧬" },
    math: { id: "math", label: "علمي رياضة", icon: "📐" },
    arts: { id: "arts", label: "أدبي", icon: "📜" }
  }
};

window.QEMMA_SUBJECTS = [
  /* ========== تالتة ثانوي ========== */
  {
    id: "g3-ar",
    stage: "g3",
    tracks: ["science", "math", "arts"],
    name: "اللغة العربية",
    color: "#f59e0b",
    units: [
      {
        id: "g3-ar-nahw1",
        title: "النحو — الوحدة الأولى (النطق والإملاء)",
        lessons: [{ summaryId: "sum-nahw-u1", examId: "ex-nahw-u1" }],
        unitExamId: "ex-nahw-u1"
      },
      {
        id: "g3-ar-tawkeed",
        title: "النحو — التوكيد اللفظي والمعنوي",
        lessons: [{ summaryId: "sum-tawkeed", examId: "ex-tawkeed" }],
        unitExamId: "ex-tawkeed"
      },
      {
        id: "g3-ar-adab",
        title: "الأدب — الكلاسيكية والرومانتيكية (مطران)",
        lessons: [{ summaryId: "sum-adab", examId: "ex-adab" }],
        unitExamId: "ex-adab"
      },
      {
        id: "g3-ar-balagha",
        title: "البلاغة",
        lessons: [{ summaryId: "soon-g3-ar-balagha", examId: null }],
        unitExamId: null
      },
      {
        id: "g3-ar-texts",
        title: "النصوص والقراءة",
        lessons: [{ summaryId: "soon-g3-ar-texts", examId: null }],
        unitExamId: null
      }
    ]
  },
  {
    id: "g3-en",
    stage: "g3",
    tracks: ["science", "math", "arts"],
    name: "اللغة الإنجليزية",
    color: "#38bdf8",
    units: [
      {
        id: "g3-en-u1",
        title: "Grammar Boost — الأزمنة الأساسية",
        lessons: [{ summaryId: "sum-en-tenses", examId: "ex-en-tenses" }],
        unitExamId: "ex-en-tenses"
      },
      {
        id: "g3-en-reading",
        title: "Reading & Vocabulary",
        lessons: [{ summaryId: "soon-g3-en-read", examId: null }],
        unitExamId: null
      }
    ]
  },
  {
    id: "g3-bio",
    stage: "g3",
    tracks: ["science"],
    name: "الأحياء",
    color: "#ec4899",
    units: [
      {
        id: "g3-bio-support",
        title: "الباب الأول — الدعامة في النبات والإنسان",
        lessons: [{ summaryId: "sum-bio-support", examId: "bio-support" }],
        unitExamId: "bio-support"
      },
      {
        id: "g3-bio-move",
        title: "الحركة في الإنسان",
        lessons: [{ summaryId: "sum-bio-move", examId: "ex-bio-move" }],
        unitExamId: "ex-bio-move"
      },
      {
        id: "g3-bio-repro",
        title: "التكاثر",
        lessons: [{ summaryId: "soon-g3-bio-repro", examId: null }],
        unitExamId: null
      },
      {
        id: "g3-bio-immune",
        title: "المناعة",
        lessons: [{ summaryId: "soon-g3-bio-immune", examId: null }],
        unitExamId: null
      },
      {
        id: "g3-bio-genetics",
        title: "الوراثة",
        lessons: [{ summaryId: "soon-g3-bio-gen", examId: null }],
        unitExamId: null
      }
    ]
  },
  {
    id: "g3-chem",
    stage: "g3",
    tracks: ["science", "math"],
    name: "الكيمياء",
    color: "#10b981",
    units: [
      {
        id: "g3-chem-ch1",
        title: "الباب الأول — العناصر الانتقالية",
        lessons: [{ summaryId: "sum-chem-ch1", examId: "ex-chem-ch1" }],
        unitExamId: "ex-chem-ch1"
      },
      {
        id: "g3-chem-ch2",
        title: "الباب الثاني — التحليل الكيميائي",
        lessons: [{ summaryId: "sum-chem-ch2", examId: "chem-ch2" }],
        unitExamId: "chem-ch2"
      },
      {
        id: "g3-chem-ch3",
        title: "الباب الثالث — الاتزان الكيميائي",
        lessons: [{ summaryId: "soon-g3-chem-ch3", examId: null }],
        unitExamId: null
      },
      {
        id: "g3-chem-ch4",
        title: "الباب الرابع — الكيمياء الكهربية",
        lessons: [{ summaryId: "soon-g3-chem-ch4", examId: null }],
        unitExamId: null
      },
      {
        id: "g3-chem-ch5",
        title: "الباب الخامس — الكيمياء العضوية",
        lessons: [{ summaryId: "soon-g3-chem-ch5", examId: null }],
        unitExamId: null
      }
    ]
  },
  {
    id: "g3-phys",
    stage: "g3",
    tracks: ["science", "math"],
    name: "الفيزياء",
    color: "#06b6d4",
    units: [
      {
        id: "g3-phys-ch1",
        title: "الفصل الأول — الكهربية التيارية",
        lessons: [{ summaryId: "sum-phys-ch1", examId: "ex-phys-ch1" }],
        unitExamId: "ex-phys-ch1"
      },
      {
        id: "g3-phys-ch2",
        title: "الفصل الثاني — القوة المغناطيسية وعزم الازدواج",
        lessons: [{ summaryId: "sum-phys-torque", examId: "phys-torque" }],
        unitExamId: "phys-torque"
      },
      {
        id: "g3-phys-ch3",
        title: "الفصل الثالث — الحث الكهرومغناطيسي",
        lessons: [{ summaryId: "soon-g3-phys-ch3", examId: null }],
        unitExamId: null
      },
      {
        id: "g3-phys-ch4",
        title: "الفصل الرابع — التيار المتردد",
        lessons: [{ summaryId: "soon-g3-phys-ch4", examId: null }],
        unitExamId: null
      },
      {
        id: "g3-phys-ch5",
        title: "الفصل الخامس — الموجات الكهرومغناطيسية والحديثة",
        lessons: [{ summaryId: "soon-g3-phys-ch5", examId: null }],
        unitExamId: null
      }
    ]
  },
  {
    id: "g3-math",
    stage: "g3",
    tracks: ["math"],
    name: "الرياضيات",
    color: "#3b82f6",
    units: [
      {
        id: "g3-math-diff",
        title: "التفاضل — الوحدة الأولى (الاشتقاق وتطبيقاته)",
        lessons: [{ summaryId: "sum-calc-u1", examId: "calc-u1" }],
        unitExamId: "calc-u1"
      },
      {
        id: "g3-math-int",
        title: "التكامل",
        lessons: [{ summaryId: "sum-calc-int", examId: "ex-calc-int" }],
        unitExamId: "ex-calc-int"
      },
      {
        id: "g3-math-space",
        title: "الهندسة الفراغية",
        lessons: [{ summaryId: "sum-space", examId: "ex-space" }],
        unitExamId: "ex-space"
      },
      {
        id: "g3-math-stat",
        title: "الاستاتيكا",
        lessons: [{ summaryId: "soon-g3-math-stat", examId: null }],
        unitExamId: null
      },
      {
        id: "g3-math-dyn",
        title: "الديناميكا",
        lessons: [{ summaryId: "soon-g3-math-dyn", examId: null }],
        unitExamId: null
      },
      {
        id: "g3-math-alg",
        title: "الجبر والهندسة التحليلية",
        lessons: [{ summaryId: "soon-g3-math-alg", examId: null }],
        unitExamId: null
      }
    ]
  },
  {
    id: "g3-hist",
    stage: "g3",
    tracks: ["arts"],
    name: "التاريخ",
    color: "#fb7185",
    units: [
      {
        id: "g3-hist-u1",
        title: "مصر في عهد محمد علي",
        lessons: [{ summaryId: "sum-hist-u1", examId: "ex-hist-u1" }],
        unitExamId: "ex-hist-u1"
      },
      {
        id: "g3-hist-u2",
        title: "الحرب العالمية والحركة الوطنية",
        lessons: [{ summaryId: "soon-g3-hist-u2", examId: null }],
        unitExamId: null
      }
    ]
  },
  {
    id: "g3-geo",
    stage: "g3",
    tracks: ["arts"],
    name: "الجغرافيا",
    color: "#84cc16",
    units: [
      {
        id: "g3-geo-u1",
        title: "الجغرافيا الطبيعية لمصر",
        lessons: [{ summaryId: "soon-g3-geo-u1", examId: null }],
        unitExamId: null
      }
    ]
  },
  {
    id: "g3-stat",
    stage: "g3",
    tracks: ["arts"],
    name: "الإحصاء",
    color: "#a78bfa",
    units: [
      {
        id: "g3-stat-u1",
        title: "مقاييس النزعة المركزية",
        lessons: [{ summaryId: "sum-stats-u1", examId: "ex-stats-u1" }],
        unitExamId: "ex-stats-u1"
      }
    ]
  },

  /* ========== تانية ثانوي ========== */
  {
    id: "g2-ar",
    stage: "g2",
    tracks: ["science", "math", "arts"],
    name: "اللغة العربية",
    color: "#f59e0b",
    units: [
      {
        id: "g2-ar-u1",
        title: "النحو — المشتقات",
        lessons: [{ summaryId: "soon-g2-ar-u1", examId: null }],
        unitExamId: null
      }
    ]
  },
  {
    id: "g2-en",
    stage: "g2",
    tracks: ["science", "math", "arts"],
    name: "اللغة الإنجليزية",
    color: "#38bdf8",
    units: [
      {
        id: "g2-en-u1",
        title: "Grammar — Conditionals",
        lessons: [{ summaryId: "soon-g2-en-u1", examId: null }],
        unitExamId: null
      }
    ]
  },
  {
    id: "g2-bio",
    stage: "g2",
    tracks: ["science"],
    name: "الأحياء",
    color: "#ec4899",
    units: [
      {
        id: "g2-bio-u1",
        title: "الخلية والأنسجة",
        lessons: [{ summaryId: "soon-g2-bio-u1", examId: null }],
        unitExamId: null
      }
    ]
  },
  {
    id: "g2-chem",
    stage: "g2",
    tracks: ["science", "math"],
    name: "الكيمياء",
    color: "#10b981",
    units: [
      {
        id: "g2-chem-atom",
        title: "تركيب الذرة والجدول الدوري",
        lessons: [{ summaryId: "sum-g2-chem-atom", examId: "ex-g2-chem-atom" }],
        unitExamId: "ex-g2-chem-atom"
      }
    ]
  },
  {
    id: "g2-phys",
    stage: "g2",
    tracks: ["science", "math"],
    name: "الفيزياء",
    color: "#06b6d4",
    units: [
      {
        id: "g2-phys-u1",
        title: "الحركة الخطية",
        lessons: [{ summaryId: "soon-g2-phys-u1", examId: null }],
        unitExamId: null
      }
    ]
  },
  {
    id: "g2-math",
    stage: "g2",
    tracks: ["math"],
    name: "الرياضيات",
    color: "#3b82f6",
    units: [
      {
        id: "g2-math-u1",
        title: "حساب المثلثات",
        lessons: [{ summaryId: "soon-g2-math-u1", examId: null }],
        unitExamId: null
      }
    ]
  },
  {
    id: "g2-hist",
    stage: "g2",
    tracks: ["arts"],
    name: "التاريخ",
    color: "#fb7185",
    units: [
      {
        id: "g2-hist-u1",
        title: "الحضارة المصرية القديمة",
        lessons: [{ summaryId: "soon-g2-hist-u1", examId: null }],
        unitExamId: null
      }
    ]
  },
  {
    id: "g2-geo",
    stage: "g2",
    tracks: ["arts"],
    name: "الجغرافيا",
    color: "#84cc16",
    units: [
      {
        id: "g2-geo-u1",
        title: "جغرافية السكان",
        lessons: [{ summaryId: "soon-g2-geo-u1", examId: null }],
        unitExamId: null
      }
    ]
  },

  /* ========== أولى ثانوي ========== */
  {
    id: "g1-ar",
    stage: "g1",
    tracks: ["science", "math", "arts"],
    name: "اللغة العربية",
    color: "#f59e0b",
    units: [
      {
        id: "g1-ar-u1",
        title: "النحو — المبتدأ والخبر",
        lessons: [{ summaryId: "sum-g1-ar", examId: "ex-g1-ar" }],
        unitExamId: "ex-g1-ar"
      }
    ]
  },
  {
    id: "g1-en",
    stage: "g1",
    tracks: ["science", "math", "arts"],
    name: "اللغة الإنجليزية",
    color: "#38bdf8",
    units: [
      {
        id: "g1-en-u1",
        title: "Present Simple vs Continuous",
        lessons: [{ summaryId: "soon-g1-en-u1", examId: null }],
        unitExamId: null
      }
    ]
  },
  {
    id: "g1-math",
    stage: "g1",
    tracks: ["science", "math", "arts"],
    name: "الرياضيات",
    color: "#3b82f6",
    units: [
      {
        id: "g1-math-u1",
        title: "المعادلات من الدرجة الأولى",
        lessons: [{ summaryId: "sum-g1-math", examId: "ex-g1-math" }],
        unitExamId: "ex-g1-math"
      }
    ]
  },
  {
    id: "g1-sci",
    stage: "g1",
    tracks: ["science", "math"],
    name: "العلوم",
    color: "#34d399",
    units: [
      {
        id: "g1-sci-u1",
        title: "المادة وبناؤها",
        lessons: [{ summaryId: "soon-g1-sci-u1", examId: null }],
        unitExamId: null
      }
    ]
  },
  {
    id: "g1-soc",
    stage: "g1",
    tracks: ["arts", "science", "math"],
    name: "الدراسات الاجتماعية",
    color: "#fb7185",
    units: [
      {
        id: "g1-soc-u1",
        title: "مصر الموقع والحضارة",
        lessons: [{ summaryId: "soon-g1-soc-u1", examId: null }],
        unitExamId: null
      }
    ]
  }
];

window.QEMMA_EXTRA = {
  summaries: [
    {
      id: "sum-en-tenses",
      title: "زيتونة الإنجليزي — الأزمنة الأساسية",
      subject: "اللغة الإنجليزية",
      badge: "تالتة ثانوي",
      color: "#38bdf8",
      pagesDesc: "Present / Past / Perfect",
      description: "الفروق السريعة بين الأزمنة اللي بتيجي في القطعة والجرمر.",
      htmlUrl: null,
      pdfUrl: null,
      inlineHtml: `
        <div class="zaitouna">
          <h2>English Tenses — زيتونة سريعة</h2>
          <div class="z-box">
            <h3>Present Simple vs Continuous</h3>
            <p>• Simple: عادات وحقائق. <b>He plays football every Friday.</b></p>
            <p>• Continuous: دلوقتي أو حول الوقت الحالي. <b>He is playing now.</b></p>
          </div>
          <div class="z-box">
            <h3>Present Perfect</h3>
            <p>• حدث في الماضي وله أثر الآن، من غير وقت محدد: <b>I have finished the exam.</b></p>
            <p>• مفاتيح: already / yet / just / ever / never / since / for.</p>
            <p>• Past Simple لازم وقت محدد: <b>I finished the exam yesterday.</b></p>
          </div>
        </div>`
    },
    {
      id: "sum-bio-move",
      title: "زيتونة الأحياء — الحركة في الإنسان",
      subject: "الأحياء",
      badge: "علمي علوم",
      color: "#ec4899",
      pagesDesc: "عضلات + مفاصل + أرقام",
      description: "أنواع العضلات والمفاصل وعلاقتها بالهيكل.",
      htmlUrl: null,
      pdfUrl: null,
      inlineHtml: `
        <div class="zaitouna">
          <h2>الحركة في الإنسان</h2>
          <div class="z-box">
            <h3>أنواع العضلات</h3>
            <p>• هيكلية مخططة إرادية (متعددة الأنوية) — حركة الجسم.</p>
            <p>• ملساء لاإرادية (النواة واحدة) — الأحشاء.</p>
            <p>• قلبية مخططة لاإرادية — القلب فقط.</p>
          </div>
          <div class="z-box">
            <h3>المفاصل</h3>
            <p>• ليفية ثابتة (عظام الجمجمة) — غضروفية محدودة (الفقرات) — زلالية واسعة الحركة.</p>
            <p>• الأربطة تربط عظمة بعظمة، والأوتار تربط عضلة بعظمة.</p>
          </div>
        </div>`
    },
    {
      id: "sum-chem-ch1",
      title: "زيتونة الكيمياء — العناصر الانتقالية",
      subject: "الكيمياء",
      badge: "علمي",
      color: "#10b981",
      pagesDesc: "الفئة d + الألوان + أعداد التأكسد",
      description: "خصائص العناصر الانتقالية وأشهر أيوناتها الملونة.",
      htmlUrl: null,
      pdfUrl: null,
      inlineHtml: `
        <div class="zaitouna">
          <h2>العناصر الانتقالية (الفئة d)</h2>
          <div class="z-box">
            <h3>الصفات العامة</h3>
            <p>• فلزات صلبة، درجات انصهار عالية، أيونات ملونة غالباً، حالات تأكسد متعددة، تستخدم كحفازات.</p>
            <p>• التوزيع الإلكتروني ينتهي بـ <b>(n-1)d و ns</b>.</p>
          </div>
          <div class="z-box">
            <h3>ألوان مشهورة</h3>
            <p>• Cu²⁺ أزرق — Fe²⁺ أخضر — Fe³⁺ أصفر/بني — Ni²⁺ أخضر — Co²⁺ وردي — MnO₄⁻ بنفسجي.</p>
          </div>
        </div>`
    },
    {
      id: "sum-phys-ch1",
      title: "زيتونة الفيزياء — الكهربية التيارية",
      subject: "الفيزياء",
      badge: "علمي",
      color: "#06b6d4",
      pagesDesc: "أوم + التوصيل + القوة الدافعة",
      description: "قوانين الدوائر الأساسية قبل الفصل المغناطيسي.",
      htmlUrl: null,
      pdfUrl: null,
      inlineHtml: `
        <div class="zaitouna">
          <h2>الكهربية التيارية</h2>
          <div class="z-box">
            <h3>القوانين</h3>
            <p style="direction:ltr;text-align:center;font-size:20px;color:#fbbf24;font-weight:900;">V = I R &nbsp;&nbsp;|&nbsp;&nbsp; P = I V = I² R = V²/R</p>
            <p>• القوة الدافعة: <b>ε = I (R + r)</b> وفرق الجهد بين طرفي البطارية <b>V = ε − I r</b>.</p>
          </div>
          <div class="z-box">
            <h3>التوصيل</h3>
            <p>• توالي: المقاومة تزيد، التيار واحد. توازي: المقاومة تقل، فرق الجهد واحد.</p>
          </div>
        </div>`
    },
    {
      id: "sum-calc-int",
      title: "زيتونة التكامل — القوانين الأساسية",
      subject: "الرياضيات",
      badge: "علمي رياضة",
      color: "#3b82f6",
      pagesDesc: "عكس الاشتقاق + المساحات",
      description: "قوانين التكامل غير المحدود والمحدد.",
      htmlUrl: null,
      pdfUrl: null,
      inlineHtml: `
        <div class="zaitouna">
          <h2>التكامل من الصفر</h2>
          <div class="z-box">
            <h3>الفكرة</h3>
            <p>التكامل عكس الاشتقاق. ∫ س^ن دس = س^(ن+1) / (ن+1) + ث  (ن ≠ -1)</p>
            <p>∫ 1/س دس = لو|س| + ث</p>
            <p>المحدد ∫ من أ إلى ب يحسب المساحة = د(ب) − د(أ) بعد إيجاد الأصل.</p>
          </div>
        </div>`
    },
    {
      id: "sum-space",
      title: "زيتونة الهندسة الفراغية",
      subject: "الرياضيات",
      badge: "علمي رياضة",
      color: "#3b82f6",
      pagesDesc: "مستقيم ومستوى في الفراغ",
      description: "أوضاع الخطوط والمستويات والمعادلات.",
      htmlUrl: null,
      pdfUrl: null,
      inlineHtml: `
        <div class="zaitouna">
          <h2>الهندسة الفراغية</h2>
          <div class="z-box">
            <h3>أوضاع مستقيمين</h3>
            <p>• متوازيان / متقاطعان / متخالفان (لا يجتمعان في مستوى واحد).</p>
            <p>• المستقيم عمودي على مستوى إذا كان عمودياً على مستقيمين متقاطعين في المستوى.</p>
          </div>
        </div>`
    },
    {
      id: "sum-hist-u1",
      title: "زيتونة التاريخ — مصر في عهد محمد علي",
      subject: "التاريخ",
      badge: "أدبي",
      color: "#fb7185",
      pagesDesc: "الجيش + التعليم + الاقتصاد",
      description: "أهم إصلاحات محمد علي اللي بتيجي في الامتحان.",
      htmlUrl: null,
      pdfUrl: null,
      inlineHtml: `
        <div class="zaitouna">
          <h2>مصر في عهد محمد علي</h2>
          <div class="z-box">
            <p>• احتكار الصناعة والزراعة لتمويل الجيش.</p>
            <p>• بناء جيش نظامي وأسطول، وإرسال البعثات التعليمية.</p>
            <p>• معاهدة لندن 1840 حدّت من توسعاته وحصرت وراثة الحكم في أسرته.</p>
          </div>
        </div>`
    },
    {
      id: "sum-stats-u1",
      title: "زيتونة الإحصاء — النزعة المركزية",
      subject: "الإحصاء",
      badge: "أدبي",
      color: "#a78bfa",
      pagesDesc: "المتوسط والوسيط والمنوال",
      description: "القوانين اللي بتيجي في مسائل الإحصاء.",
      htmlUrl: null,
      pdfUrl: null,
      inlineHtml: `
        <div class="zaitouna">
          <h2>مقاييس النزعة المركزية</h2>
          <div class="z-box">
            <p>• المتوسط = مجموع القيم ÷ عددها.</p>
            <p>• الوسيط = القيمة اللي في النص بعد الترتيب.</p>
            <p>• المنوال = القيمة الأكثر تكراراً.</p>
            <p>• لو التوزيع ملتوٍ يميناً: المتوسط أكبر من الوسيط أكبر من المنوال.</p>
          </div>
        </div>`
    },
    {
      id: "sum-g2-chem-atom",
      title: "زيتونة تانية ثانوي — تركيب الذرة",
      subject: "الكيمياء",
      badge: "تانية ثانوي",
      color: "#10b981",
      pagesDesc: "أعداد الكم + الجدول",
      description: "أعداد الكم الأربعة وتوزيع الإلكترونات.",
      htmlUrl: null,
      pdfUrl: null,
      inlineHtml: `
        <div class="zaitouna">
          <h2>تركيب الذرة</h2>
          <div class="z-box">
            <p>• n المستوى الرئيسي، l الشكل (s=0 p=1 d=2 f=3)، mₗ الاتجاه، mₛ الدوران ±1/2.</p>
            <p>• قاعدة هوند: الإلكترونات تملأ الأوربيتالات فرادى أولاً بنفس اتجاه الدوران.</p>
          </div>
        </div>`
    },
    {
      id: "sum-g1-ar",
      title: "زيتونة أولى ثانوي — المبتدأ والخبر",
      subject: "اللغة العربية",
      badge: "أولى ثانوي",
      color: "#f59e0b",
      pagesDesc: "الجملة الاسمية",
      description: "صور المبتدأ والخبر وأشهر الألغام.",
      htmlUrl: null,
      pdfUrl: null,
      inlineHtml: `
        <div class="zaitouna">
          <h2>المبتدأ والخبر</h2>
          <div class="z-box">
            <p>• المبتدأ اسم مرفوع تبدأ به الجملة الاسمية، والخبر يتمم معناه.</p>
            <p>• الخبر مفرد / جملة / شبه جملة (جار ومجرور أو ظرف).</p>
          </div>
        </div>`
    },
    {
      id: "sum-g1-math",
      title: "زيتونة أولى ثانوي — المعادلات",
      subject: "الرياضيات",
      badge: "أولى ثانوي",
      color: "#3b82f6",
      pagesDesc: "حل المعادلة الخطية",
      description: "نقل الحدود وتوحيد المقام.",
      htmlUrl: null,
      pdfUrl: null,
      inlineHtml: `
        <div class="zaitouna">
          <h2>المعادلات من الدرجة الأولى</h2>
          <div class="z-box">
            <p>أنقل المجهول لطرف والأرقام للطرف الثاني، ولو في مقامات وحّد المقام.</p>
            <p>مثال: 2س + 3 = 11 ← 2س = 8 ← س = 4.</p>
          </div>
        </div>`
    }
  ],
  exams: [
    {
      id: "ex-nahw-u1",
      title: "امتحان الملخص — النحو (النطق والإملاء)",
      subject: "اللغة العربية",
      durationMin: 12,
      questions: [
        { text: "«شربتُ ........... باردًا» الاختيار الصحيح:", options: ["ماءً", "ماءًا", "مائًا", "ماءن"], correct: 0, explanation: "الهمزة المتطرفة بعد ألف مد لا يُكتب بعدها ألف تنوين فتح." },
        { text: "«كافأتُ صديقي ........... المتفوق»", options: ["عمرًا", "عمروًا", "عمرو", "عَمرُ"], correct: 0, explanation: "عمرو في النصب تُحذف واوها الفارقة وتُنوّن: عمرًا." },
        { text: "«ألا تجتهدُ فتتفوقَ، وإلّا تندمْ» إعراب (تجتهد - تندم):", options: ["مرفوع — مجزوم", "منصوب — مجزوم", "مجزوم — مرفوع", "منصوب — منصوب"], correct: 0, explanation: "ألا العرضية لا تجزم، وإلّا = إن + لا تجزم." },
        { text: "الفرق بين ثَمَّ وثُمَّ:", options: ["ثَمَّ ظرف مكان / ثُمَّ حرف عطف", "الاثنان حرف عطف", "ثَمَّ حرف عطف / ثُمَّ ظرف", "لا فرق"], correct: 0, explanation: "ثَمَّ بالفتح ظرف مكان، وثُمَّ بالضم حرف عطف." },
        { text: "همزة (إبراهيم) هي:", options: ["قطع لأنها اسم", "وصل", "متوسطة", "متطرفة"], correct: 0, explanation: "الأسماء همزتها قطع ما عدا أسماء محددة أشهرها ابن واسم." }
      ]
    },
    {
      id: "ex-tawkeed",
      title: "امتحان الملخص — التوكيد اللفظي والمعنوي",
      subject: "اللغة العربية",
      durationMin: 12,
      questions: [
        { text: "«تحرصُ دُوَلُ العالمِ كلُّها» إعراب كلها:", options: ["توكيد معنوي مرفوع", "توكيد مجرور", "مبتدأ ثانٍ", "بدل"], correct: 0, explanation: "سهم الضمير: ها تعود على دولُ المرفوعة." },
        { text: "«إنَّ الطالبتين كلتاهما مجتهدةٌ» إعراب كلتاهما:", options: ["مبتدأ مرفوع بالألف", "توكيد منصوب", "توكيد مرفوع", "خبر إن"], correct: 0, explanation: "لا يجوز الحذف لأن الخبر مفرد." },
        { text: "«حضر الطلابُ جميعًا» إعراب جميعاً:", options: ["حال منصوبة", "توكيد معنوي", "بدل", "نعت"], correct: 0, explanation: "جميعاً بدون ضمير حال، جميعهم توكيد." },
        { text: "«اجتهدْ أنتَ» أنت تعرب:", options: ["توكيد لفظي", "فاعل", "بدل", "مبتدأ"], correct: 0, explanation: "توكيد للضمير المستتر." },
        { text: "شرط التوكيد المعنوي الناقص يجعل الكلمة:", options: ["مبتدأ ثانياً", "توكيداً دائماً", "حالاً", "تمييزاً"], correct: 0, explanation: "إذا اختل المعنى بالحذف فليست توكيداً." }
      ]
    },
    {
      id: "ex-adab",
      title: "امتحان الملخص — الأدب (الكلاسيكية ومطران)",
      subject: "اللغة العربية",
      durationMin: 10,
      questions: [
        { text: "من سمات مطران في «إني أقمت على التعلة بالمنى»:", options: ["التجربة الذاتية والغربة", "شعر المناسبات", "مخاطبة الصاحبين", "طغيان البيان على المعنى"], correct: 0, explanation: "مطران رائد الاتجاه الوجداني." },
        { text: "أحمد شوقي يمثل:", options: ["جيل التطوير الكلاسيكي", "الرومانتيكية الخالصة", "الواقعية", "المدرسة الأمريكية"], correct: 0, explanation: "شوقي أمير الشعراء من الكلاسيكية المجددة." },
        { text: "الاتجاه الوجداني يهتم بـ:", options: ["صدق الشعور والطبيعة والذات", "المدح السياسي فقط", "التاريخ الجاف", "الصنعة البديعية وحدها"], correct: 0, explanation: "الوجدانية = الذات + الوجدان + الطبيعة." },
        { text: "من مآخذ الكلاسيكية:", options: ["المبالغة في المناسبات والمجاملات", "الوحدة العضوية الكاملة", "هجر القديم", "إهمال اللغة"], correct: 0, explanation: "شعر المناسبات من مآخذ الإحياء." }
      ]
    },
    {
      id: "ex-en-tenses",
      title: "امتحان الملخص — English Tenses",
      subject: "اللغة الإنجليزية",
      durationMin: 10,
      questions: [
        { text: "She ____ the lesson already.", options: ["has finished", "finished", "is finishing", "finishes"], correct: 0, explanation: "already → Present Perfect." },
        { text: "I ____ football yesterday.", options: ["played", "have played", "am playing", "play"], correct: 0, explanation: "yesterday → Past Simple." },
        { text: "He ____ now.", options: ["is studying", "studies", "studied", "has studied"], correct: 0, explanation: "now → Present Continuous." },
        { text: "We have lived here ____ 2020.", options: ["since", "for", "ago", "at"], correct: 0, explanation: "since + نقطة بداية." },
        { text: "Water ____ at 100°C.", options: ["boils", "is boiling", "boiled", "has boiled"], correct: 0, explanation: "حقيقة علمية → Simple." }
      ]
    },
    {
      id: "ex-bio-move",
      title: "امتحان الملخص — الحركة في الإنسان",
      subject: "الأحياء",
      durationMin: 10,
      questions: [
        { text: "عضلة القلب:", options: ["مخططة لاإرادية", "ملساء إرادية", "هيكلية لاإرادية", "ملساء متعددة الأنوية"], correct: 0, explanation: "قلبية مخططة ولا إرادية." },
        { text: "الأربطة تربط:", options: ["عظمة بعظمة", "عضلة بعظمة", "عضلة بعضلة", "عصباً بعضلة"], correct: 0, explanation: "الأوتار عضلة-عظمة، الأربطة عظمة-عظمة." },
        { text: "مفاصل الجمجمة:", options: ["ليفية ثابتة", "زلالية", "غضروفية واسعة", "مدارية"], correct: 0, explanation: "عظام الجمجمة ملتحمة." },
        { text: "العضلة الهيكلية:", options: ["إرادية متعددة الأنوية", "لاإرادية نواة واحدة", "ملساء", "قلبية"], correct: 0, explanation: "هيكلية مخططة إرادية." }
      ]
    },
    {
      id: "ex-chem-ch1",
      title: "امتحان الملخص — العناصر الانتقالية",
      subject: "الكيمياء",
      durationMin: 10,
      questions: [
        { text: "العناصر الانتقالية تنتمي غالباً للفئة:", options: ["d", "s", "p", "f فقط"], correct: 0, explanation: "الانتقالية الرئيسية فئة d." },
        { text: "لون أيون Cu²⁺ في المحلول المائي:", options: ["أزرق", "أخضر", "بنفسجي", "عديم اللون"], correct: 0, explanation: "كبريتات النحاس الزرقاء." },
        { text: "عدد تأكسد الحديد في Fe₂O₃:", options: ["+3", "+2", "+6", "0"], correct: 0, explanation: "3 أكسجين = -6 على ذرتين حديد." },
        { text: "لون برمنجنات البوتاسيوم MnO₄⁻:", options: ["بنفسجي", "أخضر", "أزرق", "أصفر"], correct: 0, explanation: "MnO₄⁻ بنفسجي مميز." },
        { text: "من أسباب استخدام الانتقالية كحفازات:", options: ["حالات التأكسد المتعددة", "كونها غازات", "عدم توصيل الكهرباء", "عدم وجود إلكترونات d"], correct: 0, explanation: "تغير أعداد التأكسد يسهّل الحفز." }
      ]
    },
    {
      id: "ex-phys-ch1",
      title: "امتحان الملخص — الكهربية التيارية",
      subject: "الفيزياء",
      durationMin: 12,
      questions: [
        { text: "قانون أوم:", options: ["V = I R", "P = I / V", "R = I V", "I = V + R"], correct: 0, explanation: "فرق الجهد = التيار × المقاومة." },
        { text: "مقاومتان 4 Ω و 4 Ω على التوازي، المكافئة:", options: ["2 Ω", "8 Ω", "4 Ω", "1 Ω"], correct: 0, explanation: "1/ك = 1/4 + 1/4 = 1/2." },
        { text: "القدرة P تكافئ:", options: ["I² R", "I / R", "R / V", "V + I"], correct: 0, explanation: "P = I²R = IV = V²/R." },
        { text: "ε = I(R+r) معناها:", options: ["القوة الدافعة تساوي التيار في المقاومة الكلية", "المقاومة الداخلية صفر دائماً", "القدرة ثابتة", "التوازي فقط"], correct: 0, explanation: "الدائرة المغلقة تشمل r الداخلية." },
        { text: "في التوالي التيار:", options: ["واحد في كل المقاومات", "يتوزع عكس المقاومة", "صفر", "أكبر في الأصغر"], correct: 0, explanation: "تيار واحد في التوالي." }
      ]
    },
    {
      id: "ex-calc-int",
      title: "امتحان الملخص — التكامل",
      subject: "الرياضيات",
      durationMin: 10,
      questions: [
        { text: "∫ 2س دس =", options: ["س² + ث", "2س² + ث", "س + ث", "2 + ث"], correct: 0, explanation: "∫ 2س = س² + ث." },
        { text: "∫ 1/س دس (س>0) =", options: ["لو س + ث", "س²/2", "1/س²", "هـ^س"], correct: 0, explanation: "أصل 1/س هو اللوغاريتم الطبيعي." },
        { text: "∫ من 0 إلى 2 لـ 2س دس =", options: ["4", "2", "8", "0"], correct: 0, explanation: "[س²] من 0 إلى 2 = 4." },
        { text: "التكامل عكس:", options: ["الاشتقاق", "الضرب", "التوازي", "المساحة السالبة فقط"], correct: 0, explanation: "النظرية الأساسية للتفاضل والتكامل." }
      ]
    },
    {
      id: "ex-space",
      title: "امتحان الملخص — الهندسة الفراغية",
      subject: "الرياضيات",
      durationMin: 10,
      questions: [
        { text: "مستقيمان لا يلتقيان ولا يتوازيان في الفراغ:", options: ["متخالفان", "متقاطعان", "منطبقان", "عموديان حتماً"], correct: 0, explanation: "المتخالفان ليسا في مستوى واحد." },
        { text: "المستقيم يكون عمودياً على مستوى إذا كان عمودياً على:", options: ["مستقيمين متقاطعين في المستوى", "مستقيم واحد فقط", "مستوى موازٍ", "خط الأفق"], correct: 0, explanation: "نظرية العمودي على مستوى." },
        { text: "إذا وازى مستقيم مستوى فإن تقاطعهما:", options: ["مجموعة خالية", "نقطة", "المستقيم كله", "ثلاث نقاط"], correct: 0, explanation: "التوازي يعني لا تقاطع." },
        { text: "مستوى يقطع مستوى آخر في:", options: ["مستقيم", "نقطة واحدة فقط دائماً", "فراغ", "دائرة"], correct: 0, explanation: "تقاطع مستويين مستقيم." }
      ]
    },
    {
      id: "ex-hist-u1",
      title: "امتحان الملخص — محمد علي",
      subject: "التاريخ",
      durationMin: 8,
      questions: [
        { text: "معاهدة لندن 1840 هدفت إلى:", options: ["الحد من توسعات محمد علي", "إلغاء الجيش المصري", "إعطاء السودان لمحمد علي", "إلغاء الاحتكار لصالح فرنسا فقط"], correct: 0, explanation: "حصرت نفوذه وراثة الحكم." },
        { text: "من إصلاحات محمد علي التعليمية:", options: ["البعثات للخارج", "إلغاء المدارس", "منع الترجمة", "إغلاق الجيش"], correct: 0, explanation: "البعثات أشهر إصلاح تعليمي." },
        { text: "الاحتكار عنده كان لـ:", options: ["تمويل الجيش والدولة", "إرضاء التجار الأحرار", "إلغاء الزراعة", "تقليد أوروبا فقط بلا هدف"], correct: 0, explanation: "الاحتكار موّل المشروع العسكري." }
      ]
    },
    {
      id: "ex-stats-u1",
      title: "امتحان الملخص — النزعة المركزية",
      subject: "الإحصاء",
      durationMin: 8,
      questions: [
        { text: "متوسط 2 ، 4 ، 6 =", options: ["4", "6", "3", "12"], correct: 0, explanation: "12/3 = 4." },
        { text: "المنوال هو:", options: ["الأكثر تكراراً", "الأوسط بعد الترتيب", "المجموع ÷ ن", "أكبر قيمة"], correct: 0, explanation: "تعريف المنوال." },
        { text: "الوسيط لـ 1 ، 3 ، 9 بعد الترتيب:", options: ["3", "1", "9", "4.3"], correct: 0, explanation: "القيمة الوسطى 3." }
      ]
    },
    {
      id: "ex-g2-chem-atom",
      title: "امتحان الملخص — تركيب الذرة (تانية ثانوي)",
      subject: "الكيمياء",
      durationMin: 8,
      questions: [
        { text: "العدد الكمي l للـ p =", options: ["1", "0", "2", "3"], correct: 0, explanation: "s0 p1 d2 f3." },
        { text: "قاعدة هوند تقول:", options: ["الملء فرادى أولاً", "الملء زوجي أولاً", "تجاهل الدوران", "n فقط يكفي"], correct: 0, explanation: "إلكترون في كل أوربيتال قبل الازدواج." },
        { text: "mₛ يأخذ:", options: ["+1/2 أو -1/2", "0 فقط", "1 و 2", "n"], correct: 0, explanation: "دوران الإلكترون." }
      ]
    },
    {
      id: "ex-g1-ar",
      title: "امتحان الملخص — المبتدأ والخبر",
      subject: "اللغة العربية",
      durationMin: 8,
      questions: [
        { text: "الخبر يتمم معنى:", options: ["المبتدأ", "الفعل", "الحال", "التمييز"], correct: 0, explanation: "ركن الجملة الاسمية." },
        { text: "«في الفصل طالبٌ» المبتدأ:", options: ["طالبٌ (مؤخر)", "في", "الفصل", "شبه الجملة"], correct: 0, explanation: "مبتدأ نكرة مؤخر وشبه الجملة خبر مقدم." },
        { text: "صور الخبر:", options: ["مفرد وجملة وشبه جملة", "فعل فقط", "حرف", "توكيد"], correct: 0, explanation: "ثلاث صور مشهورة." }
      ]
    },
    {
      id: "ex-g1-math",
      title: "امتحان الملخص — المعادلات",
      subject: "الرياضيات",
      durationMin: 8,
      questions: [
        { text: "2س + 3 = 11 فإن س =", options: ["4", "7", "5", "8"], correct: 0, explanation: "2س=8 → س=4." },
        { text: "س/2 = 6 فإن س =", options: ["12", "3", "8", "4"], correct: 0, explanation: "اضرب الطرفين في 2." },
        { text: "عند نقل +5 للطرف الآخر تصبح:", options: ["-5", "+5", "×5", "÷5"], correct: 0, explanation: "عكس الجمع طرح." }
      ]
    }
  ]
};

(function addSoonPlaceholders() {
  const ids = new Set();
  (window.QEMMA_SUBJECTS || []).forEach(sub => {
    sub.units.forEach(u => {
      u.lessons.forEach(l => {
        if (l.summaryId && l.summaryId.indexOf("soon-") === 0) ids.add(l.summaryId);
      });
    });
  });
  window.QEMMA_EXTRA.summaries = window.QEMMA_EXTRA.summaries || [];
  ids.forEach(id => {
    window.QEMMA_EXTRA.summaries.push({
      id,
      title: "الملخص تحت التقفيل",
      subject: "قريباً",
      badge: "قريباً",
      color: "#64748b",
      pagesDesc: "بيتكتب مع المذاكرة",
      description: "الباب متقفّل في خريطة المنهج، والزيتونة هتنزل أول ما الدرس يتذاكر.",
      htmlUrl: null,
      pdfUrl: null,
      comingSoon: true,
      inlineHtml: `<div class="zaitouna"><h2>قريباً على منصة القمّة</h2><p>الملخص ده لسه بيتكتب. الخريطة موجودة عشان المنهج كامل قدامك، والمحتوى بينزل درس ورا درس.</p></div>`
    });
  });
})();

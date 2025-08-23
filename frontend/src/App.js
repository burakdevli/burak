// frontend/src/App.js
import { useEffect, useMemo, useState } from "react";
import "./App.css";

/* ---------- Statik dosyalar (public) ---------- */
const PHOTO = process.env.PUBLIC_URL + "/FGS_2955.jpg";
const CV_URL = process.env.PUBLIC_URL + "/Burak-Devli-CV.pdf"; // TR ve EN'de aynı dosya indirilecek
const PORTFOLIO_IMG = process.env.PUBLIC_URL + "/Portfolio.jpg";

/* ---------- Metinler (TR/EN) ---------- */
const COPY = {
  tr: {
    docTitle: "Burak Devli | Makine Mühendisi",
    brand: "Burak Devli",
    nav: {
      about: "Hakkımda",
      exp: "Deneyim",
      portfolio: "Portfolyo",
      edu: "Eğitim",
      certs: "Dil & Sertifikalar",
      contact: "İletişim",
      download: "CV’yi indir",
    },
    hero: {
      title: "Burak Devli",
      subtitle:
        "Makine Mühendisi | Bakım & Onarım | Proje Yönetimi | Saha Mühendisliği",
      lead:
        "Mekanik sistemlerin güvenli ve kesintisiz çalışması için bakım planlama, arıza tespiti ve hızlı çözüm üretmede uzmanım. Önleyici bakımdan kriz yönetimine kadar yüksek kalite standartlarında verimlilik artışı sağlarım.",
      ctaDownload: "CV’yi İndir",
      ctaContact: "İletişime Geç",
      photoAlt: "Burak Devli",
    },
    eyebrow: {
      about: "HAKKIMDA",
      exp: "DENEYİM",
      portfolio: "PORTFOLYO",
      edu: "EĞİTİM",
      certs: "DİL & SERTİFİKALAR",
      contact: "İLETİŞİM",
    },
    titles: {
      summary: "Profesyonel Özet",
      work: "İş Tecrübeleri",
      portfolio: "Çalışma & Referans Belgeleri",
      edu: "Akademik Arka Plan",
      skills: [
        "Proje Yönetimi",
        "Bakım & Onarım",
        "Saha Mühendisliği",
        "MEP Sistemleri (HVAC/Sıhhi/Yangın)",
        "Devreye Alma & Test",
        "Teknik Raporlama",
        "AutoCAD",
        "MS Office",
      ],
    },
    summaryText:
      "Bakım, onarım ve yangın güvenliği projelerinde saha deneyimi yüksek bir makine mühendisiyim. Analitik, detay odaklı ve ekip uyumluyum; kriz anlarında hızlı aksiyon alırım. Mühendis Teğmen olarak yoğun saha bakım-onarım faaliyetlerinde teknik liderlik yaptım.",
    exp: [
      {
        company: "Foça Bakım Onarım ve İstihkam Komutanlığı",
        role: "Mühendis Teğmen",
        period: "09/2024 – 08/2025",
        bullets: [
          "3 tesiste yangın güvenliği iyileştirmeleri; ileri algılama ve gazlı/sıvı söndürme ile potansiyel risk ≈%60 azaltıldı.",
          "22 bakım–onarım projesinin teknik yürütmesi; iş güvenliği ve kaliteye tam uyumla kritik arıza 0.",
          "Standart rapor şablonlarıyla dokümantasyon sistemi; rapor hazırlama süresi −%30, doğruluk ↑.",
          "Kritik ekipmanlar için PM planı; plansız duruş −%15, ekipman ömrü ↑%20.",
        ],
      },
      {
        company: "Cansef Asansör",
        role: "Bakım Onarım Teknisyeni",
        period: "09/2023 – 08/2024",
        bullets: [
          "25+ asansörde arıza teşhis/onarım; duruş süresi ~%15 azaldı.",
          "Aylık ≈30 sistemde sahada sorun giderme; prosedür ve mevzuata tam uyum.",
          "Saha servislerinde sıfır iş güvenliği ihlali.",
        ],
      },
      {
        company: "Yılmaz Makina San. Tic. Ltd. Şti.",
        role: "Stajyer Mühendis",
        period: "07/2022 – 08/2022",
        bullets: [
          "Aparat/bağlama ve işleme parametreleri üzerinde çalışıldı; projeler %100 zamanında tamamlandı.",
          "Kalite kontrol prosedürleri uygulanarak şartnameye uygunluk ~%3 artırıldı.",
        ],
      },
      {
        company: "Sistem Alüminyum A.Ş.",
        role: "Stajyer Mühendis (Ekstrüzyon Pres)",
        period: "08/2020 – 09/2020",
        bullets: [
          "Önleyici bakım planı güncellendi; haftada 10+ kontrol; ekipman arızaları −%12.",
          "Akışlar belgelendi; ~%15 duruşa neden 3 darboğaz tespit edilip iyileştirme önerildi.",
        ],
      },
      {
        company: "Sistem Alüminyum A.Ş.",
        role: "CNC Tezgâh Kullanımı",
        period: "03/2020 – 08/2020",
        bullets: [
          "İşlenen parçaların %100’ünde kalite kontrol; tolerans dışı durumlar düzeltilerek uygunluk sağlandı.",
          "30+ teknik resim yorumlanarak parçalar tasarım toleranslarında üretildi.",
        ],
      },
    ],
    projectList: [
      "Batı Görev Grubu sahasında yangın dolaplarının yenilenmesi.",
      "Kazan dairesine 2 tonluk fuel-oil tankı kurulumu.",
      "CBRN Eğitim Sahasında 2×10 ton atık su tankı hatlarının yenilenmesi.",
      "1’inci Amfibi Tugay cephaneliklerine yeni yangın hattı çekilmesi.",
      "Foça Üs kazan dairesinde 75 tonluk su deposu yenilenmesi.",
      "5–8. Taburlar için 2×1 tonluk boiler kurulumu.",
      "Bilgi Sistemleri Odasına gazlı yangın söndürme sistemi.",
    ],
    edu: {
      school: "Trakya Üniversitesi",
      dept: "Makine Mühendisliği (Lisans)",
      year: "2018 – 2024 • Edirne, Türkiye",
    },
    certs: {
      languages: "Diller",
      englishLevel: "İngilizce",
      levelTag: "B2",
      certificates: "Sertifikalar",
      certLine: "Sıvı Yakıtlı Kalorifer Ateşçisi Belgesi (MEB)",
      badge: "Sertifika",
    },
    contact: {
      title: "Bağlantı Kur",
      formTitle: "Mesaj Gönder",
      name: "Ad Soyad",
      email: "E-posta",
      message: "Mesaj",
      send: "Gönder",
      mock: "Bu sürüm demonstrasyondur: veriler yalnızca tarayıcınızda saklanır.",
      direct: "Doğrudan İletişim",
      mail: "E-posta",
      phone: "Telefon",
      linkedin: "LinkedIn Profilim",
      footer: "Tüm hakları saklıdır.",
    },
  },

  en: {
    docTitle: "Burak Devli | Mechanical Engineer",
    brand: "Burak Devli",
    nav: {
      about: "About",
      exp: "Experience",
      portfolio: "Portfolio",
      edu: "Education",
      certs: "Languages & Certificates",
      contact: "Contact",
      download: "Download CV",
    },
    hero: {
      title: "Burak Devli",
      subtitle:
        "Mechanical Engineer | Maintenance & Repair | Project Management | Field Engineering",
      lead:
        "I specialize in maintenance planning, fault diagnosis and rapid problem-solving to keep mechanical systems running safely and reliably. From preventive maintenance to crisis response, I deliver productivity gains to high-quality standards.",
      ctaDownload: "Download CV",
      ctaContact: "Get in Touch",
      photoAlt: "Burak Devli portrait",
    },
    eyebrow: {
      about: "ABOUT",
      exp: "EXPERIENCE",
      portfolio: "PORTFOLIO",
      edu: "EDUCATION",
      certs: "LANGUAGES & CERTIFICATES",
      contact: "CONTACT",
    },
    titles: {
      summary: "Professional Summary",
      work: "Work Experience",
      portfolio: "Work & Reference Documents",
      edu: "Academic Background",
      skills: [
        "Project Management",
        "Maintenance & Repair",
        "Field Engineering",
        "MEP Systems (HVAC/Plumbing/Fire)",
        "Commissioning & Testing",
        "Technical Reporting",
        "AutoCAD",
        "MS Office",
      ],
    },
    summaryText:
      "Mechanical engineer with solid field experience across maintenance, repair and fire-safety projects. Analytical, detail-oriented and collaborative; quick to act in crises. Completed military service as an Engineering Officer, leading intensive field maintenance and repair activities.",
    exp: [
      {
        company:
          "Naval Maintenance, Repair & Construction Command (Foça)",
        role: "Engineering Officer",
        period: "Sep 2024 – Aug 2025",
        bullets: [
          "Fire-safety upgrades across three facilities; potential risk reduced by ≈60%.",
          "Coordinated technical execution for 22 maintenance projects with zero critical failures.",
          "Standardized documentation; report preparation time −30% with higher accuracy.",
          "Preventive schedules for critical assets; unplanned downtime −15%, asset life ↑20%.",
        ],
      },
      {
        company: "Cansef Elevator",
        role: "Maintenance & Repair Technician",
        period: "Sep 2023 – Aug 2024",
        bullets: [
          "Diagnosed & repaired 25+ elevator systems; downtime reduced by ~15%.",
          "Resolved on-site issues across ≈30 systems/month with full safety compliance.",
          "Zero safety violations during service calls.",
        ],
      },
      {
        company: "Yılmaz Makina Co., Ltd.",
        role: "Intern Engineer",
        period: "Jul 2022 – Aug 2022",
        bullets: [
          "Worked on fixturing and machining parameters; 100% on-time deliveries.",
          "Supported QA procedures; part conformity improved by ~3%.",
        ],
      },
      {
        company: "Sistem Aluminium Inc.",
        role: "Intern Engineer (Extrusion Press)",
        period: "Aug 2020 – Sep 2020",
        bullets: [
          "Helped update PM plan; 10+ inspections/week; equipment failures −12%.",
          "Mapped workflows; identified three bottlenecks causing ~15% downtime; proposed improvements.",
        ],
      },
      {
        company: "Sistem Aluminium Inc.",
        role: "CNC Lathe Operation",
        period: "Mar 2020 – Aug 2020",
        bullets: [
          "100% QC on machined parts, corrected deviations to meet tolerances.",
          "Interpreted 30+ blueprints and produced parts to spec.",
        ],
      },
    ],
    projectList: [
      "Replacement of fire-hose cabinets within the Western Task Group AOR.",
      "Installation of a 2-ton fuel-oil tank in the boiler plant.",
      "Renewal of piping for two × 10-ton waste-water tanks at the CBRN Training Area.",
      "New fire-fighting water main to ammunition magazines of the 1st Amphibious Brigade.",
      "Replacement of a 75-ton water tank in the boiler house.",
      "Installation of two × 1-ton boilers for the 5th–8th Battalions.",
      "Gaseous fire-suppression system for the Information Systems Room.",
    ],
    edu: {
      school: "Trakya University",
      dept: "B.Sc., Mechanical Engineering",
      year: "2018 – 2024 • Edirne, Türkiye",
    },
    certs: {
      languages: "Languages",
      englishLevel: "English",
      levelTag: "B2",
      certificates: "Certificates",
      certLine: "Liquid-Fuel Boiler Operator Certificate (MoNE, Türkiye)",
      badge: "Certificate",
    },
    contact: {
      title: "Get in Touch",
      formTitle: "Send a Message",
      name: "Full Name",
      email: "Email",
      message: "Message",
      send: "Send",
      mock: "Demo only: data is stored locally in your browser.",
      direct: "Direct Contact",
      mail: "Email",
      phone: "Phone",
      linkedin: "LinkedIn Profile",
      footer: "All rights reserved.",
    },
  },
};

/* ---------- Yardımcı UI parçaları ---------- */
const Eyebrow = ({ children }) => <div className="eyebrow">{children}</div>;

function useLang() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "tr");
  useEffect(() => localStorage.setItem("lang", lang), [lang]);
  return [lang, setLang];
}

/* ------------------------------- NAVBAR ------------------------------- */
function Navbar({ t, onToggleLang }) {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#top" className="brand">{t.brand}</a>

        <nav className="links">
          <a href="#about">{t.nav.about}</a>
          <a href="#exp">{t.nav.exp}</a>
          <a href="#portfolio">{t.nav.portfolio}</a>
          <a href="#edu">{t.nav.edu}</a>
          <a href="#certs">{t.nav.certs}</a>
          <a href="#contact">{t.nav.contact}</a>
          <a className="btn btn-primary btn-small" href={CV_URL} download target="_blank" rel="noreferrer">
            {t.nav.download}
          </a>
          <button className="lang" onClick={onToggleLang} aria-label="Change language">
            TR / EN
          </button>
        </nav>

        <button
          className="hamburger"
          aria-label="Menu"
          onClick={() => document.body.classList.toggle("drawer-open")}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className="drawer">
        <a href="#about" onClick={()=>document.body.classList.remove("drawer-open")}>{t.nav.about}</a>
        <a href="#exp" onClick={()=>document.body.classList.remove("drawer-open")}>{t.nav.exp}</a>
        <a href="#portfolio" onClick={()=>document.body.classList.remove("drawer-open")}>{t.nav.portfolio}</a>
        <a href="#edu" onClick={()=>document.body.classList.remove("drawer-open")}>{t.nav.edu}</a>
        <a href="#certs" onClick={()=>document.body.classList.remove("drawer-open")}>{t.nav.certs}</a>
        <a href="#contact" onClick={()=>document.body.classList.remove("drawer-open")}>{t.nav.contact}</a>
        <a className="btn btn-primary drawer-btn" href={CV_URL} download target="_blank" rel="noreferrer"
           onClick={()=>document.body.classList.remove("drawer-open")}>
          {t.nav.download}
        </a>
        <button className="lang drawer-lang" onClick={()=>{
          document.body.classList.remove("drawer-open"); onToggleLang();
        }}>TR / EN</button>
      </div>
    </header>
  );
}

/* ------------------------------- BÖLÜMLER ------------------------------- */
function Hero({ t }) {
  return (
    <section id="top" className="hero container">
      <div className="photo-card">
        <img className="avatar" src={PHOTO} alt={t.hero.photoAlt} />
      </div>
      <div className="hero-text">
        <h1>{t.hero.title}</h1>
        <p className="subtitle">{t.hero.subtitle}</p>
        <p className="lead">{t.hero.lead}</p>
        <div className="cta">
          <a className="btn btn-primary" href={CV_URL} download target="_blank" rel="noreferrer">
            {t.hero.ctaDownload}
          </a>
          <a className="btn btn-outline" href="#contact">{t.hero.ctaContact}</a>
        </div>
      </div>
    </section>
  );
}

function About({ t }) {
  const icons = ["calendar","wrench","map","fire","check","doc","cad","ms"];
  return (
    <section id="about" className="container section">
      <Eyebrow>{t.eyebrow.about}</Eyebrow>
      <h2>{t.titles.summary}</h2>

      <div className="card"><p>{t.summaryText}</p></div>

      <div className="skills-grid">
        {t.titles.skills.map((label, i) => (
          <div className="skill" key={label}>
            <span className={`ico ${icons[i]}`} aria-hidden />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience({ t }) {
  return (
    <section id="exp" className="container section">
      <Eyebrow>{t.eyebrow.exp}</Eyebrow>
      <h2>{t.titles.work}</h2>

      <div className="timeline">
        {t.exp.map((it) => (
          <article className="tl-item" key={it.company + it.period}>
            <div className="tl-dot" />
            <div className="tl-card">
              <h3 className="tl-title">{it.company}</h3>
              <p className="tl-sub">{it.period} · {it.role}</p>
              <ul>{it.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Portfolio({ t }) {
  return (
    <section id="portfolio" className="container section">
      <Eyebrow>{t.eyebrow.portfolio}</Eyebrow>
      <h2>{t.titles.portfolio}</h2>

      <div className="portfolio-grid">
        <figure className="portfolio-card">
          <img src={PORTFOLIO_IMG} alt="Görev ve Sorumluluk Beyanı / Statement" className="portfolio-img" />
          <figcaption className="portfolio-meta">
            <div className="title">{t.nav.portfolio}</div>
            <ul className="proj">
              {t.projectList.map(p => <li key={p}>{p}</li>)}
            </ul>
            <div className="actions">
              <a className="btn btn-outline" href={PORTFOLIO_IMG} target="_blank" rel="noreferrer">
                {t.lang === "tr" ? "Büyüt" : "Open"}
              </a>
              <a className="btn btn-primary" href={PORTFOLIO_IMG} download>
                {t.lang === "tr" ? "İndir (JPG)" : "Download (JPG)"}
              </a>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Education({ t }) {
  return (
    <section id="edu" className="container section">
      <Eyebrow>{t.eyebrow.edu}</Eyebrow>
      <h2>{t.titles.edu}</h2>
      <div className="card">
        <p className="edu-title">{t.edu.school}<br />{t.edu.dept}</p>
        <p className="muted">{t.edu.year}</p>
      </div>
    </section>
  );
}

function Certifications({ t }) {
  return (
    <section id="certs" className="container section">
      <Eyebrow>{t.eyebrow.certs}</Eyebrow>
      <h2>{t.nav.certs}</h2>

      <div className="card">
        <h4>{t.certs.languages}</h4>
        <p>{t.certs.englishLevel} <span className="badge">{t.certs.levelTag}</span></p>
      </div>

      <div className="card">
        <h4>{t.certs.certificates}</h4>
        <div className="cert-row">
          <span className="badge outline">{t.certs.badge}</span>
          <span>{t.certs.certLine}</span>
        </div>
      </div>
    </section>
  );
}

function Contact({ t }) {
  return (
    <section id="contact" className="container section">
      <Eyebrow>{t.eyebrow.contact}</Eyebrow>
      <h2>{t.contact.title}</h2>

      <div className="grid-2">
        <form
          className="card form"
          onSubmit={(e)=>{e.preventDefault(); alert(t.contact.mock);}}
        >
          <h4>{t.contact.formTitle}</h4>
          <label>{t.contact.name}<input placeholder={t.contact.name} /></label>
          <label>{t.contact.email}<input type="email" placeholder="email@example.com" /></label>
          <label>{t.contact.message}<textarea rows={6} placeholder={t.contact.message} /></label>
          <button className="btn btn-primary" type="submit">{t.contact.send}</button>
          <p className="help">{t.contact.mock}</p>
        </form>

        <div className="card contact-card">
          <h4>{t.contact.direct}</h4>
          <p><span className="ico mail" /> <a href="mailto:burakdevli2@gmail.com">burakdevli2@gmail.com</a></p>
          <p><span className="ico phone" /> <a href="tel:+905331360059">+90 533 136 00 59</a></p>
          <p><span className="ico in" /> <a href="https://www.linkedin.com/in/burak-devli" target="_blank" rel="noreferrer">{t.contact.linkedin}</a></p>
        </div>
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} Burak Devli. {t.contact.footer}</span>
        <div className="footer-links">
          <a href="mailto:burakdevli2@gmail.com">{t.contact.mail}</a>
          <span>•</span>
          <a href="tel:+905331360059">{t.contact.phone}</a>
          <span>•</span>
          <a href="https://www.linkedin.com/in/burak-devli" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------- APP ------------------------------- */
export default function App() {
  const [lang, setLang] = useLang();
  const t = useMemo(() => ({ ...COPY[lang], lang }), [lang]);

  useEffect(() => { document.title = t.docTitle; }, [t.docTitle]);

  return (
    <>
      <Navbar
        t={t}
        onToggleLang={() => setLang((p) => (p === "tr" ? "en" : "tr"))}
      />
      <Hero t={t} />
      <About t={t} />
      <Experience t={t} />
      <Portfolio t={t} />
      <Education t={t} />
      <Certifications t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </>
  );
}

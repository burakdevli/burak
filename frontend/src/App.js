// frontend/src/App.js
import { useState } from "react";
import "./App.css";

/** Statik varlık yolları (GitHub Pages alt dizini için güvenli) */
const PHOTO = process.env.PUBLIC_URL + "/FGS_2955.jpg";
const CV_URL = process.env.PUBLIC_URL + "/BURAK_DEVLI_CV.pdf";
const PORTFOLIO_PDF = process.env.PUBLIC_URL + "/Portfolyo.pdf";

/** ----------------------- NAVBAR ----------------------- */
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#about", label: "Hakkımda" },
    { href: "#exp", label: "Deneyim" },
    { href: "#portfolio", label: "Portfolyo" },
    { href: "#edu", label: "Eğitim" },
    { href: "#certs", label: "Dil & Sertifikalar" },
    { href: "#contact", label: "İletişim" },
  ];

  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#top" className="brand">Burak Devli</a>

        {/* Masaüstü bağlantıları */}
        <nav className="links">
          {links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
          <a className="btn btn-primary btn-small" href={CV_URL} download>
            CV’yi indir
          </a>
        </nav>

        {/* Mobil hamburger */}
        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menüyü aç/kapat">
          <span /><span /><span />
        </button>
      </div>

      {/* Mobil çekmece */}
      {open && (
        <div className="drawer">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a className="btn btn-primary drawer-btn" href={CV_URL} download onClick={() => setOpen(false)}>
            CV’yi indir
          </a>
        </div>
      )}
    </header>
  );
}

/** ----------------------- HERO ----------------------- */
function Hero() {
  return (
    <section id="top" className="hero container">
      <div className="photo-card">
        <img className="avatar" src={PHOTO} alt="Burak Devli" />
      </div>

      <div className="hero-text">
        <h1>Burak Devli</h1>
        <p className="subtitle">
          Makine Mühendisi | Bakım &amp; Onarım | Proje Yönetimi | Saha Mühendisliği
        </p>
        <p className="lead">
          Mekanik sistemlerin sürekli ve güvenli çalışması için bakım planlama, arıza tespiti
          ve hızlı çözüm üretme konusunda uzmanım. Önleyici bakım süreçlerinden kriz yönetimine
          kadar geniş mühendislik becerilerimle, yüksek kalite standartlarında verimlilik artışı sağlarım.
        </p>
        <div className="cta">
          <a className="btn btn-primary" href={CV_URL} download>CV’yi İndir</a>
          <a className="btn btn-outline" href="#contact">İletişime Geç</a>
        </div>
      </div>
    </section>
  );
}

const Eyebrow = ({ children }) => <div className="eyebrow">{children}</div>;

/** ----------------------- HAKKIMDA + YETENEKLER ----------------------- */
function About() {
  const skills = [
    { icon: "calendar", label: "Proje Yönetimi" },
    { icon: "wrench", label: "Bakım & Onarım" },
    { icon: "map", label: "Saha Uygulamaları" },
    { icon: "warning", label: "Kriz Yönetimi" },
    { icon: "team", label: "Takım Liderliği" },
    { icon: "doc", label: "Teknik Raporlama" },
    { icon: "ruler", label: "AutoCAD" },
    { icon: "ms", label: "MS Office" },
  ];

  return (
    <section id="about" className="container section">
      <Eyebrow>HAKKIMDA</Eyebrow>
      <h2>Profesyonel Özet</h2>

      <div className="card">
        <p>
          Takım çalışmasına yatkın, analitik düşünebilen ve saha tecrübesi yüksek bir makine mühendisiyim.
          Mühendis asteğmen olarak askerlik görevimi yoğun saha bakım ve onarım faaliyetleriyle tamamladım.
          Amacım, üretim odaklı ve yüksek kalite standartlarına sahip firmalarda mühendislik yetkinliklerimle fark yaratmaktır.
        </p>
      </div>

      <div className="skills-grid">
        {skills.map((s) => (
          <div className="skill" key={s.label}>
            <span className={`ico ${s.icon}`} aria-hidden />
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/** ----------------------- DENEYİM (Zaman Çizelgesi) ----------------------- */
function Experience() {
  const items = [
    {
      company: "Foça Bakım Onarım ve İstihkam Komutanlığı",
      role: "Mühendis Asteğmen",
      period: "Eyl 2024 – Ağu 2025",
      bullets: [
        "20+ bakım, onarım ve yangın güvenliği projesinin teknik liderliği",
        "Saha uygulamaları ve teknik raporlama",
        "Kriz anlarında hızlı çözüm ve ekip yönetimi",
      ],
    },
    {
      company: "Cansef Asansör",
      role: "Bakım Onarım Teknisyeni",
      period: "Eyl 2023 – Ağu 2024",
      bullets: ["Asansör bakım, montaj ve arıza giderme", "Teknik servis"],
    },
    {
      company: "Yılmaz Makina San. Tic. Ltd. Şti.",
      role: "Stajyer Mühendis",
      period: "Tem 2022 – Ağu 2022",
      bullets: ["Endüstriyel makine ve parça üretimi"],
    },
    {
      company: "Sistem Alüminyum San. ve Tic. A.Ş.",
      role: "Stajyer Mühendis",
      period: "Ağu 2020 – Eyl 2020",
      bullets: ["Ekstrüzyon pres bölümü"],
    },
    {
      company: "Sistem Alüminyum San. ve Tic. A.Ş.",
      role: "CNC Torna Tezgah Kullanımı",
      period: "Mar 2020 – Ağu 2020",
      bullets: ["Mekanik işlem bölümü"],
    },
  ];

  return (
    <section id="exp" className="container section">
      <Eyebrow>DENEYİM</Eyebrow>
      <h2>İş Tecrübeleri</h2>

      <div className="timeline">
        {items.map((it) => (
          <article className="tl-item" key={it.company + it.period}>
            <div className="tl-dot" />
            <div className="tl-card">
              <h3 className="tl-title">{it.company}</h3>
              <p className="tl-sub">{it.period} · {it.role}</p>
              <ul>
                {it.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/** ----------------------- PORTFOLYO (Belge görseli) ----------------------- */
function Portfolio() {
  return (
    <section id="portfolio" className="container section">
      <Eyebrow>PORTFOLYO</Eyebrow>
      <h2>Çalışma & Referans Belgeleri</h2>

      <div className="portfolio-grid">
        <figure className="portfolio-card">
          <a href={PORTFOLIO_IMG} target="_blank" rel="noreferrer" title="Büyüt">
            <img src={PORTFOLIO_IMG} alt="Görev ve Sorumluluk Beyanı" loading="lazy" />
          </a>
          <figcaption className="portfolio-meta">
            <div className="title">Görev ve Sorumluluk Beyanı</div>
            <div className="sub">Foça Bakım Onarım ve İstihkam Komutanlığı</div>
            <div className="actions">
              <a className="btn btn-outline" href={PORTFOLIO_IMG} target="_blank" rel="noreferrer">Büyüt</a>
              <a className="btn btn-primary" href={PORTFOLIO_IMG} download>İndir (JPG)</a>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/** ----------------------- EĞİTİM ----------------------- */
function Education() {
  return (
    <section id="edu" className="container section">
      <Eyebrow>EĞİTİM</Eyebrow>
      <h2>Akademik Arka Plan</h2>
      <div className="card">
        <p className="edu-title">Trakya Üniversitesi<br />Makine Mühendisliği</p>
        <p className="muted">2024</p>
      </div>
    </section>
  );
}

/** ----------------------- DİL & SERTİFİKALAR ----------------------- */
function Certifications() {
  return (
    <section id="certs" className="container section">
      <Eyebrow>DİL &amp; SERTİFİKALAR</Eyebrow>
      <h2>Yetkinlikler</h2>

      <div className="card">
        <h4>Diller</h4>
        <p>İngilizce <span className="badge">B2</span></p>
      </div>

      <div className="card">
        <h4>Sertifikalar</h4>
        <p><span className="badge outline">Sertifika</span> Sıvı Yakıtlı Kalorifer Ateşçisi Sertifikası</p>
      </div>
    </section>
  );
}

/** ----------------------- İLETİŞİM ----------------------- */
function Contact() {
  return (
    <section id="contact" className="container section">
      <Eyebrow>İLETİŞİM</Eyebrow>
      <h2>Bağlantı Kur</h2>

      <div className="grid-2">
        <form
          className="card form"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Bu sürüm mock'tur. Form verileri tarayıcıda tutulur.");
          }}
        >
          <h4>Mesaj Gönder</h4>
          <label>Ad Soyad<input placeholder="Adınız" /></label>
          <label>E-posta<input placeholder="email@ornek.com" type="email" /></label>
          <label>Mesaj<textarea placeholder="Mesajınız" rows={6} /></label>
          <button className="btn btn-primary" type="submit">Gönder</button>
          <p className="help">Bu sürüm mock'tur: Form verileri yalnızca tarayıcıda saklanır.</p>
        </form>

        <div className="card contact-card">
          <h4>Doğrudan İletişim</h4>
          <p><span className="ico mail" /> <a href="mailto:burakdevli2@gmail.com">burakdevli2@gmail.com</a></p>
          <p><span className="ico phone" /> 0533 136 00 59</p>
          <p><span className="ico in" /> <a href="https://www.linkedin.com/in/burak-devli" target="_blank" rel="noreferrer">LinkedIn Profilim</a></p>
        </div>
      </div>
    </section>
  );
}

/** ----------------------- FOOTER ----------------------- */
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} Burak Devli. Tüm hakları saklıdır.</span>
        <div className="footer-links">
          <a href="mailto:burakdevli2@gmail.com">E-posta</a>
          <span>•</span>
          <a href="tel:+905331360059">Telefon</a>
          <span>•</span>
          <a href="https://www.linkedin.com/in/burak-devli" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

/** ----------------------- SAYFA ----------------------- */
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Portfolio />
      <Education />
      <Certifications />
      <Contact />
      <Footer />
    </>
  );
}

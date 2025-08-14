// frontend/src/App.js
import "./App.css";

const PHOTO = process.env.PUBLIC_URL + "/FGS_2955.jpg";
const CV_URL = process.env.PUBLIC_URL + "/BURAK_DEVLI_CV.pdf";

function Navbar() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#top" className="brand">Burak Devli</a>
        <nav className="links">
          <a href="#about">Hakkımda</a>
          <a href="#skills">Yetenekler</a>
          <a href="#exp">Deneyim</a>
          <a href="#edu">Eğitim</a>
          <a href="#contact">İletişim</a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero container">
      <img className="avatar" src={PHOTO} alt="Burak Devli" />
      <div className="hero-text">
        <h1>Burak Devli</h1>
        <p className="subtitle">
          Makine Mühendisi • Bakım & Onarım • Proje Yönetimi • Saha Mühendisliği
        </p>
        <div className="cta">
          <a className="btn btn-primary" href={CV_URL} download>
            CV’yi indir
          </a>
          <a
            className="btn btn-outline"
            href="https://www.linkedin.com/in/burak-devli"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="container section">
      <h2>Hakkımda</h2>
      <p>
        Mekanik sistemlerin sürekli ve güvenli çalışması için bakım planlama, arıza tespiti
        ve hızlı çözüm üretme konusunda uzmanım. Önleyici/periyodik bakım, saha uygulamaları
        ve teknik raporlama konularında güçlü pratiğim var. Mühendis asteğmen olarak
        yoğun saha bakım ve onarım faaliyetleri yürüttüm; kriz anlarında ekip yönetimi ve
        hızlı karar alma ile verimlilik artışı sağladım.
      </p>
    </section>
  );
}

function Skills() {
  const skills = [
    "Proje Yönetimi",
    "Bakım & Onarım",
    "Saha Uygulamaları",
    "Kriz Yönetimi",
    "Takım Liderliği",
    "Teknik Raporlama",
    "AutoCAD",
    "MS Office",
  ];
  return (
    <section id="skills" className="container section">
      <h2>Yetenekler</h2>
      <ul className="skills">
        {skills.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </section>
  );
}

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
      role: "CNC Torna Elemanı",
      period: "Mar 2020 – Ağu 2020",
      bullets: ["Mekanik işlem bölümü"],
    },
  ];
  return (
    <section id="exp" className="container section">
      <h2>Deneyim</h2>
      <div className="timeline">
        {items.map((it) => (
          <div key={it.company + it.period} className="timeline-item">
            <div className="when">{it.period}</div>
            <div className="what">
              <h3>{it.company}</h3>
              <p className="role">{it.role}</p>
              <ul>
                {it.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="edu" className="container section">
      <h2>Eğitim & Sertifikalar</h2>
      <div className="card">
        <p>
          <strong>Trakya Üniversitesi – Makine Mühendisliği (Lisans)</strong>
          <br />
          2018 – 2024
        </p>
        <p>
          <strong>Sertifika:</strong> Sıvı Yakıtlı Kalorifer Ateşçisi Belgesi (MEB)
        </p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="container section">
      <h2>İletişim</h2>
      <div className="card">
        <p>
          <strong>E-posta:</strong>{" "}
          <a href="mailto:burakdevli2@gmail.com">burakdevli2@gmail.com</a>
        </p>
        <p>
          <strong>Telefon:</strong> 0533 136 00 59
        </p>
        <p>
          <strong>LinkedIn:</strong>{" "}
          <a
            href="https://www.linkedin.com/in/burak-devli"
            target="_blank"
            rel="noreferrer"
          >
            linkedin.com/in/burak-devli
          </a>
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} Burak Devli</span>
        <a
          href={CV_URL}
          download
          className="footer-link"
          title="CV’yi indir"
        >
          CV (PDF)
        </a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </>
  );
}

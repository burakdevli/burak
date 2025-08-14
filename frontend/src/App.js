// frontend/src/App.js

function Hero() {
  const photo = process.env.PUBLIC_URL + "/FGS_2955.jpg";
  const cvUrl = process.env.PUBLIC_URL + "/BURAK_DEVLI__CV.pdf";

  return (
    <section style={{display:"flex",gap:"24px",alignItems:"center",padding:"32px"}}>
      <img
        src={photo}
        alt="Burak Devli"
        style={{width:160,height:160,objectFit:"cover",borderRadius:"50%"}}
      />

      <div>
        <h1 style={{margin:"0 0 8px 0"}}>Burak Devli</h1>
        <p style={{margin:"0 0 16px 0"}}>
          Makine Mühendisi | Bakım & Onarım | Proje Yönetimi | Saha Mühendisliği
        </p>

        <a
          href={cvUrl}
          download
          target="_blank"
          rel="noreferrer"
          style={{
            display:"inline-block",
            padding:"10px 14px",
            border:"1px solid #1E3A8A",
            borderRadius:8,
            textDecoration:"none"
          }}
        >
          CV’yi İndir
        </a>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main>
      <Hero />
      {/* sitenin diğer bölümleri burada olabilir */}
    </main>
  );
}

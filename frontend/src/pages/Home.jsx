import React, { useEffect, useMemo, useState } from "react";
import { PROFILE, SKILLS, EXPERIENCE, EDUCATION, CERTIFICATIONS, LANGUAGES, PORTFOLIO } from "../mock/mock";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../hooks/use-toast";
import PortfolioCard from "../components/PortfolioCard";
import {
  ClipboardList,
  Wrench,
  MapPinned,
  AlertTriangle,
  Users,
  FileText,
  Ruler,
  FileSpreadsheet,
  Mail,
  Phone,
  Linkedin,
  Download,
} from "lucide-react";

const iconMap = {
  ClipboardList,
  Wrench,
  MapPinned,
  AlertTriangle,
  Users,
  FileText,
  Ruler,
  FileSpreadsheet,
};

const SectionHeader = ({ label, title, id }) => (
  <div id={id} className="mb-6">
    <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#1E3A8A]">{label}</p>
    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-2">{title}</h2>
  </div>
);

export default function Home() {
  const { toast } = useToast();
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const handler = () => setNavOpen(false);
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const skillItems = useMemo(
    () =>
      SKILLS.map((s, idx) => {
        const Icon = iconMap[s.icon] || FileText;
        return (
          <div
            key={idx}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-none hover:shadow-sm transition-colors"
          >
            <Icon size={18} className="text-[#1E3A8A]" />
            <span className="text-sm text-gray-800">{s.label}</span>
          </div>
        );
      }),
    []
  );

  const onSubmitContact = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
      ts: new Date().toISOString(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      toast({
        title: "Eksik bilgi",
        description: "Lütfen tüm alanları doldurun",
      });
      return;
    }

    try {
      const existing = JSON.parse(localStorage.getItem("contact_submissions") || "[]");
      existing.push(payload);
      localStorage.setItem("contact_submissions", JSON.stringify(existing));
      (e.target).reset();
      toast({
        title: "Mesaj gönderildi",
        description: "Mock olarak tarayıcıya kaydedildi.",
      });
    } catch (err) {
      toast({ title: "Hata", description: "Kaydetme sırasında bir sorun oluştu." });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 relative">
      {/* Minimal Grid Background */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          backgroundColor: "#f8fafc",
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#hero" className="font-semibold tracking-wide text-gray-900">Burak Devli</a>
          <nav className="hidden md:flex items-center gap-6">
            <a className="text-xs text-gray-700 hover:text-[#1E3A8A]" href="#about">Hakkımda</a>
            <a className="text-xs text-gray-700 hover:text-[#1E3A8A]" href="#experience">Deneyim</a>
            <a className="text-xs text-gray-700 hover:text-[#1E3A8A]" href="#portfolio">Portfolyo</a>
            <a className="text-xs text-gray-700 hover:text-[#1E3A8A]" href="#education">Eğitim</a>
            <a className="text-xs text-gray-700 hover:text-[#1E3A8A]" href="#languages">Dil & Sertifikalar</a>
            <a className="text-xs text-gray-700 hover:text-[#1E3A8A]" href="#contact">İletişim</a>
            <a href={PROFILE.cvUrl} target="_blank" rel="noopener" className="inline-flex">
              <Button className="rounded-none bg-[#1E3A8A] text-white hover:bg-[#1b3579] h-9">
                <Download size={16} className="mr-2" /> CV'yi İndir
              </Button>
            </a>
          </nav>
          <button onClick={() => setNavOpen((s) => !s)} className="md:hidden text-gray-700" aria-label="menu">
            ☰
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 flex flex-col gap-2">
              <a href="#about" className="text-sm">Hakkımda</a>
              <a href="#experience" className="text-sm">Deneyim</a>
              <a href="#portfolio" className="text-sm">Portfolyo</a>
              <a href="#education" className="text-sm">Eğitim</a>
              <a href="#languages" className="text-sm">Dil & Sertifikalar</a>
              <a href="#contact" className="text-sm">İletişim</a>
              <a href={PROFILE.cvUrl} target="_blank" rel="noopener" className="inline-flex">
                <Button className="rounded-none bg-[#1E3A8A] text-white hover:bg-[#1b3579] w-full">CV'yi İndir</Button>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="hero" className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-gray-900">{PROFILE.name}</h1>
            <p className="mt-3 text-[#1E3A8A] font-medium">{PROFILE.title}</p>
            <p className="mt-4 text-gray-700 leading-relaxed">{PROFILE.summary}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={PROFILE.cvUrl} target="_blank" rel="noopener">
                <Button className="rounded-none bg-[#1E3A8A] text-white hover:bg-[#1b3579]">CV'yi İndir</Button>
              </a>
              <a href="#contact">
                <Button variant="outline" className="rounded-none border-[#1E3A8A] text-[#1E3A8A] hover:bg-blue-50">İletişime Geç</Button>
              </a>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-none overflow-hidden border border-gray-300 bg-white shadow-sm">
              <img src={PROFILE.photoUrl} alt="Burak Devli" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        <SectionHeader label="Hakkımda" title="Profesyonel Özet" />
        <Card className="rounded-none">
          <CardContent className="pt-6">
            <p className="text-gray-800 leading-relaxed">
              Takım çalışmasına yatkın, analitik düşünebilen ve saha tecrübesi yüksek bir makine mühendisiyim. Mühendis asteğmen olarak askerlik görevimi yoğun saha bakım ve onarım faaliyetleriyle tamamladım. Amacım, üretim odaklı ve yüksek kalite standartlarına sahip firmalarda mühendislik yetkinliklerimle fark yaratmaktır.
            </p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {skillItems}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Experience */}
      <section id="experience" className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        <SectionHeader label="Deneyim" title="İş Tecrübeleri" />
        <div className="relative">
          <div className="absolute left-4 md:left-1.5 top-0 bottom-0 w-1 bg-blue-900/30" />
          <div className="space-y-6">
            {EXPERIENCE.map((item, idx) => (
              <Card key={idx} className="relative rounded-none">
                <span className="absolute -left-1.5 md:-left-2 top-6 w-3 h-3 bg-[#1E3A8A]" />
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-gray-900">{item.company}</CardTitle>
                  <div className="text-sm text-gray-500">{item.dates} • {item.role}</div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 text-gray-800 space-y-1">
                    {item.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        <SectionHeader label="Portfolyo" title="Belgeler ve Çalışmalar" />
        <div className="grid md:grid-cols-2 gap-6">
          {PORTFOLIO.map((p, i) => (
            <PortfolioCard key={i} item={p} />
          ))}
        </div>
      </section>

      {/* Education Only */}
      <section id="education" className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        <SectionHeader label="Eğitim" title="Akademik Arka Plan" />
        <Card className="rounded-none">
          <CardHeader>
            <CardTitle className="text-gray-900">Eğitim</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {EDUCATION.map((e, i) => (
              <div key={i}>
                <p className="font-medium text-gray-900">{e.school}</p>
                <p className="text-sm text-gray-600">{e.degree}</p>
                <p className="text-xs text-gray-500">{e.year}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Languages & Certifications */}
      <section id="languages" className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        <SectionHeader label="Dil & Sertifikalar" title="Yetkinlikler" />
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-none">
            <CardHeader>
              <CardTitle className="text-gray-900">Diller</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {LANGUAGES.map((l, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-gray-800">{l.name}</span>
                  <Badge className="rounded-none bg-blue-50 text-[#1E3A8A] border border-blue-200">{l.level}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardHeader>
              <CardTitle className="text-gray-900">Sertifikalar</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {CERTIFICATIONS.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Badge className="rounded-none bg-blue-50 text-[#1E3A8A] border border-blue-200">Sertifika</Badge>
                  <span className="text-gray-800">{c.name}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-6 md:py-12">
        <SectionHeader label="İletişim" title="Bağlantı Kur" />
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-none">
            <CardHeader>
              <CardTitle className="text-gray-900">Mesaj Gönder</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmitContact} className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Ad Soyad</label>
                  <Input name="name" placeholder="Adınız" className="rounded-none" />
                </div>
                <div>
                  <label className="block text-sm mb-1">E‑posta</label>
                  <Input type="email" name="email" placeholder="email@ornek.com" className="rounded-none" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Mesaj</label>
                  <Textarea name="message" placeholder="Mesajınız" rows={5} className="rounded-none" />
                </div>
                <Button type="submit" className="rounded-none bg-[#1E3A8A] text-white hover:bg-[#1b3579]">Gönder</Button>
                <p className="text-xs text-gray-500">Bu sürüm mock'tur: Form verileri yalnızca tarayıcıda saklanır.</p>
              </form>
            </CardContent>
          </Card>
          <Card className="rounded-none">
            <CardHeader>
              <CardTitle className="text-gray-900">Doğrudan İletişim</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-800">
              <div className="flex items-center gap-2"><Mail size={18} className="text-[#1E3A8A]" /><a href={`mailto:${PROFILE.email}`} className="hover:underline">{PROFILE.email}</a></div>
              <div className="flex items-center gap-2"><Phone size={18} className="text-[#1E3A8A]" /><a href={`tel:${PROFILE.phone}`} className="hover:underline">{PROFILE.phone}</a></div>
              <div className="flex items-center gap-2"><Linkedin size={18} className="text-[#1E3A8A]" /><a href={PROFILE.linkedin} className="hover:underline" target="_blank" rel="noopener">LinkedIn Profilim</a></div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Burak Devli. Tüm hakları saklıdır.</div>
          <div className="flex items-center gap-4">
            <a href={`mailto:${PROFILE.email}`} className="hover:text-[#1E3A8A]">E‑posta</a>
            <a href={`tel:${PROFILE.phone}`} className="hover:text-[#1E3A8A]">Telefon</a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener" className="hover:text-[#1E3A8A]">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
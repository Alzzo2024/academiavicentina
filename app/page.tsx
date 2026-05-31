"use client";

import { useState, useEffect, MouseEvent } from "react";
import Link from "next/link";

interface Artigo {
  id: string;
  titulo: string;
  subtexto: string;
  autor: string;
  data: string;
  leitura: string;
  imagem: string;
}

const FALLBACK_ARTIGOS: Artigo[] = [
  {
    id: "o-engodo-de-abril",
    titulo: "O Engodo de Abril",
    subtexto:
      "Faz 52 anos desde a «Revolução dos Cravos». À mesma hora da publicação deste artigo, o capitão Salgueiro Maia «solicitou» a rendição do Prof. Marcello Caetano.",
    autor: "A. Valadão Moreira",
    data: "26 de Abril de 2026",
    leitura: "9 min leitura",
    imagem: "/img/25deabril.png",
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [artesAberto, setArtesAberto] = useState(false);
  const [estrategiaAberto, setEstrategiaAberto] = useState(false);

  const artigos = FALLBACK_ARTIGOS;
  const artigosExibidos = artigos.slice(0, 3);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight - 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section className="hero-initial" id="inicio">
        <div className="hero-layout">
          <div className="hero-nav-left">
            <a href="#sobre">Sobre</a>
            <a href="#artigos">Artigos</a>
            <a href="#actividades">Actividades</a>
          </div>

          <div className="hero-center-box">
            <img
              src="/img/academiavicentinalogopng.png"
              alt="Academia Vicentina"
              className="logo-center-img"
            />
          </div>

          <div className="hero-right-box">
            <a
              href="https://tr.ee/DCSZ8PFj_V"
              target="_blank"
              rel="noreferrer"
              className="btn-hollow"
            >
              Aderir
            </a>
          </div>
        </div>
      </section>

      <header className={`fixed-header ${scrolled ? "visible" : ""}`}>
        <div className="header-inner">
          <nav>
            <ul>
              <li>
                <a href="#sobre">Sobre</a>
              </li>
              <li>
                <a href="#artigos">Artigos</a>
              </li>
              <li>
                <a href="#actividades">Actividades</a>
              </li>
            </ul>
          </nav>

          <div className="logo-center-wrap">
            <a href="#inicio">
              <img
                src="/img/academiavicentinalogopng.png"
                alt="Logo"
                className="logo-img"
              />
            </a>
          </div>

          <div className="header-right-wrap">
            <a
              href="https://tr.ee/DCSZ8PFj_V"
              target="_blank"
              rel="noreferrer"
              className="btn-hollow"
            >
              Aderir
            </a>
          </div>
        </div>

        <div className="header-divider-line"></div>
      </header>

      <div className="marquee-container">
        <div className="marquee-wrapper">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i}>Usque ad finem —</span>
          ))}
        </div>
      </div>

      <section className="section-sobre" id="sobre">
  <div style={{ maxWidth: "850px", margin: "0 auto" }}>
    <h2 className="font-serif-title">
      Bem-vindo à Academia Vicentina
    </h2>

    <p className="font-editorial-body">
      A Academia Vicentina nasce da convicção de que a formação intelectual não é um luxo reservado a especialistas, mas antes uma exigência própria de qualquer vida que se pretenda consciente, ordenada e orientada pela verdade. Num tempo marcado pela dispersão, pela superficialidade e pela fragmentação do conhecimento histórico, impõe-se a necessidade de recuperar o estudo como acto deliberado, exigente e comunitário.
    </p>

    <div style={{ marginTop: "35px" }}>
      <a
        href="https://tr.ee/nwHQOaoPDu"
        className="btn-hollow label-gold"
      >
        Declaração de Princípios
      </a>
    </div>
  </div>
</section>

      <section className="section-artigos" id="artigos">
        <div className="artigos-max-bounds">
          <h2 className="font-serif-title">Artigos</h2>

          <div className="artigos-vertical-grid">
            {artigosExibidos.map((artigo) => (
              <Link
                key={artigo.id}
                href={`/artigos/${artigo.id}`}
                className="artigo-vertical-card"
              >
                <div
                  className="artigo-v-img-box"
                  style={{
                    backgroundImage: `url('${artigo.imagem}')`,
                  }}
                />

                <div className="artigo-v-content-box">
                  <h3>{artigo.titulo}</h3>

                  <p className="artigo-subtext-fade">
                    {artigo.subtexto}
                  </p>

                  <div className="artigo-meta-container">
                    <span>{artigo.autor}</span>
                    <span>•</span>
                    <span>{artigo.data}</span>
                    <span>•</span>
                    <span>{artigo.leitura}</span>
                  </div>

                  <span className="artigo-link-action">
                    Ler artigo →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="ver-mais-container">
            <Link href="/atalaia" className="btn-hollow label-gold">
              REVISTA ATALAIA
            </Link>
          </div>
        </div>
      </section>

      <section className="section-atividades" id="actividades">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 className="font-serif-title">Actividades</h2>

          <div className="atividades-grid">
            <div
              className="atividade-card-master card-artes"
              onClick={() => setArtesAberto(!artesAberto)}
            >
              <div className="card-tint-overlay"></div>

              <div className="card-interactive-content">
                <img
                  src="/img/artesecultura.png"
                  alt="Artes e Cultura"
                  className="logo-activity-icon"
                />

                <h3>Artes e Cultura</h3>

                <div
                  className={`sub-blocos-container ${
                    artesAberto ? "aberto" : ""
                  }`}
                  onClick={(e: MouseEvent<HTMLDivElement>) =>
                    e.stopPropagation()
                  }
                >
                  <div className="sub-bloco-rect">Leitura</div>
                  <div className="sub-bloco-rect">Artes</div>
                  <div className="sub-bloco-rect">Música</div>
                </div>
              </div>
            </div>

            <div
              className="atividade-card-master card-estrategia"
              onClick={() =>
                setEstrategiaAberto(!estrategiaAberto)
              }
            >
              <div className="card-tint-overlay"></div>

              <div className="card-interactive-content">
                <img
                  src="/img/actividadesestrategicas.png"
                  alt="Actividades Estratégicas"
                  className="logo-activity-icon"
                />

                <h3>Actividades Estratégicas</h3>

                <div
                  className={`sub-blocos-container ${
                    estrategiaAberto ? "aberto" : ""
                  }`}
                  onClick={(e: MouseEvent<HTMLDivElement>) =>
                    e.stopPropagation()
                  }
                >
                  <div className="sub-bloco-rect">Xadrez</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-logo-wrap">
            <img
              src="/img/academiavicentinalogotexto.png"
              alt="Academia Vicentina"
              className="logo-footer-img"
            />
          </div>

          <p className="footer-email">
            academiavicentina2026@gmail.com
          </p>
        </div>

        <div className="footer-bottom">
          <p>
            © 2026 Academia Vicentina. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
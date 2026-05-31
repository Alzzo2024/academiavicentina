"use client";

import { useState, useEffect, MouseEvent } from "react";
import Link from "next/link";
import { sanity } from "@/app/lib/sanity";

interface ArtigoAtalaia {
  id: string;
  titulo: string;
  resumo: string;
  autor: string;
  data: string;
  imagem: string;
  categorias: string[];
}

const GROQ_QUERY = `*[_type == "artigo"] | order(data desc) {
  "id": slug.current,
  titulo,
  "resumo": subtexto,
  autor,
  data,
  "imagem": imagem.asset->url,
  categorias
}`;

export default function AtalaiaHome() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [catAberto, setCatAberto] = useState<boolean>(false);
  const [revAberto, setRevAberto] = useState<boolean>(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
  const [verSobre, setVerSobre] = useState<boolean>(false);
  const [artigos, setArtigos] = useState<ArtigoAtalaia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch ao Sanity
  useEffect(() => {
    sanity
      .fetch<ArtigoAtalaia[]>(GROQ_QUERY)
      .then((data) => {
        setArtigos(data ?? []);
      })
      .catch((err) => {
        console.error("Erro ao carregar artigos do Sanity:", err);
        setArtigos([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 120);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filtragem
  const artigosFiltrados = categoriaSelecionada
    ? artigos.filter((a) => a.categorias?.includes(categoriaSelecionada))
    : artigos;

  const artigoDestaque = artigosFiltrados[0];
  const restoDosArtigos = artigosFiltrados.slice(1);

  // Navegação
  const navegarParaInicioAtalaia = () => {
    setVerSobre(false);
    setCategoriaSelecionada(null);
  };

  const navegarParaSobre = () => {
    setVerSobre(true);
    setCategoriaSelecionada(null);
  };

  const selecionarCategoria = (cat: string) => {
    setVerSobre(false);
    setCategoriaSelecionada(cat);
    setCatAberto(false);
  };

  return (
    <div className="atalaia-body">

      {/* HERO */}
      <section className="atalaia-hero" id="inicio">
        <div className="atalaia-hero-layout">
          <div className="atalaia-hero-left">
            <Link href="/" className="atalaia-back-link">
              ← Voltar à página inicial
            </Link>
          </div>
          <div className="atalaia-hero-center">
            <img src="/img/atalaiaicon.png" alt="Logo Atalaia" className="atalaia-hero-logo" />
          </div>
          <div className="atalaia-hero-right">
            <a href="https://tr.ee/ygg-rIB8rW" target="_blank" rel="noopener noreferrer" className="atalaia-btn">
              Submissões
            </a>
          </div>
        </div>
      </section>

      {/* HEADER FIXO */}
      <header className={`atalaia-fixed-header ${scrolled ? "visible" : ""}`}>
        <div className="atalaia-header-top">
          <div className="atalaia-header-left">
            <div onClick={navegarParaInicioAtalaia} className="atalaia-brand-link" style={{ cursor: "pointer" }}>
              <img src="/img/atalaialogo.png" alt="Logo Atalaia" className="atalaia-header-logo" />
            </div>
          </div>
          <div className="atalaia-header-right">
            <a href="https://tr.ee/ygg-rIB8rW" target="_blank" rel="noopener noreferrer" className="atalaia-btn">
              Submissões
            </a>
          </div>
        </div>
        <div className="atalaia-divider"></div>

        <div className="atalaia-header-bottom">
          <nav className="atalaia-nav">
            <button onClick={navegarParaInicioAtalaia} className="atalaia-nav-link" style={{ background: "none", border: "none" }}>
              Início
            </button>

            {/* Dropdown Categorias */}
            <div className="atalaia-dropdown">
              <button
                className="atalaia-dropdown-btn"
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  setCatAberto(!catAberto);
                  setRevAberto(false);
                }}
              >
                Categorias <span className={`arrow ${catAberto ? "up" : ""}`}>▼</span>
              </button>
              <div className={`atalaia-dropdown-content ${catAberto ? "show" : ""}`}>
                <button onClick={() => selecionarCategoria("Doutrina")}>Doutrina</button>
                <button onClick={() => selecionarCategoria("Filosofia")}>Filosofia</button>
                <button onClick={() => selecionarCategoria("História")}>História</button>
                <button onClick={() => selecionarCategoria("Política")}>Política</button>
                <button onClick={() => selecionarCategoria("Ciência")}>Ciência</button>
              </div>
            </div>

            {/* Dropdown Revistas */}
            <div className="atalaia-dropdown">
              <button
                className="atalaia-dropdown-btn"
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  setRevAberto(!revAberto);
                  setCatAberto(false);
                }}
              >
                Revistas <span className={`arrow ${revAberto ? "up" : ""}`}>▼</span>
              </button>
              <div className={`atalaia-dropdown-content ${revAberto ? "show" : ""}`}>
                <a
                  href="#revista-aguia"
                  onClick={() => {
                    setRevAberto(false);
                    setVerSobre(false);
                    setCategoriaSelecionada(null);
                  }}
                >
                  Águia de Prometheu
                </a>
              </div>
            </div>

            <button onClick={navegarParaSobre} className="atalaia-nav-link" style={{ background: "none", border: "none" }}>
              Sobre
            </button>
          </nav>
        </div>
        <div className="atalaia-divider"></div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <div onClick={() => { setCatAberto(false); setRevAberto(false); }}>
        <main className="atalaia-main-content">

          {/* ESTADO DE CARREGAMENTO */}
          {loading ? (
            <section style={{ padding: "80px 0", textAlign: "center" }}>
              <p style={{ fontFamily: "Cinzel, serif", color: "#7b1b38", letterSpacing: "2px", fontSize: "0.9rem" }}>
                A carregar artigos...
              </p>
            </section>

          ) : verSobre ? (
            /* NOTA EDITORIAL */
            <section className="atalaia-editorial-section" style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 0" }}>
              <h2 className="atalaia-section-title">Nota Editorial</h2>
              <div style={{ fontFamily: "sans-serif", lineHeight: "1.8", color: "#101010" }}>
                <p style={{ marginBottom: "20px" }}>
                  A Revista Atalaia surge como o órgão de expressão cultural e reflexão doutrinária da Academia Vicentina.
                  O nosso propósito fundamental é erguer um espaço de densidade intelectual e permanência crítica contra a
                  efemeridade do debate público contemporâneo.
                </p>
                <p style={{ marginBottom: "20px" }}>
                  Através de ensaios aprofundados nas áreas da Filosofia, História, Política e Ciência, a Atalaia assume
                  o papel de sentinela, observando as correntes do tempo presente sem descurar o vínculo com as verdades
                  perenes e com a herança histórica que nos sustenta.
                </p>
                <p>
                  Este espaço está aberto à submissão de trabalhos que partilhem do rigor analítico e da exigência formal
                  que definem a nossa atividade académica.
                </p>
              </div>
            </section>

          ) : artigosFiltrados.length === 0 ? (
            /* SEM ARTIGOS NA CATEGORIA */
            <section style={{ padding: "80px 0", textAlign: "center" }}>
              <h2 className="atalaia-section-title">{categoriaSelecionada}</h2>
              <div className="atalaia-coming-soon-box">
                <p>Em Breve • Nenhum artigo publicado nesta categoria.</p>
              </div>
            </section>

          ) : (
            <>
              {/* ARTIGO EM DESTAQUE */}
              <section className="atalaia-featured-section">
                <h2 className="atalaia-section-title">
                  {categoriaSelecionada ? `Destaque: ${categoriaSelecionada}` : "Destaque Editorial"}
                </h2>
                {artigoDestaque && (
                  <div className="atalaia-featured-card">
                    <div className="atalaia-featured-img-area">
                      <img src={artigoDestaque.imagem} alt={artigoDestaque.titulo} />
                    </div>
                    <div className="atalaia-featured-info">
                      <div className="atalaia-tags-row">
                        {artigoDestaque.categorias?.map((cat, idx) => (
                          <span key={idx} className="atalaia-tag-badge">{cat}</span>
                        ))}
                      </div>
                      <h3 className="atalaia-article-title">{artigoDestaque.titulo}</h3>
                      <p className="atalaia-article-summary">{artigoDestaque.resumo}</p>
                      <div className="atalaia-article-meta">
                        <span>{artigoDestaque.autor}</span>
                        <span>•</span>
                        <span>{artigoDestaque.data}</span>
                      </div>
                      <Link href={`/artigos/${artigoDestaque.id}`} className="atalaia-read-more">
                        Ler Artigo Completo →
                      </Link>
                    </div>
                  </div>
                )}
              </section>

              {/* RESTANTES ARTIGOS */}
              {restoDosArtigos.length > 0 && (
                <section className="atalaia-grid-section">
                  <h2 className="atalaia-section-title">Outros Artigos</h2>
                  <div className="atalaia-articles-grid">
                    {restoDosArtigos.map((artigo) => (
                      <div key={artigo.id} className="atalaia-mini-card">
                        <div className="atalaia-mini-img">
                          <img src={artigo.imagem} alt={artigo.titulo} />
                        </div>
                        <div className="atalaia-mini-content">
                          <div className="atalaia-tags-row">
                            {artigo.categorias?.map((cat, idx) => (
                              <span key={idx} className="atalaia-tag-badge mini">{cat}</span>
                            ))}
                          </div>
                          <h4>{artigo.titulo}</h4>
                          <Link href={`/artigos/${artigo.id}`} className="atalaia-link-simple">
                            Aceder ao artigo
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ÁGUIA DE PROMETHEU */}
              <section className="atalaia-magazine-section" id="revista-aguia">
                <div className="atalaia-red-divider"></div>
                <h2 className="atalaia-magazine-title">Águia de Prometheu</h2>
                <div className="atalaia-coming-soon-box">
                  <p>Em Breve • Primeira Edição em Desenvolvimento</p>
                </div>
              </section>
            </>
          )}

        </main>

        {/* FOOTER */}
        <footer className="atalaia-footer">
          <div className="atalaia-footer-container">
            <div className="atalaia-footer-brand">
              <img src="/img/atalaialogo.png" alt="Academia Vicentina Logo" className="atalaia-footer-logo" />
            </div>
            <div className="atalaia-footer-links">
              <h4>Navegação</h4>
              <Link href="/" style={{ textDecoration: "none", color: "#fff0f0", fontSize: "0.9rem", fontFamily: "inherit" }}>
                Início
              </Link>
              <button
                onClick={navegarParaInicioAtalaia}
                style={{ background: "none", border: "none", color: "#fff0f0", textAlign: "left", padding: 0, cursor: "pointer", fontSize: "0.9rem", fontFamily: "inherit" }}
              >
                Artigos
              </button>
              <a href="https://tr.ee/ygg-rIB8rW" target="_blank" rel="noopener noreferrer">Submissões</a>
            </div>
            <div className="atalaia-footer-contact">
              <h4>Contacto</h4>
              <p>academiavicentina2026@gmail.com</p>
            </div>
          </div>
          <div className="atalaia-footer-bottom">
            <p>&copy; 2026 Academia Vicentina. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
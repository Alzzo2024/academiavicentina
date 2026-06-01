"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { sanity } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";

interface Artigo {
  titulo: string;
  subtexto: string;
  autor: string;
  data: string;
  leitura: string;
  imagem: string | null;
  categorias: string[];
  conteudo: unknown[];
  origem: string;
}

// Protegemos a imagem com um "coalesce" para não quebrar a query se não houver foto
const GROQ_QUERY = `*[_type == "artigo" && slug.current == $slug][0] {
  titulo,
  subtexto,
  autor,
  data,
  leitura,
  "imagem": imagem.asset->url,
  categorias,
  conteudo,
  origem
}`;

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p style={{ marginBottom: "1.6em", lineHeight: "1.9", fontSize: "1.05rem", color: "#2a2a2a" }}>
        {children}
      </p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 style={{ fontFamily: "Cinzel, serif", fontSize: "1.6rem", color: "#7b1b38", margin: "2em 0 0.8em 0", letterSpacing: "1px" }}>
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 style={{ fontFamily: "Cinzel, serif", fontSize: "1.25rem", color: "#7b1b38", margin: "1.8em 0 0.6em 0" }}>
        {children}
      </h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote style={{
        borderLeft: "3px solid #7b1b38",
        paddingLeft: "24px",
        margin: "2em 0",
        fontStyle: "italic",
        color: "#555",
        fontSize: "1.1rem",
        lineHeight: "1.8"
      }}>
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong style={{ fontWeight: "700", color: "#101010" }}>{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em style={{ fontStyle: "italic" }}>{children}</em>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul style={{ paddingLeft: "1.5em", marginBottom: "1.6em", lineHeight: "1.9", color: "#2a2a2a" }}>
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol style={{ paddingLeft: "1.5em", marginBottom: "1.6em", lineHeight: "1.9", color: "#2a2a2a" }}>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li style={{ marginBottom: "0.5em" }}>{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li style={{ marginBottom: "0.5em" }}>{children}</li>
    ),
  },
};

export default function ArtigoPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [artigo, setArtigo] = useState<Artigo | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    
    setLoading(true);
    setNotFound(false);

    sanity
      .fetch<Artigo>(GROQ_QUERY, { slug })
      .then((data) => {
        if (!data) {
          setNotFound(true);
        } else {
          setArtigo(data);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar no Sanity:", err);
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#fff0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "Cinzel, serif", color: "#7b1b38", letterSpacing: "2px", fontSize: "0.9rem" }}>
          A carregar artigo...
        </p>
      </div>
    );
  }

  if (notFound || !artigo) {
    return (
      <div style={{ minHeight: "100vh", background: "#fff0f0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px" }}>
        <p style={{ fontFamily: "Cinzel, serif", color: "#7b1b38", letterSpacing: "2px", fontSize: "1rem" }}>
          Artigo não encontrado.
        </p>
        <Link href="/atalaia" style={{ color: "#7b1b38", fontFamily: "Cinzel, serif", fontSize: "0.85rem", letterSpacing: "1px" }}>
          ← Voltar à Atalaia
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#fff0f0", fontFamily: "sans-serif" }}>
      {/* HEADER SIMPLES */}
      <header style={{
        background: "#7b1b38",
        borderBottom: "2px solid #d9b535",
        padding: "0 40px",
        height: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}>
        <Link href="/atalaia" style={{
          color: "#fff0f0",
          textDecoration: "none",
          fontFamily: "Cinzel, serif",
          fontSize: "0.85rem",
          letterSpacing: "2px",
          textTransform: "uppercase",
          transition: "color 0.3s",
        }}>
          ← Atalaia
        </Link>
        <Link href="/" style={{
          color: "rgba(255,240,240,0.6)",
          textDecoration: "none",
          fontFamily: "Cinzel, serif",
          fontSize: "0.75rem",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}>
          Academia Vicentina
        </Link>
      </header>

      {/* IMAGEM DE CAPA */}
      {artigo.imagem && (
        <div style={{ width: "100%", height: "480px", overflow: "hidden", position: "relative" }}>
          <img
            src={artigo.imagem}
            alt={artigo.titulo}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, transparent 40%, rgba(255,240,240,1) 100%)"
          }} />
        </div>
      )}

      {/* CONTEÚDO DO ARTIGO */}
      <article style={{ maxWidth: "780px", margin: "0 auto", padding: "60px 40px 100px 40px" }}>
        {/* CATEGORIAS */}
        {artigo.categorias && artigo.categorias.length > 0 && (
          <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
            {artigo.categorias.map((cat, idx) => (
              <span key={idx} style={{
                background: "#7b1b38",
                color: "#fff0f0",
                fontSize: "0.7rem",
                padding: "4px 12px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontFamily: "Cinzel, serif",
              }}>
                {cat}
              </span>
            ))}
          </div>
        )}

        {/* TÍTULO */}
        <h1 style={{
          fontFamily: "Cinzel, serif",
          fontSize: "2.6rem",
          color: "#7b1b38",
          lineHeight: "1.25",
          margin: "0 0 20px 0",
          letterSpacing: "1px",
          fontWeight: "400",
        }}>
          {artigo.titulo}
        </h1>

        {/* SUBTEXTO */}
        {artigo.subtexto && (
          <p style={{
            fontSize: "1.15rem",
            color: "#555",
            lineHeight: "1.75",
            margin: "0 0 28px 0",
            fontStyle: "italic",
            borderLeft: "3px solid #d9b535",
            paddingLeft: "20px",
          }}>
            {artigo.subtexto}
          </p>
        )}

        {/* META */}
        <div style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          fontSize: "0.8rem",
          color: "#888",
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontFamily: "Cinzel, serif",
          marginBottom: "48px",
          paddingBottom: "24px",
          borderBottom: "1px solid rgba(123,27,56,0.15)",
        }}>
          <span>{artigo.autor}</span>
          <span style={{ color: "#d9b535" }}>•</span>
          <span>{artigo.data}</span>
          {artigo.leitura && (
            <>
              <span style={{ color: "#d9b535" }}>•</span>
              <span>{artigo.leitura}</span>
            </>
          )}
        </div>

        {/* CORPO DO ARTIGO */}
        {artigo.conteudo && artigo.conteudo.length > 0 ? (
          <div style={{ fontSize: "1.05rem", lineHeight: "1.9" }}>
            <PortableText
              value={artigo.conteudo as Parameters<typeof PortableText>[0]["value"]}
              components={portableTextComponents as never}
            />
          </div>
        ) : (
          <p style={{ color: "#888", fontStyle: "italic" }}>
            Conteúdo em breve.
          </p>
        )}

        {/* RODAPÉ DO ARTIGO */}
        <div style={{
          marginTop: "64px",
          paddingTop: "32px",
          borderTop: "1px solid rgba(123,27,56,0.15)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}>
          <Link href="/atalaia" style={{
            color: "#7b1b38",
            textDecoration: "none",
            fontFamily: "Cinzel, serif",
            fontSize: "0.85rem",
            letterSpacing: "1px",
            textTransform: "uppercase",
            fontWeight: "600",
          }}>
            ← Voltar à Atalaia
          </Link>
          <span style={{ fontFamily: "Cinzel, serif", fontSize: "0.75rem", color: "#aaa", letterSpacing: "1px" }}>
            © 2026 Academia Vicentina
          </span>
        </div>
      </article>
    </div>
  );
}
export default {
  name: "artigo",
  title: "Artigo",
  type: "document",

  fields: [
    {
      name: "titulo",
      title: "Título",
      type: "string",
    },
    {
      name: "subtexto",
      title: "Subtexto",
      type: "text",
    },
    {
      name: "autor",
      title: "Autor",
      type: "string",
    },
    {
      name: "data",
      title: "Data",
      type: "string",
    },
    {
      name: "leitura",
      title: "Tempo de leitura",
      type: "string",
    },
    {
      name: "imagem",
      title: "Imagem",
      type: "image",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "titulo",
      },
    },
    {
      name: "conteudo",
      title: "Conteúdo",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "categorias",
      title: "Categorias",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Doutrina", value: "Doutrina" },
          { title: "Filosofia", value: "Filosofia" },
          { title: "História", value: "História" },
          { title: "Política", value: "Política" },
          { title: "Ciência", value: "Ciência" },
        ],
      },
    },
  ],
};
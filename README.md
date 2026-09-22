# Around The U.S. 🗺️

> Uma galeria responsiva para registrar lugares inesquecíveis.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

O **Around The U.S.** é uma página interativa onde uma pessoa pode personalizar seu perfil e montar uma coleção visual de locais favoritos. O projeto foi desenvolvido com tecnologias web nativas, com foco em layout responsivo, organização de estilos e interação acessível.

## ✨ Funcionalidades

- Editar nome e descrição do perfil;
- Adicionar novos cartões a partir de um título e URL de imagem;
- Curtir e desfazer curtidas nos cartões;
- Excluir cartões da galeria;
- Ampliar uma imagem e ver sua legenda;
- Fechar janelas modais pelo botão, clique fora do conteúdo ou tecla `Esc`;
- Validar campos dos formulários antes do envio.

## 🚀 Como visualizar

Este projeto não precisa de instalação nem de dependências.

1. Clone este repositório:

   ```bash
   git clone <URL-DO-REPOSITORIO>
   ```

2. Abra a pasta clonada.
3. Abra o arquivo `index.html` no navegador.

Para uma experiência de desenvolvimento melhor, use a extensão **Live Server** do VS Code para servir a página localmente.

## 🧰 Tecnologias

| Tecnologia | Uso no projeto |
| --- | --- |
| HTML5 | Estrutura semântica da página, cartões e formulários |
| CSS3 | Layout responsivo, estados visuais e componentes no padrão BEM |
| JavaScript | Renderização de cartões, modais, validação e eventos de interface |

## 📁 Estrutura do projeto

```text
├── blocks/       # Estilos dos componentes (BEM)
├── images/       # Ícones e imagens locais
├── pages/        # Arquivo CSS principal
├── scripts/      # Lógica e interações da página
├── vendor/       # Normalização e fontes
└── index.html    # Ponto de entrada da aplicação
```

## ♿ Interação e acessibilidade

Os controles possuem rótulos para leitores de tela, os formulários usam validação nativa do navegador e os pop-ups podem ser fechados com `Esc`. As imagens dos cartões recebem texto alternativo baseado no título do local.

## 📱 Responsividade

A interface se adapta a telas menores, reorganizando o perfil, os cartões e os pop-ups para manter a leitura e os controles confortáveis em dispositivos móveis.

---

Feito como parte da formação em desenvolvimento web da **TripleTen**.

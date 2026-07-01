/**
 * dark-mode.js — Engenharia de Analytics
 *
 * Responsabilidades:
 *  1. Detectar automaticamente o tema do sistema operacional
 *  2. Criar e inserir o botão de alternância (☀️ / 🌙)
 *  3. Trocar o tema ao clicar no botão
 *  4. Salvar a preferência do usuário no navegador (localStorage)
 *
 * Compatível com: Jupyter Book / Sphinx Book Theme
 */

(function () {
  "use strict";

  // --------------------------------------------------------
  // CONSTANTES
  // --------------------------------------------------------
  var STORAGE_KEY = "eng-analytics-theme"; // chave no localStorage
  var DARK        = "dark";
  var LIGHT       = "light";

  // --------------------------------------------------------
  // 1. DETECTAR PREFERÊNCIA SALVA OU PREFERÊNCIA DO SISTEMA
  // --------------------------------------------------------
  function getPreferredTheme() {
    var saved = localStorage.getItem(STORAGE_KEY);

    if (saved === DARK || saved === LIGHT) {
      return saved; // O usuário já escolheu antes → respeitar escolha dele
    }

    // Nunca escolheu → seguir o tema do sistema operacional
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? DARK : LIGHT;
  }

  // --------------------------------------------------------
  // 2. APLICAR O TEMA NA PÁGINA
  // --------------------------------------------------------
  function applyTheme(theme) {
    if (theme === DARK) {
      document.documentElement.setAttribute("data-theme", DARK);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  // --------------------------------------------------------
  // 3. ATUALIZAR O ÍCONE DO BOTÃO
  // --------------------------------------------------------
  function updateButtonIcon(button, theme) {
    if (theme === DARK) {
      button.textContent = "☀️";
      button.setAttribute("aria-label", "Mudar para modo claro");
      button.setAttribute("title", "Modo claro");
    } else {
      button.textContent = "🌙";
      button.setAttribute("aria-label", "Mudar para modo escuro");
      button.setAttribute("title", "Modo escuro");
    }
  }

  // --------------------------------------------------------
  // 4. CRIAR O BOTÃO DE ALTERNÂNCIA
  // --------------------------------------------------------
  function createToggleButton() {
    var button = document.createElement("button");

    button.id = "dark-mode-toggle";
    button.type = "button";

    // Acessibilidade
    button.setAttribute("aria-live", "polite");

    return button;
  }

  // --------------------------------------------------------
  // 5. LÓGICA PRINCIPAL — Inicializar tudo
  // --------------------------------------------------------
  function init() {
    // Detectar o tema inicial (salvo ou do sistema)
    var currentTheme = getPreferredTheme();

    // Aplicar o tema antes de qualquer renderização para evitar "flash"
    applyTheme(currentTheme);

    // Criar o botão flutuante
    var button = createToggleButton();
    updateButtonIcon(button, currentTheme);

    // Ao clicar no botão: alternar entre claro e escuro
    button.addEventListener("click", function () {
      // Descobre o tema atual pela presença do atributo data-theme
      var isDark = document.documentElement.getAttribute("data-theme") === DARK;
      var nextTheme = isDark ? LIGHT : DARK;

      // Aplica e salva
      applyTheme(nextTheme);
      localStorage.setItem(STORAGE_KEY, nextTheme);
      updateButtonIcon(button, nextTheme);
    });

    // Inserir o botão na página quando o DOM estiver pronto
    if (document.body) {
      document.body.appendChild(button);
    } else {
      document.addEventListener("DOMContentLoaded", function () {
        document.body.appendChild(button);
      });
    }

    // --------------------------------------------------------
    // 6. OUVIR MUDANÇAS NO TEMA DO SISTEMA EM TEMPO REAL
    //    (se o usuário mudar o tema do Windows/macOS enquanto lê)
    // --------------------------------------------------------
    var mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    mediaQuery.addEventListener("change", function (event) {
      // Só atualizar automaticamente se o usuário NÃO tiver escolhido
      // manualmente um tema (respeitar a escolha manual)
      var savedTheme = localStorage.getItem(STORAGE_KEY);
      if (!savedTheme) {
        var systemTheme = event.matches ? DARK : LIGHT;
        applyTheme(systemTheme);
        updateButtonIcon(button, systemTheme);
      }
    });
  }

  // --------------------------------------------------------
  // INICIAR — Aplica o tema imediatamente para evitar "flash"
  // de tela branca antes de carregar o CSS
  // --------------------------------------------------------
  var earlyTheme = getPreferredTheme();
  applyTheme(earlyTheme);

  // Aguardar o DOM para inserir o botão
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

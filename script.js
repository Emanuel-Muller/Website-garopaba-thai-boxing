script.js
/**
* Arquivo JS para o site Garopaba Thai Boxing
* Funcionalidades:
* 1. Navbar shrink (muda de cor no scroll)
* 2. Ativação do ScrollSpy do Bootstrap
* 3. Scroll suave para links âncora
* 4. Fechar menu mobile ao clicar em um link
*/

document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    /**
     * 1. Navbar Shrink
     * Reduz o padding e muda o fundo da navbar ao rolar a página.
     */
    const navbarMain = document.querySelector('#navbar-main');
    
    if (navbarMain) {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                navbarMain.classList.add('navbar-shrink');
            } else {
                navbarMain.classList.remove('navbar-shrink');
            }
        };
        // Executa na carga inicial
        handleScroll();
        // Executa no scroll
        document.addEventListener('scroll', handleScroll);
    }

    /**
     * 2. Ativação do ScrollSpy
     * Destaca o link da navbar correspondente à seção visível.
     */
    const mainNav = document.querySelector('#navbar-main');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#navbar-main',
            offset: 80 // Ajuste o offset conforme a altura da sua navbar "shrinked"
        });
    }

    /**
     * 3. Scroll suave para links âncora
     * (O Bootstrap não faz isso por padrão com data-bs-spy)
     */
    const navLinks = document.querySelectorAll('#navbar-navlist .nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Verifica se o href é uma âncora na mesma página
            if (this.hash !== "") {
                e.preventDefault();
                
                const hash = this.hash;
                const targetElement = document.querySelector(hash);
                
                if (targetElement) {
                    const navbarHeight = document.querySelector('#navbar-main').offsetHeight;
                    
                    // Calcula a posição do elemento subtraindo a altura da navbar
                    // (ou um pouco menos, para dar espaço)
                    const elementPosition = targetElement.offsetTop;
                    
                    window.scrollTo({
                        top: elementPosition - (navbarHeight > 70 ? navbarHeight : 70) + 2, // 2px de ajuste
                        behavior: 'smooth'
                    });

                    // Atualiza a URL sem pular (opcional)
                    // history.pushState(null, null, hash);
                }
            }
        });
    });

    /**
     * 4. Fechar menu mobile ao clicar em um link
     * Melhora a usabilidade em dispositivos móveis.
     */
    const navbarCollapsible = document.querySelector('#navbarNav');
    const bsCollapse = new bootstrap.Collapse(navbarCollapsible, { toggle: false });
    const navLinksMobile = document.querySelectorAll('#navbarNav .nav-link');

    navLinksMobile.forEach(link => {
        link.addEventListener('click', () => {
            // Verifica se o menu toggler está visível (indicando modo mobile)
            const toggler = document.querySelector('.navbar-toggler');
            if (window.getComputedStyle(toggler).display !== 'none') {
                bsCollapse.hide();
            }
        });
    });

});

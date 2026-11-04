export default {
  title: 'Sofía Schenone',
  description: 'Software Development · Backend · Automation · Cloud & Systems Integration',
  themeConfig: {
    footer: {
      message: 'Construido con VitePress · Vue 3 · Escalabilidad & Seguridad',
      copyright:
        '© ' + new Date().getFullYear() + ' Sofía Schenone'
    },
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Sobre Mí', link: '/about' },
      { text: 'Proyectos & GitHub', link: '/projects/' },
      { text: 'Aprendizaje', link: '/learning' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sofiaschenone' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/sofiaschenone/' }
    ]
  }
}

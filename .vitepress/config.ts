import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Baozhe's blog",
  description: '',
  cleanUrls: false,
  base: '/blog/', 
  markdown: {
    theme: 'material-theme-darker',  
    toc: { level: [ 1, 2 ]}, 
    math: true, 
  }, 
})

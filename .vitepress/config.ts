import { defineConfig } from 'vitepress'
import { genFeed } from './genFeed.js'
import mathjax3 from 'markdown-it-mathjax3'


export default defineConfig({
  title: "Baozhe's blog",
  description: '',
  cleanUrls: true,
  base: '/blog/', 
  markdown: {
    theme: 'material-theme-darker',  
    toc: { level: [ 1, 2 ]}, 
    math: true, 
  }, 
  buildEnd: genFeed
})

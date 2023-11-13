import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Baozhe's blog",
  description: '',
  cleanUrls: true,
  markdown: {
    toc: { level: [ 1 ]}, 
    math: true, 
  }
})

<script setup lang="ts">
import Date from './Date.vue'
import Author from './Author.vue'
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import Giscus from '@giscus/vue'
import { data as posts } from './posts.data.js'

const { frontmatter: data } = useData()

const route = useRoute()

function findCurrentIndex() {
  return posts.findIndex((p) => p.url === route.path)
}

// use the customData date which contains pre-resolved date info
const myDate = computed(() => posts[findCurrentIndex()].date)
const nextPost = computed(() => posts[findCurrentIndex() - 1])
const prevPost = computed(() => posts[findCurrentIndex() + 1])

const base = "/blog"
</script>

<template>
  <article class="xl:divide-y xl:divide-gray-200 dark:xl:divide-slate-200/5">
    <header class="pt-6 xl:pb-10 space-y-1 text-center">
      <!-- <Date :date="myDate" /> -->
      <h1
        class="text-3xl leading-9 font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"
      >
        {{ data.title }}
      </h1>
    </header>

    <div
      class="divide-y xl:divide-y-0 divide-gray-200 dark:divide-slate-200/5 xl:grid xl:grid-cols-4 xl:gap-x-10 pb-16 xl:pb-20"
      style="grid-template-rows: auto 1fr"
    >
      <Author />
      <div
        class="divide-y divide-gray-200 dark:divide-slate-200/5 xl:pb-0 xl:col-span-3 xl:row-span-2"
      >
        <Content class="prose dark:prose-invert max-w-none pt-10 pb-8" />
      </div>

      <footer
        class="text-sm font-medium leading-5 divide-y divide-gray-200 dark:divide-slate-200/5 xl:col-start-1 xl:row-start-2"
      >
        <div v-if="nextPost" class="py-8">
          <h2
            class="text-xs tracking-wide uppercase text-gray-500 dark:text-white"
          >
            Next Article
          </h2>
          <div class="link">
            <a :href="base+nextPost.url">{{ nextPost.title }}</a>
          </div>
        </div>
        <div v-if="prevPost" class="py-8">
          <h2
            class="text-xs tracking-wide uppercase text-gray-500 dark:text-white"
          >
            Previous Article
          </h2>
          <div class="link">
            <a :href="base+prevPost.url">{{ prevPost.title }}</a>
          </div>
        </div>
        <div class="pt-8">
          <a class="link" href="/">← Back to the blog</a>
        </div>
      </footer>
    </div>
  </article>
  <Giscus
        id="comments"
        repo="zhangbaozhe/blog"
        repoId="R_kgDOKs2H7Q"
        category="General"
        categoryId="DIC_kwDOKs2H7c4Cbsu4"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="preferred_color_scheme"
        lang="en"
        crossorigin="anonymous"
        loading="lazy"
      />
</template>

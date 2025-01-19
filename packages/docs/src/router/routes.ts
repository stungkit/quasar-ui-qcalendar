import mdPageList from 'src/markdown/listing'
import examplesPageList from 'src/examples/listing'
// import { slugify } from '@md-plugins/shared'

// console.log('examplesPageList', examplesPageList)

function slugify(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Insert hyphen between camelCase or PascalCase
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9-]+/g, '') // Remove non-alphanumeric characters except hyphens
    .replace(/(^-|-$)/g, '') // Remove leading and trailing hyphens
}

const routes = [
  {
    path: '/',
    component: () => import('src/.q-press/layouts/MarkdownLayout.vue'),
    children: [
      // Include the Landing Page route first
      ...Object.entries(mdPageList)
        .filter(([key]) => key.includes('landing-page.md'))
        .map(([_key, component]) => ({
          path: '',
          name: 'Landing Page',
          component,
          meta: { fullscreen: true, dark: true },
        })),

      // Now include all other routes, excluding the landing-page
      ...Object.keys(mdPageList)
        .filter((key) => !key.includes('landing-page.md')) // Exclude duplicates
        .map((key) => {
          const acc = {
            path: '',
            component: mdPageList[key],
          }

          if (acc.path === '') {
            // Remove '.md' from the end of the filename
            const parts = key.substring(1, key.length - 3).split('/')
            const len = parts.length
            const path = parts[len - 2] === parts[len - 1] ? parts.slice(0, len - 1) : parts

            acc.path = path.join('/')
          }

          return acc
        }),

      ...Object.entries(examplesPageList).map(([key, _component]) => {
        const acc = {
          path: '',
          component: examplesPageList[key],
        }

        if (acc.path === '') {
          // Remove '.vue' from the end of the filename
          const parts = key.substring(1, key.length - 4).split('/')
          const len = parts.length
          const path = parts[len - 2] === parts[len - 1] ? parts.slice(0, len - 1) : parts

          path[0] = '/examples'

          // Remove the second part from the third part of the path and convert to kebab-case
          if ((path[2] as string).startsWith(path[1] as string)) {
            path[2] = slugify((path[2] as string).replace(path[1] as string, ''))
          } else {
            path[2] = slugify(path[2] as string)
          }
          path[1] = slugify(path[1] as string)

          acc.path = path.join('/').replace(/\/{2,}/g, '/')
          console.log('path:', acc.path)
        }

        return acc
      }),
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes

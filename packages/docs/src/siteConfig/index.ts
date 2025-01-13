import { fabGithub, fabXTwitter } from '@quasar/extras/fontawesome-v6'
import { slugify } from '@md-plugins/shared'
import { version, productName } from '../../package.json'

export interface SocialLink {
  name: string
  icon: string
  path: string
  external?: boolean
}

export interface SiteMenuItem extends MenuItem {
  about?: string
  expanded?: boolean
  external?: boolean
  children?: SiteMenuItem[]
  separator?: boolean
  header?: string
  mq?: number
  extract?: string
  image?: string
  maxWidth?: string
}

export interface LinksConfig {
  primaryHeaderLinks: SiteMenuItem[]
  secondaryHeaderLinks: SiteMenuItem[]
  moreLinks: SiteMenuItem[]
  footerLinks: SiteMenuItem[]
  socialLinks: SocialLink[]
  ecoSystemLinks?: SiteMenuItem[]
}

export interface LogoConfig {
  showLogo: boolean
  logoLight: string
  logoDark: string
  logoAlt: string
}

export interface versionConfig {
  showTitle: boolean
  showVersion: boolean
  showOnHeader: boolean
  showOnSidebar: boolean
}

export interface UIConfig {
  usePrimaryHeader: boolean // typically 72px
  useSecondaryHeader: boolean // typically 55px
  headerHeightHint: number // typically 128 for both headers
  useMoreLinks: boolean
  useFooter: boolean
  useSidebar: boolean
  useToc: boolean
}

export interface CopyrightConfig {
  line1: string
  line2: string
}

export interface LicenseConfig {
  label: string
  link: string
}

export interface PrivacyConfig {
  label: string
  link: string
}

export interface SiteConfig {
  lang: string
  title: string
  description: string
  theme: string
  version: string
  copyright: CopyrightConfig
  githubEditRootSrc: string
  license: LicenseConfig
  privacy: PrivacyConfig
  logoConfig: LogoConfig
  versionConfig: versionConfig
  config: UIConfig
  links: LinksConfig
  sidebar: MenuItem[]
}

function processMenuItem(item: MenuItem): MenuItem {
  return {
    name: item.name,
    path: slugify(item.name),
    expanded: item.expanded ?? false,
    children: item.children ? item.children.map(processMenuItem) : undefined,
  }
}

const socialLinks = {
  name: 'Social',
  mq: 1400, // media query breakpoint
  children: [
    {
      name: 'GitHub',
      icon: fabGithub,
      path: 'https://github.com/quasarframework/quasar-ui-qcalendar/tree/next',
      external: true,
    },
    {
      name: 'X (Twitter)',
      icon: fabXTwitter,
      path: 'https://twitter.com/jgalbraith64',
      external: true,
    },
  ],
}

const netlifyLink = {
  path: 'https://www.netlify.com',
  external: true,
  image: 'https://www.netlify.com/img/global/badges/netlify-color-accent.svg',
  name: 'Deploys by Netlify',
  maxWidth: '120px',
}

const SponsorsLinks = {
  name: 'Sponsors',
  children: [
    {
      name: netlifyLink.name,
      path: netlifyLink.path,
      external: netlifyLink.external,
      image: netlifyLink.image,
    },
  ],
}

const footerLinks = [
  {
    name: SponsorsLinks.name,
    children: [...SponsorsLinks.children],
  },
  {
    name: socialLinks.name,
    children: [...socialLinks.children],
  },
]

const gettingStartedMenu: SiteMenuItem = {
  name: 'Getting Started',
  mq: 470, // media query breakpoint
  children: [
    { name: 'Introduction', path: '/getting-started/introduction' },
    { name: 'Installation', path: '/getting-started/installation' },
    { name: 'Anatomy of a Calendar', path: '/getting-started/anatomy-of-a-calendar' },
    { name: 'Themes', path: '/getting-started/themes' },
  ],
}

const developingMenu = {
  name: 'Developing',
  mq: 600, // media query breakpoint
  children: [
    { name: 'QCalendar', path: '/developing/qcalendar' },
    { name: 'QCalendarAgenda', path: '/developing/qcalendaragenda' },
    { name: 'QCalendarDay', path: '/developing/qcalendarday' },
    { name: 'QCalendarDay (Week)', path: '/developing/qcalendarday-week' },
    { name: 'QCalendarDay (Intervals)', path: '/developing/qcalendarday-intervals' },
    { name: 'QCalendarMonth', path: '/developing/qcalendarmonth' },
    { name: 'QCalendarMonth (mini-mode)', path: '/developing/qcalendarmonth-mini-mode' },
    { name: 'QCalendarResource', path: '/developing/qcalendarresource' },
    { name: 'QCalendarScheduler', path: '/developing/qcalendarscheduler' },
    { name: 'QCalendarTask', path: '/developing/qcalendartask' },
    // { name: 'Timestamp', path: '/developing/timestamp' },
  ],
}

const guidesMenu: SiteMenuItem = {
  name: 'Guides',
  mq: 1100, // media query breakpoint
  children: [
    {
      name: 'FAQ',
      path: '/guides/faq',
    },
    {
      name: 'Contributing',
      path: '/guides/contributing',
    },
  ],
}

const otherMenu: SiteMenuItem = {
  name: 'Other',
  mq: 1190, // media query breakpoint
  children: [
    {
      name: 'Releases',
      path: '/other/release-notes',
    },
  ],
}

const processedDevelopingMenu = {
  name: developingMenu.name,
  path: slugify(developingMenu.name),
  expanded: false,
  children: developingMenu.children ? developingMenu.children.map(processMenuItem) : [],
}

const processedGuidesMenu = {
  name: guidesMenu.name,
  path: slugify(guidesMenu.name),
  expanded: false,
  children: guidesMenu.children ? guidesMenu.children.map(processMenuItem) : [],
}

const secondaryToolbarLinks = [gettingStartedMenu, developingMenu, guidesMenu, otherMenu]

export const moreLinks: SiteMenuItem[] = [
  {
    name: 'More',
    // children: [...primaryToolbarLinks, { separator: true }, ...secondaryToolbarLinks, socialLinks],
    children: [...secondaryToolbarLinks, socialLinks],
  },
]

export const sidebar = [
  {
    name: gettingStartedMenu.name,
    path: slugify(gettingStartedMenu.name),
    expanded: false,
    children: gettingStartedMenu.children
      ? gettingStartedMenu.children.map((item) => ({
          name: item.name,
          path: slugify(item.name),
        }))
      : [],
  },
  processedDevelopingMenu,
  processedGuidesMenu,
]

const config = {
  lang: 'en-US',
  title: productName,
  description: 'Build Beautiful, Responsive Calendars for Vue and Quasar',
  theme: 'doc',
  version: version,
  copyright: {
    line1: `Copyright © 2024-${new Date().getFullYear()} Jeff Galbraith`,
    line2: '',
  } as CopyrightConfig,
  githubEditRootSrc:
    'https://github.com/quasarframework/quasar-ui-qcalendar/tree/next/edit/packages/docs/src/markdown/',
  license: {
    label: 'MIT License',
    link: 'https://github.com/quasarframework/quasar-ui-qcalendar/blob/next/LICENSE.md',
  } as LicenseConfig,
  privacy: {
    label: 'Privacy Policy',
    link: '/privacy-policy',
  } as PrivacyConfig,
  logoConfig: {
    showLogo: true,
    logoLight: '/qcalendar-logo.png',
    logoDark: '/qcalendar-logo.png',
    logoAlt: 'QCalendar Logo',
  } as LogoConfig,
  versionConfig: {
    showTitle: true,
    showVersion: true,
    showOnHeader: false,
    showOnSidebar: true,
  } as versionConfig,
  config: {
    usePrimaryHeader: false,
    useSecondaryHeader: true,
    headerHeightHint: 55,
    useMoreLinks: true,
    useFooter: true,
    // useFooterLinks: true,
    useSidebar: true,
    useSidebarVersion: true,
    useToc: true,
  } as UIConfig,
  links: {
    primaryHeaderLinks: [] as SiteMenuItem[], // [...primaryToolbarLinks],
    secondaryHeaderLinks: [...secondaryToolbarLinks] as SiteMenuItem[],
    moreLinks,
    footerLinks: [...footerLinks] as SiteMenuItem[],
    socialLinks: [...socialLinks.children] as SocialLink[],
  },
  sidebar,
} as SiteConfig

export { sidebar as menu }
export default config

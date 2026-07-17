import Link from 'next/link'
import { ArrowRight, BookOpen, Building2, ChevronRight, FileText, Search, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const shell = 'mx-auto w-full max-w-[1320px] px-4 sm:px-6'

function mergePosts(posts: SitePost[], timeSections: HomeTimeSection[]) {
  return Array.from(
    new Map([...posts, ...timeSections.flatMap((section) => section.posts)].map((post) => [post.slug || post.id || post.title, post])).values()
  )
}

function realImages(posts: SitePost[], max = 6) {
  return Array.from(new Set(posts.map(getEditablePostImage).filter((image) => image && !image.includes('favicon')))).slice(0, max)
}

function SectionHead({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="editable-display text-3xl font-extrabold leading-none tracking-[-0.02em] sm:text-4xl">{title}</h2>
      <Link href={href} className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#f2f3f5] text-[#25272c] transition hover:bg-[#dfeff2] hover:text-[var(--slot4-accent)]" aria-label={`View all ${title}`}>
        <ChevronRight className="h-5 w-5" />
      </Link>
    </div>
  )
}

function FeatureCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group relative h-[510px] w-[310px] shrink-0 snap-start overflow-hidden rounded-[20px] bg-[#202227] sm:w-[390px] lg:h-[555px]">
      <img src={getEditablePostImage(post)} alt={post.title || 'Featured post'} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(8,10,14,.92)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
        <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] backdrop-blur">{getEditableCategory(post)}</span>
        <h3 className="editable-display mt-4 line-clamp-3 text-3xl font-extrabold leading-[0.98] sm:text-4xl">{post.title || 'Discover this feature'}</h3>
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-white/70">{getEditableExcerpt(post, 120) || 'Open this listing to view complete business information and contact details.'}</p>
      </div>
    </Link>
  )
}

function PosterCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group w-[190px] shrink-0 snap-start sm:w-[220px]">
      <div className="relative aspect-[2/3] overflow-hidden rounded-[15px] bg-[#eceef0]">
        <img src={getEditablePostImage(post)} alt={post.title || 'Post cover'} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/70 bg-black/30 text-lg text-white backdrop-blur">+</span>
      </div>
      <h3 className="mt-3 line-clamp-2 text-sm font-semibold leading-5 text-[#292b30] group-hover:text-[var(--slot4-accent)]">{post.title || 'Untitled post'}</h3>
      <p className="mt-1 truncate text-xs text-[#7a7d84]">{getEditableCategory(post)}</p>
    </Link>
  )
}

function WideCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group w-[320px] shrink-0 snap-start sm:w-[440px]">
      <div className="relative aspect-[16/9] overflow-hidden rounded-[18px] bg-[#eceef0]">
        <img src={getEditablePostImage(post)} alt={post.title || 'Post image'} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#25272c]">{getEditableCategory(post)}</span>
      </div>
      <h3 className="editable-display mt-3 line-clamp-2 text-2xl font-extrabold leading-[1.02] group-hover:text-[var(--slot4-accent)]">{post.title || 'Explore this business'}</h3>
    </Link>
  )
}

export function EditableHomeHero({ primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = mergePosts(posts, timeSections)
  const images = realImages(pool)
  const actions = [
    { label: 'Browse businesses', href: primaryRoute, icon: Building2 },
    { label: 'Add your business', href: '/create', icon: FileText },
    { label: 'Search listings', href: '/search?task=listing', icon: Search },
    { label: 'Listing guidance', href: '/about', icon: BookOpen },
  ]
  return (
    <section className="border-t-[32px] border-black bg-white py-8 sm:py-12">
      <div className={`${shell} grid gap-4`}>
        <div className="editable-hero-motion relative min-h-[600px] overflow-hidden rounded-[20px] sm:min-h-[620px]">
          <EditableHeroCollage images={images} />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,22,33,.9)_0%,rgba(5,22,33,.56)_50%,rgba(5,22,33,.18)_100%)]" />
          <div className="relative flex min-h-[600px] items-center px-7 py-12 sm:min-h-[620px] sm:px-12 lg:px-14">
            <div className="max-w-[520px] text-white">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">{pagesContent.home.hero.badge}</p>
              <h1 className="editable-display mt-4 text-5xl font-extrabold uppercase leading-[.88] sm:text-6xl lg:text-7xl">{pagesContent.home.hero.title.join(' ')}</h1>
              <p className="mt-5 max-w-md text-base font-medium leading-7 text-white/85">{pagesContent.home.hero.description}</p>
              <div className="mt-10 grid max-w-[480px] grid-cols-2 gap-3">
                {actions.map((action) => {
                  const Icon = action.icon
                  return <Link key={action.label} href={action.href} className="flex min-h-20 flex-col justify-between rounded-[18px] border border-white/20 bg-white/20 p-4 text-sm font-bold backdrop-blur-md transition hover:bg-white/30"><Icon className="h-5 w-5" />{action.label}</Link>
                })}
              </div>
              <form action="/search" className="mt-5 flex max-w-[480px] items-center gap-3 rounded-full bg-white px-5 text-[#282a2f] shadow-xl">
                <Search className="h-5 w-5 text-[#777a82]" />
                <input name="q" className="min-w-0 flex-1 bg-transparent py-4 text-sm outline-none" placeholder="What do you want to discover?" />
                <button className="font-bold text-[var(--slot4-accent)]">Search</button>
              </form>
            </div>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/signup" className="flex min-h-28 items-center gap-5 rounded-[20px] bg-[#f0f1f4] p-5 transition hover:bg-[#e7e9ed]"><span className="flex h-16 w-16 items-center justify-center rounded-[15px] bg-[linear-gradient(145deg,#7fc3d1,#7350a0)] text-white"><Sparkles /></span><span><b className="block text-xl">Become a member</b><small className="mt-1 block text-sm text-[#656871]">Save businesses and manage your listing.</small></span></Link>
          <Link href={primaryRoute} className="flex min-h-28 items-center gap-5 rounded-[20px] bg-[#f0f1f4] p-5 transition hover:bg-[#e7e9ed]"><span className="flex h-16 w-16 items-center justify-center rounded-[15px] bg-[#25272c] text-white"><FileText /></span><span><b className="block text-xl">Latest businesses</b><small className="mt-1 block text-sm text-[#656871]">Browse recently added companies and services.</small></span></Link>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = mergePosts(posts, timeSections).slice(0, 8)
  if (!pool.length) return null
  return <section className="bg-white py-12"><div className={shell}><SectionHead title="Featured businesses" href={primaryRoute} /><div className="editable-feature-track mt-6 flex snap-x gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{[...pool, ...pool].map((post, index) => <FeatureCard key={`${post.id || post.slug}-${index}`} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}</div></div></section>
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = mergePosts(posts, timeSections).slice(0, 12)
  if (!pool.length) return null
  return <section className="bg-white py-12"><div className={shell}><SectionHead title="Latest business listings" href={primaryRoute} /><div className="mt-6 flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{pool.map((post) => <PosterCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}</div><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><Link href={primaryRoute} className="rounded-xl bg-[#f0f1f4] px-5 py-4 text-sm font-semibold transition hover:bg-[#dfeff2]">All businesses</Link><Link href="/search?task=listing" className="rounded-xl bg-[#f0f1f4] px-5 py-4 text-sm font-semibold transition hover:bg-[#dfeff2]">Search businesses</Link><Link href="/create" className="rounded-xl bg-[#f0f1f4] px-5 py-4 text-sm font-semibold transition hover:bg-[#dfeff2]">Add a business</Link><Link href="/about" className="rounded-xl bg-[#f0f1f4] px-5 py-4 text-sm font-semibold transition hover:bg-[#dfeff2]">Listing guidance</Link></div></div></section>
}

const sectionNames = ['New business listings', 'Popular businesses', 'More services to explore']
export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const fallback = [{ key: 'new', posts: posts.slice(0, 8), href: primaryRoute }, { key: 'popular', posts: posts.slice(8, 16), href: primaryRoute }]
  const sections = (timeSections.length ? timeSections : fallback).filter((section) => section.posts.length)
  return <>{sections.map((section, index) => <section key={section.key} className={index % 2 ? 'bg-[#f3f4f6] py-12' : 'bg-white py-12'}><div className={shell}><SectionHead title={sectionNames[index] || 'More to explore'} href={section.href || primaryRoute} /><div className="mt-6 flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{section.posts.slice(0, 8).map((post) => <WideCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}</div></div></section>)}</>
}

export function EditableHomeCta() {
  return <section className="bg-white py-14"><div className={`${shell} flex flex-col items-start justify-between gap-7 rounded-[22px] bg-[#24262b] p-8 text-white sm:p-12 lg:flex-row lg:items-center`}><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8ed7e2]">Grow your visibility</p><h2 className="editable-display mt-3 text-4xl font-extrabold uppercase leading-none">Add your business to the directory.</h2></div><Link href="/create" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#24262b] transition hover:bg-[#8ed7e2]">Create a listing <ArrowRight className="h-4 w-4" /></Link></div></section>
}

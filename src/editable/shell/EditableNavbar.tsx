'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserPlus, LogIn, X, PlusCircle, LogOut, UserRound } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'article').map((task) => ({ label: task.label, href: task.route })),
    []
  )

  return (
    <header className="sticky top-0 z-50 bg-[var(--editable-nav-bg)]/96 text-[var(--editable-nav-text)] backdrop-blur-md">
      <nav className="mx-auto flex min-h-[72px] w-full max-w-[var(--editable-container)] items-center gap-5 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center">
          <span className="flex h-12 w-[62px] items-center justify-center overflow-hidden bg-white transition group-hover:bg-[#8ed7e2]">
            <img src="/favicon.png" alt={`${SITE_CONFIG.name} logo`} className="h-auto w-[118px] max-w-none shrink-0 object-contain" />
          </span>
        </Link>

        <div className="hidden items-stretch gap-0 lg:flex">
          {navItems.slice(0, 5).map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center px-4 text-sm font-semibold transition ${
                  active ? 'text-[#8ed7e2]' : 'text-white hover:text-[#8ed7e2]'
                }`}
              >
                {item.label}
                {active ? <span className="absolute inset-x-3 -bottom-[26px] h-[3px] bg-[#8ed7e2]" /> : null}
              </Link>
            )
          })}
        </div>

        <form action="/search" className="mx-auto hidden min-w-0 flex-1 justify-center md:flex">
          <label className="flex w-full max-w-md items-center gap-2 rounded-full border border-white/30 px-5 py-2 transition focus-within:border-[#8ed7e2]">
            <Search className="h-4 w-4 shrink-0 text-white" />
            <input
              name="q"
              type="search"
              placeholder="What do you want to discover?"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/75"
            />
          </label>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {session ? (
            <>
              <span className="hidden max-w-[130px] items-center gap-2 truncate text-sm font-semibold text-white md:inline-flex"><UserRound className="h-4 w-4 text-[#8ed7e2]" />{session.name}</span>
              <Link
                href="/create"
                className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#23252a] transition hover:bg-[#8ed7e2] sm:inline-flex"
              >
                <PlusCircle className="h-3.5 w-3.5" /> Create
              </Link>
              <button
                type="button"
                onClick={logout}
                className="hidden items-center gap-2 px-3 py-2 text-sm font-semibold text-white transition hover:text-[#8ed7e2] sm:inline-flex"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden items-center gap-2 text-sm font-semibold text-white transition hover:text-[#8ed7e2] sm:inline-flex"
              >
                <LogIn className="h-3.5 w-3.5" /> Login
              </Link>
              <Link
                href="/signup"
                className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#23252a] transition hover:bg-[#8ed7e2] sm:inline-flex"
              >
                <UserPlus className="h-3.5 w-3.5" /> Sign up
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="border border-white/30 p-2 text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div className="h-px bg-white/10" />

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-4 py-5 lg:hidden">
          <form action="/search" className="mb-5 flex items-center gap-2 border-b border-[var(--slot4-accent)]/30 pb-2">
            <Search className="h-4 w-4 text-[var(--slot4-accent)]" />
            <input name="q" type="search" placeholder="Search posts" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-muted-text)]" />
          </form>
          <div className="grid gap-1">
            {session ? <p className="mb-2 flex items-center gap-2 border-b border-white/10 px-4 pb-4 text-sm font-semibold text-white"><UserRound className="h-4 w-4 text-[#8ed7e2]" /> {session.name}</p> : null}
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'Contact', href: '/contact' }, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`border-l-2 px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] ${
                    active
                      ? 'border-[var(--slot4-accent)] bg-[var(--slot4-surface-bg)] text-[var(--slot4-accent)]'
                      : 'border-transparent text-[var(--slot4-muted-text)] hover:border-[var(--slot4-accent)]/40 hover:bg-[var(--slot4-surface-bg)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            {session ? <button type="button" onClick={() => { logout(); setOpen(false) }} className="flex items-center gap-2 px-4 py-3 text-left text-sm font-semibold text-white hover:text-[#8ed7e2]"><LogOut className="h-4 w-4" /> Logout</button> : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}

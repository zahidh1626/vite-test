/**
 * Sidebar Accordion — auto-close sibling sections when one opens.
 * Uses MutationObserver to watch for `.collapsed` class changes on
 * `.VPSidebarItem.level-0` elements and collapses all siblings.
 */
export function setupSidebarAccordion() {
  if (typeof window === 'undefined') return

  let observer: MutationObserver | null = null

  function getTopLevelItems(): NodeListOf<Element> {
    return document.querySelectorAll('.VPSidebarItem.level-0.collapsible')
  }

  /**
   * When a section loses the `collapsed` class (= it just opened),
   * add `collapsed` back to every sibling that can collapse.
   */
  function collapseAllSiblingsOf(openedEl: Element) {
    getTopLevelItems().forEach((el) => {
      if (el === openedEl) return
      // Only collapse sections that are currently expanded
      if (!el.classList.contains('collapsed')) {
        // Click the caret to trigger Vue's own toggle so state stays in sync
        const caret = el.querySelector<HTMLElement>(':scope > .item > .caret')
        if (caret) caret.click()
      }
    })
  }

  function setupObserver() {
    if (observer) observer.disconnect()

    const sidebar = document.querySelector('.VPSidebar')
    if (!sidebar) return

    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        const target = mutation.target as Element
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class' &&
          target.classList.contains('VPSidebarItem') &&
          target.classList.contains('level-0')
        ) {
          // Section just became expanded (no longer collapsed)
          const wasCollapsed = (mutation.oldValue ?? '').includes('collapsed')
          const isNowOpen = !target.classList.contains('collapsed')
          if (wasCollapsed && isNowOpen) {
            collapseAllSiblingsOf(target)
          }
        }
      }
    })

    observer.observe(sidebar, {
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
      attributeOldValue: true
    })
  }

  // Re-attach after each client-side navigation (VitePress SPA)
  const routeObserver = new MutationObserver(() => {
    const sidebar = document.querySelector('.VPSidebar')
    if (sidebar && (!observer || !(observer as any)._connected)) {
      setupObserver()
    }
  })

  document.addEventListener('DOMContentLoaded', () => {
    setupObserver()
    routeObserver.observe(document.body, { childList: true, subtree: false })
  })

  // Also set up immediately if DOM is already ready
  if (document.readyState !== 'loading') {
    setTimeout(setupObserver, 100)
  }
}

/**
 * Knowledge level — lets the Learn hub highlight the section that matches the
 * user's current level. Persisted in localStorage (`muslimapp-knowledge-level`).
 */

export type KnowledgeLevel = 'discover' | 'practice' | 'deepen'

export const KNOWLEDGE_LEVELS: { id: KnowledgeLevel, emoji: string }[] = [
  { id: 'discover', emoji: '🌱' },
  { id: 'practice', emoji: '🌿' },
  { id: 'deepen', emoji: '🌳' },
]

const STORAGE_KEY = 'muslimapp-knowledge-level'

function isLevel(v: unknown): v is KnowledgeLevel {
  return v === 'discover' || v === 'practice' || v === 'deepen'
}

export function useKnowledgeLevel() {
  const level = useState<KnowledgeLevel | null>('knowledge-level', () => null)

  /** Read the stored level — call on client mount. */
  function load() {
    if (import.meta.server) return
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (isLevel(saved)) level.value = saved
    }
    catch { /* storage unavailable */ }
  }

  function setLevel(next: KnowledgeLevel | null) {
    level.value = next
    if (import.meta.server) return
    try {
      if (next) localStorage.setItem(STORAGE_KEY, next)
      else localStorage.removeItem(STORAGE_KEY)
    }
    catch { /* storage unavailable */ }
  }

  return { level, levels: KNOWLEDGE_LEVELS, load, setLevel }
}

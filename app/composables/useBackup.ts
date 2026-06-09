/**
 * Backup & restore composable.
 * Exports every `muslimapp-*` localStorage entry as a JSON file and
 * restores it again — lets users move progress, favorites, tracker data
 * and settings to a new device without any backend.
 */

const APP_KEY_PREFIX = 'muslimapp-'
const BACKUP_FORMAT = 'muslimapp-backup'
const BACKUP_VERSION = 1

interface BackupFile {
  format: typeof BACKUP_FORMAT
  version: number
  exportedAt: string
  appVersion: string
  data: Record<string, string>
}

export function useBackup() {
  const importing = ref(false)
  const importError = ref<string | null>(null)
  const importSuccess = ref(false)

  /** Collect all app-owned localStorage entries. */
  function collectData(): Record<string, string> {
    const data: Record<string, string> = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(APP_KEY_PREFIX)) {
        const value = localStorage.getItem(key)
        if (value !== null) {
          data[key] = value
        }
      }
    }
    return data
  }

  /** Download all app data as a JSON backup file. */
  function exportData() {
    if (import.meta.server) return
    const backup: BackupFile = {
      format: BACKUP_FORMAT,
      version: BACKUP_VERSION,
      exportedAt: new Date().toISOString(),
      appVersion: '2.0.0',
      data: collectData(),
    }

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `muslimapp-backup-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  /** Restore a backup file. Returns true on success; reloads to apply state. */
  async function importData(file: File): Promise<boolean> {
    importing.value = true
    importError.value = null
    importSuccess.value = false

    try {
      const text = await file.text()
      const backup = JSON.parse(text) as BackupFile

      if (backup.format !== BACKUP_FORMAT || typeof backup.data !== 'object' || backup.data === null) {
        throw new Error('Invalid backup format')
      }

      for (const [key, value] of Object.entries(backup.data)) {
        if (key.startsWith(APP_KEY_PREFIX) && typeof value === 'string') {
          localStorage.setItem(key, value)
        }
      }

      importSuccess.value = true
      // Reload so all composables pick up the restored state
      setTimeout(() => window.location.reload(), 800)
      return true
    }
    catch (err) {
      console.error('Backup import error:', err)
      importError.value = 'invalid'
      return false
    }
    finally {
      importing.value = false
    }
  }

  return {
    importing: readonly(importing),
    importError: readonly(importError),
    importSuccess: readonly(importSuccess),
    exportData,
    importData,
  }
}

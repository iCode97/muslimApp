/**
 * Minimal HTML5 drag-and-drop reordering helper.
 *
 * Works for both pointer and touch via HTML5 DnD. Components pass in a
 * reactive list and a reorder callback; the composable exposes per-item
 * event handlers plus a `dragOverId` for visual feedback.
 *
 * Usage:
 *   const dnd = useDragReorder({
 *     getId: (w) => w.id,
 *     onReorder: (fromId, toId) => dashboard.reorderById(fromId, toId),
 *   })
 *   // in template: v-on="dnd.handlers(item.id)"  draggable="true"
 */
export function useDragReorder<T>(opts: {
  getId: (item: T) => string
  onReorder: (fromId: string, toId: string) => void
}) {
  const draggingId = ref<string | null>(null)
  const dragOverId = ref<string | null>(null)

  function onDragStart(id: string, e: DragEvent) {
    draggingId.value = id
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/plain', id)
    }
  }

  function onDragOver(id: string, e: DragEvent) {
    if (!draggingId.value || draggingId.value === id) return
    e.preventDefault()
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'move'
    dragOverId.value = id
  }

  function onDragLeave(id: string) {
    if (dragOverId.value === id) dragOverId.value = null
  }

  function onDrop(id: string, e: DragEvent) {
    e.preventDefault()
    const fromId = draggingId.value || e.dataTransfer?.getData('text/plain')
    draggingId.value = null
    dragOverId.value = null
    if (!fromId || fromId === id) return
    opts.onReorder(fromId, id)
  }

  function onDragEnd() {
    draggingId.value = null
    dragOverId.value = null
  }

  function handlers(id: string) {
    return {
      dragstart: (e: DragEvent) => onDragStart(id, e),
      dragover: (e: DragEvent) => onDragOver(id, e),
      dragleave: () => onDragLeave(id),
      drop: (e: DragEvent) => onDrop(id, e),
      dragend: onDragEnd,
    }
  }

  return {
    draggingId: readonly(draggingId),
    dragOverId: readonly(dragOverId),
    handlers,
  }
}

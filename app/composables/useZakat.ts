/**
 * Zakat calculator composable.
 * Net zakatable wealth = cash + gold + silver + other assets − debts.
 * Zakat (2.5%) is due when the net wealth reaches the nisab threshold:
 *   gold basis: 85 g of gold · silver basis: 595 g of silver.
 * All inputs stay on-device (localStorage); metal prices are entered manually.
 */

export type NisabBasis = 'gold' | 'silver'

export interface ZakatInputs {
  basis: NisabBasis
  currency: string
  goldPricePerGram: number
  silverPricePerGram: number
  cash: number
  goldGrams: number
  silverGrams: number
  otherAssets: number
  debts: number
}

export const NISAB_GOLD_GRAMS = 85
export const NISAB_SILVER_GRAMS = 595
export const ZAKAT_RATE = 0.025

const STORAGE_KEY = 'muslimapp-zakat'

const DEFAULT_INPUTS: ZakatInputs = {
  basis: 'gold',
  currency: '€',
  goldPricePerGram: 0,
  silverPricePerGram: 0,
  cash: 0,
  goldGrams: 0,
  silverGrams: 0,
  otherAssets: 0,
  debts: 0,
}

export function useZakat() {
  const inputs = useState<ZakatInputs>('zakat-inputs', () => ({ ...DEFAULT_INPUTS }))

  function load() {
    if (import.meta.server) return
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        inputs.value = { ...DEFAULT_INPUTS, ...JSON.parse(saved) }
      }
      catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }

  function save() {
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs.value))
    }
  }

  function reset() {
    inputs.value = { ...DEFAULT_INPUTS }
    if (import.meta.client) {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const goldValue = computed(() => inputs.value.goldGrams * inputs.value.goldPricePerGram)
  const silverValue = computed(() => inputs.value.silverGrams * inputs.value.silverPricePerGram)

  const totalAssets = computed(() =>
    inputs.value.cash + goldValue.value + silverValue.value + inputs.value.otherAssets,
  )

  const netWealth = computed(() => Math.max(0, totalAssets.value - inputs.value.debts))

  const nisab = computed(() =>
    inputs.value.basis === 'gold'
      ? NISAB_GOLD_GRAMS * inputs.value.goldPricePerGram
      : NISAB_SILVER_GRAMS * inputs.value.silverPricePerGram,
  )

  /** Nisab can only be evaluated when the relevant metal price is set. */
  const nisabKnown = computed(() => nisab.value > 0)

  const isDue = computed(() => nisabKnown.value && netWealth.value >= nisab.value)

  const zakatAmount = computed(() => (isDue.value ? netWealth.value * ZAKAT_RATE : 0))

  return {
    inputs,
    goldValue,
    silverValue,
    totalAssets,
    netWealth,
    nisab,
    nisabKnown,
    isDue,
    zakatAmount,
    load,
    save,
    reset,
  }
}

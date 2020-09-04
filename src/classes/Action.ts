import { ActivationType } from '@/class'

interface IActionData {
  name: string
  activation: ActivationType
  cost?: number
  frequency?: string
  init?: string
  trigger?: string
  terse?: string
  detail: string
  pilot?: boolean
}

enum ActivePeriod {
  Turn = 'Turn',
  Round = 'Round',
  Encounter = 'Encounter',
  Mission = 'Mission',
  Unlimited = 'Unlimited',
}

class Frequency {
  public readonly Uses: number
  public readonly Duration: ActivePeriod

  public constructor(frq: string) {
    if (!frq || !frq.includes('/')) {
      this.Uses = Number.MAX_SAFE_INTEGER
      this.Duration = ActivePeriod.Unlimited
    } else {
      const fArr = frq.split('/')
      const num = parseInt(fArr[0])

      if (!Number.isNaN && Number.isInteger(num)) {
        this.Uses = num
      } else {
        this.Uses = Number.MAX_SAFE_INTEGER
        this.Duration = ActivePeriod.Unlimited
      }

      switch (fArr[1].toLowerCase()) {
        case 'turn':
          this.Duration = ActivePeriod.Turn
          break
        case 'round':
          this.Duration = ActivePeriod.Round
          break
        case 'scene':
        case 'encounter':
          this.Duration = ActivePeriod.Encounter
          break
        case 'mission':
          this.Duration = ActivePeriod.Mission
          break
        default:
          this.Uses = Number.MAX_SAFE_INTEGER
          this.Duration = ActivePeriod.Unlimited
          break
      }
    }
  }
}

class Action {
  public readonly Name: string
  public readonly Activation: ActivationType
  public readonly Terse: string
  public readonly Detail: string
  public readonly Cost: number
  public readonly Frequency: Frequency
  public readonly Init: string
  public readonly Trigger: string
  public readonly IsPilotAction: boolean
  private _uses: number

  public constructor(data: IActionData, generatedName?: string) {
    this.Name = data.name ? data.name : generatedName || 'Unknown Action'
    this.Activation = data.activation
    this.Terse = data.terse || ''
    this.Detail = data.detail || ''
    this.Cost = data.cost || 1
    this.Frequency = new Frequency(data.frequency || '')
    this._uses = this.Frequency.Uses
    this.Init = data.init || ''
    this.Trigger = data.trigger || ''
    this.IsPilotAction = data.pilot
  }

  public get Uses(): number {
    return this._uses
  }

  public Use(): void {
    this._uses--
  }

  public Reset(): void {
    this._uses = this.Frequency.Uses
  }
}

export { IActionData, Action }

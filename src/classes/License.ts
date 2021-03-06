import { store } from '@/store'
import _ from 'lodash'
import { LicensedItem, Frame, Manufacturer } from '@/class'

class License {
  public readonly Name: string
  public readonly Source: string
  public readonly FrameID: string
  public readonly Brew: string
  public readonly Unlocks: LicensedItem[][]

  public constructor(frame: Frame) {
    this.Name = frame.Name
    this.Source = frame.Source
    this.FrameID = frame.ID
    this.Brew = frame.Brew || 'Core'

    const items: LicensedItem[] = _.cloneDeep(store.getters.getItemCollection('MechWeapons'))
      .concat(
        store.getters.getItemCollection('WeaponMods'),
        store.getters.getItemCollection('MechSystems')
      )
      .filter((x: LicensedItem) => x.License.toUpperCase() === frame.Name.toUpperCase())

    this.Unlocks = [
      items.filter(x => x.LicenseLevel === 1),
      items.filter(x => x.LicenseLevel === 2),
      items.filter(x => x.LicenseLevel === 3),
    ]
    if (frame.LicenseLevel) this.Unlocks[frame.LicenseLevel - 1].unshift(frame)
  }

  public get Manufacturer(): Manufacturer {
    return store.getters.referenceByID('Manufacturers', this.Source)
  }

  public UnlockByRank(rank: number): LicensedItem[] {
    return this.Unlocks[rank - 1]
  }

  public ToString(): string {
    return `${this.Source} ${this.Name}`
  }

  public static Deserialize(frameId: string): License {
    return new License(store.getters.referenceByID('Frames', frameId))
  }
}

export default License

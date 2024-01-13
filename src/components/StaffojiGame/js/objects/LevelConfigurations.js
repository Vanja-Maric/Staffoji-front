import { createPlatforms1 } from './level1/platforms1'
import { createPlatforms2 } from './level2/platforms2'
import { createPlatforms3 } from './level3/platforms3'
import { createWater1 } from './level1/water1'
import { createWater2 } from './level2/water2'
import { createWater3 } from './level3/water3'
import { createClefs1 } from './level1/clefs1'
import { createClefs2 } from './level2/clefs2'
import { createClefs3 } from './level3/clefs3'
import { createCoins1 } from './level1/coins1'
import { createCoins2 } from './level2/coins2'
import { createCoins3 } from './level3/coins3'
import { createFire1 } from './level1/fire1'
import { createFire2 } from './level2/fire2'
import { createFire3 } from './level3/fire3'
import { createOtherObjects1 } from './level1/otherObjects1'
import { createOtherObjects2 } from './level2/otherObjects2'
import { createOtherObjects3 } from './level3/otherObjects3'
import { createEndSign1 } from './level1/endSign1'
import { createEndSign2 } from './level2/endSign2'
import { createEndSign3 } from './level3/endSign3'

class LevelConfigurations {
  static getConfig(level) {
    switch (level) {
      case 1:
        return {
          createPlatforms: createPlatforms1,
          createWater: createWater1,
          createClefs: createClefs1,
          createCoins: createCoins1,
          createFire: createFire1,
          createOtherObjects: createOtherObjects1,
          createEndSign: createEndSign1,
        }
      case 2:
        return {
          createPlatforms: createPlatforms2,
          createWater: createWater2,
          createClefs: createClefs2,
          createCoins: createCoins2,
          createFire: createFire2,
          createOtherObjects: createOtherObjects2,
          createEndSign: createEndSign2,
        }
      case 3:
        return {
          createPlatforms: createPlatforms3,
          createWater: createWater3,
          createClefs: createClefs3,
          createCoins: createCoins3,
          createFire: createFire3,
          createOtherObjects: createOtherObjects3,
          createEndSign: createEndSign3,
        }
      default:
        return {
          createPlatforms: createPlatforms1,
          createWater: createWater1,
          createClefs: createClefs1,
          createCoins: createCoins1,
          createFire: createFire1,
          createOtherObjects: createOtherObjects1,
          createEndSign: createEndSign1,
        }
    }
  }
}

export default LevelConfigurations

import Pair from '../Pair'
import * as _ from 'lodash'

/**
 * Created by simon on 2017/1/6.
 */
abstract class Mapping<K , V> {
  protected map: Array<Pair<K, V>>

  public getKey(value: V, defaultKey ?: K): K {
    const pair = this.map.find(p => p.value === value)
    if (!_.isNil(pair)) {
      return pair.key
    } else {
      return defaultKey
    }
  }

  public getValue(key: K, defaultValue?: V): V {
    const pair = this.map.find(p => p.key === key)
    if (!_.isNil(pair)) {
      return pair.value
    } else {
      return defaultValue
    }
  }

  protected pair(key: K, value: V): Pair<K, V> {
    return new Pair<K, V>(key, value)
  }

  public static getKeyFromValues<P1, P2>(values: Array<Pair<P1, P2[]>>,
                                         value: P2,
                                         match: (v1, v2) => boolean,
                                         defaultKey ?: P1): P1 {

    const array = values.filter(pair => pair.value.filter(v => match(v, value)).length > 0)
    if (array.length > 0) {
      return array[0].key
    } else {
      return defaultKey
    }
  }
}

export default Mapping

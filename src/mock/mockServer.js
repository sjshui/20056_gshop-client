/* 利用mockjs提供mock接口 */
import Mock from 'mockjs'
import recommends from './recommends.json'
import floors from './floors.json'
import rank from './rank.json'
import like from './like.json'
import trade from './trade.json'


// 提供今日接口
Mock.mock('/mock/recommends',{code: 200, data:recommends})

// 提供楼层接口
Mock.mock('/mock/floors',{code: 200, data:floors})

// 提供排列接口
Mock.mock('/mock/rank',{code: 200, data:rank})

// 提供猜你喜欢接口
Mock.mock('/mock/like',{code: 200, data:like})

// console.log('MockServer')

// 提供订单接口
Mock.mock('/mock/trade',{code: 200, data:trade})
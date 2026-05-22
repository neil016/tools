<template>
  <div class="min-h-screen p-4">
    <div class="max-w-md mx-auto">
      <div class="card mb-6">
        <div class="flex items-center justify-between">
          <div>
            <div class="font-bold text-lg">积分商城</div>
            <div class="text-sm text-gray-500">用积分兑换心仪好礼</div>
          </div>
          <div class="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
            <span class="text-yellow-500 text-xl">💰</span>
            <span class="font-bold text-yellow-700">{{ userStore.currentPoints }}</span>
          </div>
        </div>
      </div>

      <div class="card mb-6">
        <div class="font-bold mb-4">热门道具</div>
        <div class="space-y-3">
          <div 
            v-for="item in shopItems" 
            :key="item.id"
            class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
          >
            <div 
              class="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
              :class="item.bgClass"
            >
              {{ item.icon }}
            </div>
            <div class="flex-1">
              <div class="font-bold">{{ item.name }}</div>
              <div class="text-sm text-gray-500">{{ item.description }}</div>
            </div>
            <button 
              @click="buyItem(item)"
              class="px-4 py-2 rounded-xl font-bold transition-all"
              :class="userStore.currentPoints >= item.price ? 'btn-primary text-sm' : 'bg-gray-200 text-gray-400 cursor-not-allowed'"
              :disabled="userStore.currentPoints < item.price"
            >
              {{ item.price }} 积分
            </button>
          </div>
        </div>
      </div>

      <div class="card mb-6">
        <div class="font-bold mb-4">观看广告领取</div>
        <div class="space-y-3">
          <button 
            @click="watchAdReward('life')"
            class="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl hover:shadow-lg transition-shadow"
          >
            <div class="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center text-2xl">
              ❤️
            </div>
            <div class="flex-1">
              <div class="font-bold">额外生命</div>
              <div class="text-sm text-gray-500">观看30秒广告获得1条生命</div>
            </div>
            <span class="text-primary font-bold">免费</span>
          </button>
          <button 
            @click="watchAdReward('points')"
            class="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl hover:shadow-lg transition-shadow"
          >
            <div class="w-14 h-14 rounded-xl bg-yellow-100 flex items-center justify-center text-2xl">
              💰
            </div>
            <div class="flex-1">
              <div class="font-bold">积分奖励</div>
              <div class="text-sm text-gray-500">观看30秒广告获得20积分</div>
            </div>
            <span class="text-primary font-bold">免费</span>
          </button>
          <button 
            @click="watchAdReward('items')"
            class="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl hover:shadow-lg transition-shadow"
          >
            <div class="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center text-2xl">
              🎁
            </div>
            <div class="flex-1">
              <div class="font-bold">道具礼包</div>
              <div class="text-sm text-gray-500">观看30秒广告获得随机道具</div>
            </div>
            <span class="text-primary font-bold">免费</span>
          </button>
        </div>
      </div>

      <div class="card">
        <div class="font-bold mb-4">我的道具</div>
        <div class="grid grid-cols-4 gap-4">
          <div class="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl">
            <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-xl">🛡️</div>
            <span class="font-bold">{{ userStore.shields }}</span>
            <span class="text-xs text-gray-500">护盾</span>
          </div>
          <div class="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl">
            <div class="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-xl">💡</div>
            <span class="font-bold">{{ userStore.hints }}</span>
            <span class="text-xs text-gray-500">提示</span>
          </div>
          <div class="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl">
            <div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-xl">⏰</div>
            <span class="font-bold">{{ userStore.timeAdds }}</span>
            <span class="text-xs text-gray-500">加时</span>
          </div>
          <div class="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl">
            <div class="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-xl">🔄</div>
            <span class="font-bold">{{ userStore.swaps }}</span>
            <span class="text-xs text-gray-500">换题</span>
          </div>
        </div>
      </div>

      <button @click="$router.back()" class="mt-6 btn btn-secondary w-full">返回首页</button>
    </div>

    <div v-if="showSuccessModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="card text-center max-w-sm w-full">
        <div class="text-6xl mb-4">🎉</div>
        <div class="text-xl font-bold mb-2">兑换成功!</div>
        <div class="text-gray-600 mb-4">{{ successMessage }}</div>
        <button @click="showSuccessModal = false" class="btn btn-primary w-full">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()

const showSuccessModal = ref(false)
const successMessage = ref('')

const shopItems = [
  { id: 1, name: '护盾', description: '抵消一次错误答案', icon: '🛡️', price: 50, type: 'shield', bgClass: 'bg-blue-100' },
  { id: 2, name: '提示', description: '排除两个错误选项', icon: '💡', price: 30, type: 'hint', bgClass: 'bg-yellow-100' },
  { id: 3, name: '加时', description: '增加5秒答题时间', icon: '⏰', price: 40, type: 'timeAdd', bgClass: 'bg-green-100' },
  { id: 4, name: '换题', description: '更换当前题目', icon: '🔄', price: 60, type: 'swap', bgClass: 'bg-purple-100' },
  { id: 5, name: '生命', description: '增加1条生命', icon: '❤️', price: 100, type: 'life', bgClass: 'bg-red-100' },
]

function buyItem(item) {
  if (userStore.currentPoints < item.price) {
    alert('积分不足！')
    return
  }
  
  userStore.spendPoints(item.price)
  
  if (item.type === 'life') {
    userStore.addLife()
  } else {
    userStore.addItem(item.type)
  }
  
  successMessage.value = `成功购买 ${item.name}！`
  showSuccessModal.value = true
}

function watchAdReward(type) {
  if (confirm('确认观看广告领取奖励？')) {
    switch (type) {
      case 'life':
        userStore.addLife()
        successMessage.value = '成功获得1条生命！'
        break
      case 'points':
        userStore.addPoints(20)
        successMessage.value = '成功获得20积分！'
        break
      case 'items':
        const items = ['shield', 'hint', 'timeAdd', 'swap']
        const randomItem = items[Math.floor(Math.random() * items.length)]
        userStore.addItem(randomItem, 2)
        const itemNames = { shield: '护盾', hint: '提示', timeAdd: '加时', swap: '换题' }
        successMessage.value = `成功获得2个${itemNames[randomItem]}！`
        break
    }
    showSuccessModal.value = true
  }
}
</script>

<template>
  <div class="min-h-screen p-4">
    <div class="max-w-md mx-auto">
      <div class="card mb-6">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
            <span class="text-white text-2xl font-bold">{{ userStore.nickname.charAt(0) }}</span>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="font-bold text-lg">{{ userStore.nickname }}</span>
              <span class="px-2 py-0.5 bg-gold text-yellow-800 rounded-full text-xs font-medium">
                Lv.{{ userStore.level }} {{ userStore.levelName }}
              </span>
            </div>
            <div class="flex items-center gap-4 mt-1 text-sm">
              <div class="flex items-center gap-1">
                <span class="text-yellow-500">💰</span>
                <span class="text-gray-600">{{ userStore.currentPoints }}</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="text-red-500">❤️</span>
                <span class="text-gray-600">{{ userStore.lives }}</span>
              </div>
            </div>
          </div>
          <button @click="$router.push('/profile')" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <span class="text-xl">👤</span>
          </button>
        </div>
        <div class="mt-4">
          <div class="flex justify-between text-xs text-gray-500 mb-1">
            <span>升级进度</span>
            <span>{{ userStore.totalPoints }} / {{ userStore.nextLevelPoints || '已满级' }}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: userStore.levelProgress + '%' }"></div>
          </div>
        </div>
      </div>

      <button 
        @click="handleSignIn" 
        class="card mb-6 flex items-center justify-between cursor-pointer hover:shadow-lg transition-shadow"
      >
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
            <span class="text-2xl">📅</span>
          </div>
          <div>
            <div class="font-bold">每日签到</div>
            <div class="text-sm text-gray-500">
              {{ signInStatus === 'signed' ? '今日已签到' : `连续签到 ${userStore.signInDays} 天` }}
            </div>
          </div>
        </div>
        <div v-if="signInStatus === 'signed'" class="text-green-500 text-lg">✓</div>
        <div v-else class="btn btn-primary text-sm px-4 py-2">签到</div>
      </button>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <button 
          @click="startQuiz('daily')" 
          class="card flex flex-col items-center gap-3 p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
        >
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span class="text-3xl">🎯</span>
          </div>
          <span class="font-bold">每日挑战</span>
          <span class="text-xs text-gray-500">每天20题</span>
        </button>
        <button 
          @click="startQuiz('level')" 
          class="card flex flex-col items-center gap-3 p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
        >
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center">
            <span class="text-3xl">🏰</span>
          </div>
          <span class="font-bold">闯关模式</span>
          <span class="text-xs text-gray-500">挑战关卡</span>
        </button>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <button 
          @click="$router.push('/shop')" 
          class="card flex flex-col items-center gap-3 p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
        >
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
            <span class="text-3xl">🛒</span>
          </div>
          <span class="font-bold">积分商城</span>
          <span class="text-xs text-gray-500">兑换好礼</span>
        </button>
        <button 
          @click="startQuiz('family')" 
          class="card flex flex-col items-center gap-3 p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
        >
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center">
            <span class="text-3xl">👨‍👩‍👧</span>
          </div>
          <span class="font-bold">亲子互动</span>
          <span class="text-xs text-gray-500">一起答题</span>
        </button>
      </div>

      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <span class="font-bold">我的道具</span>
          <span class="text-xs text-gray-500">点击使用</span>
        </div>
        <div class="grid grid-cols-4 gap-3">
          <div class="flex flex-col items-center gap-1">
            <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <span class="text-xl">🛡️</span>
            </div>
            <span class="text-xs font-medium">{{ userStore.shields }}</span>
            <span class="text-xs text-gray-400">护盾</span>
          </div>
          <div class="flex flex-col items-center gap-1">
            <div class="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
              <span class="text-xl">💡</span>
            </div>
            <span class="text-xs font-medium">{{ userStore.hints }}</span>
            <span class="text-xs text-gray-400">提示</span>
          </div>
          <div class="flex flex-col items-center gap-1">
            <div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <span class="text-xl">⏰</span>
            </div>
            <span class="text-xs font-medium">{{ userStore.timeAdds }}</span>
            <span class="text-xs text-gray-400">加时</span>
          </div>
          <div class="flex flex-col items-center gap-1">
            <div class="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <span class="text-xl">🔄</span>
            </div>
            <span class="text-xs font-medium">{{ userStore.swaps }}</span>
            <span class="text-xs text-gray-400">换题</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showSignInModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="card text-center max-w-sm w-full animate-bounce-in">
        <div class="text-6xl mb-4">🎉</div>
        <div class="text-xl font-bold mb-2">签到成功!</div>
        <div class="text-gray-600 mb-4">获得 {{ signInResult.points }} 积分</div>
        <div class="text-sm text-gray-500 mb-4">连续签到 {{ signInResult.days }} 天</div>
        <button @click="showSignInModal = false" class="btn btn-primary w-full">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const signInStatus = ref('')
const showSignInModal = ref(false)
const signInResult = ref({ points: 0, days: 0 })

onMounted(() => {
  const today = new Date().toISOString().split('T')[0]
  if (userStore.lastSignIn === today) {
    signInStatus.value = 'signed'
  } else {
    signInStatus.value = 'not_signed'
  }
})

function handleSignIn() {
  const result = userStore.signIn()
  if (result.signed) {
    signInResult.value = { points: result.points, days: result.days }
    showSignInModal.value = true
    signInStatus.value = 'signed'
  }
}

function startQuiz(mode) {
  if (userStore.lives <= 0) {
    if (confirm('生命值不足，观看广告恢复生命？')) {
      userStore.addLife()
      userStore.addLife()
      userStore.addLife()
    } else {
      return
    }
  }
  sessionStorage.setItem('quizMode', mode)
  sessionStorage.setItem('lives', userStore.lives.toString())
  userStore.consumeLife()
  userStore.saveUser()
  window.location.href = '/quiz'
}
</script>

<style>
@keyframes bounce-in {
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
}

.animate-bounce-in {
  animation: bounce-in 0.3s ease-out;
}
</style>

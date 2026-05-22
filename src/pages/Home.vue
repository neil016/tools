<template>
  <div class="min-h-screen relative overflow-hidden" style="background: linear-gradient(180deg, #87CEEB 0%, #B0E0E6 30%, #98FB98 70%, #90EE90 100%);">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-8 left-16 w-20 h-20 bg-white rounded-full opacity-70 blur-sm"></div>
      <div class="absolute top-4 right-24 w-28 h-28 bg-white rounded-full opacity-60 blur-sm"></div>
      <div class="absolute top-16 left-1/2 w-16 h-16 bg-white rounded-full opacity-50 blur-sm"></div>
      <div class="absolute top-6 left-1/3 w-12 h-12 bg-white rounded-full opacity-40 blur-sm"></div>
      
      <div class="absolute bottom-0 left-0 right-0 h-40">
        <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-500 to-transparent opacity-30"></div>
        <div class="absolute bottom-20 left-10 w-8 h-20 bg-green-600 rounded-t-full opacity-60"></div>
        <div class="absolute bottom-16 left-16 w-6 h-16 bg-green-600 rounded-t-full opacity-50"></div>
        <div class="absolute bottom-12 left-24 w-12 h-24 bg-green-500 rounded-t-full opacity-40"></div>
        <div class="absolute bottom-24 right-16 w-10 h-22 bg-green-600 rounded-t-full opacity-50"></div>
        <div class="absolute bottom-18 right-28 w-8 h-18 bg-green-500 rounded-t-full opacity-40"></div>
        <div class="absolute bottom-20 right-10 w-6 h-14 bg-green-600 rounded-t-full opacity-60"></div>
      </div>

      <div class="absolute bottom-32 left-1/4 w-32 h-20 bg-amber-200 rounded-t-lg opacity-80"></div>
      <div class="absolute bottom-44 left-1/3 w-48 h-32 bg-amber-100 rounded-t-lg">
        <div class="absolute top-4 left-4 w-16 h-16 border-4 border-amber-300 rounded"></div>
        <div class="absolute top-6 left-6 w-12 h-12 bg-sky-300 rounded"></div>
        <div class="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-12 bg-red-500 rounded-t"></div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-400 rounded-full"></div>
      </div>
      
      <div class="absolute bottom-40 right-1/4 w-24 h-16 bg-amber-200 rounded-t-lg opacity-70"></div>
      
      <div class="absolute bottom-36 right-1/3 w-16 h-12 bg-blue-300 rounded-full opacity-60"></div>
      <div class="absolute bottom-44 right-1/3 w-4 h-4 bg-blue-400 rounded-full opacity-70 animate-bounce"></div>
      <div class="absolute bottom-48 right-1/3 w-3 h-3 bg-blue-400 rounded-full opacity-60 animate-bounce" style="animation-delay: 0.2s"></div>
      <div class="absolute bottom-52 right-1/3 w-2 h-2 bg-blue-400 rounded-full opacity-50 animate-bounce" style="animation-delay: 0.4s"></div>
    </div>

    <div class="relative z-10 p-4">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <div class="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center border-3 border-white shadow-lg">
            <span class="text-white text-xl font-bold">{{ userStore.nickname.charAt(0) }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-lg font-bold text-white drop-shadow-lg">{{ userStore.nickname }}</span>
            <span class="text-xl">{{ userStore.gender === 1 ? '👨' : userStore.gender === 2 ? '👩' : '👤' }}</span>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
            <span class="text-xl">💎</span>
            <span class="font-bold text-gray-700">{{ userStore.currentPoints }}</span>
          </div>
          <div class="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
            <span class="text-xl">❤️</span>
            <span class="font-bold text-gray-700">{{ userStore.lives }}/5</span>
          </div>
        </div>
      </div>

      <div class="flex justify-between">
        <div class="flex flex-col gap-3 w-24">
          <button 
            @click="handleSignIn" 
            class="flex flex-col items-center gap-2 p-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <span class="text-3xl">📅</span>
            <span class="text-xs font-bold text-gray-700">每日签到</span>
          </button>
          <button 
            @click="$router.push('/shop')" 
            class="flex flex-col items-center gap-2 p-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <span class="text-3xl">🛒</span>
            <span class="text-xs font-bold text-gray-700">积分商城</span>
          </button>
          <button 
            @click="handleLottery" 
            class="flex flex-col items-center gap-2 p-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <span class="text-3xl">🎰</span>
            <span class="text-xs font-bold text-gray-700">积分抽奖</span>
          </button>
        </div>

        <div class="flex-1 flex flex-col items-center justify-end pb-4">
          <div class="relative mb-4">
            <div class="w-36 h-44 bg-gradient-to-b from-white/90 to-white/95 rounded-3xl flex flex-col items-center justify-center border-4 border-white shadow-xl">
              <div class="relative">
                <div class="w-20 h-20 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full flex items-center justify-center">
                  <span class="text-5xl">🧑‍🎓</span>
                </div>
                <div class="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center border-2 border-white">
                  <span class="text-xs font-bold text-white">Lv.{{ userStore.level }}</span>
                </div>
              </div>
              <div class="text-center mt-3">
                <div class="text-sm font-bold text-gray-700">天天学苑</div>
                <div class="text-xs text-gray-500 mt-1">知识小达人</div>
              </div>
            </div>
            <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg">
              <span class="text-white text-xs font-bold">{{ userStore.levelName }}</span>
            </div>
          </div>

          <div class="w-full max-w-xs bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <div class="flex justify-between text-sm mb-2">
              <span class="text-gray-600">升级进度</span>
              <span class="text-gray-500">还差 {{ remainingPoints }} 分升级</span>
            </div>
            <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                class="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
                :style="{ width: userStore.levelProgress + '%' }"
              ></div>
            </div>
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>Lv.{{ userStore.level }}</span>
              <span>Lv.{{ userStore.level + 1 }}</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-3 w-24">
          <button 
            @click="startQuiz('daily')" 
            class="flex flex-col items-center gap-2 p-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <span class="text-3xl">🎯</span>
            <span class="text-xs font-bold text-gray-700">每日挑战</span>
          </button>
          <button 
            @click="startQuiz('level')" 
            class="flex flex-col items-center gap-2 p-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <span class="text-3xl">🏰</span>
            <span class="text-xs font-bold text-gray-700">个人闯关</span>
          </button>
          <button 
            @click="startQuiz('pk')" 
            class="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <span class="text-3xl">⚔️</span>
            <span class="text-xs font-bold text-white">PK对战</span>
          </button>
        </div>
      </div>

      <div class="mt-6 flex justify-center">
        <button 
          @click="$router.push('/profile')" 
          class="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <span class="text-lg">👤</span>
          <span class="text-gray-700 font-medium">个人中心</span>
        </button>
      </div>
    </div>

    <div v-if="showSignInModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl text-center max-w-sm w-full p-6 shadow-2xl animate-bounce-in">
        <div class="text-6xl mb-4">🎉</div>
        <div class="text-xl font-bold mb-2">签到成功!</div>
        <div class="text-gray-600 mb-4">获得 {{ signInResult.points }} 积分</div>
        <div class="text-sm text-gray-500 mb-4">连续签到 {{ signInResult.days }} 天</div>
        <button @click="showSignInModal = false" class="btn btn-primary w-full">确定</button>
      </div>
    </div>

    <div v-if="showLotteryModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl text-center max-w-sm w-full p-6 shadow-2xl">
        <div class="text-6xl mb-4">🎰</div>
        <div class="text-xl font-bold mb-2">积分抽奖</div>
        <div class="text-gray-600 mb-4">消耗50积分进行抽奖</div>
        <div class="flex gap-3 mb-6">
          <button 
            @click="doLottery" 
            :disabled="userStore.currentPoints < 50"
            class="flex-1 btn py-3"
            :class="userStore.currentPoints >= 50 ? 'btn-primary' : 'bg-gray-200 text-gray-400 cursor-not-allowed'"
          >
            立即抽奖
          </button>
        </div>
        <button @click="showLotteryModal = false" class="text-gray-500 text-sm">取消</button>
      </div>
    </div>

    <div v-if="showLotteryResult" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl text-center max-w-sm w-full p-6 shadow-2xl animate-bounce-in">
        <div class="text-6xl mb-4">{{ lotteryPrize.icon }}</div>
        <div class="text-xl font-bold mb-2">恭喜获得!</div>
        <div class="text-gray-600 mb-4">{{ lotteryPrize.name }} x{{ lotteryPrize.count }}</div>
        <button @click="showLotteryResult = false" class="btn btn-primary w-full">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const signInStatus = ref('')
const showSignInModal = ref(false)
const signInResult = ref({ points: 0, days: 0 })
const showLotteryModal = ref(false)
const showLotteryResult = ref(false)
const lotteryPrize = ref({ icon: '', name: '', count: 0 })

const remainingPoints = computed(() => {
  if (!userStore.nextLevelPoints) return 0
  return userStore.nextLevelPoints - userStore.totalPoints
})

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

function handleLottery() {
  showLotteryModal.value = true
}

function doLottery() {
  if (userStore.currentPoints < 50) return
  
  userStore.spendPoints(50)
  
  const prizes = [
    { icon: '🛡️', name: '护盾', count: 1, type: 'shield' },
    { icon: '💡', name: '提示', count: 1, type: 'hint' },
    { icon: '⏰', name: '加时', count: 1, type: 'timeAdd' },
    { icon: '🔄', name: '换题', count: 1, type: 'swap' },
    { icon: '❤️', name: '生命', count: 1, type: 'life' },
    { icon: '💎', name: '积分', count: 100, type: 'points' },
  ]
  
  const randomIndex = Math.floor(Math.random() * prizes.length)
  lotteryPrize.value = prizes[randomIndex]
  
  if (lotteryPrize.value.type === 'life') {
    userStore.addLife()
  } else if (lotteryPrize.value.type === 'points') {
    userStore.addPoints(lotteryPrize.value.count)
  } else {
    userStore.addItem(lotteryPrize.value.type, lotteryPrize.value.count)
  }
  
  showLotteryModal.value = false
  showLotteryResult.value = true
}

function startQuiz(mode) {
  if (userStore.lives <= 0) {
    if (confirm('生命值不足，观看广告恢复生命？')) {
      userStore.lives = 5
    } else {
      return
    }
  }
  sessionStorage.setItem('quizMode', mode)
  sessionStorage.setItem('lives', userStore.lives.toString())
  userStore.lives--
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

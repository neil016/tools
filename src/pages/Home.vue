<template>
  <div class="min-h-screen relative overflow-hidden bg-gradient-to-b from-sky-400 via-sky-300 to-green-400">
    <div class="absolute inset-0">
      <div class="absolute top-10 left-10 w-16 h-16 bg-white/40 rounded-full blur-xl"></div>
      <div class="absolute top-20 right-20 w-24 h-24 bg-white/30 rounded-full blur-xl"></div>
      <div class="absolute top-1/3 left-1/4 w-20 h-20 bg-white/30 rounded-full blur-xl"></div>
    </div>

    <div class="absolute top-0 left-0 right-0 h-48 overflow-hidden">
      <svg viewBox="0 0 400 200" class="w-full h-full">
        <rect x="0" y="80" width="400" height="120" fill="#86EFAC" opacity="0.8"/>
        <rect x="30" y="20" width="60" height="80" fill="#D4D4D4"/>
        <rect x="100" y="30" width="50" height="70" fill="#E5E5E5"/>
        <rect x="155" y="10" width="90" height="90" fill="#FDE68A"/>
        <rect x="165" y="20" width="70" height="50" fill="#FED7AA"/>
        <polygon points="155,20 200,0 245,20" fill="#DC2626"/>
        <circle cx="200" cy="35" r="15" fill="white" stroke="#9CA3AF" stroke-width="2"/>
        <line x1="200" y1="30" x2="200" y2="40" stroke="#374151" stroke-width="1"/>
        <line x1="193" y1="35" x2="207" y2="35" stroke="#374151" stroke-width="1"/>
        <rect x="250" y="25" width="45" height="75" fill="#FCA5A5"/>
        <rect x="300" y="35" width="50" height="65" fill="#D4D4D4"/>
        <rect x="355" y="40" width="40" height="60" fill="#E5E5E5"/>
        <rect x="10" y="80" width="80" height="4" fill="white"/>
        <rect x="100" y="80" width="80" height="4" fill="white"/>
        <rect x="190" y="80" width="100" height="4" fill="white"/>
        <rect x="300" y="80" width="80" height="4" fill="white"/>
        <rect x="0" y="84" width="10" height="40" fill="white"/>
        <rect x="20" y="84" width="10" height="40" fill="white"/>
        <rect x="40" y="84" width="10" height="40" fill="white"/>
        <rect x="60" y="84" width="10" height="40" fill="white"/>
        <rect x="330" y="84" width="10" height="40" fill="white"/>
        <rect x="350" y="84" width="10" height="40" fill="white"/>
        <rect x="370" y="84" width="10" height="40" fill="white"/>
        <rect x="390" y="84" width="10" height="40" fill="white"/>
        <circle cx="50" cy="100" r="20" fill="#4ADE80"/>
        <circle cx="60" cy="85" r="15" fill="#22C55E"/>
        <circle cx="40" cy="90" r="12" fill="#22C55E"/>
        <circle cx="130" cy="95" r="18" fill="#4ADE80"/>
        <circle cx="140" cy="82" r="14" fill="#22C55E"/>
        <circle cx="920" cy="90" r="16" fill="#4ADE80"/>
        <circle cx="930" cy="80" r="12" fill="#22C55E"/>
        <circle cx="340" cy="95" r="17" fill="#4ADE80"/>
        <circle cx="350" cy="83" r="13" fill="#22C55E"/>
        <circle cx="230" cy="105" r="8" fill="white"/>
        <circle cx="320" cy="100" r="10" fill="white"/>
        <circle cx="380" cy="95" r="8" fill="white"/>
      </svg>
    </div>

    <div class="absolute top-4 left-4 z-20">
      <div class="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg">
        <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <span class="text-gray-500 text-lg">👤</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="text-red-500 text-xl">🌺</span>
          <span class="font-bold text-gray-700">{{ userStore.currentPoints }}</span>
        </div>
      </div>
    </div>

    <div class="absolute top-4 right-4 z-20">
      <button class="flex flex-col items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all">
        <span class="text-2xl">🔔</span>
        <span class="text-xs text-gray-600">戳一戳</span>
      </button>
    </div>

    <div class="relative z-10 pt-56 pb-8 px-4">
      <div class="absolute left-2 top-48">
        <div class="flex flex-col gap-3">
          <button 
            @click="handleSignIn" 
            class="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 relative"
          >
            <span class="text-xl">🌺</span>
            <span class="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-red-600">奖</span>
          </button>
          <span class="text-xs text-white font-bold text-center drop-shadow">领红花</span>
        </div>
      </div>

      <div class="flex flex-col items-center">
        <div class="relative mb-4">
          <div class="text-8xl animate-bounce">👦</div>
          <div class="absolute -right-4 top-4 bg-gradient-to-r from-yellow-400 to-orange-400 px-3 py-1 rounded-lg shadow-lg">
            <span class="text-xs font-bold text-white">专属称号</span>
          </div>
          <div class="absolute -right-4 top-12 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
            <span class="text-sm font-bold text-gray-700">{{ userStore.levelName }}</span>
          </div>
        </div>

        <div class="bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 shadow-xl mb-4">
          <div class="flex items-center gap-4">
            <div class="w-32 h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                class="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-500"
                :style="{ width: userStore.levelProgress + '%' }"
              ></div>
            </div>
            <div class="flex items-center gap-1">
              <span class="text-yellow-500">⭐</span>
              <span class="text-sm font-bold text-gray-700">×{{ levelStars }}</span>
            </div>
          </div>
          <div class="text-center text-sm text-gray-500 mt-1">
            再赢{{ remainingWins }}局即可升级
          </div>
        </div>

        <button 
          @click="startQuiz('daily')" 
          class="w-64 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-xl text-white text-xl font-bold hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center"
        >
          开始游戏
        </button>
      </div>

      <div class="absolute right-2 top-48">
        <div class="flex flex-col gap-3">
          <button 
            @click="handleLottery" 
            class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 relative"
          >
            <span class="text-xl">🎰</span>
          </button>
          <span class="text-xs text-white font-bold text-center drop-shadow">立即抽奖</span>
        </div>
      </div>

      <div class="absolute left-2 bottom-24">
        <div class="flex flex-col gap-3">
          <button 
            @click="$router.push('/shop')" 
            class="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 relative"
          >
            <span class="text-xl">🏪</span>
            <span class="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center text-xs font-bold text-white">新</span>
          </button>
          <span class="text-xs text-white font-bold text-center drop-shadow">小卖部</span>
        </div>
      </div>

      <div class="absolute right-2 bottom-24">
        <div class="flex flex-col gap-3">
          <button 
            @click="showLeaderboard" 
            class="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <span class="text-xl">🏆</span>
          </button>
          <span class="text-xs text-white font-bold text-center drop-shadow">排行榜</span>
        </div>
      </div>

      <div class="absolute left-2 bottom-6">
        <div class="flex flex-col gap-3">
          <button 
            @click="showContact" 
            class="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <span class="text-xl">💬</span>
          </button>
          <span class="text-xs text-white font-bold text-center drop-shadow">联系客服</span>
        </div>
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

const levelStars = computed(() => userStore.level)

const remainingWins = computed(() => {
  if (!userStore.nextLevelPoints) return 0
  const pointsNeeded = userStore.nextLevelPoints - userStore.totalPoints
  return Math.ceil(pointsNeeded / 10)
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

function showLeaderboard() {
  alert('排行榜功能开发中...')
}

function showContact() {
  alert('客服功能开发中...')
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

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>

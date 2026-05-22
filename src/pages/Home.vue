<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- 校园背景图 -->
    <img 
      src="https://space.coze.cn/s/v184gHtW5Qc/" 
      alt="校园背景" 
      class="absolute inset-0 w-full h-full object-cover"
    />
    
    <div class="relative z-10 p-4">
      <!-- 顶部信息栏 -->
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

      <!-- 主要内容区域 -->
      <div class="flex justify-between">
        <!-- 左侧功能按钮 -->
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

        <!-- 中间人物形象 -->
        <div class="flex-1 flex flex-col items-center justify-end pb-4">
          <div class="relative mb-4">
            <!-- 人物形象图 -->
            <img 
              src="https://space.coze.cn/s/v1vGd-2g2Og/" 
              alt="人物形象" 
              class="w-40 h-48 object-contain drop-shadow-2xl"
            />
            <!-- 等级标签 -->
            <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg">
              <span class="text-white text-xs font-bold">{{ userStore.levelName }}</span>
            </div>
          </div>

          <!-- 升级进度条 -->
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

        <!-- 右侧功能按钮 -->
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

      <!-- 底部个人中心按钮 -->
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

    <!-- 签到弹窗 -->
    <div v-if="showSignInModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl text-center max-w-sm w-full p-6 shadow-2xl animate-bounce-in">
        <div class="text-6xl mb-4">🎉</div>
        <div class="text-xl font-bold mb-2">签到成功!</div>
        <div class="text-gray-600 mb-4">获得 {{ signInResult.points }} 积分</div>
        <div class="text-sm text-gray-500 mb-4">连续签到 {{ signInResult.days }} 天</div>
        <button @click="showSignInModal = false" class="btn btn-primary w-full">确定</button>
      </div>
    </div>

    <!-- 抽奖弹窗 -->
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

    <!-- 抽奖结果弹窗 -->
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

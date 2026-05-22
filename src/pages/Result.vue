<template>
  <div class="min-h-screen p-4">
    <div class="max-w-md mx-auto">
      <div class="card text-center mb-6">
        <div class="text-7xl mb-4">{{ resultEmoji }}</div>
        <div class="text-2xl font-bold mb-2">挑战完成!</div>
        <div class="text-gray-500 mb-4">{{ resultMessage }}</div>
        
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div class="bg-gray-50 rounded-xl p-4">
            <div class="text-2xl font-bold text-primary">{{ result.correctCount }}</div>
            <div class="text-xs text-gray-500">答对题数</div>
          </div>
          <div class="bg-gray-50 rounded-xl p-4">
            <div class="text-2xl font-bold text-green-500">{{ accuracy }}%</div>
            <div class="text-xs text-gray-500">正确率</div>
          </div>
          <div class="bg-gray-50 rounded-xl p-4">
            <div class="text-2xl font-bold text-yellow-500">{{ result.totalPoints }}</div>
            <div class="text-xs text-gray-500">获得积分</div>
          </div>
        </div>

        <div class="progress-bar mb-6">
          <div class="progress-fill" :style="{ width: accuracy + '%' }"></div>
        </div>

        <button @click="shareScore" class="btn btn-primary w-full mb-3">分享成绩</button>
        <button @click="goHome" class="btn btn-secondary w-full">返回首页</button>
      </div>

      <div class="card mb-6">
        <div class="font-bold mb-4">答题详情</div>
        <div class="space-y-3">
          <div 
            v-for="(item, index) in answerDetails" 
            :key="index"
            class="flex items-center gap-3 p-3 rounded-xl"
            :class="item.correct ? 'bg-green-50' : 'bg-red-50'"
          >
            <span class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
              :class="item.correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white'"
            >
              {{ index + 1 }}
            </span>
            <div class="flex-1">
              <div class="text-sm font-medium">{{ item.question }}</div>
              <div class="text-xs text-gray-500">
                {{ item.correct ? `你的答案: ${item.selected}` : `正确答案: ${item.correctAnswer}` }}
              </div>
            </div>
            <span class="text-lg">{{ item.correct ? '✓' : '✗' }}</span>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="font-bold mb-4">奖励领取</div>
        <div class="space-y-3">
          <button 
            @click="claimBonus('double')" 
            class="w-full p-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-between hover:shadow-lg transition-shadow"
          >
            <div class="flex items-center gap-3">
              <span class="text-2xl">🎁</span>
              <div class="text-left">
                <div class="font-bold text-white">双倍积分</div>
                <div class="text-xs text-white/80">观看广告获得双倍奖励</div>
              </div>
            </div>
            <span class="text-white font-bold">+{{ result.totalPoints }}</span>
          </button>
          <button 
            @click="claimBonus('life')" 
            class="w-full p-4 rounded-xl bg-gradient-to-r from-red-400 to-pink-400 flex items-center justify-between hover:shadow-lg transition-shadow"
          >
            <div class="flex items-center gap-3">
              <span class="text-2xl">❤️</span>
              <div class="text-left">
                <div class="font-bold text-white">额外生命</div>
                <div class="text-xs text-white/80">观看广告获得1条生命</div>
              </div>
            </div>
            <span class="text-white font-bold">+1</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()

const result = ref({
  correctCount: 0,
  totalCount: 10,
  totalPoints: 0,
  totalTime: 150
})

const answerDetails = ref([])

const accuracy = computed(() => {
  return Math.round((result.value.correctCount / result.value.totalCount) * 100)
})

const resultEmoji = computed(() => {
  if (accuracy.value >= 90) return '🏆'
  if (accuracy.value >= 70) return '🎉'
  if (accuracy.value >= 50) return '👍'
  return '💪'
})

const resultMessage = computed(() => {
  if (accuracy.value >= 90) return '太棒了！你是答题高手！'
  if (accuracy.value >= 70) return '表现不错！继续加油！'
  if (accuracy.value >= 50) return '还可以！再接再厉！'
  return '别灰心，多练习一定会进步！'
})

onMounted(() => {
  const saved = sessionStorage.getItem('quizResult')
  if (saved) {
    result.value = JSON.parse(saved)
  }
  
  generateAnswerDetails()
})

function generateAnswerDetails() {
  const details = []
  for (let i = 0; i < result.value.totalCount; i++) {
    const isCorrect = i < result.value.correctCount
    details.push({
      question: `第${i + 1}题`,
      correct: isCorrect,
      selected: isCorrect ? '正确答案' : '错误答案',
      correctAnswer: '正确答案'
    })
  }
  answerDetails.value = details
}

function shareScore() {
  const text = `我在天天答题王挑战中答对了 ${result.value.correctCount}/${result.value.totalCount} 题，获得 ${result.value.totalPoints} 积分！快来挑战我吧！`
  if (navigator.share) {
    navigator.share({
      title: '天天答题王',
      text: text
    })
  } else {
    alert('分享链接已复制到剪贴板！')
    navigator.clipboard.writeText(text)
  }
}

function goHome() {
  window.location.href = '/'
}

function claimBonus(type) {
  if (type === 'double') {
    userStore.addPoints(result.value.totalPoints)
    alert(`恭喜获得双倍积分！+${result.value.totalPoints}`)
  } else if (type === 'life') {
    userStore.addLife()
    alert('恭喜获得额外生命！')
  }
}
</script>

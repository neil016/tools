<template>
  <div class="min-h-screen p-4">
    <div class="max-w-md mx-auto">
      <div class="card mb-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-lg">{{ currentIndex + 1 }}/{{ questions.length }}</span>
            <span class="text-sm text-gray-500">{{ currentQuestion?.category }}</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-1">
              <span class="text-red-500">❤️</span>
              <span>{{ remainingLives }}</span>
            </div>
            <div class="flex items-center gap-1">
              <span class="text-yellow-500">🔥</span>
              <span>{{ combo }}</span>
            </div>
          </div>
        </div>
        <div class="progress-bar mt-3">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
      </div>

      <div class="card mb-4">
        <div class="flex items-center gap-2 mb-4">
          <span 
            class="px-3 py-1 rounded-full text-xs font-medium"
            :class="difficultyClass"
          >
            {{ currentQuestion?.difficulty }}
          </span>
        </div>
        <div class="text-xl font-bold mb-6 text-center">
          {{ currentQuestion?.question }}
        </div>
        <div class="space-y-3">
          <button
            v-for="(option, index) in currentQuestion?.options"
            :key="index"
            @click="selectOption(index)"
            :disabled="answered"
            class="w-full p-4 rounded-xl text-left transition-all duration-300"
            :class="getOptionClass(index)"
          >
            <div class="flex items-center gap-3">
              <span 
                class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                :class="getOptionBadgeClass(index)"
              >
                {{ ['A', 'B', 'C', 'D'][index] }}
              </span>
              <span class="flex-1">{{ option }}</span>
              <span v-if="answered && index === currentQuestion?.answer" class="text-green-500 text-xl">✓</span>
              <span v-else-if="answered && selectedAnswer === index && index !== currentQuestion?.answer" class="text-red-500 text-xl">✗</span>
            </div>
          </button>
        </div>
      </div>

      <div class="card mb-4">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-500">剩余时间</div>
          <div class="text-lg font-bold" :class="timeLeft <= 5 ? 'text-red-500' : 'text-primary'">
            {{ timeLeft }}s
          </div>
        </div>
        <div class="progress-bar mt-2">
          <div 
            class="h-full transition-all duration-1000"
            :class="timeLeft <= 5 ? 'bg-red-500' : 'bg-gradient-to-r from-primary to-accent'"
            :style="{ width: (timeLeft / maxTime) * 100 + '%' }"
          ></div>
        </div>
      </div>

      <div class="flex gap-3">
        <button 
          @click="useHint" 
          :disabled="answered || userStore.hints <= 0"
          class="flex-1 btn py-3 text-sm flex items-center justify-center gap-2"
          :class="userStore.hints > 0 && !answered ? 'btn-secondary' : 'bg-gray-200 text-gray-400 cursor-not-allowed'"
        >
          <span>💡</span>
          <span>提示 ({{ userStore.hints }})</span>
        </button>
        <button 
          @click="useShield" 
          :disabled="answered || userStore.shields <= 0"
          class="flex-1 btn py-3 text-sm flex items-center justify-center gap-2"
          :class="userStore.shields > 0 && !answered ? 'btn-secondary' : 'bg-gray-200 text-gray-400 cursor-not-allowed'"
        >
          <span>🛡️</span>
          <span>护盾 ({{ userStore.shields }})</span>
        </button>
        <button 
          @click="useTimeAdd" 
          :disabled="answered || userStore.timeAdds <= 0"
          class="flex-1 btn py-3 text-sm flex items-center justify-center gap-2"
          :class="userStore.timeAdds > 0 && !answered ? 'btn-secondary' : 'bg-gray-200 text-gray-400 cursor-not-allowed'"
        >
          <span>⏰</span>
          <span>加时 ({{ userStore.timeAdds }})</span>
        </button>
      </div>
    </div>

    <div v-if="showGameOver" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="card text-center max-w-sm w-full">
        <div class="text-6xl mb-4">😢</div>
        <div class="text-xl font-bold mb-2">挑战结束</div>
        <div class="text-gray-600 mb-4">生命值已用尽</div>
        <div class="flex gap-3 mb-4">
          <button @click="watchAdRevive" class="flex-1 btn btn-primary">观看广告复活</button>
          <button @click="goHome" class="flex-1 btn btn-secondary">返回首页</button>
        </div>
      </div>
    </div>

    <div v-if="showResult" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="card text-center max-w-sm w-full">
        <div class="text-6xl mb-4">{{ correctCount >= questions.length * 0.8 ? '🎉' : correctCount >= questions.length * 0.5 ? '👍' : '💪' }}</div>
        <div class="text-xl font-bold mb-2">答题完成!</div>
        <div class="text-gray-600 mb-4">答对 {{ correctCount }} / {{ questions.length }} 题</div>
        <div class="text-2xl font-bold text-primary mb-4">获得 {{ totalPoints }} 积分</div>
        <button @click="goResult" class="btn btn-primary w-full">查看详情</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '../stores/user'
import { getDailyQuestions } from '../data/questions'

const userStore = useUserStore()

const questions = ref([])
const currentIndex = ref(0)
const selectedAnswer = ref(-1)
const answered = ref(false)
const correctCount = ref(0)
const totalPoints = ref(0)
const combo = ref(0)
const remainingLives = ref(3)
const timeLeft = ref(15)
const maxTime = ref(15)
const showGameOver = ref(false)
const showResult = ref(false)
const disabledOptions = ref([])
let timer = null

const currentQuestion = computed(() => questions.value[currentIndex.value])

const progressPercent = computed(() => ((currentIndex.value + 1) / questions.value.length) * 100)

const difficultyClass = computed(() => {
  const diff = currentQuestion.value?.difficulty
  if (diff === '简单') return 'bg-green-100 text-green-700'
  if (diff === '普通') return 'bg-yellow-100 text-yellow-700'
  return 'bg-red-100 text-red-700'
})

onMounted(() => {
  questions.value = getDailyQuestions(10)
  remainingLives.value = parseInt(sessionStorage.getItem('lives') || '3')
  startTimer()
})

onUnmounted(() => {
  clearInterval(timer)
})

function startTimer() {
  timer = setInterval(() => {
    if (!answered.value) {
      timeLeft.value--
      if (timeLeft.value <= 0) {
        handleTimeout()
      }
    }
  }, 1000)
}

function stopTimer() {
  clearInterval(timer)
}

function resetTimer() {
  stopTimer()
  timeLeft.value = maxTime.value
  startTimer()
}

function selectOption(index) {
  if (answered.value) return
  
  selectedAnswer.value = index
  answered.value = true
  stopTimer()

  if (index === currentQuestion.value.answer) {
    correctCount.value++
    combo.value++
    const basePoints = 10
    const comboBonus = Math.min(combo.value - 1, 5) * 2
    const earnedPoints = basePoints + comboBonus
    totalPoints.value += earnedPoints
  } else {
    combo.value = 0
    remainingLives.value--
    if (remainingLives.value <= 0) {
      showGameOver.value = true
      return
    }
  }

  setTimeout(() => {
    nextQuestion()
  }, 1500)
}

function handleTimeout() {
  answered.value = true
  selectedAnswer.value = -1
  combo.value = 0
  remainingLives.value--
  
  if (remainingLives.value <= 0) {
    showGameOver.value = true
    return
  }

  setTimeout(() => {
    nextQuestion()
  }, 1500)
}

function nextQuestion() {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++
    selectedAnswer.value = -1
    answered.value = false
    disabledOptions.value = []
    resetTimer()
  } else {
    showResult.value = true
  }
}

function getOptionClass(index) {
  if (!answered.value) {
    return 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-primary'
  }
  if (index === currentQuestion.value.answer) {
    return 'bg-green-100 border-2 border-green-500'
  }
  if (selectedAnswer.value === index) {
    return 'bg-red-100 border-2 border-red-500'
  }
  return 'bg-gray-50 opacity-50'
}

function getOptionBadgeClass(index) {
  if (!answered.value) {
    return 'bg-gray-200 text-gray-600'
  }
  if (index === currentQuestion.value.answer) {
    return 'bg-green-500 text-white'
  }
  if (selectedAnswer.value === index) {
    return 'bg-red-500 text-white'
  }
  return 'bg-gray-200 text-gray-400'
}

function useHint() {
  if (userStore.hints <= 0 || answered.value) return
  
  userStore.consumeItem('hint')
  
  const correctAnswer = currentQuestion.value.answer
  const wrongIndexes = [0, 1, 2, 3].filter(i => i !== correctAnswer)
  const randomWrong = wrongIndexes[Math.floor(Math.random() * wrongIndexes.length)]
  
  disabledOptions.value.push(randomWrong)
}

function useShield() {
  if (userStore.shields <= 0 || answered.value) return
  userStore.consumeItem('shield')
}

function useTimeAdd() {
  if (userStore.timeAdds <= 0 || answered.value) return
  
  userStore.consumeItem('timeAdd')
  timeLeft.value += 5
}

function watchAdRevive() {
  remainingLives.value = 3
  showGameOver.value = false
  resetTimer()
}

function goHome() {
  window.location.href = '/'
}

function goResult() {
  sessionStorage.setItem('quizResult', JSON.stringify({
    correctCount: correctCount.value,
    totalCount: questions.value.length,
    totalPoints: totalPoints.value,
    totalTime: questions.value.length * 15
  }))
  userStore.addPoints(totalPoints.value)
  window.location.href = '/result'
}
</script>

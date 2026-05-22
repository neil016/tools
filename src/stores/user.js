import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const LEVELS = [
  { level: 1, name: '新手', points: 0 },
  { level: 2, name: '学徒', points: 100 },
  { level: 3, name: '秀才', points: 300 },
  { level: 4, name: '举人', points: 600 },
  { level: 5, name: '贡士', points: 1000 },
  { level: 6, name: '进士', points: 1500 },
  { level: 7, name: '探花', points: 2200 },
  { level: 8, name: '榜眼', points: 3000 },
  { level: 9, name: '状元', points: 5000 },
  { level: 10, name: '帝师', points: 10000 }
]

export const useUserStore = defineStore('user', () => {
  const userId = ref('')
  const nickname = ref('用户')
  const avatar = ref('')
  const gender = ref(0)
  const currentPoints = ref(0)
  const totalPoints = ref(0)
  const lives = ref(5)
  const lastSignIn = ref('')
  const signInDays = ref(0)
  const level = ref(1)
  const levelName = ref('新手')
  const shields = ref(0)
  const hints = ref(0)
  const timeAdds = ref(0)
  const swaps = ref(0)

  const nextLevelPoints = computed(() => {
    const currentLevelIndex = LEVELS.findIndex(l => l.level === level.value)
    if (currentLevelIndex >= LEVELS.length - 1) return null
    return LEVELS[currentLevelIndex + 1].points
  })

  const levelProgress = computed(() => {
    const currentLevelIndex = LEVELS.findIndex(l => l.level === level.value)
    if (currentLevelIndex >= LEVELS.length - 1) return 100
    const currentLevelPoints = LEVELS[currentLevelIndex].points
    const nextLevelPointsValue = LEVELS[currentLevelIndex + 1].points
    return Math.min(100, ((totalPoints.value - currentLevelPoints) / (nextLevelPointsValue - currentLevelPoints)) * 100)
  })

  function loadUser() {
    const saved = localStorage.getItem('quiz_user')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        userId.value = data.userId || ''
        nickname.value = data.nickname || '用户'
        avatar.value = data.avatar || ''
        gender.value = data.gender || 0
        currentPoints.value = data.currentPoints || 0
        totalPoints.value = data.totalPoints || 0
        lives.value = data.lives || 3
        lastSignIn.value = data.lastSignIn || ''
        signInDays.value = data.signInDays || 0
        level.value = data.level || 1
        levelName.value = data.levelName || '新手'
        shields.value = data.shields || 0
        hints.value = data.hints || 0
        timeAdds.value = data.timeAdds || 0
        swaps.value = data.swaps || 0
        updateLevel()
      } catch (e) {
        console.error('Failed to load user data:', e)
      }
    }
  }

  function saveUser() {
    const data = {
      userId: userId.value,
      nickname: nickname.value,
      avatar: avatar.value,
      gender: gender.value,
      currentPoints: currentPoints.value,
      totalPoints: totalPoints.value,
      lives: lives.value,
      lastSignIn: lastSignIn.value,
      signInDays: signInDays.value,
      level: level.value,
      levelName: levelName.value,
      shields: shields.value,
      hints: hints.value,
      timeAdds: timeAdds.value,
      swaps: swaps.value
    }
    localStorage.setItem('quiz_user', JSON.stringify(data))
  }

  function login(loginData) {
    userId.value = loginData.userId || `user_${Date.now()}`
    nickname.value = loginData.nickname || '用户'
    avatar.value = loginData.avatar || ''
    gender.value = loginData.gender || 0
    saveUser()
  }

  function addPoints(points) {
    currentPoints.value += points
    totalPoints.value += points
    updateLevel()
    saveUser()
  }

  function spendPoints(points) {
    if (currentPoints.value >= points) {
      currentPoints.value -= points
      saveUser()
      return true
    }
    return false
  }

  function updateLevel() {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (totalPoints.value >= LEVELS[i].points) {
        level.value = LEVELS[i].level
        levelName.value = LEVELS[i].name
        break
      }
    }
    saveUser()
  }

  function signIn() {
    const today = new Date().toISOString().split('T')[0]
    if (lastSignIn.value === today) {
      return { signed: false, message: '今日已签到' }
    }

    const isContinuous = lastSignIn.value === new Date(Date.now() - 86400000).toISOString().split('T')[0]
    let bonusPoints = 10

    if (isContinuous) {
      signInDays.value++
      if (signInDays.value >= 7) {
        bonusPoints = 50
      } else if (signInDays.value >= 3) {
        bonusPoints = 30
      } else if (signInDays.value >= 2) {
        bonusPoints = 20
      }
    } else {
      signInDays.value = 1
    }

    lastSignIn.value = today
    addPoints(bonusPoints)

    return { signed: true, points: bonusPoints, days: signInDays.value }
  }

  function addLife() {
    if (lives.value < 5) {
      lives.value++
      saveUser()
      return true
    }
    return false
  }

  function consumeLife() {
    if (lives.value > 0) {
      lives.value--
      saveUser()
      return true
    }
    return false
  }

  function addItem(itemType, count = 1) {
    switch (itemType) {
      case 'shield':
        shields.value += count
        break
      case 'hint':
        hints.value += count
        break
      case 'timeAdd':
        timeAdds.value += count
        break
      case 'swap':
        swaps.value += count
        break
    }
    saveUser()
  }

  function consumeItem(itemType) {
    switch (itemType) {
      case 'shield':
        if (shields.value > 0) {
          shields.value--
          saveUser()
          return true
        }
        break
      case 'hint':
        if (hints.value > 0) {
          hints.value--
          saveUser()
          return true
        }
        break
      case 'timeAdd':
        if (timeAdds.value > 0) {
          timeAdds.value--
          saveUser()
          return true
        }
        break
      case 'swap':
        if (swaps.value > 0) {
          swaps.value--
          saveUser()
          return true
        }
        break
    }
    return false
  }

  return {
    userId,
    nickname,
    avatar,
    gender,
    currentPoints,
    totalPoints,
    lives,
    lastSignIn,
    signInDays,
    level,
    levelName,
    shields,
    hints,
    timeAdds,
    swaps,
    nextLevelPoints,
    levelProgress,
    loadUser,
    saveUser,
    login,
    addPoints,
    spendPoints,
    signIn,
    addLife,
    consumeLife,
    addItem,
    consumeItem
  }
})

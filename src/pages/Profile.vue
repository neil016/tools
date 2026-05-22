<template>
  <div class="min-h-screen p-4">
    <div class="max-w-md mx-auto">
      <div class="card mb-6">
        <div class="flex items-center gap-4">
          <div class="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
            <span class="text-white text-3xl font-bold">{{ userStore.nickname.charAt(0) }}</span>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="font-bold text-xl">{{ userStore.nickname }}</span>
              <span class="px-3 py-1 bg-gold text-yellow-800 rounded-full text-xs font-medium">
                Lv.{{ userStore.level }} {{ userStore.levelName }}
              </span>
            </div>
            <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span>累计积分: {{ userStore.totalPoints }}</span>
            </div>
          </div>
        </div>
        
        <div class="mt-6">
          <div class="flex justify-between text-sm mb-2">
            <span class="text-gray-500">升级进度</span>
            <span class="text-gray-600">{{ userStore.totalPoints }} / {{ userStore.nextLevelPoints || '已满级' }}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: userStore.levelProgress + '%' }"></div>
          </div>
        </div>
      </div>

      <div class="card mb-6">
        <div class="font-bold mb-4">个人数据</div>
        <div class="grid grid-cols-3 gap-4">
          <div class="text-center p-4 bg-gray-50 rounded-xl">
            <div class="text-2xl font-bold text-primary">{{ userStore.currentPoints }}</div>
            <div class="text-xs text-gray-500">当前积分</div>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-xl">
            <div class="text-2xl font-bold text-red-500">{{ userStore.lives }}</div>
            <div class="text-xs text-gray-500">剩余生命</div>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-xl">
            <div class="text-2xl font-bold text-yellow-500">{{ userStore.signInDays }}</div>
            <div class="text-xs text-gray-500">连续签到</div>
          </div>
        </div>
      </div>

      <div class="card mb-6">
        <div class="font-bold mb-4">道具仓库</div>
        <div class="grid grid-cols-4 gap-3">
          <div class="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-xl">
            <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <span class="text-lg">🛡️</span>
            </div>
            <span class="text-sm font-bold">{{ userStore.shields }}</span>
            <span class="text-xs text-gray-500">护盾</span>
          </div>
          <div class="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-xl">
            <div class="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <span class="text-lg">💡</span>
            </div>
            <span class="text-sm font-bold">{{ userStore.hints }}</span>
            <span class="text-xs text-gray-500">提示</span>
          </div>
          <div class="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-xl">
            <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <span class="text-lg">⏰</span>
            </div>
            <span class="text-sm font-bold">{{ userStore.timeAdds }}</span>
            <span class="text-xs text-gray-500">加时</span>
          </div>
          <div class="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-xl">
            <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <span class="text-lg">🔄</span>
            </div>
            <span class="text-sm font-bold">{{ userStore.swaps }}</span>
            <span class="text-xs text-gray-500">换题</span>
          </div>
        </div>
      </div>

      <div class="card mb-6">
        <div class="space-y-2">
          <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
            <div class="flex items-center gap-3">
              <span class="text-xl">📊</span>
              <span>答题记录</span>
            </div>
            <span class="text-gray-400">→</span>
          </button>
          <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
            <div class="flex items-center gap-3">
              <span class="text-xl">🏆</span>
              <span>成就系统</span>
            </div>
            <span class="text-gray-400">→</span>
          </button>
          <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
            <div class="flex items-center gap-3">
              <span class="text-xl">👥</span>
              <span>邀请好友</span>
            </div>
            <span class="text-gray-400">→</span>
          </button>
          <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
            <div class="flex items-center gap-3">
              <span class="text-xl">⚙️</span>
              <span>设置</span>
            </div>
            <span class="text-gray-400">→</span>
          </button>
        </div>
      </div>

      <button @click="$router.back()" class="btn btn-secondary w-full">返回首页</button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
</script>

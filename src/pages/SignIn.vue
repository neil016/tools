<template>
  <div class="min-h-screen p-4 flex items-center justify-center">
    <div class="max-w-sm w-full">
      <div class="card text-center">
        <div class="text-6xl mb-4">🎯</div>
        <div class="text-2xl font-bold text-gradient mb-2">天天答题王</div>
        <div class="text-gray-500 mb-8">知识变现与亲子互动平台</div>
        
        <div class="space-y-4">
          <button 
            @click="handleWeChatLogin" 
            class="w-full btn btn-primary flex items-center justify-center gap-3"
          >
            <span class="text-xl">💬</span>
            <span>微信一键登录</span>
          </button>
          <button 
            @click="handleGuestLogin" 
            class="w-full btn btn-secondary flex items-center justify-center gap-3"
          >
            <span class="text-xl">👤</span>
            <span>游客模式</span>
          </button>
        </div>

        <div class="mt-8 text-xs text-gray-400">
          登录即表示同意《用户协议》和《隐私政策》
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'

const userStore = useUserStore()

function handleWeChatLogin() {
  const mockUser = {
    userId: `wx_${Date.now()}`,
    nickname: '微信用户',
    avatar: '',
    gender: 1
  }
  userStore.login(mockUser)
  window.location.href = '/'
}

function handleGuestLogin() {
  const mockUser = {
    userId: `guest_${Date.now()}`,
    nickname: '游客',
    avatar: '',
    gender: 0
  }
  userStore.login(mockUser)
  window.location.href = '/'
}
</script>

<template>
  <form
    class="task-form"
    novalidate
  >
    <div class="form-item">
      <input
        v-model="name"
        type="text"
        placeholder="태스크..."
      >
    </div>
    <div class="form-actions">
      <KbnButton
        :disabled="disableAddAction"
        @click="handleAdd"
      >
        추가
      </KbnButton>
      <KbnButton
        :disabled="progress"
        @click="handleCancel"
      >
        취소
      </KbnButton>
    </div>
    <div class="messages">
      <p
        v-if="progress"
        class="add-progress"
      >
        추가 중...
      </p>
      <p
        v-if="error"
        class="add-error"
      >
        {{ error }}
      </p>
    </div>
  </form>
</template>

<script>
import KbnButton from '@/components/atoms/KbnButton.vue'

export default {
  name: 'KbnTaskForm',

  components: {
    KbnButton
  },

  props: {
    listId: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      name: '',
      progress: false,
      error: ''
    }
  },

  computed: {
    disableAddAction () {
      return this.name.length === 0 || this.progress
    }
  },

  methods: {
    handleAdd () {
      this.progress = true
      this.error = ''

      const { name, listId } = this
      return this.$store.dispatch('addTask', { name, listId })
        .then(() => {
          this.$emit('close')
        })
        .catch(err => {
          this.error = err.message
        })
        .then(() => {
          this.progress = false
        })
    },

    handleCancel () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.task-form {
  margin: 8px;
  padding: 4px;
  border: thin solid black;
  border-radius: 0.5em;
}
.form-item {
  padding: 4px;
}
input {
  width: 100%;
  padding: 0;
}
.form-actions {
  display: flex;
  justify-content: space-between;
  padding: 4px;
}
</style>

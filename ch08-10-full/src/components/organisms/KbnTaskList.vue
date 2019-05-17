<template>
  <div class="task-list">
    <KbnTaskListHeader
      :name="name"
      @add="shown = true"
    />
    <ul class="task-list-items">
      <draggable
        v-model="draggableItems"
        :options="{ group: 'items' }"
        @change="handleChange"
        @end="handleEnd"
      >
        <li
          v-for="item in draggableItems"
          :key="item.id"
        >
          <KbnTaskCard
            v-bind="item"
            @remove="handleRemove"
          />
        </li>
      </draggable>
    </ul>
    <KbnTaskForm
      v-if="shown"
      :list-id="id"
      @close="shown = false"
    />
  </div>
</template>

<script>
import KbnTaskListHeader from '@/components/molecules/KbnTaskListHeader.vue'
import KbnTaskCard from '@/components/molecules/KbnTaskCard.vue'
import KbnTaskForm from '@/components/molecules/KbnTaskForm.vue'
import { mapState } from 'vuex'
import draggable from 'vuedraggable'

export default {
  name: 'KbnTaskList',

  components: {
    KbnTaskListHeader,
    KbnTaskCard,
    KbnTaskForm,
    draggable
  },

  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      shown: false
    }
  },

  computed: {
    draggableItems: {
      get () { return this.items },
      set (value) {
        // NOTE:
        //  원래는 Vue.Draggable에서 처리한 데이터를 items에 반영하면 되지만
        //  프론트엔드와 백엔드의 상태를 일치 시키기 위해 그렇게 하지 않았음
      }
    },
    ...mapState({
      canMove: state => state.dragging.target !== null &&
        state.dragging.from !== null &&
        state.dragging.to !== null
    })
  },

  methods: {
    handleRemove ({ id, listId }) {
      return this.$store.dispatch('removeTask', { id, listId })
        .catch(err => Promise.reject(err))
    },

    handleChange ({ added, removed }) {
      if (added) {
        return this.$store.dispatch('moveToTask', {
          id: added.element.id,
          listId: this.id
        }).catch(err => Promise.reject(err))
      } else if (removed) {
        return this.$store.dispatch('moveTaskFrom', {
          id: removed.element.id,
          listId: this.id
        }).catch(err => Promise.reject(err))
      }
    },

    handleEnd () {
      if (this.canMove) {
        return this.$store.dispatch('performTaskMoving')
          .catch(err => Promise.reject(err))
      }
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
ul li {
  margin: 8px;
  padding: 4px;
  border: thin solid black;
  border-radius: 0.5em;
}
</style>

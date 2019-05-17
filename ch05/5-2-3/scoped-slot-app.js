var TodoList = {
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <template v-for="todo in todos">
        <!-- v-bind 디렉티브를 사용해 todo를 부모 컴포넌트에 전달 -->
        <slot :todo="todo">
          <li :key="todo.id">
            {{ todo.text }}
          </li>
        </slot>
      </template>
    </ul>
  `
}
new Vue({
  el: '#app',
  data: function() {
    return {
      todos: [
        { id: 1, text: 'C++', isCompleted: true },
        { id: 2, text: 'JavaScript', isCompleted: false },
        { id: 3, text: 'Java', isCompleted: true },
        { id: 4, text: 'Perl', isCompleted: false }
      ]
    }
  },
  components: {
    TodoList: TodoList
  }
})

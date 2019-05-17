var PullDownMenu = {
  data: function () {
    return {
      isShown: false,
      name: '메뉴',
      items: [
        '1-1',
        '1-2',
        '1-3',
      ]
    };
  },
  template: `
    <div @mouseleave="isShown = false">
      <p @mouseover="isShown = true"><a href="#" class="menu">{{ name }}</a></p>
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
        :css="false"
      >
        <ul v-if="isShown">
          <li v-for="item in items" :key="item">
            <a href="#" class="menu-item">{{ item }}</a>
          </li>
        </ul>
      </transition>
    </div>
  `,
  methods: {
    beforeEnter: function(el) {
      el.style.height = '0px';
      el.style.opacity = '0';
    },
    enter: function(el, done) {
      // 3초 동안 불투명도와 높이를 바꿔가며 나타나게 함
      anime({
        targets: el,
        opacity: 1,
        height: el.scrollHeight + 'px',
        duration: 3000,
        complete: done
      });
    },
    leave: function(el, done) {
      anime({
        targets: el,
        opacity: 0,
        height: '0px',
        duration: 300,
        complete: done
      });
    }
  },
};

new Vue({
  el: '#app',
  components: {
    PullDownMenu: PullDownMenu
  }
});

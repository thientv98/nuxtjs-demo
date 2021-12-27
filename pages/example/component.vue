<template>
  <div>
    <ExampleComponent title="Title Custom" @emitEvent="emitEvent">
      <template #footer>
        <nuxt-link to="/">Go to dashboard</nuxt-link>
        asdsdasd
        as
        divasd
        asd
      </template>

    </ExampleComponent>

    <TestComponent/>

    <TodoList :todos="todos">
      <template v-slot:todo="{ todo }">
        <span v-if="todo.isComplete">✓</span>
        {{ todo.text }}
      </template>

      <!-- <template slot="todo" slot-scope="{ todo }">
        <span v-if="todo.isComplete">✓</span>
        {{ todo.text }}
      </template> -->
    </TodoList>

    <hr>
    <h3>Dynamic components</h3>
    <v-textarea
      hide-details
      outlined
      placeholder="Raw HTML"
      v-model="html"
      class="mt-3"
    >
    </v-textarea>

    <keep-alive>
      <component :is="dataComponent"></component>
    </keep-alive>

  </div>
</template>

<script>

export default {
  data() {
    return {
      todos: [
        {
          id: 1,
          text: "Todo 1",
          isComplete: true
        },
        {
          id: 2,
          text: "Todo 2",
          isComplete: false
        },
        {
          id: 3,
          text: "Todo 3",
          isComplete: false
        },
      ],
      html: ''
    }
  },
  computed: {
    dataComponent() {
      return {
        template: '<div>' + this.html + '</div>'
      }
    }
  },
  methods: {
    emitEvent(data) {
      console.log(data);
    }
  }
}
</script>

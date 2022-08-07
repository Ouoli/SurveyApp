<template>
  <div class="container">
    <p>All the applied course are listed here!</p>
    <div>
      <o-table
        :data="isEmpty ? [] : data"
        :bordered="isBordered"
        :striped="isStriped"
        :narrowed="isNarrowed"
        :hoverable="isHoverable"
        :loading="isLoading"
        :focusable="isFocusable"
        :mobile-cards="hasMobileCards"
      >
        <o-table-column field="id" label="ID" width="40" numeric v-slot="props">
          {{ props.row.id }}
        </o-table-column>

        <o-table-column field="paying" label="支付方式" v-slot="props">
          {{ props.row.paying }}
        </o-table-column>

        <o-table-column label="操作" v-slot="props">
          <span>
          <!-- <o-button @click="deleteCourse(props.row.id)" variant="danger is-small">取消申請</o-button>
            &nbsp -->
            <o-button variant="warning is-small">
              <router-link :to="'/studentdetails/' + props.row.id">查看詳情</router-link>
            </o-button>
            &nbsp
             <!-- <button>
             <router-link :to="'/status/' + props.row.id">申请状态</router-link>
             </button> -->
              <o-button v-if="props.row.evaluation == 0" variant="warning is-small" disabled>填寫問卷</o-button>
             <o-button v-if="props.row.evaluation != 0" variant="warning is-small">
             <router-link :to="'/feedback/' + props.row.id">填寫問卷</router-link>
             </o-button>
          </span>
        </o-table-column>
      </o-table>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
export default {
  data() {
    return {
      data: [],
      isEmpty: false,
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isHoverable: false,
      isFocusable: false,
      isLoading: false,
      hasMobileCards: true,
    };
  },
  mounted() {
    fetch("http://localhost:1337/student/json")
      .then((res) => res.json())
      .then((data) => (this.data = data))
      .catch((err) => console.log(err.message));
  },

  methods: {
    async deleteCourse(id) {
      console.log(id);
      var r = confirm("Confirm cancel applying?");
      if (r) {
        var response = await fetch("http://localhost:1337/student/course/remove/" + id, {
          method: "POST",
        });
        if (response.ok) {
          alert("Cancel application successfully!.");
        } else if (response.status == 409) {
          var msg = await response.json();
          alert(msg);
        } else {
          alert(response.status + ": " + response.statusText);
        }
      } else {
        alert("cancelled");
      }
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

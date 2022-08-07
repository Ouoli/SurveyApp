<template>
  <div class="container">
    <div class="col-lg-3 centered">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRba03rm_KYilCEUT_LOTYnn6DigiWthrCsvg&usqp=CAU"
      />
    </div>
    <div class="col-lg-9 jumbotron">
      <p>Welcome to GAHK Website</p>
    </div>

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
        <o-table-column field="code" label="活動名稱" v-slot="props">
          {{ props.row.code }}
        </o-table-column>
        <o-table-column label="操作" v-slot="props">
       <o-button variant="warning is-small">
            <router-link :to="'/applicationform/' + props.row.id">去申請頁面</router-link>
          </o-button>
          <!-- <o-button variant="warning is-small"  v-if="props.row.course != 0" disabled>去申請頁面</o-button> -->
        </o-table-column>
      </o-table>
    </div>
  </div>
</template>

<script>
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
    fetch("http://localhost:1337/course/json")
      .then((res) => res.json())
      .then((data) => (this.data = data))
      .catch((err) => console.log(err.message));
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

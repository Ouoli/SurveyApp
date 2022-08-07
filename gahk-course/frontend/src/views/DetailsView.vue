<template>
  <div class="container">
    <h2>Here shows the details of the feedback</h2>
    <o-table
      :data="isEmpty ? [] : data.feedbacks"
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
      <o-table-column field="createdAt" label="Created at" v-slot="props">
        {{ new Date(props.row.createdAt).toLocaleString("en-CA") }}
      </o-table-column>
      <o-table-column v-slot="props">
        <button>
          <router-link :to="'/feedbackdetail/' + props.row.id"
            >更多詳情</router-link
          >
        </button>
      </o-table-column>
    </o-table>
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
    fetch(
      "http://localhost:1337/evaluation/" +
        this.$route.params.id +
        "/populateFeedbacks"
    )
      .then((res) => res.json())
      .then((data) => (this.data = data))
      .catch((err) => console.log(err.message));
  },
};
</script>

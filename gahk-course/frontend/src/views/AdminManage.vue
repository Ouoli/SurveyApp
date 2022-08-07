<template>
  <div>
    <h2>{{ applicantInfo }}</h2>
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
      <o-table-column field="code" label="課程編碼" v-slot="props">
        {{ props.row.code }}
      </o-table-column>
      <o-table-column field="category" label="體操類別" v-slot="props">
        {{ props.row.category }}
      </o-table-column>
      <o-table-column field="difficulity" label="項目難度" v-slot="props">
        {{ props.row.difficulity }}
      </o-table-column>
      <o-table-column field="coach" label="教練" v-slot="props">
        {{ props.row.code }}
      </o-table-column>

      <o-table-column label="操作">
        <o-button>同意</o-button>
        <o-button>拒绝</o-button>
      </o-table-column>
    </o-table>
  </div>
</template>

<script>
/* eslint-disable */
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
      applicantInfo: {},
    };
  },

  async mounted() {
    var response = await fetch("http://localhost:1337/student/:id/course");
    if (response.ok) {
      this.applicantInfo = await response.json();
    }
  },
};
</script>

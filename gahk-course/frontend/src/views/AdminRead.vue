<template>
  <div class="container">
    <h2>All the created courses are listed here!</h2>
    <br /><br />
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
        <o-table-column field="code" label="課程編碼" v-slot="props">
          {{ props.row.code }}
        </o-table-column>
        <o-table-column field="category" label="體操類別" v-slot="props">
          {{ props.row.category }}
        </o-table-column>
        <o-table-column field="difficulty" label="項目難度" v-slot="props">
          {{ props.row.difficulty }}
        </o-table-column>
        <o-table-column field="coach" label="教練" v-slot="props">
          {{ props.row.coach }}
        </o-table-column>

        <o-table-column label="操作" v-slot="props">
          <!-- <o-button>
            <router-link :to="'/adminmanage/' + props.row.id">申請人名單</router-link>
          </o-button> -->
          <span>
            <o-button @click="deleteCourse(props.row.id)" variant="danger is-small"
              >刪除</o-button
            >
          </span>
          &nbsp
          <o-button variant="warning is-small">
            <router-link :to="'/update/' + props.row.id">更新</router-link>
          </o-button>
          &nbsp
          <o-button v-if="props.row.evaluation == 0" variant="warning is-small">
            <router-link :to="'/creator/' + props.row.id">創建問卷</router-link>
          </o-button>
          <o-button v-if="props.row.evaluation != 0" variant="warning is-small" disabled
            >創建問卷</o-button
          >
          &nbsp
          <o-button v-if="props.row.evaluation != 0" variant="warning is-small">
            <router-link :to="'/chart/' + props.row.id">查看問卷結果</router-link>
          </o-button>
          <o-button v-if="props.row.evaluation == 0" variant="warning is-small" disabled
            >查看問卷結果</o-button
          >
          &nbsp
          <o-button v-if="props.row.evaluation != 0" variant="warning is-small">
            <router-link :to="'/details/' + props.row.id">問卷詳情</router-link>
          </o-button>
          <o-button v-if="props.row.evaluation == 0" variant="warning is-small" disabled
            >問卷詳情</o-button
          >
          &nbsp
          <o-button
            v-if="props.row.evaluation != 0"
            variant="warning is-small"
            @click="
              downloadExcel(
                'http://localhost:1337/export_excel/exportexcel/' + props.row.id
              )
            "
            >Export Excel</o-button
          >
          <o-button v-if="props.row.evaluation == 0" variant="warning is-small" disabled
            >Export Excel</o-button
          >
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
    fetch("http://localhost:1337/course/json")
      .then((res) => res.json())
      .then((data) => (this.data = data))
      .catch((err) => console.log(err.message));
  },

  methods: {
    async deleteCourse(id) {
      console.log(id);
      var r = confirm("Confirm Delete?");
      if (r) {
        var response = await fetch("http://localhost:1337/course/" + id, {
          method: "DELETE",
        });
        if (response.ok) {
          var html = await response.text();
          alert(html);
        } else {
          alert(response.status + ": " + response.statusText);
        }
      } else {
        alert("cancelled");
      }
    },

    async downloadExcel(url) {
      const a = document.createElement("a");
      a.href = url;
      a.download = url.split("/").pop();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },

    async exportexcels(id) {
      var r = confirm("Confirm exporting?");
      if (r) {
        var response = await fetch(
          "http://localhost:1337/export_excel/exportexcel/" + id,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          downloadExcel("http://localhost:1337/export_excel/exportexcel/14");
          alert("export successfully!.");
        } else if (response.status == 409) {
          var msg = await response.json();
          alert(msg);
        } else {
          alert(response.status + ": " + response.statusText);
        }
      } else {
        alert("Cancelled");
      }
    },
  },
};
</script>

<template>
  <div>
    <h1>{{{title}}} List</h1>

    <div
      v-if="isLoading"
      class="alert alert-info">Loading...</div>
    <div
      v-if="deletedItem"
      class="alert alert-success">\{{ deletedItem['@id'] }} deleted.</div>
    <div
      v-if="error"
      class="alert alert-danger">\{{ error }}</div>

    <span v-if="view">
      <button
        :disabled="!view['hydra:previous']"
        type="button"
        class="btn btn-basic btn-sm"
        @click="getPage(view['hydra:first'])">First</button>
      &nbsp;
      <button
        :disabled="!view['hydra:previous']"
        type="button"
        class="btn btn-basic btn-sm"
        @click="getPage(view['hydra:previous'])">Previous</button>
      &nbsp;
      <button
        :disabled="!view['hydra:next']"
        type="button"
        class="btn btn-basic btn-sm"
        @click="getPage(view['hydra:next'])">Next</button>
      &nbsp;
      <button
        :disabled="!view['hydra:last']"
        type="button"
        class="btn btn-basic btn-sm"
        @click="getPage(view['hydra:last'])">Last</button>
      &nbsp;
    </span>

    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Id</th>
{{#each fields}}
            <th>{{name}}</th>
{{/each }}
            <th colspan="2" />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items"
            :key="item['@id']">
            <td>
              <router-link
                v-if="item"
                :to="{name: '{{{titleUcFirst}}}Show', params: { id: item['@id'] }}">
                \{{ item['@id'] }}
              </router-link>
            </td>
{{#each fields}}
            <td>
              <router-link
                v-if="item"
                :to="{name: '{{{../titleUcFirst}}}Show', params: { id: item['@id'] }}">
                \{{ item['{{{name}}}'] }}
              </router-link>
            </td>
{{/each}}
            <td>
              <router-link
                :to="{name: '{{{titleUcFirst}}}Show', params: { id: item['@id'] }}">
                <span
                  class="fa fa-search"
                  aria-hidden="true" />
                <span class="sr-only">Show</span>
              </router-link>
            </td>
            <td>
              <router-link :to="{name: '{{{titleUcFirst}}}Update', params: { id: item['@id'] }}">
                <span
                  class="fa fa-pencil"
                  aria-hidden="true" />
                <span class="sr-only">Edit</span>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <router-link
      :to="{ name: '{{{titleUcFirst}}}Create' }"
      class="btn btn-primary">Create</router-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { mercureSubscribe as subscribe } from '../../utils/mercure';

export default {
  computed: mapGetters({
    deletedItem: '{{{lc}}}/del/deleted',
    error: '{{{lc}}}/list/error',
    items: '{{{lc}}}/list/items',
    isLoading: '{{{lc}}}/list/isLoading',
    view: '{{{lc}}}/list/view'
  }),

  created () {
    this.getPage()
  },

  methods: mapActions({
    getPage: '{{{lc}}}/list/default'
  })
}

export function mercureSubscribe(hubUrl, topics) {
  return dispatch => {
    const eventSource = subscribe(hubUrl, topics);
    dispatch(mercureOpen(eventSource));
    eventSource.addEventListener('message', event =>
     dispatch(mercureMessage(normalize(JSON.parse(event.data))))
    );
  }
}

export function mercureOpen(eventSource) {
  return { type: '{{{uc}}}_LIST_MERCURE_OPEN', eventSource };
}

export function mercureMessage(retrieved) {
  return dispatch => {
    if (1 === Object.keys(retrieved).length) {
      dispatch({ type: '{{{uc}}}_LIST_MERCURE_DELETED', retrieved });
      return;
    }

    dispatch({ type: '{{{uc}}}_LIST_MERCURE_MESSAGE', retrieved });
  };
}

</script>

<template>
  <div class="code">
    <editor
      height="200px"
      ref="editor"
      :content="pyCode"
      :options="options"
      :fontSize='14'
      :lang="'javascript'"
      :theme="'github'"
      @init="editorInit"/>
  </div>
</template>

<script>
  import Editor from 'vue2x-ace-editor';

export default {
  name: 'CodeIde',
  data() {
    return {
      pyCode: '',
      options: {
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        tabSize: 2
      }
    }
  },
  components: {
    Editor,
  },
  created() {
    this.editorInit();
  },
  destroyed() {
  },
  mounted() {
  },
  methods: {
    editorInit() {
      // eslint-disable-next-line
      require('brace/ext/language_tools');
      // eslint-disable-next-line
      require('brace/mode/javascript');
      // eslint-disable-next-line
      require('brace/snippets/javascript');
      // eslint-disable-next-line
      require('brace/theme/github');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

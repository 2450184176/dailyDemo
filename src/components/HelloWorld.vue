<template>
  <div class="hello">
    <el-button style="margin: 50px;" type="primary" @click="goToMap">
      goToGoogleMap
    </el-button>
    <el-form>
      <el-form-item label="发送数据：" label-width="120px">
        <el-input v-model="wsAgentData"/>
      </el-form-item>
      <el-form-item label="接收数据：" label-width="120px">
        <el-input v-model="wsServerData"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="pollingDataSend">开始定时器</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="clsInterval">清除定时器</el-button>
      </el-form-item>
      <el-form-item>
        <div @click="go" class="animate">
          <el-button type="primary">动画</el-button>
        </div>
      </el-form-item>
    </el-form>
    <editor
      height="300px"
      ref="editor"
      :content="content"
      :options="{
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        tabSize: 2
      }"
      :fontSize='14'
      :lang="'json'"
      :theme="'monokai'"
      @onChange="editorChange"
      @init="editorInit">
      <div>toolbar or something</div>
    </editor>
    <div style="margin-top: 25px;width: 100%;height: 250px;">
      <AceEditor
        ref="myAce"
        v-model="context"
        :config="config"
        @init="handleInit"
        @firstInit="handleFirstInit"
        @change="handleChange" />
    </div>
    <div>
      <p>vue-json-editor使用</p>
      <!--在模板中使用vue-json-editor-->
      <vue-json-editor v-model="json" :show-btns="true" @json-change="onJsonChange"/>
    </div>
    <div>
      <p>json-view-editor使用</p>
      <JsonEditor :objData="jsonData" v-model="jsonData"/>
    </div>
  </div>
</template>

<script>
import animate from 'animejs';
import Editor from 'vue2x-ace-editor';
import vueJsonEditor from 'vue-json-editor';

export default {
  name: 'HelloWorld',
  data() {
    return {
      web_socket: null,
      wsAgentData: '',
      wsServerData: '',
      t: '',
      content: '',
      context: 'select * from testDb.userInfo limit 100;',
      config: {
        lang: 'javascript',
        theme: 'monokai',
        readOnly: false,
        autoCompletion: true,
        showPrintMargin: false,
        useWrapMode: true,
        useSoftTabs: true,
        tabSize: 2,
        useVim: false,
        useEmmet: true,
        useBeautifyCode: false,
        cursorPosition: {row: 0, column: 0},
        pagePosition: 0,
      },
      dbData: [],
      tbData: [],
      json: {
        msg: 'demo of jsoneditor'
      },
      jsonData: {
        name: 'mike',
        age: 22,
        phone: '18552129932',
        address: ['AAA C1', 'BBB C2']
      },
    }
  },
  components: {
    Editor,
    vueJsonEditor,
  },
  created() {
    this.initWebSocket();
    // this.pollingDataSend();
    this.editorInit();
    this.dbDataMock();
    this.tbDataMock();
  },
  destroyed() {
    this.webSocketClose();
    this.clsInterval();
  },
  methods: {
    goToMap() {
      console.info('gotoMap');
      this.$router.push({ path: '/googleMap' });
    },
    onJsonChange(value) {
      console.log('value:', value)
    },
    go() {
      animate({
        targets: '.hello',
        rotateY: [0, 360],
        duration: 4000,
        easing: 'easeInOutQuart',
      })
    },
    handleInit(ace) {
      // 每次 init 都会触发一次.
      // ace实例会做为传参接收,你可以在这里引入自定义的拓展
      // do something...
    },
    handleFirstInit(ace) {
      // 这里只有组件第一初始化才会运行.
      // ace实例会做为传参接收.
      // you can do something ...
    },
    handleChange(ace) {
      // 每一次输入都会触发change 事件.
      // ace实例会做为传参接收.
      // you can do something ...
    },
    dbDataMock() {
      this.dbData = [];
      for (let i = 0; i < 20; i++) {
        const tempObj = {
          name: `test${i}`, //名称
          value: `test${i}`, //值
          caption: `test${i}`, //字幕，展示在列表的内容
          meta: `test${i}`, //展示类型
          type: "local", //类型
          score: 1000, // 分数越大排在越上面
        };
        this.dbData.push(tempObj);
      }
    },
    tbDataMock() {
      this.tbData = [];
      for (let i = 0; i < 20; i++) {
        const tempObj = {
          name: `tbtest${i}`, //名称
          value: `tbtest${i}`, //值
          caption: `tbtest${i}`, //字幕，展示在列表的内容
          meta: `tbtest${i}`, //展示类型
          type: "local", //类型
          score: 1000, // 分数越大排在越上面
        };
        this.tbData.push(tempObj);
      }
    },
    editorChange(edit) {
      if (edit.getValue().endsWith('from ')) {
        this.$refs.editor.setCompleteData(this.dbData);
      } else if (edit.getValue().endsWith('.')) {
        this.$refs.editor.setCompleteData(this.tbData);
      }
    },
    editorInit() {
      require("brace/ext/language_tools");
      const languages = ["json"];
      const themes = ["monokai"];
      languages.forEach(lang => {
        require(`brace/mode/${lang}`);
        require(`brace/snippets/${lang}`);
      });
      themes.forEach(theme => {
        require(`brace/theme/${theme}`);
      });
    },
    initWebSocket() {
      const wsUri = 'ws://127.0.0.1:9000';
      this.web_socket = new WebSocket(wsUri);
      this.web_socket.onopen = this.webSocketOnOpen;
      this.web_socket.onerror = this.webSocketOnError;
      this.web_socket.onmessage = this.webSocketOnMessage;
      this.web_socket.onclose = this.webSocketClose;
    },
    clsInterval() {
      clearInterval(this.t);
    },
    pollingDataSend() {
      this.clsInterval();
      this.t = setInterval(() => {
        this.webSocketSend();
      }, 1000);
    },
    randomData(lower, upper) {
      return Math.floor(Math.random() * (upper - lower+1)) + lower;
    },
    webSocketOnOpen() {
      console.info("WebSocket连接成功");
    },
    webSocketOnError(e) {
      console.log("WebSocket连接发生错误", e);
    },
    webSocketOnMessage(e) {
      this.wsServerData = e.data;
    },
    webSocketSend() {
      this.wsAgentData = this.randomData(1, 100);
      this.web_socket.send(this.wsAgentData);
    },
    webSocketClose(e) {
      console.info(`connection closed ${e.code}`);
    },
  },
  watch: {
    jsonData: {
      handler(o, n) {
        this.jsonData = o;
        console.info(this.jsonData, 237);
      },
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello {
    margin-bottom: 500px;
  }
</style>

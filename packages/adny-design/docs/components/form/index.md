# Forms（表单）
在形式验证时，Adny-design有多种集成并保存在功能中。 想要使用第三方验证插件吗？ 在方框中，您可以使用 async-validate。


## 基本使用 (Base)
:::demo 

```vue
<template>
<a-form :model="data" :rules="rules" ref="model">
  <a-form-item label="我是用户名" prop="username">
    <a-input placeholder="请输入文字"  v-model="data.username" />
  </a-form-item>
  <a-form-item label="我是密码" prop="password">
    <a-input placeholder="请输入密码" v-model="data.password" />
  </a-form-item>
  <a-form-item>
    <a-btn @click="go">校验</a-btn>
  </a-form-item>
</a-form>
</template>
<script >
import {defineComponent, ref, watch, reactive } from 'vue'
export default defineComponent({
  setup() {
    const model = ref(null)
    const error = ref(false)
    const data = reactive({
      username: '',
      password: ''
    })
    const go = () => {
      model.value.validate((a, value) => {
        if (a) {
          console.log('成功')
        } else {
          console.log('失败')
        }
      })
    }
    watch(data, (ne) => {
    })
    return {
      data,
      model,
      go,
      error,
      rules: {
        username: [{ required: true, message: '用户名必须填' }, {max: 5, message: '不能超过五个字'}],
        password: [{ required: true, message: '密码必须填' }]
      }
    }
  }
})
</script>
```

:::     
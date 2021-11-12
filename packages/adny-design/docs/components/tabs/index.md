:::demo
```vue
<template>
<a-tabs
  elevation
  color="#2979ff"
  active-color="#fff"
  inactive-color="hsla(0, 0%, 100%, .6)"
  v-model:active="active"
>
  <a-tab>选项1</a-tab>
  <a-tab>选项2</a-tab>
  <a-tab>选项3</a-tab>
</a-tabs>

<a-tabs-item v-model:active="active">
  <a-tab-item>
    呜啦啦啦火车笛，随着奔腾的马蹄。
    小妹妹吹着口琴，夕阳下美了剪影。
    我用子弹写日记，介绍完了风景。
    接下来换介绍我自己。
    我虽然是个牛仔，在酒吧只点牛奶。
    为什么不喝啤酒，因为啤酒伤身体。
  </a-tab-item>
  <a-tab-item>
    很多人不长眼睛，嚣张都靠武器。
    赤手空拳就缩成蚂蚁。
    不用麻烦了，不用麻烦了。
    不用麻烦，不用麻烦了，不用麻烦了。
  </a-tab-item>
  <a-tab-item>
    你们一起上，我在赶时间。
    每天决斗观众都累了，英雄也累了。
    不用麻烦了，不用麻烦了。
    副歌不长你们有几个，一起上好了。
    正义呼唤我，美女需要我。
    牛仔很忙的。
  </a-tab-item>
</a-tabs-item>
</template>
<script>
import { ref } from 'vue'

export default {
  setup() {
    const active = ref('选项1')

    return { active }
  }
}
</script>
```
:::
<template>
  <docs-item :tree="tree">
    <template v-slot:preview>
      <div ref="example"></div>
    </template>
    <template v-slot:extra>
    </template>
  </docs-item>
</template>

<script lang="ts">
import {LottieData} from '@diez/prefabs';
import lottieWeb from 'lottie-web';
import {Component, Prop, Vue} from 'vue-property-decorator';
type DocsTargetSpec = import('@diez/targets').DocsTargetSpec<LottieData>;

/**
 * Lottie Item view.
 */
@Component
export default class LottieItem extends Vue {
  @Prop() readonly tree!: DocsTargetSpec;

  mounted () {
    lottieWeb.loadAnimation({
      container: this.$refs.example as Element,
      path: `/${this.tree.properties.file.properties.src.value}`,
      autoplay: this.tree.properties.loop.value,
      loop: this.tree.properties.autoplay.value,
    });
  }
}
</script>

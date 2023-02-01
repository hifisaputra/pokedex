<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{
  type: string;
}>();

const style = computed(() => {
  return {
    backgroundColor: `var(--${props.type})`,
  };
});
</script>

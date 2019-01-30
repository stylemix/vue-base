<template>
  <div
    :attribute="field.attribute"
    :class="layoutClass">
    <slot name="field"/>
  </div>
</template>

<script>
  import FieldLayoutMixin from "../mixins/FieldLayoutMixin";

  export default {
    mixins: [FieldLayoutMixin]
  }
</script>

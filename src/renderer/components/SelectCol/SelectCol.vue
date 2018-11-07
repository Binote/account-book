<template>
  <div>
    <Col class="select-wrapper-col" :xs="24" :lg="3">
      <slot></slot>
    </Col>
  </div>
</template>
<script>
export default {
  name: 'SelectCol'
}
</script>


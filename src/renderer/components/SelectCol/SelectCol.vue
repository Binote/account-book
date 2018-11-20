<template>
  <div>
    <Col class="select-wrapper-col" :xs="24" :md="5">
      <slot></slot>
    </Col>
  </div>
</template>
<script>
export default {
  name: 'SelectCol'
}
</script>


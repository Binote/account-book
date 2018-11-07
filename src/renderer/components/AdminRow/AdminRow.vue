<template>
  <div class="AdminRow">
    <Row>
      <Col :xs="12">
        <slot name="one"/>
      </Col>
      <Col :xs="12">
        <slot name="two"/>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  name: 'AdminRow'
}
</script>

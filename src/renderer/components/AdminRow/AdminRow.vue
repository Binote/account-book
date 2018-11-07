<template>
  <div class="AdminRow">
    <Row>
      <Col :xs="0" :md="1">&nbsp;</Col>
      <Col :xs="12" :md="10">
        <slot name="one"/>
      </Col>
      <Col :xs="0" :md="1">&nbsp;</Col>
      <Col :xs="12" :md="10">
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

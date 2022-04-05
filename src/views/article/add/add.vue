<template>
  <div class="add-container">
      <EditForm title="add" />
  </div>
</template>

<script>
import EditForm from '@/components/EditForm'

export default {
  components:{
    EditForm,
  }
};
</script>

<style scoped>
.add-container {
  padding: 10px;
  margin-bottom: 50px;
}
</style>
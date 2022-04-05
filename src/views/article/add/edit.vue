<template>
  <div class="add-container">
      <EditForm title="edit" />
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
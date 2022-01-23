<template>
  <div>
    <h1 class="animate__animated animate__fadeInUp">2048</h1>
    <p v-if="score === 0">
      Oyunu oynamak için W, A, S, D veya yön tuşlarını kullanın. Yeni bir oyun
      başlatmak için 'N' tuşuna basın. Bu yazıyı gizlemek için 1 skor yap!
    </p>
  </div>
</template>

<script>
export default {
  props: {
    score: Number,
  },
};
</script>

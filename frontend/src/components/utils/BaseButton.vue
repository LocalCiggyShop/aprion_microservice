<template>
  <div
    :class="disabled ? `${themes[theme]} disabled outer` : `${themes[theme]} outer`"
    @click="Clicked"
  >
    <span v-if="label">{{ label }}</span>
    <span v-if="loading" class="spinner"></span>
  </div>
</template>
<!-- <span>
  <slot>
    {{ label }}
  </slot>
</span> -->


<!-- @click.native="clicked" -->

<!-- :class="[
      disabled ? "disabled" : themes[theme], 
      // {'disabled': disabled},
      'outer'
    ]" text-white font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 bg-primary hover:bg-primaryHover -->
<script>
export default {
  data() {
    return {
      themes: {
        primary: 'primary-btn',
        danger: 'danger-btn'
      }
    }
  },
  props: {
    label: {
      required: false,
      type: String,
      default: () => "ButtonText",
    },
    loading: {
      required: false,
      type: Boolean,
      default: false,
    },
    theme: {
      required: false,
      type: String,
      default: () => 'primary',
    },
    to: {
      required: false,
      type: String,
    },
    disabled: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  // computed: {
  //   isDisabled() {
  //     console.log(this.disabled)
  //     if(this.loading)
  //       return false;
  //     else 
  //       return true;
  //   },
  // },
  methods: {
    Clicked(e) {
      this.disabled ?? e.preventDefault();
      (this.to) ? this.$router.push({ path: this.to}) : null
      // if(this.disabled) {
      //   console.log("Cooldown applied")
      //   return false;
      // }
      // else if(!this.disabled) {
      //   return true;
      //   // this.$emit('click', e);
      // }
    }
  }
}
</script>
<!-- 
<script setup>
  defineProps({
    label: {
      type: String,
      default: () => "ButtonText",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: () => "primary-btn",
    },
    themes: {
      primary: 'primary-btn',
      // danger: 'danger-btn'
    }
  });
</script> -->
    
<style scoped>
/* .outer {
  max-width: 200px;
  max-height: 35px;
  display: block;
  font-size: small;
  text-align: center;
  margin: 0 auto 2rem;
} */
.outer:hover {
  opacity: 0.9;
  cursor: pointer;
}

.outer:active {
  opacity: 0.6;
}
/* 
.outer span {
  line-height: 2;
} */
.spinner {
    display: inline-block;
    margin: 0 6px;
    border-radius: 50%;
    width: 1.1em;
    height: 1.1em;
    border: .155em solid transparent;
    vertical-align: middle;
    /* font-size: 16px; */
    border-top-color: var(--primary-btn-colour);
    animation: spin 1s cubic-bezier(.55, .15, .45, .85) infinite;
}
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
/* @keyframes slide-out-down {
    0% {
        transform: translateY(0);
        opacity: 1;
    }

    40% {
        opacity: .2;
    }

    100% {
        transform: translateY(20px);
        opacity: 0;
    }
} */
</style>
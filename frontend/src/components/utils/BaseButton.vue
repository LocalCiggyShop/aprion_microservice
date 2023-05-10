<template>
  <div
    :class="disabled ? 'disabled outer' : 'primary-btn outer'"
  >
    <span v-if="label">{{ label }}</span>
    <span v-if="loading" class="spinner"></span>
    <!-- <span>
      <slot>
        {{ label }}
      </slot>
    </span> -->
  </div>
</template>
<!-- @click.native="clicked" -->

<!-- :class="[
      disabled ? "disabled" : themes[theme], 
      // {'disabled': disabled},
      'outer'
    ]" -->
<script>
export default {
  data() {
    return {
      themes: {
        primary: 'primary-btn',
        // danger: 'danger-btn'
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
    disabled: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  // computed: {
  //   isDisabled() {
  //     return this.heal_used === 1 || this.diff < 10;
  //   },
  // }
  // methods: {
  //   clicked(e) {
  //     console.log(this.disabled)
  //     if(this.disabled) {
  //       return;
  //     }

  //     this.$emit('click', e);
  //   }
  // }
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
.outer {
  max-width: 200px;
  max-height: 35px;
  display: block;
  font-size: small;
  text-align: center;
  margin: 0 auto 2rem;
}
.outer:hover {
  opacity: 0.9;
}

.outer:active {
  opacity: 0.6;
}

.outer span {
  line-height: 2;
}
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
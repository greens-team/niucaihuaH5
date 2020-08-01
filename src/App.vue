<template>
  <div id="app" class="fixed inset-0 flex flex-col bg-white">
    <div id="loadingBox" style="display: none; z-index:99999999;">
      <div style="background:#fff; opacity: .2" class="fixed inset-0 z-40"></div>
      <div class="fixed inset-0 flex items-center justify-center z-50">
        <van-loading type="spinner" color="orange"/>
      </div>
    </div>
    <router-view class="bg-white"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
  },
  computed: {
  }
};
</script>

<style>
* {
  font-size: 14px;
}
#app {
  font-family: Arial, "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.formBar::before {
  position: absolute;
  left: 0;
  top: 14px;
  content: "";
  width: 4px;
  height: 13px;
  background-image: linear-gradient(#ff8b00 10%, #ffce00 80%);
}
.formBar::after {
  position: absolute;
  box-sizing: border-box;
  content: " ";
  pointer-events: none;
  right: 0;
  bottom: 0;
  left: 16px;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.sendBtn {
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  height: 69%;
  color: white;
  font-weight: bold;
  background-image: linear-gradient(to left, #ff9505, #fec43a);
  border-radius: 0.3rem;
}
.positioning {
  position: fixed;
  padding-bottom: 1px;
  border-bottom: 1px solid #f5f5f5;
  background-color: white;
  top: 54px;
  left: 0px;
  right: 0;
  z-index: 10;
}


html {
  overflow: hidden;
  height: 100%;
  margin: 0;
  padding: 0;
  border: none;
}

body {
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  margin: 0;
  height: 100%;
}

.checkContent {
  background: #f7f8f9;
  padding: 10px 16px;
  color: #f42929;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}


/* import './assets/tailwind/tailwind.min.css' */
/* @import url('../assets/tailwind/tailwind.min.css'); */

.overflow-hidden {
  overflow: hidden;
}


.rounded-none {
  border-radius: 0;
}

.rounded-sm {
  border-radius: 0.125rem;
}

.rounded {
  border-radius: 0.25rem;
}

.rounded-md {
  border-radius: 0.375rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.rounded-full {
  border-radius: 9999px;
}

.text-shadow {
  text-shadow: 0 1px 2px rgba(0, 0, 0);
}

.shadow-xs {
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
}

.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.shadow {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.shadow-inner {
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
}

.shadow-outline {
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

.shadow-none {
  box-shadow: none;
}


.border {
  border-width: 1px;
}
.border-solid {
  border-style: solid;
}


.border-transparent {
  border-color: transparent;
}

.border-current {
  border-color: currentColor;
}

.border-black {
  --border-opacity: 1;
  border-color: #000;
  border-color: rgba(0, 0, 0, var(--border-opacity));
}

.border-white {
  --border-opacity: 1;
  border-color: #fff;
  border-color: rgba(255, 255, 255, var(--border-opacity));
}

.border-gray-100 {
  --border-opacity: 1;
  border-color: #f7fafc;
  border-color: rgba(247, 250, 252, var(--border-opacity));
}

.border-gray-200 {
  --border-opacity: 1;
  border-color: #edf2f7;
  border-color: rgba(237, 242, 247, var(--border-opacity));
}

.border-gray-300 {
  --border-opacity: 1;
  border-color: #e2e8f0;
  border-color: rgba(226, 232, 240, var(--border-opacity));
}

.border-gray-400 {
  --border-opacity: 1;
  border-color: #cbd5e0;
  border-color: rgba(203, 213, 224, var(--border-opacity));
}

.border-gray-500 {
  --border-opacity: 1;
  border-color: #a0aec0;
  border-color: rgba(160, 174, 192, var(--border-opacity));
}

.border-gray-600 {
  --border-opacity: 1;
  border-color: #718096;
  border-color: rgba(113, 128, 150, var(--border-opacity));
}

.border-gray-700 {
  --border-opacity: 1;
  border-color: #4a5568;
  border-color: rgba(74, 85, 104, var(--border-opacity));
}

.border-gray-800 {
  --border-opacity: 1;
  border-color: #2d3748;
  border-color: rgba(45, 55, 72, var(--border-opacity));
}

.border-gray-900 {
  --border-opacity: 1;
  border-color: #1a202c;
  border-color: rgba(26, 32, 44, var(--border-opacity));
}

.border-red-100 {
  --border-opacity: 1;
  border-color: #fff5f5;
  border-color: rgba(255, 245, 245, var(--border-opacity));
}

.border-red-200 {
  --border-opacity: 1;
  border-color: #fed7d7;
  border-color: rgba(254, 215, 215, var(--border-opacity));
}

.border-red-300 {
  --border-opacity: 1;
  border-color: #feb2b2;
  border-color: rgba(254, 178, 178, var(--border-opacity));
}

.border-red-400 {
  --border-opacity: 1;
  border-color: #fc8181;
  border-color: rgba(252, 129, 129, var(--border-opacity));
}

.border-red-500 {
  --border-opacity: 1;
  border-color: #f56565;
  border-color: rgba(245, 101, 101, var(--border-opacity));
}

.border-red-600 {
  --border-opacity: 1;
  border-color: #e53e3e;
  border-color: rgba(229, 62, 62, var(--border-opacity));
}

.border-red-700 {
  --border-opacity: 1;
  border-color: #c53030;
  border-color: rgba(197, 48, 48, var(--border-opacity));
}

.border-red-800 {
  --border-opacity: 1;
  border-color: #9b2c2c;
  border-color: rgba(155, 44, 44, var(--border-opacity));
}

.border-red-900 {
  --border-opacity: 1;
  border-color: #742a2a;
  border-color: rgba(116, 42, 42, var(--border-opacity));
}

.border-orange-100 {
  --border-opacity: 1;
  border-color: #fffaf0;
  border-color: rgba(255, 250, 240, var(--border-opacity));
}

.border-orange-200 {
  --border-opacity: 1;
  border-color: #feebc8;
  border-color: rgba(254, 235, 200, var(--border-opacity));
}

.border-orange-300 {
  --border-opacity: 1;
  border-color: #fbd38d;
  border-color: rgba(251, 211, 141, var(--border-opacity));
}

.border-orange-400 {
  --border-opacity: 1;
  border-color: #f6ad55;
  border-color: rgba(246, 173, 85, var(--border-opacity));
}

.border-orange-500 {
  --border-opacity: 1;
  border-color: #ed8936;
  border-color: rgba(237, 137, 54, var(--border-opacity));
}

.border-orange-600 {
  --border-opacity: 1;
  border-color: #dd6b20;
  border-color: rgba(221, 107, 32, var(--border-opacity));
}

.border-orange-700 {
  --border-opacity: 1;
  border-color: #c05621;
  border-color: rgba(192, 86, 33, var(--border-opacity));
}

.border-orange-800 {
  --border-opacity: 1;
  border-color: #9c4221;
  border-color: rgba(156, 66, 33, var(--border-opacity));
}

.border-orange-900 {
  --border-opacity: 1;
  border-color: #7b341e;
  border-color: rgba(123, 52, 30, var(--border-opacity));
}

.border-yellow-100 {
  --border-opacity: 1;
  border-color: #fffff0;
  border-color: rgba(255, 255, 240, var(--border-opacity));
}

.border-yellow-200 {
  --border-opacity: 1;
  border-color: #fefcbf;
  border-color: rgba(254, 252, 191, var(--border-opacity));
}

.border-yellow-300 {
  --border-opacity: 1;
  border-color: #faf089;
  border-color: rgba(250, 240, 137, var(--border-opacity));
}

.border-yellow-400 {
  --border-opacity: 1;
  border-color: #f6e05e;
  border-color: rgba(246, 224, 94, var(--border-opacity));
}

.border-yellow-500 {
  --border-opacity: 1;
  border-color: #ecc94b;
  border-color: rgba(236, 201, 75, var(--border-opacity));
}

.border-yellow-600 {
  --border-opacity: 1;
  border-color: #d69e2e;
  border-color: rgba(214, 158, 46, var(--border-opacity));
}

.border-yellow-700 {
  --border-opacity: 1;
  border-color: #b7791f;
  border-color: rgba(183, 121, 31, var(--border-opacity));
}

.border-yellow-800 {
  --border-opacity: 1;
  border-color: #975a16;
  border-color: rgba(151, 90, 22, var(--border-opacity));
}

.border-yellow-900 {
  --border-opacity: 1;
  border-color: #744210;
  border-color: rgba(116, 66, 16, var(--border-opacity));
}

.border-green-100 {
  --border-opacity: 1;
  border-color: #f0fff4;
  border-color: rgba(240, 255, 244, var(--border-opacity));
}

.border-green-200 {
  --border-opacity: 1;
  border-color: #c6f6d5;
  border-color: rgba(198, 246, 213, var(--border-opacity));
}

.border-green-300 {
  --border-opacity: 1;
  border-color: #9ae6b4;
  border-color: rgba(154, 230, 180, var(--border-opacity));
}

.border-green-400 {
  --border-opacity: 1;
  border-color: #68d391;
  border-color: rgba(104, 211, 145, var(--border-opacity));
}

.border-green-500 {
  --border-opacity: 1;
  border-color: #48bb78;
  border-color: rgba(72, 187, 120, var(--border-opacity));
}

.border-green-600 {
  --border-opacity: 1;
  border-color: #38a169;
  border-color: rgba(56, 161, 105, var(--border-opacity));
}

.border-green-700 {
  --border-opacity: 1;
  border-color: #2f855a;
  border-color: rgba(47, 133, 90, var(--border-opacity));
}

.border-green-800 {
  --border-opacity: 1;
  border-color: #276749;
  border-color: rgba(39, 103, 73, var(--border-opacity));
}

.border-green-900 {
  --border-opacity: 1;
  border-color: #22543d;
  border-color: rgba(34, 84, 61, var(--border-opacity));
}

.border-teal-100 {
  --border-opacity: 1;
  border-color: #e6fffa;
  border-color: rgba(230, 255, 250, var(--border-opacity));
}

.border-teal-200 {
  --border-opacity: 1;
  border-color: #b2f5ea;
  border-color: rgba(178, 245, 234, var(--border-opacity));
}

.border-teal-300 {
  --border-opacity: 1;
  border-color: #81e6d9;
  border-color: rgba(129, 230, 217, var(--border-opacity));
}

.border-teal-400 {
  --border-opacity: 1;
  border-color: #4fd1c5;
  border-color: rgba(79, 209, 197, var(--border-opacity));
}

.border-teal-500 {
  --border-opacity: 1;
  border-color: #38b2ac;
  border-color: rgba(56, 178, 172, var(--border-opacity));
}

.border-teal-600 {
  --border-opacity: 1;
  border-color: #319795;
  border-color: rgba(49, 151, 149, var(--border-opacity));
}

.border-teal-700 {
  --border-opacity: 1;
  border-color: #2c7a7b;
  border-color: rgba(44, 122, 123, var(--border-opacity));
}

.border-teal-800 {
  --border-opacity: 1;
  border-color: #285e61;
  border-color: rgba(40, 94, 97, var(--border-opacity));
}

.border-teal-900 {
  --border-opacity: 1;
  border-color: #234e52;
  border-color: rgba(35, 78, 82, var(--border-opacity));
}

.border-blue-100 {
  --border-opacity: 1;
  border-color: #ebf8ff;
  border-color: rgba(235, 248, 255, var(--border-opacity));
}

.border-blue-200 {
  --border-opacity: 1;
  border-color: #bee3f8;
  border-color: rgba(190, 227, 248, var(--border-opacity));
}

.border-blue-300 {
  --border-opacity: 1;
  border-color: #90cdf4;
  border-color: rgba(144, 205, 244, var(--border-opacity));
}

.border-blue-400 {
  --border-opacity: 1;
  border-color: #63b3ed;
  border-color: rgba(99, 179, 237, var(--border-opacity));
}

.border-blue-500 {
  --border-opacity: 1;
  border-color: #4299e1;
  border-color: rgba(66, 153, 225, var(--border-opacity));
}

.border-blue-600 {
  --border-opacity: 1;
  border-color: #3182ce;
  border-color: rgba(49, 130, 206, var(--border-opacity));
}

.border-blue-700 {
  --border-opacity: 1;
  border-color: #2b6cb0;
  border-color: rgba(43, 108, 176, var(--border-opacity));
}

.border-blue-800 {
  --border-opacity: 1;
  border-color: #2c5282;
  border-color: rgba(44, 82, 130, var(--border-opacity));
}

.border-blue-900 {
  --border-opacity: 1;
  border-color: #2a4365;
  border-color: rgba(42, 67, 101, var(--border-opacity));
}

.border-indigo-100 {
  --border-opacity: 1;
  border-color: #ebf4ff;
  border-color: rgba(235, 244, 255, var(--border-opacity));
}

.border-indigo-200 {
  --border-opacity: 1;
  border-color: #c3dafe;
  border-color: rgba(195, 218, 254, var(--border-opacity));
}

.border-indigo-300 {
  --border-opacity: 1;
  border-color: #a3bffa;
  border-color: rgba(163, 191, 250, var(--border-opacity));
}

.border-indigo-400 {
  --border-opacity: 1;
  border-color: #7f9cf5;
  border-color: rgba(127, 156, 245, var(--border-opacity));
}

.border-indigo-500 {
  --border-opacity: 1;
  border-color: #667eea;
  border-color: rgba(102, 126, 234, var(--border-opacity));
}

.border-indigo-600 {
  --border-opacity: 1;
  border-color: #5a67d8;
  border-color: rgba(90, 103, 216, var(--border-opacity));
}

.border-indigo-700 {
  --border-opacity: 1;
  border-color: #4c51bf;
  border-color: rgba(76, 81, 191, var(--border-opacity));
}

.border-indigo-800 {
  --border-opacity: 1;
  border-color: #434190;
  border-color: rgba(67, 65, 144, var(--border-opacity));
}

.border-indigo-900 {
  --border-opacity: 1;
  border-color: #3c366b;
  border-color: rgba(60, 54, 107, var(--border-opacity));
}

.border-purple-100 {
  --border-opacity: 1;
  border-color: #faf5ff;
  border-color: rgba(250, 245, 255, var(--border-opacity));
}

.border-purple-200 {
  --border-opacity: 1;
  border-color: #e9d8fd;
  border-color: rgba(233, 216, 253, var(--border-opacity));
}

.border-purple-300 {
  --border-opacity: 1;
  border-color: #d6bcfa;
  border-color: rgba(214, 188, 250, var(--border-opacity));
}

.border-purple-400 {
  --border-opacity: 1;
  border-color: #b794f4;
  border-color: rgba(183, 148, 244, var(--border-opacity));
}

.border-purple-500 {
  --border-opacity: 1;
  border-color: #9f7aea;
  border-color: rgba(159, 122, 234, var(--border-opacity));
}

.border-purple-600 {
  --border-opacity: 1;
  border-color: #805ad5;
  border-color: rgba(128, 90, 213, var(--border-opacity));
}

.border-purple-700 {
  --border-opacity: 1;
  border-color: #6b46c1;
  border-color: rgba(107, 70, 193, var(--border-opacity));
}

.border-purple-800 {
  --border-opacity: 1;
  border-color: #553c9a;
  border-color: rgba(85, 60, 154, var(--border-opacity));
}

.border-purple-900 {
  --border-opacity: 1;
  border-color: #44337a;
  border-color: rgba(68, 51, 122, var(--border-opacity));
}

.border-pink-100 {
  --border-opacity: 1;
  border-color: #fff5f7;
  border-color: rgba(255, 245, 247, var(--border-opacity));
}

.border-pink-200 {
  --border-opacity: 1;
  border-color: #fed7e2;
  border-color: rgba(254, 215, 226, var(--border-opacity));
}

.border-pink-300 {
  --border-opacity: 1;
  border-color: #fbb6ce;
  border-color: rgba(251, 182, 206, var(--border-opacity));
}

.border-pink-400 {
  --border-opacity: 1;
  border-color: #f687b3;
  border-color: rgba(246, 135, 179, var(--border-opacity));
}

.border-pink-500 {
  --border-opacity: 1;
  border-color: #ed64a6;
  border-color: rgba(237, 100, 166, var(--border-opacity));
}

.border-pink-600 {
  --border-opacity: 1;
  border-color: #d53f8c;
  border-color: rgba(213, 63, 140, var(--border-opacity));
}

.border-pink-700 {
  --border-opacity: 1;
  border-color: #b83280;
  border-color: rgba(184, 50, 128, var(--border-opacity));
}

.border-pink-800 {
  --border-opacity: 1;
  border-color: #97266d;
  border-color: rgba(151, 38, 109, var(--border-opacity));
}

.border-pink-900 {
  --border-opacity: 1;
  border-color: #702459;
  border-color: rgba(112, 36, 89, var(--border-opacity));
}

.flex-1 {
  flex: 1 1 0%;
}
.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.flex-row {
  flex-direction: row;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.flex-wrap {
  flex-wrap: wrap;
}
.content-center {
  align-content: center;
}

.overflow-scroll {
  overflow: scroll;
}

.overflow-x-auto {
  overflow-x: auto;
}

.overflow-y-auto {
  overflow-y: auto;
}

.overflow-x-hidden {
  overflow-x: hidden;
}

.overflow-y-hidden {
  overflow-y: hidden;
}



.p-0 {
  padding: 0;
}

.p-1 {
  padding: 0.25rem;
}

.p-2 {
  padding: 0.5rem;
}

.p-3 {
  padding: 0.75rem;
}

.p-4 {
  padding: 1rem;
}

.p-5 {
  padding: 1.25rem;
}

.p-6 {
  padding: 1.5rem;
}

.p-8 {
  padding: 2rem;
}

.p-10 {
  padding: 2.5rem;
}

.p-12 {
  padding: 3rem;
}

.p-16 {
  padding: 4rem;
}

.p-20 {
  padding: 5rem;
}

.p-24 {
  padding: 6rem;
}

.p-32 {
  padding: 8rem;
}

.p-40 {
  padding: 10rem;
}

.p-48 {
  padding: 12rem;
}

.p-56 {
  padding: 14rem;
}

.p-64 {
  padding: 16rem;
}

.pt-0 {
  padding-top: 0;
}

.pr-0 {
  padding-right: 0;
}

.pb-0 {
  padding-bottom: 0;
}

.pl-0 {
  padding-left: 0;
}

.pt-1 {
  padding-top: 0.25rem;
}

.pr-1 {
  padding-right: 0.25rem;
}

.pb-1 {
  padding-bottom: 0.25rem;
}

.pl-1 {
  padding-left: 0.25rem;
}

.pt-2 {
  padding-top: 0.5rem;
}

.pr-2 {
  padding-right: 0.5rem;
}

.pb-2 {
  padding-bottom: 0.5rem;
}

.pl-2 {
  padding-left: 0.5rem;
}

.pt-3 {
  padding-top: 0.75rem;
}

.pr-3 {
  padding-right: 0.75rem;
}

.pb-3 {
  padding-bottom: 0.75rem;
}

.pl-3 {
  padding-left: 0.75rem;
}

.pt-4 {
  padding-top: 1rem;
}

.pr-4 {
  padding-right: 1rem;
}

.pb-4 {
  padding-bottom: 1rem;
}

.pl-4 {
  padding-left: 1rem;
}

.pt-5 {
  padding-top: 1.25rem;
}

.pr-5 {
  padding-right: 1.25rem;
}

.pb-5 {
  padding-bottom: 1.25rem;
}

.pl-5 {
  padding-left: 1.25rem;
}

.pt-6 {
  padding-top: 1.5rem;
}

.pr-6 {
  padding-right: 1.5rem;
}

.pb-6 {
  padding-bottom: 1.5rem;
}

.pl-6 {
  padding-left: 1.5rem;
}

.pt-8 {
  padding-top: 2rem;
}

.pr-8 {
  padding-right: 2rem;
}

.pb-8 {
  padding-bottom: 2rem;
}

.pl-8 {
  padding-left: 2rem;
}

.pt-10 {
  padding-top: 2.5rem;
}

.pr-10 {
  padding-right: 2.5rem;
}

.pb-10 {
  padding-bottom: 2.5rem;
}

.pl-10 {
  padding-left: 2.5rem;
}

.pt-12 {
  padding-top: 3rem;
}

.pr-12 {
  padding-right: 3rem;
}

.pb-12 {
  padding-bottom: 3rem;
}

.pl-12 {
  padding-left: 3rem;
}

.pt-16 {
  padding-top: 4rem;
}

.pr-16 {
  padding-right: 4rem;
}

.pb-16 {
  padding-bottom: 4rem;
}

.pl-16 {
  padding-left: 4rem;
}

.pt-20 {
  padding-top: 5rem;
}

.pr-20 {
  padding-right: 5rem;
}

.pb-20 {
  padding-bottom: 5rem;
}

.pl-20 {
  padding-left: 5rem;
}

.pt-24 {
  padding-top: 6rem;
}

.pr-24 {
  padding-right: 6rem;
}

.pb-24 {
  padding-bottom: 6rem;
}

.pl-24 {
  padding-left: 6rem;
}

.pt-32 {
  padding-top: 8rem;
}

.pr-32 {
  padding-right: 8rem;
}

.pb-32 {
  padding-bottom: 8rem;
}

.pl-32 {
  padding-left: 8rem;
}

.pt-40 {
  padding-top: 10rem;
}

.pr-40 {
  padding-right: 10rem;
}

.pb-40 {
  padding-bottom: 10rem;
}

.pl-40 {
  padding-left: 10rem;
}

.pt-48 {
  padding-top: 12rem;
}

.pr-48 {
  padding-right: 12rem;
}

.pb-48 {
  padding-bottom: 12rem;
}

.pl-48 {
  padding-left: 12rem;
}

.pt-56 {
  padding-top: 14rem;
}

.pr-56 {
  padding-right: 14rem;
}

.pb-56 {
  padding-bottom: 14rem;
}

.pl-56 {
  padding-left: 14rem;
}

.pt-64 {
  padding-top: 16rem;
}

.pr-64 {
  padding-right: 16rem;
}

.pb-64 {
  padding-bottom: 16rem;
}

.pl-64 {
  padding-left: 16rem;
}

.pt-px {
  padding-top: 1px;
}

.pr-px {
  padding-right: 1px;
}

.pb-px {
  padding-bottom: 1px;
}

.pl-px {
  padding-left: 1px;
}


.m-0 {
  margin: 0;
}

.m-1 {
  margin: 0.25rem;
}

.m-2 {
  margin: 0.5rem;
}

.m-3 {
  margin: 0.75rem;
}

.m-4 {
  margin: 1rem;
}

.m-5 {
  margin: 1.25rem;
}

.m-6 {
  margin: 1.5rem;
}

.m-8 {
  margin: 2rem;
}

.m-10 {
  margin: 2.5rem;
}

.m-12 {
  margin: 3rem;
}

.m-16 {
  margin: 4rem;
}

.m-20 {
  margin: 5rem;
}

.m-24 {
  margin: 6rem;
}

.m-32 {
  margin: 8rem;
}

.m-40 {
  margin: 10rem;
}

.m-48 {
  margin: 12rem;
}

.m-56 {
  margin: 14rem;
}

.m-64 {
  margin: 16rem;
}

.m-auto {
  margin: auto;
}

.m-px {
  margin: 1px;
}

.-m-1 {
  margin: -0.25rem;
}

.-m-2 {
  margin: -0.5rem;
}

.-m-3 {
  margin: -0.75rem;
}

.-m-4 {
  margin: -1rem;
}

.-m-5 {
  margin: -1.25rem;
}

.-m-6 {
  margin: -1.5rem;
}

.-m-8 {
  margin: -2rem;
}

.-m-10 {
  margin: -2.5rem;
}

.-m-12 {
  margin: -3rem;
}

.-m-16 {
  margin: -4rem;
}

.-m-20 {
  margin: -5rem;
}

.-m-24 {
  margin: -6rem;
}

.-m-32 {
  margin: -8rem;
}

.-m-40 {
  margin: -10rem;
}

.-m-48 {
  margin: -12rem;
}

.-m-56 {
  margin: -14rem;
}

.-m-64 {
  margin: -16rem;
}

.-m-px {
  margin: -1px;
}



.mt-0 {
  margin-top: 0;
}

.mr-0 {
  margin-right: 0;
}

.mb-0 {
  margin-bottom: 0;
}

.ml-0 {
  margin-left: 0;
}

.mt-1 {
  margin-top: 0.25rem;
}

.mr-1 {
  margin-right: 0.25rem;
}

.mb-1 {
  margin-bottom: 0.25rem;
}

.ml-1 {
  margin-left: 0.25rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.ml-2 {
  margin-left: 0.5rem;
}

.mt-3 {
  margin-top: 0.75rem;
}

.mr-3 {
  margin-right: 0.75rem;
}

.mb-3 {
  margin-bottom: 0.75rem;
}

.ml-3 {
  margin-left: 0.75rem;
}

.mt-4 {
  margin-top: 1rem;
}

.mr-4 {
  margin-right: 1rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.ml-4 {
  margin-left: 1rem;
}

.mt-5 {
  margin-top: 1.25rem;
}

.mr-5 {
  margin-right: 1.25rem;
}

.mb-5 {
  margin-bottom: 1.25rem;
}

.ml-5 {
  margin-left: 1.25rem;
}

.mt-6 {
  margin-top: 1.5rem;
}

.mr-6 {
  margin-right: 1.5rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.ml-6 {
  margin-left: 1.5rem;
}

.mt-8 {
  margin-top: 2rem;
}

.mr-8 {
  margin-right: 2rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

.ml-8 {
  margin-left: 2rem;
}

.mt-10 {
  margin-top: 2.5rem;
}

.mr-10 {
  margin-right: 2.5rem;
}

.mb-10 {
  margin-bottom: 2.5rem;
}

.ml-10 {
  margin-left: 2.5rem;
}

.mt-12 {
  margin-top: 3rem;
}

.mr-12 {
  margin-right: 3rem;
}

.mb-12 {
  margin-bottom: 3rem;
}

.ml-12 {
  margin-left: 3rem;
}

.mt-16 {
  margin-top: 4rem;
}

.mr-16 {
  margin-right: 4rem;
}

.mb-16 {
  margin-bottom: 4rem;
}

.ml-16 {
  margin-left: 4rem;
}

.mt-20 {
  margin-top: 5rem;
}

.mr-20 {
  margin-right: 5rem;
}

.mb-20 {
  margin-bottom: 5rem;
}

.ml-20 {
  margin-left: 5rem;
}

.mt-24 {
  margin-top: 6rem;
}

.mr-24 {
  margin-right: 6rem;
}

.mb-24 {
  margin-bottom: 6rem;
}

.ml-24 {
  margin-left: 6rem;
}

.mt-32 {
  margin-top: 8rem;
}

.mr-32 {
  margin-right: 8rem;
}

.mb-32 {
  margin-bottom: 8rem;
}

.ml-32 {
  margin-left: 8rem;
}

.mt-40 {
  margin-top: 10rem;
}

.mr-40 {
  margin-right: 10rem;
}

.mb-40 {
  margin-bottom: 10rem;
}

.ml-40 {
  margin-left: 10rem;
}

.mt-48 {
  margin-top: 12rem;
}

.mr-48 {
  margin-right: 12rem;
}

.mb-48 {
  margin-bottom: 12rem;
}

.ml-48 {
  margin-left: 12rem;
}

.mt-56 {
  margin-top: 14rem;
}

.mr-56 {
  margin-right: 14rem;
}

.mb-56 {
  margin-bottom: 14rem;
}

.ml-56 {
  margin-left: 14rem;
}

.mt-64 {
  margin-top: 16rem;
}

.mr-64 {
  margin-right: 16rem;
}

.mb-64 {
  margin-bottom: 16rem;
}

.ml-64 {
  margin-left: 16rem;
}

.mt-auto {
  margin-top: auto;
}

.mr-auto {
  margin-right: auto;
}

.mb-auto {
  margin-bottom: auto;
}

.ml-auto {
  margin-left: auto;
}

.mt-px {
  margin-top: 1px;
}

.mr-px {
  margin-right: 1px;
}

.mb-px {
  margin-bottom: 1px;
}

.ml-px {
  margin-left: 1px;
}

.-mt-1 {
  margin-top: -0.25rem;
}

.-mr-1 {
  margin-right: -0.25rem;
}

.-mb-1 {
  margin-bottom: -0.25rem;
}

.-ml-1 {
  margin-left: -0.25rem;
}

.-mt-2 {
  margin-top: -0.5rem;
}

.-mr-2 {
  margin-right: -0.5rem;
}

.-mb-2 {
  margin-bottom: -0.5rem;
}

.-ml-2 {
  margin-left: -0.5rem;
}

.-mt-3 {
  margin-top: -0.75rem;
}

.-mr-3 {
  margin-right: -0.75rem;
}

.-mb-3 {
  margin-bottom: -0.75rem;
}

.-ml-3 {
  margin-left: -0.75rem;
}

.-mt-4 {
  margin-top: -1rem;
}

.-mr-4 {
  margin-right: -1rem;
}

.-mb-4 {
  margin-bottom: -1rem;
}

.-ml-4 {
  margin-left: -1rem;
}

.-mt-5 {
  margin-top: -1.25rem;
}

.-mr-5 {
  margin-right: -1.25rem;
}

.-mb-5 {
  margin-bottom: -1.25rem;
}

.-ml-5 {
  margin-left: -1.25rem;
}

.-mt-6 {
  margin-top: -1.5rem;
}

.-mr-6 {
  margin-right: -1.5rem;
}

.-mb-6 {
  margin-bottom: -1.5rem;
}

.-ml-6 {
  margin-left: -1.5rem;
}

.-mt-8 {
  margin-top: -2rem;
}

.-mr-8 {
  margin-right: -2rem;
}

.-mb-8 {
  margin-bottom: -2rem;
}

.-ml-8 {
  margin-left: -2rem;
}

.-mt-10 {
  margin-top: -2.5rem;
}

.-mr-10 {
  margin-right: -2.5rem;
}

.-mb-10 {
  margin-bottom: -2.5rem;
}

.-ml-10 {
  margin-left: -2.5rem;
}

.-mt-12 {
  margin-top: -3rem;
}

.-mr-12 {
  margin-right: -3rem;
}

.-mb-12 {
  margin-bottom: -3rem;
}

.-ml-12 {
  margin-left: -3rem;
}

.-mt-16 {
  margin-top: -4rem;
}

.-mr-16 {
  margin-right: -4rem;
}

.-mb-16 {
  margin-bottom: -4rem;
}

.-ml-16 {
  margin-left: -4rem;
}

.-mt-20 {
  margin-top: -5rem;
}

.-mr-20 {
  margin-right: -5rem;
}

.-mb-20 {
  margin-bottom: -5rem;
}

.-ml-20 {
  margin-left: -5rem;
}

.-mt-24 {
  margin-top: -6rem;
}

.-mr-24 {
  margin-right: -6rem;
}

.-mb-24 {
  margin-bottom: -6rem;
}

.-ml-24 {
  margin-left: -6rem;
}

.-mt-32 {
  margin-top: -8rem;
}

.-mr-32 {
  margin-right: -8rem;
}

.-mb-32 {
  margin-bottom: -8rem;
}

.-ml-32 {
  margin-left: -8rem;
}

.-mt-40 {
  margin-top: -10rem;
}

.-mr-40 {
  margin-right: -10rem;
}

.-mb-40 {
  margin-bottom: -10rem;
}

.-ml-40 {
  margin-left: -10rem;
}

.-mt-48 {
  margin-top: -12rem;
}

.-mr-48 {
  margin-right: -12rem;
}

.-mb-48 {
  margin-bottom: -12rem;
}

.-ml-48 {
  margin-left: -12rem;
}

.-mt-56 {
  margin-top: -14rem;
}

.-mr-56 {
  margin-right: -14rem;
}

.-mb-56 {
  margin-bottom: -14rem;
}

.-ml-56 {
  margin-left: -14rem;
}

.-mt-64 {
  margin-top: -16rem;
}

.-mr-64 {
  margin-right: -16rem;
}

.-mb-64 {
  margin-bottom: -16rem;
}

.-ml-64 {
  margin-left: -16rem;
}

.-mt-px {
  margin-top: -1px;
}

.-mr-px {
  margin-right: -1px;
}

.-mb-px {
  margin-bottom: -1px;
}

.-ml-px {
  margin-left: -1px;
}


.bg-fixed {
  background-attachment: fixed;
}

.bg-local {
  background-attachment: local;
}

.bg-scroll {
  background-attachment: scroll;
}

.bg-transparent {
  background-color: transparent;
}

.bg-current {
  background-color: currentColor;
}

.bg-black {
  --bg-opacity: 1;
  background-color: #000;
  background-color: rgba(0, 0, 0, var(--bg-opacity));
}

.bg-white {
  --bg-opacity: 1;
  background-color: #fff;
  background-color: rgba(255, 255, 255, var(--bg-opacity));
}

.bg-gray-100 {
  --bg-opacity: 1;
  background-color: #f7fafc;
  background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.bg-gray-200 {
  --bg-opacity: 1;
  background-color: #edf2f7;
  background-color: rgba(237, 242, 247, var(--bg-opacity));
}

.bg-gray-300 {
  --bg-opacity: 1;
  background-color: #e2e8f0;
  background-color: rgba(226, 232, 240, var(--bg-opacity));
}

.bg-gray-400 {
  --bg-opacity: 1;
  background-color: #cbd5e0;
  background-color: rgba(203, 213, 224, var(--bg-opacity));
}

.bg-gray-500 {
  --bg-opacity: 1;
  background-color: #a0aec0;
  background-color: rgba(160, 174, 192, var(--bg-opacity));
}

.bg-gray-600 {
  --bg-opacity: 1;
  background-color: #718096;
  background-color: rgba(113, 128, 150, var(--bg-opacity));
}

.bg-gray-700 {
  --bg-opacity: 1;
  background-color: #4a5568;
  background-color: rgba(74, 85, 104, var(--bg-opacity));
}

.bg-gray-800 {
  --bg-opacity: 1;
  background-color: #2d3748;
  background-color: rgba(45, 55, 72, var(--bg-opacity));
}

.bg-gray-900 {
  --bg-opacity: 1;
  background-color: #1a202c;
  background-color: rgba(26, 32, 44, var(--bg-opacity));
}

.bg-red-100 {
  --bg-opacity: 1;
  background-color: #fff5f5;
  background-color: rgba(255, 245, 245, var(--bg-opacity));
}

.bg-red-200 {
  --bg-opacity: 1;
  background-color: #fed7d7;
  background-color: rgba(254, 215, 215, var(--bg-opacity));
}

.bg-red-300 {
  --bg-opacity: 1;
  background-color: #feb2b2;
  background-color: rgba(254, 178, 178, var(--bg-opacity));
}

.bg-red-400 {
  --bg-opacity: 1;
  background-color: #fc8181;
  background-color: rgba(252, 129, 129, var(--bg-opacity));
}

.bg-red-500 {
  --bg-opacity: 1;
  background-color: #f56565;
  background-color: rgba(245, 101, 101, var(--bg-opacity));
}

.bg-red-600 {
  --bg-opacity: 1;
  background-color: #e53e3e;
  background-color: rgba(229, 62, 62, var(--bg-opacity));
}

.bg-red-700 {
  --bg-opacity: 1;
  background-color: #c53030;
  background-color: rgba(197, 48, 48, var(--bg-opacity));
}

.bg-red-800 {
  --bg-opacity: 1;
  background-color: #9b2c2c;
  background-color: rgba(155, 44, 44, var(--bg-opacity));
}

.bg-red-900 {
  --bg-opacity: 1;
  background-color: #742a2a;
  background-color: rgba(116, 42, 42, var(--bg-opacity));
}

.bg-orange-100 {
  --bg-opacity: 1;
  background-color: #fffaf0;
  background-color: rgba(255, 250, 240, var(--bg-opacity));
}

.bg-orange-200 {
  --bg-opacity: 1;
  background-color: #feebc8;
  background-color: rgba(254, 235, 200, var(--bg-opacity));
}

.bg-orange-300 {
  --bg-opacity: 1;
  background-color: #fbd38d;
  background-color: rgba(251, 211, 141, var(--bg-opacity));
}

.bg-orange-400 {
  --bg-opacity: 1;
  background-color: #f6ad55;
  background-color: rgba(246, 173, 85, var(--bg-opacity));
}

.bg-orange-500 {
  --bg-opacity: 1;
  background-color: #ed8936;
  background-color: rgba(237, 137, 54, var(--bg-opacity));
}

.bg-orange-600 {
  --bg-opacity: 1;
  background-color: #dd6b20;
  background-color: rgba(221, 107, 32, var(--bg-opacity));
}

.bg-orange-700 {
  --bg-opacity: 1;
  background-color: #c05621;
  background-color: rgba(192, 86, 33, var(--bg-opacity));
}

.bg-orange-800 {
  --bg-opacity: 1;
  background-color: #9c4221;
  background-color: rgba(156, 66, 33, var(--bg-opacity));
}

.bg-orange-900 {
  --bg-opacity: 1;
  background-color: #7b341e;
  background-color: rgba(123, 52, 30, var(--bg-opacity));
}

.bg-yellow-100 {
  --bg-opacity: 1;
  background-color: #fffff0;
  background-color: rgba(255, 255, 240, var(--bg-opacity));
}

.bg-yellow-200 {
  --bg-opacity: 1;
  background-color: #fefcbf;
  background-color: rgba(254, 252, 191, var(--bg-opacity));
}

.bg-yellow-300 {
  --bg-opacity: 1;
  background-color: #faf089;
  background-color: rgba(250, 240, 137, var(--bg-opacity));
}

.bg-yellow-400 {
  --bg-opacity: 1;
  background-color: #f6e05e;
  background-color: rgba(246, 224, 94, var(--bg-opacity));
}

.bg-yellow-500 {
  --bg-opacity: 1;
  background-color: #ecc94b;
  background-color: rgba(236, 201, 75, var(--bg-opacity));
}

.bg-yellow-600 {
  --bg-opacity: 1;
  background-color: #d69e2e;
  background-color: rgba(214, 158, 46, var(--bg-opacity));
}

.bg-yellow-700 {
  --bg-opacity: 1;
  background-color: #b7791f;
  background-color: rgba(183, 121, 31, var(--bg-opacity));
}

.bg-yellow-800 {
  --bg-opacity: 1;
  background-color: #975a16;
  background-color: rgba(151, 90, 22, var(--bg-opacity));
}

.bg-yellow-900 {
  --bg-opacity: 1;
  background-color: #744210;
  background-color: rgba(116, 66, 16, var(--bg-opacity));
}

.bg-green-100 {
  --bg-opacity: 1;
  background-color: #f0fff4;
  background-color: rgba(240, 255, 244, var(--bg-opacity));
}

.bg-green-200 {
  --bg-opacity: 1;
  background-color: #c6f6d5;
  background-color: rgba(198, 246, 213, var(--bg-opacity));
}

.bg-green-300 {
  --bg-opacity: 1;
  background-color: #9ae6b4;
  background-color: rgba(154, 230, 180, var(--bg-opacity));
}

.bg-green-400 {
  --bg-opacity: 1;
  background-color: #68d391;
  background-color: rgba(104, 211, 145, var(--bg-opacity));
}

.bg-green-500 {
  --bg-opacity: 1;
  background-color: #48bb78;
  background-color: rgba(72, 187, 120, var(--bg-opacity));
}

.bg-green-600 {
  --bg-opacity: 1;
  background-color: #38a169;
  background-color: rgba(56, 161, 105, var(--bg-opacity));
}

.bg-green-700 {
  --bg-opacity: 1;
  background-color: #2f855a;
  background-color: rgba(47, 133, 90, var(--bg-opacity));
}

.bg-green-800 {
  --bg-opacity: 1;
  background-color: #276749;
  background-color: rgba(39, 103, 73, var(--bg-opacity));
}

.bg-green-900 {
  --bg-opacity: 1;
  background-color: #22543d;
  background-color: rgba(34, 84, 61, var(--bg-opacity));
}

.bg-teal-100 {
  --bg-opacity: 1;
  background-color: #e6fffa;
  background-color: rgba(230, 255, 250, var(--bg-opacity));
}

.bg-teal-200 {
  --bg-opacity: 1;
  background-color: #b2f5ea;
  background-color: rgba(178, 245, 234, var(--bg-opacity));
}

.bg-teal-300 {
  --bg-opacity: 1;
  background-color: #81e6d9;
  background-color: rgba(129, 230, 217, var(--bg-opacity));
}

.bg-teal-400 {
  --bg-opacity: 1;
  background-color: #4fd1c5;
  background-color: rgba(79, 209, 197, var(--bg-opacity));
}

.bg-teal-500 {
  --bg-opacity: 1;
  background-color: #38b2ac;
  background-color: rgba(56, 178, 172, var(--bg-opacity));
}

.bg-teal-600 {
  --bg-opacity: 1;
  background-color: #319795;
  background-color: rgba(49, 151, 149, var(--bg-opacity));
}

.bg-teal-700 {
  --bg-opacity: 1;
  background-color: #2c7a7b;
  background-color: rgba(44, 122, 123, var(--bg-opacity));
}

.bg-teal-800 {
  --bg-opacity: 1;
  background-color: #285e61;
  background-color: rgba(40, 94, 97, var(--bg-opacity));
}

.bg-teal-900 {
  --bg-opacity: 1;
  background-color: #234e52;
  background-color: rgba(35, 78, 82, var(--bg-opacity));
}

.bg-blue-100 {
  --bg-opacity: 1;
  background-color: #ebf8ff;
  background-color: rgba(235, 248, 255, var(--bg-opacity));
}

.bg-blue-200 {
  --bg-opacity: 1;
  background-color: #bee3f8;
  background-color: rgba(190, 227, 248, var(--bg-opacity));
}

.bg-blue-300 {
  --bg-opacity: 1;
  background-color: #90cdf4;
  background-color: rgba(144, 205, 244, var(--bg-opacity));
}

.bg-blue-400 {
  --bg-opacity: 1;
  background-color: #63b3ed;
  background-color: rgba(99, 179, 237, var(--bg-opacity));
}

.bg-blue-500 {
  --bg-opacity: 1;
  background-color: #4299e1;
  background-color: rgba(66, 153, 225, var(--bg-opacity));
}

.bg-blue-600 {
  --bg-opacity: 1;
  background-color: #3182ce;
  background-color: rgba(49, 130, 206, var(--bg-opacity));
}

.bg-blue-700 {
  --bg-opacity: 1;
  background-color: #2b6cb0;
  background-color: rgba(43, 108, 176, var(--bg-opacity));
}

.bg-blue-800 {
  --bg-opacity: 1;
  background-color: #2c5282;
  background-color: rgba(44, 82, 130, var(--bg-opacity));
}

.bg-blue-900 {
  --bg-opacity: 1;
  background-color: #2a4365;
  background-color: rgba(42, 67, 101, var(--bg-opacity));
}

.bg-indigo-100 {
  --bg-opacity: 1;
  background-color: #ebf4ff;
  background-color: rgba(235, 244, 255, var(--bg-opacity));
}

.bg-indigo-200 {
  --bg-opacity: 1;
  background-color: #c3dafe;
  background-color: rgba(195, 218, 254, var(--bg-opacity));
}

.bg-indigo-300 {
  --bg-opacity: 1;
  background-color: #a3bffa;
  background-color: rgba(163, 191, 250, var(--bg-opacity));
}

.bg-indigo-400 {
  --bg-opacity: 1;
  background-color: #7f9cf5;
  background-color: rgba(127, 156, 245, var(--bg-opacity));
}

.bg-indigo-500 {
  --bg-opacity: 1;
  background-color: #667eea;
  background-color: rgba(102, 126, 234, var(--bg-opacity));
}

.bg-indigo-600 {
  --bg-opacity: 1;
  background-color: #5a67d8;
  background-color: rgba(90, 103, 216, var(--bg-opacity));
}

.bg-indigo-700 {
  --bg-opacity: 1;
  background-color: #4c51bf;
  background-color: rgba(76, 81, 191, var(--bg-opacity));
}

.bg-indigo-800 {
  --bg-opacity: 1;
  background-color: #434190;
  background-color: rgba(67, 65, 144, var(--bg-opacity));
}

.bg-indigo-900 {
  --bg-opacity: 1;
  background-color: #3c366b;
  background-color: rgba(60, 54, 107, var(--bg-opacity));
}

.bg-purple-100 {
  --bg-opacity: 1;
  background-color: #faf5ff;
  background-color: rgba(250, 245, 255, var(--bg-opacity));
}

.bg-purple-200 {
  --bg-opacity: 1;
  background-color: #e9d8fd;
  background-color: rgba(233, 216, 253, var(--bg-opacity));
}

.bg-purple-300 {
  --bg-opacity: 1;
  background-color: #d6bcfa;
  background-color: rgba(214, 188, 250, var(--bg-opacity));
}

.bg-purple-400 {
  --bg-opacity: 1;
  background-color: #b794f4;
  background-color: rgba(183, 148, 244, var(--bg-opacity));
}

.bg-purple-500 {
  --bg-opacity: 1;
  background-color: #9f7aea;
  background-color: rgba(159, 122, 234, var(--bg-opacity));
}

.bg-purple-600 {
  --bg-opacity: 1;
  background-color: #805ad5;
  background-color: rgba(128, 90, 213, var(--bg-opacity));
}

.bg-purple-700 {
  --bg-opacity: 1;
  background-color: #6b46c1;
  background-color: rgba(107, 70, 193, var(--bg-opacity));
}

.bg-purple-800 {
  --bg-opacity: 1;
  background-color: #553c9a;
  background-color: rgba(85, 60, 154, var(--bg-opacity));
}

.bg-purple-900 {
  --bg-opacity: 1;
  background-color: #44337a;
  background-color: rgba(68, 51, 122, var(--bg-opacity));
}

.bg-pink-100 {
  --bg-opacity: 1;
  background-color: #fff5f7;
  background-color: rgba(255, 245, 247, var(--bg-opacity));
}

.bg-pink-200 {
  --bg-opacity: 1;
  background-color: #fed7e2;
  background-color: rgba(254, 215, 226, var(--bg-opacity));
}

.bg-pink-300 {
  --bg-opacity: 1;
  background-color: #fbb6ce;
  background-color: rgba(251, 182, 206, var(--bg-opacity));
}

.bg-pink-400 {
  --bg-opacity: 1;
  background-color: #f687b3;
  background-color: rgba(246, 135, 179, var(--bg-opacity));
}

.bg-pink-500 {
  --bg-opacity: 1;
  background-color: #ed64a6;
  background-color: rgba(237, 100, 166, var(--bg-opacity));
}

.bg-pink-600 {
  --bg-opacity: 1;
  background-color: #d53f8c;
  background-color: rgba(213, 63, 140, var(--bg-opacity));
}

.bg-pink-700 {
  --bg-opacity: 1;
  background-color: #b83280;
  background-color: rgba(184, 50, 128, var(--bg-opacity));
}

.bg-pink-800 {
  --bg-opacity: 1;
  background-color: #97266d;
  background-color: rgba(151, 38, 109, var(--bg-opacity));
}

.bg-pink-900 {
  --bg-opacity: 1;
  background-color: #702459;
  background-color: rgba(112, 36, 89, var(--bg-opacity));
}

.text-orange-500 {
  --text-opacity: 1;
  color: #ed8936;
  color: rgba(237, 137, 54, var(--text-opacity));
}
.text-orange-600 {
  --text-opacity: 1;
  color: #dd6b20;
  color: rgba(221, 107, 32, var(--text-opacity));
}
.text-black {
  --text-opacity: 1;
  color: #000;
  color: rgba(0, 0, 0, var(--text-opacity));
}
.text-white {
  --text-opacity: 1;
  color: #fff;
  color: rgba(255, 255, 255, var(--text-opacity));
}


.text-xs {
  font-size: 0.75rem;
}

.text-sm {
  font-size: 0.875rem;
}

.text-base {
  font-size: 1rem;
}

.text-lg {
  font-size: 1.125rem;
}

.text-xl {
  font-size: 1.25rem;
}

.text-2xl {
  font-size: 1.5rem;
}

.text-3xl {
  font-size: 1.875rem;
}

.text-4xl {
  font-size: 2.25rem;
}

.text-5xl {
  font-size: 3rem;
}

.text-6xl {
  font-size: 4rem;
}



.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.text-justify {
  text-align: justify;
}


.font-hairline {
  font-weight: 100;
}

.font-thin {
  font-weight: 200;
}

.font-light {
  font-weight: 300;
}

.font-normal {
  font-weight: 400;
}

.font-medium {
  font-weight: 500;
}

.font-semibold {
  font-weight: 600;
}

.font-bold {
  font-weight: 700;
}

.font-extrabold {
  font-weight: 800;
}

.font-black {
  font-weight: 900;
}


.text-base {
  font-size: 1rem;
}
.text-gray-500 {
  --text-opacity: 1;
  color: #a0aec0;
  color: rgba(160, 174, 192, var(--text-opacity));
}
.text-orange-700 {
  --text-opacity: 1;
  color: #c05621;
  color: rgba(192, 86, 33, var(--text-opacity));
}

.leading-normal {
  line-height: 1.5;
}




.static {
  position: static;
}

.fixed {
  position: fixed;
}

.absolute {
  position: absolute;
}

.relative {
  position: relative;
}


.top-0 {
  top: 0;
}

.right-0 {
  right: 0;
}

.bottom-0 {
  bottom: 0;
}

.left-0 {
  left: 0;
}


.sticky {
  position: -webkit-sticky;
  position: sticky;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.z-40 {
  z-index: 40;
}

.z-50 {
  z-index: 50;
}

p{margin:0}



.opacity-0 {
  opacity: 0;
}

.opacity-25 {
  opacity: 0.25;
}

.opacity-50 {
  opacity: 0.5;
}

.opacity-75 {
  opacity: 0.75;
}

.opacity-100 {
  opacity: 1;
}

</style>

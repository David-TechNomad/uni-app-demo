<template>
	<div id="app">
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>
<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	@Component
	export default class App extends Vue {
		name: 'app';
		components: {
		}
	}
</script>


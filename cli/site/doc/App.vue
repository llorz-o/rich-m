<template>
	<div>
		<Nav></Nav>
		<Siderbar width="200"></Siderbar>
		<div class="content">
			<router-view></router-view>
		</div>
		<div class="simulationWrapper">
			<Simulation></Simulation>
		</div>
	</div>
</template>

<script>
import Nav from "./components/nav.vue";
import Siderbar from "./components/siderbar.vue";
import Simulation from "./components/simulation.vue";
export default {
	components: {
		Nav,
		Siderbar,
		Simulation
	}
};
</script>

<style lang="less">
@import "../../../src/sty/index.less";
.content {
	margin-left: 200px;
	margin-right: 400px;
}
.simulationWrapper {
	position: fixed;
	width: 400px;
	top: 50px;
	right: 0;
}
</style>

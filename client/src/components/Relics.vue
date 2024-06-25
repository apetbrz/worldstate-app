<script setup>
    defineProps({
        currentTime: {
            required: true
        },
        worldstateTime: {
            required: true
        },
        wfdata: {
            required: true
        },
        missionData: {
            required: true
        }
    })
</script>

<template>
    <div class="relics">
        <pre><ul class="display">
            <li id="time">Current Time: {{ currentTime }}</li>
            <li id="refresh">Last Worldstate Update: {{ worldstateTime }}</li>
            <li id="li2">Cascade: {{ missionData.cascade }}</li>
            <li id="li3">Capture: {{ missionData.capture }}</li>
            <li id="li4">Exterminate: {{ missionData.exterminate }}</li>
            <li id="li5">Disruption: {{ missionData.disruption }}</li>
            <li id="li6">Survival: {{ missionData.survival }}</li>
            <li id="li7">Rescue: {{ missionData.rescue }}</li>
        </ul></pre>
    </div>
</template>

<style scoped>
    h1 {
        font-weight: 500;
        font-size: 2.6rem;
        position: relative;
        top: -10px;
    }

    li, h3 {
        font-size: 1.2rem;
    }

    .greetings h1,
    .greetings h3 {
        text-align: center;
    }

    @media (min-width: 1024px) {
        .greetings h1,
        .greetings h3 {
            text-align: left;
        }
    }
</style>

<!-- <script src="./relics.js"/> -->